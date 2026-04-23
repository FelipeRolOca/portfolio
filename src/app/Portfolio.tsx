import React, { Suspense, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { QuickFacts } from "./components/QuickFacts";
import { About } from "./components/About";
import { Footer } from "./components/Footer";
import { DotBackground } from "./components/ui/DotBackground";
import { CustomCursor } from "./components/ui/CustomCursor";

const Skills = React.lazy(() => import("./components/Skills").then(module => ({ default: module.Skills })));
const Experience = React.lazy(() => import("./components/Experience").then(module => ({ default: module.Experience })));
const Projects = React.lazy(() => import("./components/Projects").then(module => ({ default: module.Projects })));
const Contact = React.lazy(() => import("./components/Contact").then(module => ({ default: module.Contact })));

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
        <Suspense fallback={<div className="min-h-[50vh]" />}>
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
