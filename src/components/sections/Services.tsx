'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { services } from '@/lib/data';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';
import { AnimatedText } from '@/components/animations/AnimatedText';
import {
  Layers, Users, Cpu, Sparkles, Play, Grid2X2, PenLine, Monitor, BarChart2,
  Check, type LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Layers, Users, Cpu, Sparkles, Play, Grid: Grid2X2, Pen: PenLine, Monitor, BarChart: BarChart2,
};

export function Services() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const enabled = services.filter(s => s.enabled);

  return (
    <section id="services" className="relative py-32 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-violet-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.3em] text-violet-400 mb-4">What I Do</p>
          </FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <AnimatedText
              text="Services Built for Premium Outcomes"
              tag="h2"
              className="text-4xl sm:text-5xl font-extralight tracking-tighter text-white max-w-xl"
              stagger={0.04}
            />
            <FadeIn delay={0.3}>
              <p className="text-white/40 max-w-xs text-sm leading-relaxed">
                From concept to launch — every service is delivered with precision and purpose.
              </p>
            </FadeIn>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {enabled.map((service, i) => {
            const Icon = iconMap[service.icon] || Layers;
            const isHovered = hoveredId === service.id;

            return (
              <motion.div
                key={service.id}
                className="relative group rounded-2xl border border-white/8 bg-white/3 p-6 cursor-default overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.33, 1, 0.68, 1] }}
                onHoverStart={() => setHoveredId(service.id)}
                onHoverEnd={() => setHoveredId(null)}
                whileHover={{ scale: 1.01 }}
              >
                {/* Hover gradient */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{
                    background: isHovered
                      ? 'radial-gradient(circle at 50% 0%, rgba(139,92,246,0.1), transparent 60%)'
                      : 'transparent',
                    borderColor: isHovered ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.08)',
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="absolute inset-0 rounded-2xl border border-transparent"
                  animate={{
                    borderColor: isHovered ? 'rgba(139,92,246,0.25)' : 'transparent',
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Icon */}
                <motion.div
                  className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center mb-5 text-violet-400"
                  animate={{
                    borderColor: isHovered ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.08)',
                    backgroundColor: isHovered ? 'rgba(139,92,246,0.1)' : 'rgba(255,255,255,0.03)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon size={18} />
                </motion.div>

                <h3 className="text-base font-medium text-white mb-2">{service.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed mb-4">{service.description}</p>

                {/* Features */}
                <motion.ul
                  className="space-y-1.5 overflow-hidden"
                  animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {service.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-white/40">
                      <Check size={11} className="text-violet-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </motion.ul>

                {/* Order number */}
                <div className="absolute top-4 right-4 text-xs text-white/15 font-light">
                  {String(service.order).padStart(2, '0')}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
