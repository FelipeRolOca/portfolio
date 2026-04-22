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

export function Portfolio() {
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
