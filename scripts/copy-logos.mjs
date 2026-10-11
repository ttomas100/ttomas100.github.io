// Copies the brand logos used by the site into public/logos.
// devicon "original" SVGs (MIT) keep their own colours; simple-icons paths (CC0)
// get their official brand hex as fill. Run: node scripts/copy-logos.mjs
import fs from "node:fs";
import path from "node:path";
import * as si from "simple-icons";

const out = path.resolve("public/logos");
fs.mkdirSync(out, { recursive: true });
const dev = path.resolve("node_modules/devicon/icons");

const DEVICON = {
  python: "python", javascript: "javascript", typescript: "typescript", swift: "swift",
  kotlin: "kotlin", react: "react", nodejs: "nodejs", nestjs: "nestjs", postgresql: "postgresql",
  redis: "redis", prisma: "prisma", socketio: "socketio", jest: "jest", docker: "docker",
  kubernetes: "kubernetes", azure: "azure", googlecloud: "googlecloud", jenkins: "jenkins",
  gitlab: "gitlab", githubactions: "githubactions", sentry: "sentry", firebase: "firebase",
  xcode: "xcode", expo: "expo", jetpackcompose: "jetpackcompose", openapi: "openapi",
  android: "android", apple: "apple", androidstudio: "androidstudio",
};
for (const [key, name] of Object.entries(DEVICON)) {
  const dir = path.join(dev, name);
  const pick = ["original", "plain", "original-wordmark", "plain-wordmark"]
    .map((v) => path.join(dir, `${name}-${v}.svg`))
    .find((f) => fs.existsSync(f));
  if (!pick) { console.warn("missing devicon", name); continue; }
  fs.copyFileSync(pick, path.join(out, `${key}.svg`));
}
fs.copyFileSync(path.join(dev, "amazonwebservices/amazonwebservices-original-wordmark.svg"), path.join(out, "aws.svg"));

const SIMPLE = {
  claude: "siClaude", anthropic: "siAnthropic", gemini: "siGooglegemini", stripe: "siStripe",
  auth0: "siAuth0", mapbox: "siMapbox", appstore: "siAppstore", googleplay: "siGoogleplay",
  playstation: "siPlaystation", roku: "siRoku", samsung: "siSamsung", lg: "siLg",
  googlemaps: "siGooglemaps", zod: "siZod",
};
for (const [key, exp] of Object.entries(SIMPLE)) {
  const icon = si[exp];
  if (!icon) { console.warn("missing simple-icon", exp); continue; }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img"><title>${icon.title}</title><path fill="#${icon.hex}" d="${icon.path}"/></svg>`;
  fs.writeFileSync(path.join(out, `${key}.svg`), svg);
}
fs.copyFileSync("node_modules/devicon/LICENSE", path.join(out, "LICENSE-devicon.txt"));
fs.copyFileSync("node_modules/simple-icons/LICENSE.md", path.join(out, "LICENSE-simple-icons.md"));
fs.copyFileSync("node_modules/simple-icons/DISCLAIMER.md", path.join(out, "DISCLAIMER-simple-icons.md"));
console.log(fs.readdirSync(out).length, "files in public/logos");
