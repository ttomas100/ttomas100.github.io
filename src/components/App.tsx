import { SmoothScroll } from "@/lib/scroll";
import Navigation from "./Navigation";
import Hero from "./hero/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Work from "./sections/Work";
import Certifications from "./sections/Certifications";
import Experience from "./sections/Experience";
import Achievements from "./sections/Achievements";
import Contact from "./sections/Contact";
import { RevealObserver } from "./ui/RevealObserver";
import { Css } from "./ui/Css";

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SmoothScroll />
      <RevealObserver />
      <Navigation />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Work />
        <Certifications />
        <Experience />
        <Achievements />
        <Contact />
      </main>
      <Css id="app">{`
        .skip-link{position:fixed;left:16px;top:-60px;z-index:100;background:var(--ink);color:#fff;padding:10px 16px;border-radius:99px;font-weight:600;transition:top .3s var(--ease)}
        .skip-link:focus{top:16px}
      `}</Css>
    </>
  );
}
