/**
 * Single source of content for the site. Components only read from here.
 *
 * Provenance
 *   (no tag)      text taken from Tomas_Utreras_Resume.pdf (incl. its embedded links)
 *   // owner      added by Tomas directly (not in the résumé PDF)
 *   // repos      technology found in Tomas's own project repositories (Aila, Woulib)
 */

export type Source = "resume" | "owner" | "repos";

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export const PROFILE = {
  name: "Tomas Utreras",
  firstName: "Tomas",
  initials: "TU",
  role: "Senior Engineering Program Manager", // owner — preferred over the résumé headline "Senior Technical Program Manager"
  headline: "Launches & Cross-Functional Programs | AI / GenAI",
  email: "tutreras100@gmail.com",
  phone: "+1 786 403 4368",
  phoneHref: "tel:+17864034368",
  location: "Cupertino, CA",
  github: "https://github.com/ttomas100",
  githubHandle: "ttomas100",
  linkedin: "https://www.linkedin.com/in/tomas-utreras-lopez",
  linkedinHandle: "tomas-utreras-lopez",
  resume: "/Tomas_Utreras_Resume.pdf",
  // Résumé summary, verbatim except the opening title (owner preference).
  resumeSummary:
    "Senior Engineering Program Manager with 10+ years driving end-to-end product and platform launches at scale — including the global launches of HBO Max, Max, and Discovery+ to 100M+ users across CTV, web, iOS, and Android. Currently at Apple, coordinating launch trains for News and Stocks across research, engineering, product, infrastructure, and partner teams. Known for bringing structure to ambiguous, high-stakes programs: sequencing dependencies, navigating speed-vs-quality tradeoffs, and earning trust through deep engagement with the technical details. Hands-on with frontier AI — actively building applications on the Claude and OpenAI APIs (RAG, MCP, tool use, AI-assisted review pipelines), with a recent Cornell AI program completion. Deeply motivated by Anthropic's mission and the work of bringing capable, safe AI to users reliably.",
  languages: "English, Spanish (fully bilingual)",
  interests: "AI safety and responsible AI development; two-time Ironman finisher, training for Ironman 70.3.",
  currentRole: "Senior Engineering Program Manager, Apple Inc.",
  /** Paraphrase of the résumé's own wording ("Known for bringing structure…"). */
  quote: "Bring structure to ambiguous, high-stakes programs — and earn trust in the technical details.",
} as const;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;

/** Section tags, numbered in page order. */
export const SECTION_TAGS = {
  about: "01 — About",
  skills: "02 — Stack",
  work: "03 — Selected work",
  learning: "04 — Continuing education",
  experience: "05 — Path",
  achievements: "06 — By the numbers",
  contact: "07 — Contact",
} as const;

/* ------------------------------------------------------------------ */
/* Skills — periodic table                                             */
/* ------------------------------------------------------------------ */

export type Family = "Languages" | "Frontend & Mobile" | "Backend" | "Cloud & Infra" | "Release" | "AI / GenAI" | "Ship & Stores" | "Program";

export const FAMILIES: Family[] = [
  "Languages",
  "Frontend & Mobile",
  "Backend",
  "Cloud & Infra",
  "Release",
  "AI / GenAI",
  "Ship & Stores",
  "Program",
];

/** Where a skill shows up — names match PROJECTS titles / employers. */
export type UsedIn = "Aila" | "Apple" | "Warner Media" | "beIN Sports" | "Worldwide Cargo" | "Woulib";

export type Skill = {
  symbol: string;
  name: string;
  family: Family;
  /** key into TechLogo (brand logo or concept icon) */
  logo: string;
  usedIn: UsedIn[];
  source: Source;
};

export const SKILLS: Skill[] = [
  // Languages
  { symbol: "Py", name: "Python", family: "Languages", logo: "python", usedIn: [], source: "resume" },
  { symbol: "Js", name: "JavaScript", family: "Languages", logo: "javascript", usedIn: ["Aila"], source: "resume" },
  { symbol: "Ts", name: "TypeScript", family: "Languages", logo: "typescript", usedIn: ["Aila", "Woulib"], source: "resume" },
  { symbol: "Sw", name: "Swift", family: "Languages", logo: "swift", usedIn: ["Aila", "Woulib"], source: "resume" },
  { symbol: "Kt", name: "Kotlin", family: "Languages", logo: "kotlin", usedIn: ["Woulib"], source: "resume" },
  { symbol: "Sq", name: "SQL", family: "Languages", logo: "sql", usedIn: ["Aila"], source: "repos" },

  // Frontend & Mobile
  { symbol: "Re", name: "React", family: "Frontend & Mobile", logo: "react", usedIn: ["Aila"], source: "resume" },
  { symbol: "Rn", name: "React Native", family: "Frontend & Mobile", logo: "react", usedIn: ["Aila"], source: "resume" },
  { symbol: "Ex", name: "Expo", family: "Frontend & Mobile", logo: "expo", usedIn: ["Aila"], source: "repos" },
  { symbol: "Su", name: "SwiftUI", family: "Frontend & Mobile", logo: "swift", usedIn: ["Aila", "Woulib"], source: "repos" },
  { symbol: "Jc", name: "Jetpack Compose", family: "Frontend & Mobile", logo: "jetpackcompose", usedIn: ["Woulib"], source: "repos" },
  { symbol: "Mb", name: "Mapbox", family: "Frontend & Mobile", logo: "mapbox", usedIn: ["Aila"], source: "resume" },
  { symbol: "Gm", name: "Google Maps", family: "Frontend & Mobile", logo: "googlemaps", usedIn: ["Woulib"], source: "repos" },
  { symbol: "L10", name: "French & Kreyòl i18n", family: "Frontend & Mobile", logo: "i18n", usedIn: ["Woulib"], source: "repos" },

  // Backend
  { symbol: "No", name: "Node.js", family: "Backend", logo: "nodejs", usedIn: ["Aila"], source: "resume" },
  { symbol: "Ns", name: "NestJS", family: "Backend", logo: "nestjs", usedIn: ["Aila", "Woulib"], source: "repos" },
  { symbol: "Pg", name: "PostgreSQL", family: "Backend", logo: "postgresql", usedIn: ["Aila", "Woulib"], source: "repos" },
  { symbol: "Rd", name: "Redis", family: "Backend", logo: "redis", usedIn: ["Aila", "Woulib"], source: "repos" },
  { symbol: "Pr", name: "Prisma", family: "Backend", logo: "prisma", usedIn: ["Woulib"], source: "repos" },
  { symbol: "Gi", name: "PostGIS", family: "Backend", logo: "globe", usedIn: ["Woulib"], source: "repos" },
  { symbol: "Zd", name: "Zod", family: "Backend", logo: "zod", usedIn: ["Aila", "Woulib"], source: "repos" },
  { symbol: "Io", name: "Socket.IO", family: "Backend", logo: "socketio", usedIn: ["Aila", "Woulib"], source: "repos" },
  { symbol: "St", name: "Stripe Connect", family: "Backend", logo: "stripe", usedIn: ["Aila", "Woulib"], source: "resume" },
  { symbol: "A0", name: "Auth0 OAuth", family: "Backend", logo: "auth0", usedIn: ["Aila"], source: "resume" },
  { symbol: "Oa", name: "OpenAPI / REST", family: "Backend", logo: "openapi", usedIn: ["Aila"], source: "repos" },

  // Cloud & Infra
  { symbol: "Aw", name: "AWS", family: "Cloud & Infra", logo: "aws", usedIn: ["Aila", "beIN Sports"], source: "resume" },
  { symbol: "La", name: "AWS Lambda", family: "Cloud & Infra", logo: "lambda", usedIn: ["Aila"], source: "resume" },
  { symbol: "S3", name: "Amazon S3", family: "Cloud & Infra", logo: "bucket", usedIn: ["Aila"], source: "resume" },
  { symbol: "Rds", name: "Amazon RDS", family: "Cloud & Infra", logo: "database", usedIn: ["Aila"], source: "resume" },
  { symbol: "Rs", name: "Redshift", family: "Cloud & Infra", logo: "warehouse", usedIn: ["Aila"], source: "resume" },
  { symbol: "Az", name: "Azure", family: "Cloud & Infra", logo: "azure", usedIn: [], source: "resume" },
  { symbol: "Gc", name: "Google Cloud", family: "Cloud & Infra", logo: "googlecloud", usedIn: ["Woulib"], source: "resume" },
  { symbol: "K8", name: "Kubernetes", family: "Cloud & Infra", logo: "kubernetes", usedIn: ["beIN Sports"], source: "resume" },
  { symbol: "Dk", name: "Docker", family: "Cloud & Infra", logo: "docker", usedIn: ["Aila", "Woulib"], source: "resume" },
  { symbol: "Fb", name: "Firebase", family: "Cloud & Infra", logo: "firebase", usedIn: ["Woulib"], source: "repos" },
  { symbol: "Ms", name: "Microservices", family: "Cloud & Infra", logo: "microservices", usedIn: ["beIN Sports"], source: "resume" },

  // Release engineering
  { symbol: "Ci", name: "CI/CD", family: "Release", logo: "cicd", usedIn: ["Apple", "Warner Media"], source: "resume" },
  { symbol: "Jk", name: "Jenkins", family: "Release", logo: "jenkins", usedIn: [], source: "resume" },
  { symbol: "Gl", name: "GitLab CI/CD", family: "Release", logo: "gitlab", usedIn: [], source: "resume" },
  { symbol: "Ga", name: "GitHub Actions", family: "Release", logo: "githubactions", usedIn: ["Aila"], source: "repos" },
  { symbol: "Je", name: "Jest", family: "Release", logo: "jest", usedIn: ["Aila", "Woulib"], source: "repos" },
  { symbol: "Se", name: "Sentry", family: "Release", logo: "sentry", usedIn: ["Aila"], source: "repos" },
  { symbol: "Te", name: "Telemetry", family: "Release", logo: "telemetry", usedIn: ["Apple"], source: "resume" },
  { symbol: "Ir", name: "Incident Response", family: "Release", logo: "incident", usedIn: ["beIN Sports"], source: "resume" },

  // AI / GenAI
  { symbol: "Cl", name: "Claude API", family: "AI / GenAI", logo: "claude", usedIn: ["Aila"], source: "resume" },
  { symbol: "Oi", name: "OpenAI API", family: "AI / GenAI", logo: "openai", usedIn: ["Aila"], source: "resume" },
  { symbol: "Ge", name: "Gemini API", family: "AI / GenAI", logo: "gemini", usedIn: ["Aila"], source: "repos" },
  { symbol: "Mc", name: "MCP Servers", family: "AI / GenAI", logo: "mcp", usedIn: ["Aila"], source: "resume" },
  { symbol: "Rg", name: "RAG", family: "AI / GenAI", logo: "rag", usedIn: ["Aila"], source: "resume" },
  { symbol: "Tu", name: "Tool Use", family: "AI / GenAI", logo: "tooluse", usedIn: ["Aila"], source: "resume" },
  { symbol: "Ev", name: "Eval Design", family: "AI / GenAI", logo: "eval", usedIn: ["Aila", "Apple", "Warner Media"], source: "resume" },

  // Ship & Stores — owner
  { symbol: "As", name: "App Store Connect", family: "Ship & Stores", logo: "appstore", usedIn: ["Apple", "Warner Media", "beIN Sports"], source: "owner" },
  { symbol: "Xc", name: "Xcode", family: "Ship & Stores", logo: "xcode", usedIn: ["Aila", "Woulib"], source: "repos" },
  { symbol: "An", name: "Android Studio", family: "Ship & Stores", logo: "androidstudio", usedIn: ["Woulib"], source: "repos" },
  { symbol: "Gp", name: "Google Play Console", family: "Ship & Stores", logo: "googleplay", usedIn: ["Warner Media", "beIN Sports"], source: "owner" },
  { symbol: "Ps", name: "PlayStation", family: "Ship & Stores", logo: "playstation", usedIn: ["Warner Media"], source: "owner" },
  { symbol: "Xb", name: "Xbox", family: "Ship & Stores", logo: "xbox", usedIn: ["Warner Media"], source: "owner" },
  { symbol: "Am", name: "Amazon Appstore", family: "Ship & Stores", logo: "amazon", usedIn: ["Warner Media"], source: "owner" },
  { symbol: "Rk", name: "Roku", family: "Ship & Stores", logo: "roku", usedIn: ["Warner Media", "beIN Sports"], source: "resume" },
  { symbol: "Sm", name: "Samsung TV", family: "Ship & Stores", logo: "samsung", usedIn: ["Warner Media"], source: "resume" },
  { symbol: "Lg", name: "LG TV", family: "Ship & Stores", logo: "lg", usedIn: ["Warner Media"], source: "resume" },

  // Program
  { symbol: "Lp", name: "Launch Programs", family: "Program", logo: "launch", usedIn: ["Apple", "Warner Media", "beIN Sports"], source: "resume" },
  { symbol: "Ag", name: "Agile / Scrum", family: "Program", logo: "agile", usedIn: ["Worldwide Cargo"], source: "resume" },
  { symbol: "Cm", name: "Change Management", family: "Program", logo: "change", usedIn: ["Warner Media"], source: "resume" },
];

export const SKILL_GROUPS = FAMILIES.map((family) => ({
  family,
  skills: SKILLS.filter((s) => s.family === family),
}));

/* ------------------------------------------------------------------ */
/* Work — selected launches and projects                               */
/* ------------------------------------------------------------------ */

export type MiniUI = "train" | "matrix" | "traffic" | "marketplace" | "ride";

export type Project = {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  apps: string[];
  features: string[];
  tech: { name: string; logo: string }[];
  github?: string;
  ui: MiniUI;
  /** Faint watermark shown when the panel opens: a single-colour logo file in /public/brands, or a text wordmark. */
  mark: { label: string; src?: string; text?: string };
  /** Brand colour the panel takes on when open; `tone` is the text colour that stays readable on it. */
  theme: { bg: string; tone: "light" | "dark" };
};

export const PROJECTS: Project[] = [
  {
    id: "apple",
    index: "01",
    title: "Apple Apps",
    kicker: "Apple Inc. · 2024 — Present",
    description:
      "End-to-end launch program management for Apple apps — coordinating submission trains across engineering, product, infrastructure, and partner teams that ship to hundreds of millions of devices.",
    apps: ["News", "Stocks", "Weather", "Notes", "Video apps"], // News, Stocks: résumé · Weather, Notes, video apps: owner
    features: [
      "Submission trains across eng, product, infra & partners",
      "Launch risks surfaced via structured updates & decision logs",
      "Eval criteria & rollout plans for ML-powered features",
      "Launch playbooks, automation & telemetry",
    ],
    tech: [
      { name: "App Store Connect", logo: "appstore" }, // owner
      { name: "Xcode", logo: "xcode" },
      { name: "Telemetry", logo: "telemetry" },
      { name: "Eval design", logo: "eval" },
    ],
    ui: "train",
    mark: { label: "Apple", src: "/brands/apple.svg" },
    theme: { bg: "#1D1D1F", tone: "dark" }, // Apple near-black
  },
  {
    id: "max",
    index: "02",
    title: "HBO Max · Max · Discovery+",
    kicker: "Warner Media · 2021 — 2024",
    description:
      "Led end-to-end program management for the global launches of HBO Max, Max, and Discovery+ across the US, LATAM, and EU — delivering to 100M+ users on connected TV, web, iOS, and Android.",
    apps: ["HBO Max", "Max", "Discovery+"],
    features: [
      "Partner platforms: Roku, Samsung, LG, Sony, Xbox",
      "Change management for the Max app rebrand",
      "ML-powered personalization & content discovery",
      "Mobile CI/CD — deployment time cut by ~50%",
    ],
    tech: [
      { name: "App Store Connect", logo: "appstore" }, // owner
      { name: "Google Play Console", logo: "googleplay" }, // owner
      { name: "Roku", logo: "roku" },
      { name: "PlayStation", logo: "playstation" }, // owner (résumé: Sony)
      { name: "Xbox", logo: "xbox" },
      { name: "Amazon Appstore", logo: "amazon" }, // owner
    ],
    ui: "matrix",
    mark: { label: "Max", src: "/brands/hbomax.svg" },
    theme: { bg: "#002BE7", tone: "dark" }, // Max blue
  },
  {
    id: "bein",
    index: "03",
    title: "beIN Sports OTT",
    kicker: "beIN Sports Media Group · 2019 — 2021",
    description:
      "Led the launch of a new OTT platform for the US/Canada market across iOS, Android, and Roku TV — owning scope, schedule, technical tradeoffs, and cross-functional execution end-to-end.",
    apps: ["iOS", "Android", "Roku TV"],
    features: [
      "Critical infrastructure migrated to AWS",
      "Microservices on Kubernetes with auto-scaling",
      "Rolling updates & horizontal pod autoscaling",
      "Monitoring, incident response & on-call for live-sports spikes",
    ],
    tech: [
      { name: "AWS", logo: "aws" },
      { name: "Kubernetes", logo: "kubernetes" },
      { name: "Docker", logo: "docker" },
      { name: "Roku", logo: "roku" },
    ],
    ui: "traffic",
    // No openly licensed beIN Sports logo available: plain text wordmark instead.
    mark: { label: "beIN Sports", text: "beIN SPORTS" },
    theme: { bg: "#5B2A86", tone: "dark" }, // beIN purple (approximate)
  },
  {
    id: "aila",
    index: "04",
    title: "Aila",
    kicker: "Founder / Lead Engineer · active build",
    description:
      "An AI-enhanced marketplace platform built from 0-to-1: full-stack on React / React Native / Node.js, deployed on AWS, with Claude and OpenAI APIs for AI-assisted content review and approval.",
    apps: ["Marketplace", "Mobile", "API"],
    features: [
      "AI-assisted review, moderation & recommendations",
      "Eval criteria & review workflows on model outputs",
      "Auto-payments tied to performance metrics",
      "OAuth for Google / Apple / Facebook / X + map discovery",
    ],
    tech: [
      { name: "React Native", logo: "react" },
      { name: "Node.js", logo: "nodejs" },
      { name: "AWS", logo: "aws" },
      { name: "Stripe Connect", logo: "stripe" },
      { name: "Auth0", logo: "auth0" },
      { name: "Mapbox", logo: "mapbox" },
      { name: "Claude API", logo: "claude" },
      { name: "OpenAI API", logo: "openai" },
    ],
    ui: "marketplace",
    mark: { label: "Aila", src: "/brands/aila.svg" },
    theme: { bg: "#918DE2", tone: "light" }, // Aila Brand/Accent (periwinkle)
  },
  // repos — from the Woulib-API / Woulib-Mobile-iOS / Woulib-Mobile-Android READMEs
  {
    id: "woulib",
    index: "05",
    title: "Woulib",
    kicker: "Moto-taxi platform · pre-launch",
    description:
      "A closed-loop moto-taxi platform for Port-au-Prince, with cross-border ride credit transfers from US-based senders to family in Haiti. Native iOS and Android apps on a NestJS API, with the rider flow — onboarding → wallet → ride dispatch — built end to end.",
    apps: ["Rider app", "Driver app", "iOS", "Android", "API"],
    features: [
      "Rider flow: onboarding → wallet → ride dispatch",
      "Cross-border ride credit from the US to Haiti",
      "One OpenAPI contract → generated iOS & Android clients",
      "Fare & PIN logic mirrored in Swift and Kotlin, same tests",
      "Argon2id PINs, device-bound tokens, encrypted PII",
      "Every string reviewed in French and Kreyòl",
    ],
    tech: [
      { name: "SwiftUI", logo: "swift" },
      { name: "Jetpack Compose", logo: "jetpackcompose" },
      { name: "NestJS", logo: "nestjs" },
      { name: "PostgreSQL + PostGIS", logo: "postgresql" },
      { name: "Redis", logo: "redis" },
      { name: "Prisma", logo: "prisma" },
      { name: "Google Maps", logo: "googlemaps" },
      { name: "Firebase", logo: "firebase" },
    ],
    ui: "ride",
    mark: { label: "Woulib", src: "/brands/woulib.png" },
    theme: { bg: "#005B40", tone: "dark" }, // Woulib brandDeepGreen
  },
];

/* ------------------------------------------------------------------ */
/* Continuing education (the résumé lists no certifications)           */
/* ------------------------------------------------------------------ */

export const CERTIFICATIONS = [
  { title: "Artificial Intelligence Program", issuer: "Cornell University", year: "2025", detail: "Neural networks, deep learning, generative AI, eval design, and AI governance." },
  { title: "Cloud Computing", issuer: "The University of Texas at Austin", year: "2023" },
  { title: "Full Stack Web Development", issuer: "University of Miami", year: "2020 — 2021" },
];

/* ------------------------------------------------------------------ */
/* Path — education + experience                                       */
/* ------------------------------------------------------------------ */

export type Stop = {
  kind: "education" | "work";
  start: number;
  year: string;
  title: string;
  place: string;
  detail: string;
};

export const EDUCATION: Stop[] = [
  { kind: "education", start: 2007, year: "2007 — 2012", title: "B.B.A.", place: "Universidad de las Américas", detail: "Bachelor of Business Administration." },
  { kind: "education", start: 2014, year: "2014 — 2016", title: "Master's, Project Management", place: "Universidad de las Américas", detail: "Graduate degree in project management." },
  { kind: "education", start: 2018, year: "2018 — 2019", title: "M.S., Marketing", place: "Florida International University", detail: "Master of Science in Marketing." },
];

export const EXPERIENCE: Stop[] = [
  { kind: "work", start: 2016, year: "2016 — 2019", title: "Staff Technical Program Manager", place: "Worldwide Cargo Logistics", detail: "Led and mentored a team of TPMs delivering mobile applications; ran scrum teams through full delivery cycles." },
  { kind: "work", start: 2019, year: "2019 — 2021", title: "Lead Technical Program Manager", place: "beIN Sports Media Group", detail: "Launched a new OTT platform for US/Canada on iOS, Android, and Roku TV; migrated critical infrastructure to AWS." },
  { kind: "work", start: 2021, year: "2021 — 2024", title: "Senior Technical Program Manager", place: "Warner Media (HBO Max / Max / Discovery+)", detail: "Global launches across the US, LATAM, and EU to 100M+ users; Max rebrand change management; mobile CI/CD ~50% faster." },
  { kind: "work", start: 2024, year: "2024 — Present", title: "Senior Engineering Program Manager", place: "Apple Inc.", detail: "Launch program management for Apple News and Stocks submission trains, shipping to hundreds of millions of devices." },
];

export const PATH: Stop[] = [...EDUCATION, ...EXPERIENCE].sort((a, b) => a.start - b.start);

/* ------------------------------------------------------------------ */
/* Achievements — only numbers stated in the résumé                    */
/* ------------------------------------------------------------------ */

export type Achievement = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  caption: string;
  detail: string;
  icon: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  { value: 10, suffix: "+", label: "Years", caption: "Launching at scale", detail: "End-to-end product & platform launches", icon: "launch" },
  { value: 100, suffix: "M+", label: "Users", caption: "Reached at launch", detail: "HBO Max, Max & Discovery+", icon: "users" },
  { value: 3, label: "Regions", caption: "Global launches", detail: "US, LATAM & EU", icon: "globe" },
  { value: 50, prefix: "~", suffix: "%", label: "Faster deploys", caption: "Mobile CI/CD pipelines", detail: "Standardized across the full device matrix", icon: "cicd" },
  { value: 5, label: "Partner platforms", caption: "Connected-TV & console", detail: "Roku, Samsung, LG, Sony, Xbox", icon: "devices" },
  { value: 2, suffix: "×", label: "Ironman", caption: "Finisher", detail: "Training for Ironman 70.3", icon: "medal" },
];
