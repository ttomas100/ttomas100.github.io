import type { ReactNode } from "react";

/** Mono tag + bold heading whose last word is an Instrument Serif italic accent. */
export function SectionHeading({
  id,
  tag,
  title,
  accent,
  className = "",
  children,
}: {
  id: string;
  tag: string;
  title: string;
  accent: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <header className={className}>
      <p className="tag rv">{tag}</p>
      <h2 id={id} className="h-section">
        <span className="rv-mask">
          <span>
            {title} <span className="serif">{accent}</span>
          </span>
        </span>
      </h2>
      {children}
    </header>
  );
}
