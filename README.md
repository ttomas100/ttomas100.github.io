# Tomas Utreras — Portfolio

A quiet, single-scroll portfolio: white, black and gray, one continuous surface.
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Lenis. No GSAP, no WebGL.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (type-check + lint)
npm run start      # serve the production build
```

First-load JS for `/` is ~134 kB. Fonts are self-hosted from `src/fonts`; nothing is loaded from a CDN at runtime.

## Content

All text lives in **`src/lib/data.ts`**. Components only read from it.

- Untagged entries come from `public/Tomas_Utreras_Resume.pdf`, including its embedded links.
- Entries tagged `// owner` were added by Tomas and are not in the PDF: Weather, Notes and video apps at Apple; App Store Connect; Google Play Console; PlayStation, Xbox and Amazon Appstore.
- Entries with `source: "repos"` are technologies found in Tomas's own project repositories.
- The headline title "Senior Engineering Program Manager" is Tomas's preference. The résumé PDF still says "Senior Technical Program Manager".
- The Woulib Work panel is written from the Woulib repositories' READMEs.

To update the site, edit `data.ts` and replace the PDF in `public/`.

## Sections

| # | Section | Component | Signature motion |
|---|---------|-----------|------------------|
| — | Navigation | `Navigation.tsx` | Frosted pill after scroll, sliding active indicator, top progress bar, clip-path mobile overlay |
| — | Hero | `hero/Hero.tsx` | Seamless looping intro (multiply-blended into the paper), ghost first name, ▶/❚❚ sound button with ping ring |
| 01 | About | `sections/About.tsx` | Lanyard ID card: damped pendulum + idle sway, 3D flip on hover, tap, Enter or Space |
| 02 | Skills | `sections/Skills.tsx` | Periodic table with diagonal-wave reveal, family filters, sticky inspector with real brand logos |
| 03 | Work | `sections/Work.tsx` | Expanding accordion; grayscale "Illustrative UI" mini-apps (`ui/MiniUI.tsx`) wipe in with clip-path |
| 04 | Continuing education | `sections/Certifications.tsx` | Ink-flood rows. The résumé lists no certifications, so this shows its non-degree programs |
| 05 | Path | `sections/Experience.tsx` | Scroll-drawn spine; each stop lights up as the spine reaches it |
| 06 | By the numbers | `sections/Achievements.tsx` | Pinned horizontal gallery, count-up numbers (easeOutQuart, 1.4 s), the card nearest the centre lifts |
| 07 | Contact + footer | `sections/Contact.tsx` | Letters hop on hover, copy-email chip (aria-live), spinning "say hello" badge |

Shared code:
- `ui/Css.tsx`: component CSS inside `@layer components`, so Tailwind utilities win.
- `ui/RevealObserver.tsx`: adds `.rv` / `.rv-mask` reveals.
- `ui/TechLogo.tsx`: the `BRAND` and `CONCEPT` maps, plus `isBrand()`.
- `lib/hooks.ts`: `useInView`, `useScrollProgress`, `prefersReducedMotion`.
- `lib/scroll.tsx`: Lenis and `scrollToTarget`.

`prefers-reduced-motion` turns off Lenis, autoplay and all decorative motion. The page stays fully usable.

## Rebuilding the hero video

Requires `ffmpeg` and `ffprobe` on `PATH` (macOS: `brew install ffmpeg`) and Python 3 with `numpy`.

```bash
python3 scripts/build-hero-assets.py path/to/intro.mp4
# options: --crop W:H:X:Y   --seconds 10   --photo me.jpg (for the ID-card portrait)
```

The script does the following:

1. **Detects the person** against the plain backdrop and crops a centred 4:5 frame, head to toe, scaled to 768 px wide.
2. **Whitens the backdrop** with `colorlevels`. The cut-off adapts to the measured backdrop, capped at 0.98, so the clip multiplies cleanly into the paper.
3. **Loops seamlessly.** It drops the first 0.5 s, then cross-fades the last 0.5 s into it, using `xfade` for picture and an equal-power, sample-accurate fade in numpy for sound. Nothing is retimed, so lips stay in sync.
4. **Exports** `public/hero/hero.mp4` (H.264 CRF 24 + AAC 96k, faststart), `hero.webm` (VP9 CRF 36 + Opus 80k) and `poster.webp`.
5. **Builds stills**: `public/portrait-bust.webp` (480×600, from the sharpest frame) and `public/og.jpg` (1200×630).

If your ffmpeg lacks `libwebp` or `drawtext`, the script falls back to `cwebp` and Pillow.

## Brand logos

`scripts/copy-logos.mjs` copies the logos into `public/logos/` with their licence files:

- **devicon** "original" SVGs: MIT, see `public/logos/LICENSE-devicon.txt`.
- **simple-icons** paths (filled with the official brand hex): CC0 1.0, see `public/logos/LICENSE-simple-icons.md`.
- Trademark notice: `public/logos/DISCLAIMER-simple-icons.md`. All logos are trademarks of their owners and are used only to name the technologies.
- OpenAI, Xbox and Amazon have no openly licensed logo in either set, so they appear as neutral monograms.
- Concepts such as RAG, MCP or Eval design use custom line icons in `ui/TechLogo.tsx`.

## Credits

- Fonts: Inter Tight, Instrument Serif and JetBrains Mono (SIL OFL 1.1), via Fontsource.
- Smooth scroll: [Lenis](https://github.com/darkroomengineering/lenis) (MIT).
