'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ParticleField } from '@/components/animations/ParticleField';
import { AnimatedGrid } from '@/components/animations/AnimatedGrid';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { AnimatedChars } from '@/components/animations/AnimatedText';
import { siteSettings } from '@/lib/data';
import {
  ArrowDownRight,
  Calendar,
  Download,
} from 'lucide-react';
import {
  TwitterIcon,
  LinkedinIcon,
  GithubIcon,
  DribbbleIcon,
} from '@/components/ui/SocialIcons';

const socialIcons = [
  { icon: TwitterIcon, href: siteSettings.social_links.twitter, label: 'Twitter' },
  { icon: LinkedinIcon, href: siteSettings.social_links.linkedin, label: 'LinkedIn' },
  { icon: GithubIcon, href: siteSettings.social_links.github, label: 'GitHub' },
  { icon: DribbbleIcon, href: siteSettings.social_links.dribbble, label: 'Dribbble' },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const orb1X = useTransform(smoothX, [0, 1], ['-5%', '5%']);
  const orb1Y = useTransform(smoothY, [0, 1], ['-5%', '5%']);
  const orb2X = useTransform(smoothX, [0, 1], ['5%', '-5%']);
  const orb2Y = useTransform(smoothY, [0, 1], ['5%', '-5%']);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Background Layers */}
      <div className="absolute inset-0">
        {/* Particle Field */}
        <ParticleField className="absolute inset-0 w-full h-full opacity-60" />

        {/* Animated Grid */}
        <AnimatedGrid className="absolute inset-0 w-full h-full" />

        {/* Ambient Orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
            x: orb1X,
            y: orb1Y,
            top: '10%',
            left: '10%',
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
            x: orb2X,
            y: orb2Y,
            bottom: '10%',
            right: '10%',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,92,246,0.04) 0%, transparent 70%)',
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-[#050505]/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 text-center">
        {/* Availability Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-400 font-medium tracking-widest uppercase">
            Available for Projects
          </span>
        </motion.div>

        {/* Main Headline */}
        <div className="mb-6">
          <motion.h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[clamp(4rem,9vw,7rem)] font-extralight tracking-tighter text-white leading-[0.9] mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
              >
                Crafting
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block bg-gradient-to-r from-violet-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.55, ease: [0.33, 1, 0.68, 1] }}
              >
                Digital
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.7, ease: [0.33, 1, 0.68, 1] }}
              >
                Experiences
              </motion.span>
            </span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          className="max-w-xl mx-auto text-base sm:text-lg text-white/40 font-light leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          UI/UX & Graphic Designer specializing in premium digital products,
          brand identities, and motion-rich interfaces that convert and inspire.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
        >
          <MagneticButton>
            <button
              onClick={scrollToProjects}
              className="group relative px-7 py-3.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all duration-300 overflow-hidden"
              data-cursor-text="View"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <ArrowDownRight size={16} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </span>
            </button>
          </MagneticButton>

          <MagneticButton>
            <button
              onClick={scrollToContact}
              className="group px-7 py-3.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-violet-500/50 backdrop-blur-sm text-white text-sm font-medium transition-all duration-300 flex items-center gap-2"
              data-cursor-text="Book"
            >
              <Calendar size={15} />
              Book a Consultation
            </button>
          </MagneticButton>

          <MagneticButton>
            <a
              href="/resume.pdf"
              download
              className="group px-5 py-3.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white/60 hover:text-white text-sm transition-all duration-300 flex items-center gap-2"
            >
              <Download size={14} />
              Resume
            </a>
          </MagneticButton>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-3 gap-8 max-w-sm mx-auto mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2 }}
        >
          {[
            { value: '5+', label: 'Years' },
            { value: '50+', label: 'Projects' },
            { value: '30+', label: 'Clients' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-light text-white">{stat.value}</div>
              <div className="text-xs text-white/30 uppercase tracking-widest mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.3 }}
        >
          {socialIcons.map(({ icon: Icon, href, label }) => (
            <MagneticButton key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-violet-500/40 backdrop-blur-sm flex items-center justify-center text-white/40 hover:text-white transition-all duration-300"
              >
                <Icon size={14} />
              </a>
            </MagneticButton>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.5 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">Scroll</span>
        <div className="w-px h-8 relative overflow-hidden">
          <motion.div
            className="w-full bg-gradient-to-b from-violet-500 to-transparent"
            style={{ height: '100%' }}
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
