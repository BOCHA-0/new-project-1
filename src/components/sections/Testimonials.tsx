'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useAnimationFrame } from 'framer-motion';
import { testimonials } from '@/lib/data';
import { FadeIn } from '@/components/animations/FadeIn';
import { AnimatedText } from '@/components/animations/AnimatedText';
import { Star, Quote } from 'lucide-react';

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-scroll
  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPaused]);

  return (
    <section id="testimonials" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-violet-500/50 to-transparent" />

      {/* BG glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-violet-500/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.3em] text-violet-400 mb-4">Testimonials</p>
          </FadeIn>
          <AnimatedText
            text="What Clients Say"
            tag="h2"
            className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-tighter text-white"
            stagger={0.05}
          />
        </div>

        {/* Featured Testimonial */}
        <div
          className="relative mb-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="relative rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-8 sm:p-12 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            >
              {/* Quote icon */}
              <Quote className="absolute top-8 right-8 w-12 h-12 text-violet-500/15" />

              {/* Glow */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-violet-400 text-violet-400" />
                ))}
              </div>

              <p className="text-xl sm:text-2xl font-light text-white/80 leading-relaxed mb-8 max-w-4xl">
                "{testimonials[activeIndex].content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                  {testimonials[activeIndex].name[0]}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{testimonials[activeIndex].name}</div>
                  <div className="text-xs text-white/40">{testimonials[activeIndex].role} at {testimonials[activeIndex].company}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'w-6 h-1.5 bg-violet-500' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scrolling Cards Row */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-4"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ width: 'max-content' }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={`${t.id}-${i}`}
                className="w-72 flex-shrink-0 rounded-xl border border-white/8 bg-white/3 p-5 backdrop-blur-sm"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={11} className="fill-violet-400 text-violet-400" />
                  ))}
                </div>
                <p className="text-xs text-white/50 leading-relaxed mb-4 line-clamp-3">"{t.content}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-medium flex-shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white/70">{t.name}</div>
                    <div className="text-[10px] text-white/30">{t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
