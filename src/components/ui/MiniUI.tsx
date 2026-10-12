import type { MiniUI as Kind } from "@/lib/data";
import { Css } from "./Css";

/**
 * Grayscale, pure-CSS illustrations that hint at what each program does.
 * They are explicitly labelled "Illustrative UI" — not product screenshots.
 */
const css = `
.mui{position:relative;height:100%;border-radius:22px;background:var(--paper);box-shadow:var(--hair);padding:18px;display:flex;flex-direction:column;gap:12px;overflow:hidden;font-size:12px;color:var(--ink-2)}
.mui-top{display:flex;align-items:center;justify-content:space-between;font-family:var(--font-mono);font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--mute)}
.mui-dots{display:flex;gap:5px}.mui-dots i{width:8px;height:8px;border-radius:50%;background:#d6d3cd}
.mui-panel{background:#fff;border-radius:14px;box-shadow:var(--hair);padding:12px}
.mui-label{position:absolute;right:12px;bottom:12px;font-family:var(--font-mono);font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:var(--mute);background:rgba(255,255,255,.85);padding:4px 9px;border-radius:99px;box-shadow:var(--hair)}
/* train */
.mt-head,.mt-row{display:grid;grid-template-columns:72px repeat(4,minmax(0,1fr));align-items:center;gap:6px}
.mt-head{font-family:var(--font-mono);font-size:10px;color:var(--mute);text-transform:uppercase;letter-spacing:.05em;padding:0 2px 6px}
.mt-row{position:relative;padding:9px 2px;border-top:1px solid var(--line)}
.mt-row b{font-weight:600;color:var(--ink)}
.mt-cell{height:6px;border-radius:9px;background:#e4e1db;overflow:hidden}
.mt-cell span{display:block;height:100%;background:var(--ink);transform-origin:0 50%;transform:scaleX(0);animation:mt-fill 1s var(--ease) forwards;animation-delay:calc(var(--r) * 120ms + var(--c) * 260ms + 400ms)}
@keyframes mt-fill{to{transform:scaleX(1)}}
.mt-stat{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.mt-stat div{background:#fff;border-radius:12px;box-shadow:var(--hair);padding:10px}
.mt-stat small{display:block;font-family:var(--font-mono);font-size:9.5px;color:var(--mute);text-transform:uppercase;letter-spacing:.05em}
.mt-stat strong{font-size:15px;color:var(--ink)}
/* matrix */
.mm-grid{display:grid;grid-template-columns:70px repeat(3,minmax(0,1fr));gap:6px;align-items:center}
.mm-grid > span{font-family:var(--font-mono);font-size:10px;color:var(--mute);text-transform:uppercase;letter-spacing:.05em}
.mm-cell{height:30px;border-radius:9px;background:#fff;box-shadow:var(--hair);display:grid;place-items:center;color:#fff;position:relative;overflow:hidden}
.mm-cell::before{content:"";position:absolute;inset:0;background:var(--ink);transform:scaleY(0);transform-origin:50% 100%;animation:mm-on .6s var(--ease) forwards;animation-delay:calc(var(--k) * 90ms + 400ms)}
.mm-cell svg{position:relative;width:12px;height:12px;opacity:0;animation:mm-tick .3s ease forwards;animation-delay:calc(var(--k) * 90ms + 700ms)}
@keyframes mm-on{to{transform:scaleY(1)}}
@keyframes mm-tick{to{opacity:1}}
.mm-bar{height:8px;border-radius:9px;background:#e4e1db;overflow:hidden}
.mm-bar span{display:block;height:100%;width:100%;background:var(--ink);transform-origin:0 50%;transform:scaleX(.05);animation:mt-fill 2.4s .5s var(--ease) forwards}
/* traffic */
.mtr svg{width:100%;height:auto;display:block}
.mtr-line{fill:none;stroke:var(--ink);stroke-width:2;stroke-dasharray:600;stroke-dashoffset:600;animation:mtr-draw 2.2s .4s var(--ease) forwards}
@keyframes mtr-draw{to{stroke-dashoffset:0}}
.mtr-pods{display:flex;align-items:flex-end;gap:5px;height:64px}
.mtr-pods i{flex:1;border-radius:5px 5px 2px 2px;background:var(--ink);transform-origin:50% 100%;transform:scaleY(.15);animation:mtr-pod 1.2s var(--ease) forwards;animation-delay:calc(var(--k) * 80ms + 600ms);height:var(--h)}
@keyframes mtr-pod{to{transform:scaleY(1)}}
.mtr-row{display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:10px;color:var(--mute);text-transform:uppercase;letter-spacing:.05em}
/* marketplace */
.mk-map{position:relative;flex:1;min-height:150px;border-radius:14px;background-color:#fff;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:26px 26px;box-shadow:var(--hair);overflow:hidden}
.mk-map::after{content:"";position:absolute;left:-10%;top:58%;width:120%;height:14px;background:#ebe8e2;transform:rotate(-12deg)}
.mk-pin{position:absolute;z-index:1;width:22px;height:22px;border-radius:50% 50% 50% 0;background:var(--ink);transform:rotate(-45deg) scale(0);animation:mk-pin .6s var(--ease) forwards;animation-delay:calc(var(--k) * 140ms + 500ms)}
.mk-pin::after{content:"";position:absolute;inset:7px;border-radius:50%;background:#fff}
@keyframes mk-pin{to{transform:rotate(-45deg) scale(1)}}
.mk-card{display:grid;grid-template-columns:44px 1fr;gap:10px;align-items:center}
.mk-thumb{width:44px;height:44px;border-radius:10px;background:linear-gradient(135deg,#d9d6d0,#a9a6a0)}
.mk-lines i{display:block;height:7px;border-radius:9px;background:#e4e1db;margin:5px 0}
.mk-badges{display:flex;flex-wrap:wrap;gap:6px}
.mk-badge{display:inline-flex;align-items:center;gap:5px;height:24px;padding:0 9px;border-radius:99px;background:#fff;box-shadow:var(--hair);font-size:11px;font-weight:500;opacity:0;animation:mm-tick .5s ease forwards;animation-delay:calc(var(--k) * 200ms + 900ms)}
.mk-badge b{width:6px;height:6px;border-radius:50%;background:var(--ink)}
/* ride */
.mr-map{position:relative;flex:1;min-height:150px;border-radius:14px;background:#fff;box-shadow:var(--hair);overflow:hidden}
.mr-map svg{position:absolute;inset:0;width:100%;height:100%}
.mr-road{fill:none;stroke:#ebe8e2;stroke-width:10;stroke-linecap:round}
.mr-route{fill:none;stroke:var(--ink);stroke-width:2.2;stroke-dasharray:5 6;stroke-linecap:round;opacity:0;animation:mm-tick .6s .4s ease forwards}
.mr-moto{fill:var(--ink);stroke:rgba(13,13,13,.14);stroke-width:6;paint-order:stroke}
.mr-pin{position:absolute;font-family:var(--font-mono);font-size:9.5px;letter-spacing:.05em;text-transform:uppercase;background:#fff;box-shadow:var(--hair);border-radius:99px;padding:3px 8px;color:var(--ink-2)}
.mr-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.mr-steps span{display:flex;align-items:center;gap:6px;height:30px;padding:0 10px;border-radius:10px;background:#fff;box-shadow:var(--hair);font-size:11px;font-weight:500;opacity:0;animation:mm-tick .4s ease forwards;animation-delay:calc(var(--k) * 250ms + 700ms)}
.mr-steps b{width:6px;height:6px;border-radius:50%;background:var(--ink)}
.mr-flow{display:flex;align-items:center;justify-content:space-between;gap:6px;font-size:11.5px;font-weight:600;color:var(--ink)}
.mr-flow i{flex:1;height:1.5px;background:linear-gradient(90deg,var(--ink) 50%,transparent 50%);background-size:8px 1.5px}
.mr-flow small{display:block;font-family:var(--font-mono);font-size:9.5px;font-weight:400;color:var(--mute);text-transform:uppercase;letter-spacing:.05em}
`;

const Tick = () => (
  <svg viewBox="0 0 12 12" aria-hidden="true">
    <path d="m2.5 6.4 2.2 2.1 4.8-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Train({ apps }: { apps: string[] }) {
  const fill = [4, 4, 3, 3, 2];
  return (
    <>
      <div className="mui-panel">
        <div className="mt-head">
          <span>App</span>
          <span>Build</span>
          <span>QA</span>
          <span>Submit</span>
          <span>Live</span>
        </div>
        {apps.map((a, r) => (
          <div className="mt-row" key={a}>
            <b>{a}</b>
            {[0, 1, 2, 3].map((c) => (
              <div className="mt-cell" key={c}>
                {c < (fill[r] ?? 2) && <span style={{ ["--r" as string]: r, ["--c" as string]: c }} />}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-stat">
        <div>
          <small>Decision log</small>
          <strong>Updated</strong>
        </div>
        <div>
          <small>Risks</small>
          <strong>Surfaced</strong>
        </div>
        <div>
          <small>Telemetry</small>
          <strong>Green</strong>
        </div>
      </div>
    </>
  );
}

function Matrix() {
  const rows = ["CTV", "Web", "iOS", "Android", "Console"];
  const cols = ["US", "LATAM", "EU"];
  return (
    <>
      <div className="mui-panel">
        <div className="mm-grid">
          <span />
          {cols.map((c) => (
            <span key={c}>{c}</span>
          ))}
          {rows.map((r, ri) => (
            <Row key={r} label={r} ri={ri} cols={cols.length} />
          ))}
        </div>
      </div>
      <div className="mui-panel">
        <div className="mtr-row" style={{ marginBottom: 8 }}>
          <span>Global rollout</span>
          <span>100M+ users</span>
        </div>
        <div className="mm-bar">
          <span />
        </div>
      </div>
    </>
  );
}

function Row({ label, ri, cols }: { label: string; ri: number; cols: number }) {
  return (
    <>
      <span>{label}</span>
      {Array.from({ length: cols }, (_, ci) => (
        <div className="mm-cell" key={ci} style={{ ["--k" as string]: ri + ci * 2 }}>
          <Tick />
        </div>
      ))}
    </>
  );
}

function Traffic() {
  const pods = [18, 22, 26, 34, 48, 64, 80, 96, 100, 92, 70, 52];
  return (
    <>
      <div className="mui-panel mtr">
        <div className="mtr-row" style={{ marginBottom: 6 }}>
          <span>Live event traffic</span>
          <span>Kick-off</span>
        </div>
        <svg viewBox="0 0 300 110" aria-hidden="true">
          <path d="M0 96 C40 94 60 92 90 88 S130 80 150 52 S175 8 195 10 S230 40 250 58 S285 80 300 82" className="mtr-line" />
          <line x1="150" y1="0" x2="150" y2="110" stroke="rgba(13,13,13,.18)" strokeDasharray="3 4" />
        </svg>
      </div>
      <div className="mui-panel">
        <div className="mtr-row" style={{ marginBottom: 8 }}>
          <span>Pods · HPA</span>
          <span>Auto-scaling</span>
        </div>
        <div className="mtr-pods">
          {pods.map((h, k) => (
            <i key={k} style={{ ["--h" as string]: `${h}%`, ["--k" as string]: k }} />
          ))}
        </div>
      </div>
    </>
  );
}

function Marketplace() {
  const pins = [
    [18, 22],
    [62, 30],
    [40, 62],
    [78, 70],
  ];
  return (
    <>
      <div className="mk-map">
        {pins.map(([x, y], k) => (
          <span key={k} className="mk-pin" style={{ left: `${x}%`, top: `${y}%`, ["--k" as string]: k }} />
        ))}
      </div>
      <div className="mui-panel mk-card">
        <div className="mk-thumb" />
        <div className="mk-lines">
          <i style={{ width: "70%" }} />
          <i style={{ width: "45%" }} />
        </div>
      </div>
      <div className="mk-badges">
        {["AI review · approved", "Brand-fit", "Moderated", "Auto-payout"].map((b, k) => (
          <span key={b} className="mk-badge" style={{ ["--k" as string]: k }}>
            <b />
            {b}
          </span>
        ))}
      </div>
    </>
  );
}

function Ride() {
  return (
    <>
      <div className="mr-map">
        <svg viewBox="0 0 320 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path className="mr-road" d="M0 120 L320 20 M40 0 L120 160 M200 0 L260 160" />
          <path className="mr-route" d="M30 130 C 90 120, 110 60, 170 70 S 250 40, 290 30" />
          <circle className="mr-moto" r="7">
            <animateMotion dur="4.5s" begin="0.8s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.7;1" calcMode="linear" path="M30 130 C 90 120, 110 60, 170 70 S 250 40, 290 30" />
          </circle>
        </svg>
        <span className="mr-pin" style={{ left: "6%", bottom: "8%" }}>Pickup</span>
        <span className="mr-pin" style={{ right: "6%", top: "8%" }}>Drop-off</span>
      </div>
      <div className="mr-steps">
        {["Onboarding", "Wallet", "Dispatch"].map((s, k) => (
          <span key={s} style={{ ["--k" as string]: k }}>
            <b />
            {s}
          </span>
        ))}
      </div>
      <div className="mui-panel mr-flow">
        <span>
          <small>Sender</small>US
        </span>
        <i />
        <span>
          <small>Ride credit</small>Wallet
        </span>
        <i />
        <span>
          <small>Rider</small>Haiti
        </span>
      </div>
    </>
  );
}

const DESCRIBE: Record<Kind, string> = {
  train: "Illustration of a release-train board: each app moves through build, QA, submit and live stages.",
  matrix: "Illustration of a rollout matrix: devices by region (US, LATAM, EU) lighting up as the launch ships.",
  traffic: "Illustration of live-event traffic spiking while Kubernetes pods auto-scale to absorb it.",
  marketplace: "Illustration of a map-based marketplace with listings passing AI review, brand-fit and moderation checks.",
  ride: "Illustration of a moto-taxi ride moving from pickup to drop-off, the rider flow (onboarding, wallet, dispatch), and ride credit sent from a US sender to a rider in Haiti.",
};

const TITLE: Record<Kind, string> = {
  train: "App releases",
  matrix: "Device × region",
  traffic: "Ops health",
  marketplace: "Discovery",
  ride: "Rider flow",
};

export function MiniUI({ kind, apps }: { kind: Kind; apps: string[] }) {
  return (
    <div className="mui" role="img" aria-label={DESCRIBE[kind]}>
      <Css id="mini-ui">{css}</Css>
      <div className="mui-top" aria-hidden="true">
        <span className="mui-dots">
          <i />
          <i />
          <i />
        </span>
        <span>{TITLE[kind]}</span>
      </div>
      {kind === "train" && <Train apps={apps} />}
      {kind === "matrix" && <Matrix />}
      {kind === "traffic" && <Traffic />}
      {kind === "marketplace" && <Marketplace />}
      {kind === "ride" && <Ride />}
      <span className="mui-label">Illustrative UI</span>
    </div>
  );
}
