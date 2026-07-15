'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { projects } from '@/lib/data';
import { FadeIn } from '@/components/animations/FadeIn';
import { AnimatedText } from '@/components/animations/AnimatedText';
import { CustomCursor } from '@/components/cursor/CustomCursor';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { ArrowLeft, ExternalLink, Clock, User, Wrench } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ProjectPage({ params }: Props) {
  const { slug } = use(params);
  const project = projects.find(p => p.slug === slug);
  if (!project) notFound();

  const { case_study } = project;

  const sections = [
    { title: 'Overview', content: case_study.overview },
    { title: 'The Problem', content: case_study.problem },
    { title: 'Research & Discovery', content: case_study.research },
    { title: 'User Journey', content: case_study.user_journey },
    { title: 'Results', content: case_study.results },
  ];

  return (
    <>
      <CustomCursor />
      <ScrollProgress />

      <main className="min-h-screen bg-[#050505]">
        {/* Hero */}
        <div className="relative min-h-[60vh] flex flex-col justify-end px-6 pt-32 pb-16 overflow-hidden">
          {/* BG */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-indigo-900/10 to-[#050505]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            {/* Grid */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
              }}
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto w-full">
            <FadeIn>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors mb-10 group"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Back to Portfolio
              </Link>
            </FadeIn>

            <div className="flex flex-wrap gap-2 mb-5">
              <FadeIn>
                <span className="px-3 py-1 rounded-full border border-violet-500/40 bg-violet-500/10 text-violet-400 text-xs">
                  {project.category}
                </span>
              </FadeIn>
              {project.tags.map(tag => (
                <FadeIn key={tag} delay={0.05}>
                  <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/40 text-xs">
                    {tag}
                  </span>
                </FadeIn>
              ))}
            </div>

            <AnimatedText
              text={project.title}
              tag="h1"
              className="text-5xl sm:text-6xl md:text-7xl font-extralight tracking-tighter text-white mb-4"
              stagger={0.04}
            />

            <FadeIn delay={0.4}>
              <p className="text-xl text-white/50 font-light max-w-xl">{project.tagline}</p>
            </FadeIn>
          </div>
        </div>

        {/* Meta Info */}
        <div className="max-w-5xl mx-auto px-6 mb-16">
          <FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-white/8 bg-white/3 p-4 flex items-center gap-3">
                <Clock size={16} className="text-violet-400" />
                <div>
                  <div className="text-xs text-white/30">Duration</div>
                  <div className="text-sm text-white">{case_study.duration}</div>
                </div>
              </div>
              <div className="rounded-xl border border-white/8 bg-white/3 p-4 flex items-center gap-3">
                <User size={16} className="text-violet-400" />
                <div>
                  <div className="text-xs text-white/30">My Role</div>
                  <div className="text-sm text-white">{case_study.role}</div>
                </div>
              </div>
              <div className="rounded-xl border border-white/8 bg-white/3 p-4 flex items-center gap-3">
                <Wrench size={16} className="text-violet-400" />
                <div>
                  <div className="text-xs text-white/30">Tools</div>
                  <div className="text-sm text-white">{case_study.tools.join(', ')}</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Case Study Sections */}
        <div className="max-w-5xl mx-auto px-6 space-y-16 mb-24">
          {sections.map((section, i) => (
            <FadeIn key={section.title} delay={i * 0.05}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                  <p className="text-xs uppercase tracking-widest text-violet-400 sticky top-24">{section.title}</p>
                </div>
                <div className="md:col-span-3">
                  <p className="text-white/60 leading-relaxed text-base">{section.content}</p>
                </div>
              </div>
            </FadeIn>
          ))}

          {/* Design System */}
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                <p className="text-xs uppercase tracking-widest text-violet-400">Design System</p>
              </div>
              <div className="md:col-span-3 space-y-6">
                {/* Colors */}
                <div>
                  <h4 className="text-sm text-white/30 mb-3 uppercase tracking-widest">Colors</h4>
                  <div className="flex gap-3 flex-wrap">
                    {case_study.design_system.colors.map(c => (
                      <div key={c.name} className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-lg border border-white/10"
                          style={{ backgroundColor: c.hex }}
                        />
                        <div>
                          <div className="text-xs text-white/60">{c.name}</div>
                          <div className="text-xs text-white/25">{c.hex}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Typography */}
                <div>
                  <h4 className="text-sm text-white/30 mb-3 uppercase tracking-widest">Typography</h4>
                  <div className="flex gap-4 flex-wrap">
                    {case_study.design_system.typography.map(t => (
                      <div key={t.name} className="rounded-xl border border-white/8 bg-white/3 px-4 py-3">
                        <div className="text-lg font-light text-white">{t.name}</div>
                        <div className="text-xs text-white/30">{t.usage}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Components */}
                <div>
                  <h4 className="text-sm text-white/30 mb-3 uppercase tracking-widest">Components</h4>
                  <div className="flex gap-2 flex-wrap">
                    {case_study.design_system.components.map(c => (
                      <span key={c} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-white/50">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Visual Mockup Placeholder */}
        <div className="max-w-5xl mx-auto px-6 mb-24">
          <FadeIn>
            <div className="aspect-video rounded-2xl border border-white/8 bg-gradient-to-br from-violet-900/20 via-indigo-900/10 to-black/50 flex items-center justify-center relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <div className="text-center relative z-10">
                <div className="text-white/20 text-sm mb-2">Project Mockups</div>
                <div className="text-white/10 text-xs">High-fidelity designs &amp; prototypes</div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Navigation */}
        <div className="max-w-5xl mx-auto px-6 pb-24">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-12 border-t border-white/8">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Portfolio
            </Link>
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
              >
                View Live Project
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
