'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/lib/data';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';
import { AnimatedText } from '@/components/animations/AnimatedText';

const categories = ['All', 'UI/UX Design', 'Branding', 'Design Systems', 'Dashboard Design'];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-32 px-6">
      {/* Section glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-violet-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.3em] text-violet-400 mb-4">Selected Work</p>
          </FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <AnimatedText
              text="Projects That Define Excellence"
              tag="h2"
              className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-tighter text-white leading-tight max-w-xl"
              stagger={0.04}
            />
            <FadeIn delay={0.3}>
              <p className="text-white/40 max-w-xs text-sm leading-relaxed">
                Every project is a story of research, iteration, and intentional design decisions.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Filter */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-violet-600 text-white border-transparent'
                    : 'border border-white/10 text-white/40 hover:text-white hover:border-white/20 bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.33, 1, 0.68, 1] }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All */}
        <FadeIn delay={0.3} className="text-center mt-12">
          <button className="group px-8 py-3.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-violet-500/40 text-white/60 hover:text-white text-sm transition-all duration-300 backdrop-blur-sm">
            View All Projects
            <span className="ml-2 opacity-40 group-hover:opacity-100 group-hover:ml-3 transition-all">→</span>
          </button>
        </FadeIn>
      </div>
    </section>
  );
}
