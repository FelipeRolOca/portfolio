import { motion } from "motion/react";
import { BookOpen, Lightbulb, Users } from "lucide-react";

export function About() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-24 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Text Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <h2 className="text-sm font-semibold text-blue-500 uppercase tracking-wider mb-2">About Me</h2>
              <p className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Student, Developer & <br /> Problem Solver
              </p>
            </motion.div>

            <motion.p variants={itemVariants} className="text-zinc-400 text-lg leading-relaxed">
              I am 20 years old, a Computer Engineering student with experience in data management
              and web development. I work with Java, SQL, JavaScript and web tools. I'm seeking
              a trainee or junior role in IT to grow professionally.
            </motion.p>

            <motion.p variants={itemVariants} className="text-zinc-400 text-lg leading-relaxed">
              Beyond the classroom, I'm constantly learning and applying my skills to build
              full-stack applications. My focus is always on creating efficient, maintainable,
              and practical systems that solve real business problems.
            </motion.p>
          </div>

          {/* Value Props Cards */}
          <motion.div variants={containerVariants} className="grid sm:grid-cols-2 gap-6">
            <motion.div variants={itemVariants} data-particle-target className="bg-zinc-900/50 backdrop-blur border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-colors">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 border border-blue-500/20">
                <BookOpen className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Continuous Learning</h3>
              <p className="text-zinc-400 text-sm">Always exploring new frameworks, databases, and architectural patterns to expand my technical stack.</p>
            </motion.div>

            <motion.div variants={itemVariants} data-particle-target className="bg-zinc-900/50 backdrop-blur border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-colors sm:mt-8">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4 border border-cyan-500/20">
                <Lightbulb className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Practical Focus</h3>
              <p className="text-zinc-400 text-sm">Building tools that automate tasks, track data, and validate real-world inputs.</p>
            </motion.div>

            <motion.div variants={itemVariants} data-particle-target className="bg-zinc-900/50 backdrop-blur border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-colors sm:col-span-2">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 border border-emerald-500/20">
                <Users className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Collaborative Spirit</h3>
              <p className="text-zinc-400 text-sm">Experience working in teams, freelance environments, and administrative roles where clear communication is key to delivering successful technical projects.</p>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
