'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  Settings,
  ChevronRight,
  Star,
  Layers,
  Palette,
  Menu,
  X,
  LogOut,
  User,
  ExternalLink,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/services', label: 'Services', icon: Layers },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#080808] flex">
      {/* Sidebar */}
      <motion.aside
        className="fixed left-0 top-0 bottom-0 z-40 flex flex-col border-r border-white/5 bg-[#0a0a0a]"
        animate={{ width: sidebarOpen ? 240 : 64 }}
        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            T
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span
                className="text-white text-sm font-medium whitespace-nowrap overflow-hidden"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                Admin Panel
              </motion.span>
            )}
          </AnimatePresence>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto w-6 h-6 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors flex-shrink-0"
          >
            {sidebarOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/admin' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
                  active
                    ? 'bg-violet-600/15 text-violet-400 border border-violet-500/20'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                )}
              >
                <Icon size={16} className="flex-shrink-0" />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      className="text-sm whitespace-nowrap overflow-hidden"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {active && sidebarOpen && (
                  <ChevronRight size={12} className="ml-auto text-violet-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/5 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-all duration-200"
          >
            <ExternalLink size={14} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-xs">View Site</span>}
          </Link>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200">
            <LogOut size={14} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-xs">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <motion.main
        className="flex-1 min-h-screen"
        animate={{ paddingLeft: sidebarOpen ? 240 : 64 }}
        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.main>
    </div>
  );
}
