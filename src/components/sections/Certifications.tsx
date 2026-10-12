import { CERTIFICATIONS } from "@/lib/data";
import { Css } from "../ui/Css";
import { SectionHeading } from "../ui/SectionHeading";

const css = `
.ce{background:var(--card);border-block:1px solid var(--line)}
.ce-grid{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(28px,5vw,80px);align-items:start}
.ce-side{position:sticky;top:110px}
.ce-count{margin-top:22px;font-family:var(--font-mono);font-size:12.5px;color:var(--mute);letter-spacing:.03em}
.ce-list{list-style:none;margin:0;padding:0;border-top:1px solid var(--line)}
.ce-row{position:relative;display:grid;grid-template-columns:56px minmax(0,1fr) auto;gap:16px;align-items:center;padding:28px 18px;border-bottom:1px solid var(--line);isolation:isolate;outline:none;cursor:default;transition:color .5s var(--ease),opacity .9s var(--ease) calc(var(--i,0) * 80ms),transform 1.1s var(--ease) calc(var(--i,0) * 80ms)}
.ce-row::before{content:"";position:absolute;inset:0;z-index:-1;background:var(--flood,var(--ink));transform:scaleX(0);transform-origin:0 50%;transition:transform .7s var(--ease)}
.ce-row:hover::before,.ce-row:focus-visible::before{transform:scaleX(1)}
.ce-row:hover,.ce-row:focus-visible{color:#fff}
.ce-row:focus-visible{box-shadow:0 0 0 2px var(--ink),0 0 0 4px #fff}
.ce-n{font-family:var(--font-mono);font-size:12px;color:var(--mute);transition:color .5s}
.ce-row:hover .ce-n,.ce-row:focus-visible .ce-n,.ce-row:hover .ce-iss,.ce-row:focus-visible .ce-iss{color:rgba(255,255,255,.65)}
.ce-title{font-weight:700;letter-spacing:-.03em;font-size:clamp(20px,2.1vw,30px);line-height:1.1}
.ce-iss{margin-top:6px;font-size:14px;color:var(--mute);transition:color .5s}
.ce-detail{margin-top:6px;font-size:13px;opacity:.75}
.ce-right{display:flex;align-items:center;gap:14px;font-family:var(--font-mono);font-size:12px}
.ce-arrow{display:inline-block;font-size:18px;opacity:0;transform:translateX(-12px);transition:opacity .5s var(--ease),transform .6s var(--ease)}
.ce-row:hover .ce-arrow,.ce-row:focus-visible .ce-arrow{opacity:1;transform:none}
@media (max-width: 820px){
  .ce-grid{grid-template-columns:minmax(0,1fr)}
  .ce-side{position:relative;top:0}
  .ce-row{grid-template-columns:36px minmax(0,1fr);padding:22px 6px}
  .ce-right{grid-column:2}
}
`;

export default function Certifications() {
  const years = CERTIFICATIONS.map((c) => parseInt(c.year, 10));
  return (
    <section id="learning" className="section ce" aria-labelledby="learning-title">
      <Css id="ce">{css}</Css>
      <div className="wrap ce-grid">
        <div className="ce-side">
          <SectionHeading id="learning-title" tag="04 — Continuing education" title="Always" accent="learning." />
          <p className="ce-count rv">
            {CERTIFICATIONS.length} programs · {Math.min(...years)} — {Math.max(...years)}
          </p>
        </div>
        <ol className="ce-list">
          {CERTIFICATIONS.map((c, i) => (
            <li key={c.title} className="ce-row rv" tabIndex={0} style={{ ["--i" as string]: i, ["--flood" as string]: c.color }}>
              <span className="ce-n">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="ce-title">{c.title}</h3>
                <p className="ce-iss">{c.issuer}</p>
                {c.detail && <p className="ce-detail">{c.detail}</p>}
              </div>
              <span className="ce-right">
                {c.year}
                <span className="ce-arrow" aria-hidden="true">
                  ↗
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
