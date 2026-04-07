import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { QuickFacts } from "./components/QuickFacts";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { DotBackground } from "./components/ui/DotBackground";
import { CustomCursor } from "./components/ui/CustomCursor";
import { useEffect } from "react";

export function Portfolio() {
  useEffect(() => {
    // Ensuring dark theme styles are applied globally to the body
    document.body.classList.add('bg-zinc-950', 'text-zinc-50');
    return () => {
      document.body.classList.remove('bg-zinc-950', 'text-zinc-50');
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 font-sans selection:bg-blue-500/30 selection:text-blue-200 relative overflow-x-hidden pb-32 md:pb-0">
      <DotBackground />
      <CustomCursor />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <QuickFacts />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
