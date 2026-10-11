#!/usr/bin/env python3
"""
Build the hero assets from the raw intro video.

    python3 scripts/build-hero-assets.py path/to/intro.mp4 [--crop W:H:X:Y] [--seconds 10]

Outputs (relative to the repo root):
    public/hero/hero.mp4      H.264 + AAC, seamless loop
    public/hero/hero.webm     VP9 + Opus, seamless loop
    public/hero/poster.webp   first frame of the loop
    public/portrait-bust.webp 480x600 head-to-shirt still
    public/og.jpg             1200x630 social card

Requires ffmpeg/ffprobe on PATH and numpy.

How the loop works: we keep the first ~N seconds, drop the first 0.5 s from the
start, and cross-fade the last 0.5 s of picture and sound into that dropped
0.5 s. The clip therefore ends on exactly the frame/sample it starts on, so it
repeats with no jump or click. Nothing is stretched, so lips stay in sync.
"""
from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np

ROOT = Path(__file__).resolve().parent.parent
OUT_W = 768            # hero width
ASPECT = 768 / 960     # hero aspect (w / h)
XFADE = 0.5            # cross-fade length, seconds
SR = 48000             # audio sample rate
PAPER = "0xf4f2ee"


def run(cmd: list[str], **kw) -> subprocess.CompletedProcess:
    print("  $", " ".join(str(c) for c in cmd[:12]), "…" if len(cmd) > 12 else "")
    return subprocess.run(cmd, check=True, **kw)


def probe(src: Path) -> dict:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", str(src)],
        check=True, capture_output=True, text=True,
    ).stdout
    info = json.loads(out)
    v = next(s for s in info["streams"] if s["codec_type"] == "video")
    num, den = (int(x) for x in v["r_frame_rate"].split("/"))
    return {
        "w": int(v["width"]), "h": int(v["height"]), "fps": num / den,
        "dur": float(info["format"]["duration"]),
        "audio": any(s["codec_type"] == "audio" for s in info["streams"]),
    }


def gray_frames(src: Path, w: int, h: int, every: float, scale: int = 4) -> np.ndarray:
    """Decode sampled frames as small grayscale arrays (n, h/scale, w/scale)."""
    sw, sh = w // scale, h // scale
    raw = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(src), "-vf", f"fps=1/{every},scale={sw}:{sh},format=gray",
         "-f", "rawvideo", "-"], check=True, capture_output=True,
    ).stdout
    return np.frombuffer(raw, np.uint8).reshape(-1, sh, sw).astype(np.float32)


def detect_crop(src: Path, meta: dict) -> tuple[int, int, int, int, dict]:
    """Find the person against the plain backdrop and return a centred crop."""
    scale = 4
    frames = gray_frames(src, meta["w"], meta["h"], every=0.5, scale=scale)
    # Backdrop = per-pixel median over time, which still contains the (mostly still)
    # person, so compare against a smooth border estimate instead.
    border = np.concatenate([frames[:, :, :8].ravel(), frames[:, :, -8:].ravel(), frames[:, :8, :].ravel()])
    bg = float(np.median(border))
    mask = (np.abs(frames - bg) > 28).any(axis=0)
    # Drop specks: keep rows/cols with a real amount of foreground.
    cols = np.where(mask.sum(axis=0) > 3)[0]
    rows = np.where(mask.sum(axis=1) > 3)[0]
    if cols.size == 0 or rows.size == 0:
        sys.exit("Could not find the person. Pass --crop W:H:X:Y.")
    x0, x1 = cols[0] * scale, (cols[-1] + 1) * scale
    y0, y1 = rows[0] * scale, (rows[-1] + 1) * scale
    cx = (x0 + x1) / 2
    ch = min(meta["h"], int((y1 - y0) * 1.10))
    ch -= ch % 2
    cw = int(ch * ASPECT)
    cw -= cw % 2
    cy = max(0, min(meta["h"] - ch, int(y0 - (ch - (y1 - y0)) * 0.45)))
    cx0 = max(0, min(meta["w"] - cw, int(cx - cw / 2)))
    person = {"x0": x0, "x1": x1, "y0": y0, "y1": y1, "bg": bg}
    print(f"  person bbox x={x0}-{x1} y={y0}-{y1}, backdrop luma≈{bg:.0f}")
    return cw, ch, cx0, cy, person


def whiten_filter(bg_luma: float) -> str:
    # Spec default 0.98; if the backdrop is darker than that, push it to pure white.
    imax = min(0.98, max(0.80, (bg_luma - 4) / 255))
    return f"colorlevels=rimax={imax:.3f}:gimax={imax:.3f}:bimax={imax:.3f}"


def build_loop(src: Path, crop: str, whiten: str, seconds: float, has_audio: bool, tmp: Path) -> tuple[Path, Path | None]:
    L = seconds
    vf = f"crop={crop},scale={OUT_W}:-2:flags=lanczos,{whiten},setsar=1"
    # Picture: A = [XFADE, L], B = [0, XFADE]; xfade A's tail into B.
    video = tmp / "loop_video.mkv"
    run([
        "ffmpeg", "-v", "error", "-y", "-i", str(src), "-filter_complex",
        f"[0:v]{vf},split[s1][s2];"
        f"[s1]trim={XFADE}:{L},setpts=PTS-STARTPTS[a];"
        f"[s2]trim=0:{XFADE},setpts=PTS-STARTPTS[b];"
        f"[a][b]xfade=transition=fade:duration={XFADE}:offset={L - 2 * XFADE:.3f},format=yuv420p[v]",
        "-map", "[v]", "-an", "-c:v", "ffv1", str(video),
    ])
    if not has_audio:
        return video, None

    # Sound: same cut, done sample-accurately in numpy with an equal-power fade.
    raw = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(src), "-t", str(L), "-vn", "-ac", "2", "-ar", str(SR),
         "-f", "f32le", "-"], check=True, capture_output=True,
    ).stdout
    pcm = np.frombuffer(raw, np.float32).reshape(-1, 2).copy()
    n = int(round(XFADE * SR))
    total = int(round(L * SR))
    if pcm.shape[0] < total:
        pcm = np.pad(pcm, ((0, total - pcm.shape[0]), (0, 0)))
    pcm = pcm[:total]
    a = pcm[n:].copy()                # [XFADE, L]
    b = pcm[:n]                       # [0, XFADE]
    t = np.linspace(0.0, 1.0, n, endpoint=False, dtype=np.float32)[:, None]
    a[-n:] = a[-n:] * np.cos(t * np.pi / 2) + b * np.sin(t * np.pi / 2)
    a = np.clip(a, -1.0, 1.0)
    audio = tmp / "loop_audio.wav"
    pcm16 = (a * 32767).astype("<i2")
    import wave
    with wave.open(str(audio), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm16.tobytes())
    return video, audio


def export(video: Path, audio: Path | None, out_dir: Path) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)
    ain = ["-i", str(audio)] if audio else []
    amap = ["-map", "1:a"] if audio else ["-an"]
    run(["ffmpeg", "-v", "error", "-y", "-i", str(video), *ain, "-map", "0:v", *amap,
         "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "24", "-preset", "slow",
         *(["-c:a", "aac", "-b:a", "96k"] if audio else []),
         "-movflags", "+faststart", "-shortest", str(out_dir / "hero.mp4")])
    run(["ffmpeg", "-v", "error", "-y", "-i", str(video), *ain, "-map", "0:v", *amap,
         "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0", "-row-mt", "1", "-pix_fmt", "yuv420p",
         *(["-c:a", "libopus", "-b:a", "80k"] if audio else []),
         "-shortest", str(out_dir / "hero.webm")])


def sharpest_time(src: Path, crop: tuple[int, int, int, int], person: dict, seconds: float) -> float:
    """Pick the clearest head frame (max Laplacian variance) in the first N seconds."""
    cw, ch, cx, cy = crop
    hx = int((person["x0"] + person["x1"]) / 2 - 200)
    hy = int(person["y0"])
    step = 0.25
    raw = subprocess.run(
        ["ffmpeg", "-v", "error", "-i", str(src), "-t", str(seconds), "-vf",
         f"fps=1/{step},crop=400:400:{max(0, hx)}:{max(0, hy)},format=gray", "-f", "rawvideo", "-"],
        check=True, capture_output=True,
    ).stdout
    f = np.frombuffer(raw, np.uint8).reshape(-1, 400, 400).astype(np.float32)
    lap = f[:, 1:-1, 1:-1] * 4 - f[:, :-2, 1:-1] - f[:, 2:, 1:-1] - f[:, 1:-1, :-2] - f[:, 1:-1, 2:]
    scores = lap.reshape(lap.shape[0], -1).var(axis=1)
    best = int(np.argmax(scores))
    print(f"  clearest frame at {best * step:.2f}s")
    return best * step


def to_webp(png: Path, dest: Path) -> None:
    """ffmpeg builds often lack libwebp; fall back to cwebp, then Pillow."""
    if shutil.which("cwebp"):
        run(["cwebp", "-quiet", "-q", "86", str(png), "-o", str(dest)])
        return
    from PIL import Image  # optional dependency
    Image.open(png).save(dest, "WEBP", quality=86)


def stills(src: Path, crop: tuple[int, int, int, int], person: dict, whiten: str, t: float,
           photo: Path | None, name: str, role: str) -> None:
    cw, ch, cx, cy = crop
    # Head-to-shirt: top ~34% of the figure, 4:5.
    fig_h = person["y1"] - person["y0"]
    bh = int(fig_h * 0.36)
    bw = int(bh * 0.8)
    bx = int((person["x0"] + person["x1"]) / 2 - bw / 2)
    by = max(0, int(person["y0"] - fig_h * 0.03))
    png = Path(tempfile.mkdtemp()) / "bust.png"
    if photo:
        run(["ffmpeg", "-v", "error", "-y", "-i", str(photo), "-vf",
             "scale=480:600:force_original_aspect_ratio=increase,crop=480:600", str(png)])
    else:
        run(["ffmpeg", "-v", "error", "-y", "-ss", f"{t:.3f}", "-i", str(src), "-frames:v", "1", "-vf",
             f"crop={bw}:{bh}:{bx}:{by},scale=480:600:flags=lanczos,{whiten}", str(png)])
    to_webp(png, ROOT / "public/portrait-bust.webp")

    # OG card: paper background, figure multiplied in on the right, name + role on the left.
    font = next((p for p in ["/System/Library/Fonts/Helvetica.ttc",
                             "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"] if Path(p).exists()), None)
    has_drawtext = " drawtext " in subprocess.run(["ffmpeg", "-hide_banner", "-filters"],
                                                  capture_output=True, text=True).stdout
    text = ""
    if font and has_drawtext:
        esc = lambda s: s.replace(":", r"\:").replace("'", r"\'")
        text = (f",drawtext=fontfile={font}:text='{esc(name)}':x=80:y=230:fontsize=76:fontcolor=0x0d0d0d,"
                f"drawtext=fontfile={font}:text='{esc(role)}':x=82:y=330:fontsize=30:fontcolor=0x77756f")
    og = ROOT / "public/og.jpg"
    run(["ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", f"color=c={PAPER}:s=1200x630",
         "-ss", f"{t:.3f}", "-i", str(src), "-frames:v", "1", "-filter_complex",
         f"[1:v]crop={cw}:{ch}:{cx}:{cy},scale=-2:600,{whiten},pad=1200:630:(ow-iw)-90:15:white,format=gbrp[fg];"
         f"[0:v]format=gbrp[bg];[bg][fg]blend=all_mode=multiply,format=yuvj444p{text}",
         "-q:v", "3", str(og)])
    if font and not has_drawtext:
        # ffmpeg built without freetype: draw the title with Pillow if it is installed.
        try:
            from PIL import Image, ImageDraw, ImageFont
        except ImportError:
            print("  (no drawtext and no Pillow: og.jpg has no title text)")
            return
        img = Image.open(og)
        d = ImageDraw.Draw(img)
        d.text((80, 230), name, fill="#0d0d0d", font=ImageFont.truetype(font, 76))
        d.text((82, 330), role, fill="#77756f", font=ImageFont.truetype(font, 30))
        img.save(og, quality=88)


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("video", type=Path)
    ap.add_argument("--crop", help="manual crop W:H:X:Y (skips detection)")
    ap.add_argument("--seconds", type=float, default=10.0, help="length to keep before looping")
    ap.add_argument("--photo", type=Path, help="optional photo for the ID-card portrait")
    ap.add_argument("--name", default="Tomas Utreras")
    ap.add_argument("--role", default="Senior Engineering Program Manager")
    args = ap.parse_args()

    for tool in ("ffmpeg", "ffprobe"):
        if not shutil.which(tool):
            sys.exit(f"{tool} not found on PATH (macOS: brew install ffmpeg)")

    meta = probe(args.video)
    seconds = min(args.seconds, meta["dur"])
    print(f"source {meta['w']}x{meta['h']} @ {meta['fps']:.2f} fps, {meta['dur']:.2f}s, using {seconds:.2f}s")

    cw, ch, cx, cy, person = detect_crop(args.video, meta)
    if args.crop:
        cw, ch, cx, cy = (int(v) for v in args.crop.split(":"))
    crop = f"{cw}:{ch}:{cx}:{cy}"
    print(f"  crop={crop}")
    whiten = whiten_filter(person["bg"])
    print(f"  {whiten}")

    with tempfile.TemporaryDirectory() as td:
        video, audio = build_loop(args.video, crop, whiten, seconds, meta["audio"], Path(td))
        export(video, audio, ROOT / "public/hero")
        # Poster = first frame of the loop (shown before playback / with reduced motion).
        png = Path(td) / "poster.png"
        run(["ffmpeg", "-v", "error", "-y", "-i", str(ROOT / "public/hero/hero.mp4"), "-frames:v", "1", str(png)])
        to_webp(png, ROOT / "public/hero/poster.webp")
    t = sharpest_time(args.video, (cw, ch, cx, cy), person, seconds)
    stills(args.video, (cw, ch, cx, cy), person, whiten, t, args.photo, args.name, args.role)

    for f in ["public/hero/hero.mp4", "public/hero/hero.webm", "public/hero/poster.webp", "public/portrait-bust.webp", "public/og.jpg"]:
        p = ROOT / f
        print(f"  {f}: {p.stat().st_size / 1024:.0f} kB")


if __name__ == "__main__":
    main()
