'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import type { Project } from '@/types';
import { ArrowUpRight } from 'lucide-react';

const categoryColors: Record<string, string> = {
  'UI/UX Design': 'from-violet-500/20 to-indigo-500/10',
  'Branding': 'from-rose-500/20 to-orange-500/10',
  'Design Systems': 'from-cyan-500/20 to-blue-500/10',
  'Dashboard Design': 'from-emerald-500/20 to-teal-500/10',
};

const placeholderGradients = [
  'from-violet-900/40 via-indigo-900/30 to-purple-900/40',
  'from-rose-900/40 via-pink-900/30 to-rose-900/40',
  'from-cyan-900/40 via-teal-900/30 to-blue-900/40',
  'from-emerald-900/40 via-green-900/30 to-teal-900/40',
];

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 30 });

  const rotateX = useTransform(smoothY, [0, 1], [5, -5]);
  const rotateY = useTransform(smoothX, [0, 1], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setHovered(false);
  };

  const gradient = categoryColors[project.category] || 'from-violet-500/20 to-indigo-500/10';
  const bgGradient = placeholderGradients[index % placeholderGradients.length];

  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        ref={cardRef}
        className="group relative rounded-2xl border border-white/8 bg-white/3 overflow-hidden cursor-pointer h-[380px] sm:h-[440px]"
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHovered(true)}
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {/* Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient}`} />

        {/* Animated glow border */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: hovered
              ? '0 0 40px rgba(139,92,246,0.15) inset, 0 0 0 1px rgba(139,92,246,0.2)'
              : '0 0 0 rgba(139,92,246,0)',
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Mouse-following gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [smoothX, smoothY],
              ([x, y]) =>
                `radial-gradient(400px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(139,92,246,0.12), transparent 60%)`
            ),
          }}
        />

        {/* Large placeholder art */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Abstract design mockup */}
            <motion.div
              className="w-48 h-32 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col gap-2 p-3"
              animate={{ y: hovered ? -8 : 0, rotateZ: hovered ? -1 : 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-violet-400/60" />
                <div className="h-1.5 flex-1 rounded bg-white/10" />
              </div>
              <div className="grid grid-cols-2 gap-1.5 flex-1">
                <div className="rounded-lg bg-white/10" />
                <div className="rounded-lg bg-violet-500/30" />
                <div className="rounded-lg bg-white/5" />
                <div className="rounded-lg bg-indigo-500/30" />
              </div>
              <div className="h-1 rounded bg-white/10 w-3/4" />
            </motion.div>

            <motion.div
              className="absolute -right-8 -bottom-6 w-32 h-24 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col gap-1.5 p-2.5"
              animate={{ y: hovered ? -4 : 0, rotateZ: hovered ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: 'easeOut' }}
            >
              <div className="h-1.5 w-2/3 rounded bg-white/20" />
              <div className="flex-1 rounded-lg bg-gradient-to-br from-violet-500/20 to-indigo-500/20" />
              <div className="h-1 w-1/2 rounded bg-white/10" />
            </motion.div>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-white/8 border border-white/10 text-[10px] text-white/50 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-violet-400 mb-1 uppercase tracking-widest">{project.category}</p>
              <h3 className="text-xl font-light text-white tracking-tight">{project.title}</h3>
              <p className="text-xs text-white/40 mt-1 leading-relaxed max-w-xs">{project.tagline}</p>
            </div>

            <motion.div
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 group-hover:border-violet-500/60 group-hover:text-white group-hover:bg-violet-600/20 transition-all duration-300"
              animate={{ x: hovered ? 0 : 5, opacity: hovered ? 1 : 0 }}
            >
              <ArrowUpRight size={16} />
            </motion.div>
          </div>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-violet-600/30 border border-violet-500/40 text-violet-300 backdrop-blur-sm uppercase tracking-widest">
              Featured
            </span>
          </div>
        )}
      </motion.div>
    </Link>
  );
}
