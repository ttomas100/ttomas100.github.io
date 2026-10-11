import type { ReactNode } from "react";

/**
 * Real brand logos live in /public/logos (devicon "original" SVGs, MIT, and
 * simple-icons paths, CC0 — see README). `tint` is the official brand colour,
 * used only for the soft glow behind the logo.
 */
export const BRAND: Record<string, { file: string; tint: string }> = {
  python: { file: "python", tint: "#3776AB" },
  javascript: { file: "javascript", tint: "#F7DF1E" },
  typescript: { file: "typescript", tint: "#3178C6" },
  swift: { file: "swift", tint: "#F05138" },
  kotlin: { file: "kotlin", tint: "#7F52FF" },
  react: { file: "react", tint: "#61DAFB" },
  expo: { file: "expo", tint: "#000020" },
  jetpackcompose: { file: "jetpackcompose", tint: "#4285F4" },
  mapbox: { file: "mapbox", tint: "#4264FB" },
  nodejs: { file: "nodejs", tint: "#5FA04E" },
  nestjs: { file: "nestjs", tint: "#E0234E" },
  postgresql: { file: "postgresql", tint: "#4169E1" },
  redis: { file: "redis", tint: "#FF4438" },
  socketio: { file: "socketio", tint: "#010101" },
  stripe: { file: "stripe", tint: "#635BFF" },
  auth0: { file: "auth0", tint: "#EB5424" },
  openapi: { file: "openapi", tint: "#6BA539" },
  aws: { file: "aws", tint: "#FF9900" },
  azure: { file: "azure", tint: "#0078D4" },
  googlecloud: { file: "googlecloud", tint: "#4285F4" },
  kubernetes: { file: "kubernetes", tint: "#326CE5" },
  docker: { file: "docker", tint: "#2496ED" },
  jenkins: { file: "jenkins", tint: "#D24939" },
  gitlab: { file: "gitlab", tint: "#FC6D26" },
  githubactions: { file: "githubactions", tint: "#2088FF" },
  sentry: { file: "sentry", tint: "#362D59" },
  claude: { file: "claude", tint: "#D97757" },
  gemini: { file: "gemini", tint: "#8E75B2" },
  appstore: { file: "appstore", tint: "#0D96F6" },
  xcode: { file: "xcode", tint: "#147EFB" },
  googleplay: { file: "googleplay", tint: "#34A853" },
  playstation: { file: "playstation", tint: "#0070D1" },
  roku: { file: "roku", tint: "#6F1AB1" },
  samsung: { file: "samsung", tint: "#1428A0" },
  lg: { file: "lg", tint: "#A50034" },
  prisma: { file: "prisma", tint: "#2D3748" },
  firebase: { file: "firebase", tint: "#FFCA28" },
  jest: { file: "jest", tint: "#C21325" },
  googlemaps: { file: "googlemaps", tint: "#4285F4" },
  zod: { file: "zod", tint: "#3E67B1" },
  androidstudio: { file: "androidstudio", tint: "#3DDC84" },
};

/** Brands with no openly licensed logo in devicon / simple-icons: shown as a neutral monogram. */
const MONOGRAM: Record<string, string> = {
  openai: "OAI",
  xbox: "XB",
  amazon: "AMZ",
};

const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Thin line icons for concepts (same visual weight as each other). */
export const CONCEPT: Record<string, ReactNode> = {
  sql: (<><ellipse {...p} cx="12" cy="6" rx="7" ry="2.6" /><path {...p} d="M5 6v12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6M5 12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6" /></>),
  database: (<><ellipse {...p} cx="12" cy="5.5" rx="6.5" ry="2.5" /><path {...p} d="M5.5 5.5v13c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-13M5.5 10c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5M5.5 14.5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5" /></>),
  lambda: (<><path {...p} d="M6 4h3.5l8.5 16M12.4 10.2 6.5 20" /><path {...p} d="M15 20h3.5" /></>),
  bucket: (<><path {...p} d="M4 6.5h16l-1.8 12.2a2 2 0 0 1-2 1.8H7.8a2 2 0 0 1-2-1.8z" /><ellipse {...p} cx="12" cy="6.5" rx="8" ry="2.5" /></>),
  warehouse: (<><path {...p} d="M3 10 12 4l9 6v10H3z" /><path {...p} d="M7 20v-6h10v6M7 17h10" /></>),
  microservices: (<><rect {...p} x="3" y="3" width="7" height="7" rx="2" /><rect {...p} x="14" y="3" width="7" height="7" rx="2" /><rect {...p} x="8.5" y="14" width="7" height="7" rx="2" /><path {...p} d="M10 6.5h4M6.5 10v2.5h5.5V14M17.5 10v2.5H12" /></>),
  cicd: (<><path {...p} d="M7.5 8.5a5 5 0 1 0 0 7c1.8-1.6 7.2-5.4 9-7a5 5 0 1 1 0 7c-1.8-1.6-7.2-5.4-9-7z" /></>),
  telemetry: (<><path {...p} d="M3 12h3.5l2.5-6 4 12 2.5-6H21" /></>),
  incident: (<><path {...p} d="M12 3.5 21 19H3z" /><path {...p} d="M12 10v4M12 16.6v.4" /></>),
  mcp: (<><circle {...p} cx="12" cy="12" r="2.5" /><circle {...p} cx="4.5" cy="6" r="1.8" /><circle {...p} cx="19.5" cy="6" r="1.8" /><circle {...p} cx="4.5" cy="18" r="1.8" /><circle {...p} cx="19.5" cy="18" r="1.8" /><path {...p} d="m6 7.2 4.1 3.3M18 7.2l-4.1 3.3M6 16.8l4.1-3.3M18 16.8l-4.1-3.3" /></>),
  rag: (<><path {...p} d="M5 4h9l5 5v11H5z" /><path {...p} d="M14 4v5h5" /><circle {...p} cx="11" cy="14" r="2.6" /><path {...p} d="m13 16 2.5 2.5" /></>),
  tooluse: (<><path {...p} d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5a4 4 0 0 0-2-2z" /><path {...p} d="M4 4l4 4M4 8l4-4" /></>),
  eval: (<><rect {...p} x="4" y="3.5" width="16" height="17" rx="2.5" /><path {...p} d="m8 9 1.6 1.6L12.5 7.7M8 15.5l1.6 1.6 2.9-2.9M14.5 9.5H17M14.5 16H17" /></>),
  launch: (<><path {...p} d="M12 3c3.5 2.2 5 5.8 4.4 10.5L14 16h-4l-2.4-2.5C7 8.8 8.5 5.2 12 3z" /><circle {...p} cx="12" cy="9" r="1.6" /><path {...p} d="M10 16l-1.5 4L12 18.5 15.5 20 14 16" /></>),
  agile: (<><path {...p} d="M20 12a8 8 0 1 1-2.3-5.6" /><path {...p} d="M20 4v4.5h-4.5" /><path {...p} d="M9 12l2 2 4-4" /></>),
  i18n: (<><path {...p} d="M4 5h9M8.5 3v2M6 5c.6 3 2.6 5.4 5.5 6.5M11 5c-.8 3.6-3.3 6.4-6.5 7.5" /><path {...p} d="m12 21 4-9 4 9M13.4 18h5.2" /></>),
  change: (<><path {...p} d="M4 8h13l-3.5-3.5M20 16H7l3.5 3.5" /></>),
  users: (<><circle {...p} cx="9" cy="8.5" r="3.2" /><path {...p} d="M3 19.5c.6-3.2 3-5 6-5s5.4 1.8 6 5" /><circle {...p} cx="17" cy="9.5" r="2.4" /><path {...p} d="M16.5 14.6c2.3.2 4 1.8 4.5 4.4" /></>),
  globe: (<><circle {...p} cx="12" cy="12" r="8.5" /><path {...p} d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.2 3.6 8.5S14.4 18.1 12 20.5C9.6 18.1 8.4 15.3 8.4 12S9.6 5.9 12 3.5z" /></>),
  devices: (<><rect {...p} x="2.5" y="4.5" width="14" height="10" rx="1.6" /><path {...p} d="M6.5 18.5h6M9.5 14.5v4" /><rect {...p} x="17.5" y="9" width="4" height="10" rx="1.2" /></>),
  medal: (<><circle {...p} cx="12" cy="15" r="5" /><path {...p} d="M8.5 10.5 6 3.5h4l2 4.5 2-4.5h4l-2.5 7" /><path {...p} d="m12 12.6.8 1.6 1.7.2-1.2 1.2.3 1.7-1.6-.8-1.6.8.3-1.7-1.2-1.2 1.7-.2z" /></>),
};

export function isBrand(key: string): boolean {
  return key in BRAND;
}

export function brandTint(key: string): string {
  return BRAND[key]?.tint ?? "#77756f";
}

/** Renders a brand logo, a neutral monogram, or a concept line icon. `size` in px. */
export function TechLogo({ name, label, size = 24, className = "" }: { name: string; label: string; size?: number; className?: string }) {
  const brand = BRAND[name];
  if (brand) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={`/logos/${brand.file}.svg`} alt={`${label} logo`} width={size} height={size} loading="lazy" decoding="async" className={className} style={{ width: size, height: size, objectFit: "contain" }} />
    );
  }
  const mono = MONOGRAM[name];
  if (mono) {
    return (
      <span
        role="img"
        aria-label={label}
        className={className}
        style={{
          width: size,
          height: size,
          display: "inline-grid",
          placeItems: "center",
          borderRadius: "50%",
          boxShadow: "inset 0 0 0 1.5px currentColor",
          fontFamily: "var(--font-mono)",
          fontWeight: 600,
          fontSize: Math.max(7, size * (mono.length > 2 ? 0.24 : 0.32)),
          letterSpacing: "0.02em",
        }}
      >
        {mono}
      </span>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} role="img" aria-label={label} className={className}>
      {CONCEPT[name] ?? CONCEPT.launch}
    </svg>
  );
}
