'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experience, skills } from '@/lib/data';
import { FadeIn } from '@/components/animations/FadeIn';
import { AnimatedText } from '@/components/animations/AnimatedText';
import { Award, Briefcase, Globe, Zap } from 'lucide-react';

const stats = [
  { value: '5+', label: 'Years of Experience', icon: Briefcase },
  { value: '50+', label: 'Projects Delivered', icon: Zap },
  { value: '30+', label: 'Global Clients', icon: Globe },
  { value: '3', label: 'Industry Awards', icon: Award },
];

const skillCategories = ['Design Tools', 'UX Skills', 'Design Skills', 'Motion', 'Prototyping', 'No-Code'];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="about" ref={containerRef} className="relative py-32 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-violet-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.3em] text-violet-400 mb-4">About Me</p>
          </FadeIn>
          <AnimatedText
            text="Design is more than aesthetics — it's architecture for human emotion."
            tag="h2"
            className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-tighter text-white max-w-3xl leading-tight"
            stagger={0.03}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Left — Bio */}
          <FadeIn direction="left">
            <div className="space-y-5">
              <p className="text-white/60 text-base leading-relaxed">
                I'm <strong className="text-white font-medium">Md Najmul Hasan Tosif</strong> — a UI/UX and Graphic Designer with 5+ years of experience creating premium digital experiences for startups, scale-ups, and Fortune 500 companies.
              </p>
              <p className="text-white/40 text-sm leading-relaxed">
                My work sits at the intersection of research, visual craft, and motion design. I believe every pixel should have a purpose, every interaction should feel effortless, and every design decision should serve the user and the business equally.
              </p>
              <p className="text-white/40 text-sm leading-relaxed">
                From zero-to-one product design to complex enterprise design systems, I bring the same level of obsessive care to every project.
              </p>

              {/* Philosophy tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['Research-led', 'Systems thinker', 'Motion-first', 'Pixel-perfect', 'Client-obsessed'].map(t => (
                  <span key={t} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-white/50">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right — Stats */}
          <FadeIn direction="right" delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ value, label, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/8 bg-white/3 p-5 group hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300"
                >
                  <Icon size={18} className="text-violet-400 mb-3" />
                  <div className="text-3xl font-extralight text-white mb-1">{value}</div>
                  <div className="text-xs text-white/30 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Skills */}
        <div className="mb-24">
          <FadeIn>
            <h3 className="text-lg font-light text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-violet-500" />
              Tools & Skills
            </h3>
          </FadeIn>

          <div className="space-y-8">
            {skillCategories.map((category) => {
              const categorySkills = skills.filter(s => s.category === category);
              if (categorySkills.length === 0) return null;
              return (
                <FadeIn key={category} delay={0.1}>
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-widest mb-4">{category}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {categorySkills.map(skill => (
                        <div key={skill.id}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm text-white/60">{skill.name}</span>
                            <span className="text-xs text-white/25">{skill.level}%</span>
                          </div>
                          <div className="h-px bg-white/8 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* Experience Timeline */}
        <div>
          <FadeIn>
            <h3 className="text-lg font-light text-white mb-12 flex items-center gap-3">
              <span className="w-8 h-px bg-violet-500" />
              Career Journey
            </h3>
          </FadeIn>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/8" />

            <div className="space-y-10 pl-12">
              {experience.map((exp, i) => (
                <FadeIn key={exp.id} delay={i * 0.1} direction="left">
                  <div className="relative">
                    {/* Timeline dot */}
                    <div className="absolute -left-[2.85rem] top-1 w-2 h-2 rounded-full bg-violet-500 ring-4 ring-[#050505]" />

                    <div className="rounded-2xl border border-white/8 bg-white/3 p-5 group hover:border-violet-500/20 transition-all duration-300">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                        <div>
                          <h4 className="text-base font-medium text-white">{exp.role}</h4>
                          <p className="text-sm text-violet-400">{exp.company}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-white/30">
                            {exp.start_date} — {exp.current ? 'Present' : exp.end_date}
                          </span>
                          {exp.current && (
                            <div className="flex items-center gap-1 justify-end mt-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span className="text-xs text-emerald-400">Current</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-white/40 leading-relaxed mb-3">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.achievements.map(a => (
                          <span key={a} className="text-xs text-white/30 border border-white/8 rounded-full px-2.5 py-1 bg-white/3">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
