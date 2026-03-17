import { motion } from "motion/react";
import { ArrowRight, Mail, Terminal } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  const profileImg = "/felipe.png";

  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/50 mb-6">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-zinc-300">Computer Engineering Student</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
              <span className="text-3xl md:text-4xl text-zinc-400 block mb-4">Hi, I'm Felipe.</span>
              Full Stack Developer <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Next.js, SQL & Automation
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              I build real-world systems that solve practical problems. From employee attendance tracking
              with GPS validation to process automation, I bring ideas to production.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button
                onClick={() => handleScroll("#projects")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-zinc-950 font-bold text-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 group"
              >
                View Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="mailto:felipeoca123@hotmail.com"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-bold text-lg hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Contact Me
              </a>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 flex justify-center lg:justify-end w-full max-w-md lg:max-w-none"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 blur-2xl opacity-40 animate-pulse" />
              <div className="absolute inset-2 rounded-full bg-zinc-900 overflow-hidden border border-zinc-700/50 z-10">
                <ImageWithFallback
                  src={profileImg}
                  alt="Felipe Roldan Ocampo"
                  className="w-full h-full object-cover object-top filter grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
