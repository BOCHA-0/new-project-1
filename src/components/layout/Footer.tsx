'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { siteSettings } from '@/lib/data';
import { TwitterIcon, LinkedinIcon, GithubIcon, DribbbleIcon } from '@/components/ui/SocialIcons';

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              T
            </div>
            <span className="text-white/40 text-sm">{siteSettings.name}</span>
          </div>

          <div className="flex gap-4 text-xs text-white/20">
            <span>© {new Date().getFullYear()} All rights reserved</span>
            <span className="text-white/10">·</span>
            <Link href="/admin" className="hover:text-white/50 transition-colors">Admin</Link>
          </div>

          <div className="flex gap-3">
            {[
              { icon: TwitterIcon, href: siteSettings.social_links.twitter },
              { icon: LinkedinIcon, href: siteSettings.social_links.linkedin },
              { icon: GithubIcon, href: siteSettings.social_links.github },
              { icon: DribbbleIcon, href: siteSettings.social_links.dribbble },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/8 flex items-center justify-center text-white/25 hover:text-white/60 hover:border-white/20 transition-all duration-300"
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
