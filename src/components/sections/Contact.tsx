'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/components/animations/FadeIn';
import { AnimatedText } from '@/components/animations/AnimatedText';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { siteSettings } from '@/lib/data';
import {
  Mail,
  MessageSquare,
  ArrowUpRight,
  Send,
  Calendar,
  CheckCircle2,
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

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Simulate submission
    await new Promise(r => setTimeout(r, 1500));
    setStatus('success');
    setTimeout(() => {
      setStatus('idle');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const fields = [
    { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
    { key: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
    { key: 'subject', label: 'Subject', type: 'text', placeholder: 'What\'s this about?' },
  ];

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-violet-500/50 to-transparent" />

      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-violet-500/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.3em] text-violet-400 mb-4">Get in Touch</p>
          </FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <AnimatedText
              text="Let's Build Something Remarkable"
              tag="h2"
              className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-tighter text-white max-w-xl"
              stagger={0.04}
            />
            <FadeIn delay={0.3}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm text-emerald-400">Available for new projects</span>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Info Panel */}
          <FadeIn direction="left" className="lg:col-span-2">
            <div className="space-y-6 h-full">
              {/* Direct Contact */}
              <div className="rounded-2xl border border-white/8 bg-white/3 p-6">
                <h3 className="text-sm font-medium text-white mb-5">Direct Contact</h3>
                <div className="space-y-4">
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-violet-400 group-hover:border-violet-500/40 group-hover:bg-violet-500/10 transition-all duration-300">
                      <Mail size={15} />
                    </div>
                    <div>
                      <div className="text-xs text-white/30 mb-0.5">Email</div>
                      <div className="text-sm text-white/70 group-hover:text-white transition-colors">{siteSettings.email}</div>
                    </div>
                    <ArrowUpRight size={14} className="ml-auto text-white/20 group-hover:text-violet-400 transition-colors" />
                  </a>

                  <a
                    href="https://cal.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-violet-400 group-hover:border-violet-500/40 group-hover:bg-violet-500/10 transition-all duration-300">
                      <Calendar size={15} />
                    </div>
                    <div>
                      <div className="text-xs text-white/30 mb-0.5">Schedule a Call</div>
                      <div className="text-sm text-white/70 group-hover:text-white transition-colors">Book 30-min consultation</div>
                    </div>
                    <ArrowUpRight size={14} className="ml-auto text-white/20 group-hover:text-violet-400 transition-colors" />
                  </a>
                </div>
              </div>

              {/* Social */}
              <div className="rounded-2xl border border-white/8 bg-white/3 p-6">
                <h3 className="text-sm font-medium text-white mb-4">Follow My Work</h3>
                <div className="grid grid-cols-2 gap-2">
                  {socialIcons.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/8 bg-white/3 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300 group"
                    >
                      <Icon size={14} className="text-white/40 group-hover:text-violet-400 transition-colors" />
                      <span className="text-xs text-white/40 group-hover:text-white/70 transition-colors">{label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Response time */}
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 flex items-center gap-3">
                <MessageSquare size={16} className="text-emerald-400 flex-shrink-0" />
                <p className="text-xs text-emerald-400/80">
                  Typical response time: <strong className="text-emerald-400">within 24 hours</strong>
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Right — Form */}
          <FadeIn direction="right" delay={0.2} className="lg:col-span-3">
            <div className="rounded-2xl border border-white/8 bg-white/3 p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
              {/* Top glow */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center py-16 gap-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                    >
                      <CheckCircle2 size={48} className="text-emerald-400" />
                    </motion.div>
                    <h3 className="text-xl font-light text-white">Message Sent!</h3>
                    <p className="text-sm text-white/40 text-center max-w-xs">
                      Thank you for reaching out. I'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="text-sm font-medium text-white mb-6">Send a Message</h3>

                    {/* Grid fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {fields.slice(0, 2).map(({ key, label, type, placeholder }) => (
                        <div key={key} className="relative">
                          <motion.label
                            className="block text-xs text-white/30 mb-1.5 transition-colors duration-200"
                            animate={{ color: focused === key ? 'rgba(139,92,246,0.8)' : 'rgba(255,255,255,0.3)' }}
                          >
                            {label}
                          </motion.label>
                          <input
                            type={type}
                            value={formData[key as keyof typeof formData]}
                            onChange={e => setFormData(p => ({ ...p, [key]: e.target.value }))}
                            onFocus={() => setFocused(key)}
                            onBlur={() => setFocused(null)}
                            placeholder={placeholder}
                            required
                            className="w-full px-4 py-3 rounded-xl border bg-white/3 text-white placeholder:text-white/20 text-sm outline-none transition-all duration-300"
                            style={{
                              borderColor: focused === key ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.08)',
                              backgroundColor: focused === key ? 'rgba(139,92,246,0.05)' : 'rgba(255,255,255,0.03)',
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Subject */}
                    <div>
                      <motion.label
                        className="block text-xs mb-1.5"
                        animate={{ color: focused === 'subject' ? 'rgba(139,92,246,0.8)' : 'rgba(255,255,255,0.3)' }}
                      >
                        Subject
                      </motion.label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}
                        onFocus={() => setFocused('subject')}
                        onBlur={() => setFocused(null)}
                        placeholder="What's this about?"
                        required
                        className="w-full px-4 py-3 rounded-xl border bg-white/3 text-white placeholder:text-white/20 text-sm outline-none transition-all duration-300"
                        style={{
                          borderColor: focused === 'subject' ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.08)',
                          backgroundColor: focused === 'subject' ? 'rgba(139,92,246,0.05)' : 'rgba(255,255,255,0.03)',
                        }}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <motion.label
                        className="block text-xs mb-1.5"
                        animate={{ color: focused === 'message' ? 'rgba(139,92,246,0.8)' : 'rgba(255,255,255,0.3)' }}
                      >
                        Message
                      </motion.label>
                      <textarea
                        value={formData.message}
                        onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused(null)}
                        placeholder="Tell me about your project, timeline, and goals..."
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border bg-white/3 text-white placeholder:text-white/20 text-sm outline-none transition-all duration-300 resize-none"
                        style={{
                          borderColor: focused === 'message' ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.08)',
                          backgroundColor: focused === 'message' ? 'rgba(139,92,246,0.05)' : 'rgba(255,255,255,0.03)',
                        }}
                      />
                    </div>

                    {/* Submit */}
                    <MagneticButton>
                      <motion.button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 relative overflow-hidden group"
                        whileTap={{ scale: 0.98 }}
                        data-magnetic
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-[length:200%_100%]"
                          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        />
                        <span className="relative z-10 flex items-center gap-2">
                          {status === 'loading' ? (
                            <>
                              <motion.div
                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                              />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send size={14} />
                              Send Message
                            </>
                          )}
                        </span>
                      </motion.button>
                    </MagneticButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
