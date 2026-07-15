'use client';

import { motion } from 'framer-motion';
import { projects, testimonials, services } from '@/lib/data';
import {
  FolderKanban, Star, MessageSquare, TrendingUp, Eye, Clock, CheckCircle, AlertCircle
} from 'lucide-react';

const stats = [
  {
    label: 'Total Projects',
    value: projects.length,
    change: '+2 this month',
    icon: FolderKanban,
    color: 'violet',
  },
  {
    label: 'Testimonials',
    value: testimonials.length,
    change: 'All 5-star',
    icon: Star,
    color: 'amber',
  },
  {
    label: 'Services Active',
    value: services.filter(s => s.enabled).length,
    change: `of ${services.length} total`,
    icon: CheckCircle,
    color: 'emerald',
  },
  {
    label: 'New Messages',
    value: 3,
    change: 'Unread',
    icon: MessageSquare,
    color: 'blue',
  },
];

const colorMap: Record<string, string> = {
  violet: 'from-violet-500/20 to-violet-600/5 border-violet-500/20 text-violet-400',
  amber: 'from-amber-500/20 to-amber-600/5 border-amber-500/20 text-amber-400',
  emerald: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20 text-emerald-400',
  blue: 'from-blue-500/20 to-blue-600/5 border-blue-500/20 text-blue-400',
};

const recentProjects = projects.slice(0, 4);

export default function AdminDashboard() {
  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="mb-8">
        <motion.h1
          className="text-2xl font-light text-white mb-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Good morning, <span className="text-violet-400">Tosif</span> 👋
        </motion.h1>
        <p className="text-sm text-white/30">Here's what's happening with your portfolio today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, change, icon: Icon, color }, i) => (
          <motion.div
            key={label}
            className={`rounded-xl border bg-gradient-to-br p-4 ${colorMap[color]}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <div className="flex items-start justify-between mb-3">
              <Icon size={18} />
              <span className="text-xs opacity-50">{change}</span>
            </div>
            <div className="text-3xl font-light text-white">{value}</div>
            <div className="text-xs opacity-60 mt-1">{label}</div>
          </motion.div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <motion.div
            className="rounded-xl border border-white/8 bg-white/3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/5">
              <h2 className="text-sm font-medium text-white">Recent Projects</h2>
              <a href="/admin/projects" className="text-xs text-violet-400 hover:text-violet-300">View all →</a>
            </div>
            <div className="divide-y divide-white/5">
              {recentProjects.map(p => (
                <div key={p.id} className="flex items-center gap-4 p-4 hover:bg-white/3 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-900/40 to-indigo-900/40 border border-white/8 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white font-medium truncate">{p.title}</div>
                    <div className="text-xs text-white/30">{p.category}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                      p.status === 'published'
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'bg-white/8 text-white/30'
                    }`}>
                      {p.status}
                    </span>
                    {p.featured && <Star size={12} className="text-amber-400" />}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div>
          <motion.div
            className="rounded-xl border border-white/8 bg-white/3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div className="p-4 border-b border-white/5">
              <h2 className="text-sm font-medium text-white">Quick Actions</h2>
            </div>
            <div className="p-4 space-y-2">
              {[
                { label: 'Add New Project', href: '/admin/projects', color: 'violet' },
                { label: 'View Messages', href: '/admin/messages', color: 'blue' },
                { label: 'Update Services', href: '/admin/services', color: 'emerald' },
                { label: 'Site Settings', href: '/admin/settings', color: 'amber' },
              ].map(({ label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center justify-between p-3 rounded-lg border border-white/8 hover:border-violet-500/30 hover:bg-violet-500/5 text-white/60 hover:text-white text-sm transition-all duration-200 group"
                >
                  {label}
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-violet-400" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Site Status */}
          <motion.div
            className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 font-medium">Site Live</span>
            </div>
            <p className="text-xs text-emerald-400/60">Your portfolio is live and performing well.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ChevronRight({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
