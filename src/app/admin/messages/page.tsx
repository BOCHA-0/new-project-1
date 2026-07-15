'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailOpen, Trash2, Archive, Reply, Search } from 'lucide-react';
import type { ContactMessage } from '@/types';

const mockMessages: ContactMessage[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@startup.io',
    subject: 'Brand Identity Project',
    message: 'Hi! We\'re launching a new fintech startup and need a complete brand identity. Our budget is $5,000–8,000. Are you available in August?',
    status: 'unread',
    created_at: '2026-07-14T10:30:00Z',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya@techco.com',
    subject: 'Dashboard Redesign',
    message: 'We have a complex SaaS dashboard that needs a full redesign. We\'ve been following your work and love the Pulse Analytics case study. Let\'s chat!',
    status: 'unread',
    created_at: '2026-07-13T14:20:00Z',
  },
  {
    id: '3',
    name: 'Marcus Lee',
    email: 'marcus@agency.co',
    subject: 'Design System Consultation',
    message: 'Looking for someone to audit and rebuild our design system in Figma. Timeline: 3 months. Would love to schedule a call.',
    status: 'read',
    created_at: '2026-07-12T09:15:00Z',
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma@brand.studio',
    subject: 'Collaboration Opportunity',
    message: 'We\'re a boutique agency looking for a senior UI/UX designer to collaborate with on client projects. Open to a revenue-share model.',
    status: 'replied',
    created_at: '2026-07-10T16:45:00Z',
  },
];

const statusColors = {
  unread: 'text-blue-400 bg-blue-500/15',
  read: 'text-white/30 bg-white/8',
  replied: 'text-emerald-400 bg-emerald-500/15',
  archived: 'text-white/20 bg-white/5',
};

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<ContactMessage[]>(mockMessages);
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [search, setSearch] = useState('');

  const filtered = messages.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.subject.toLowerCase().includes(search.toLowerCase())
  );

  const markRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'read' as const } : m));
  };

  const deleteMsg = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const archiveMsg = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'archived' as const } : m));
  };

  const unread = messages.filter(m => m.status === 'unread').length;

  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-light text-white">Messages</h1>
          <p className="text-sm text-white/30 mt-0.5">
            {unread} unread · {messages.length} total
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-[calc(100vh-12rem)]">
        {/* List */}
        <div className="lg:col-span-2 flex flex-col gap-2">
          <div className="relative mb-2">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search messages..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/25 text-sm outline-none focus:border-violet-500/40"
            />
          </div>

          <div className="space-y-1 overflow-y-auto flex-1">
            {filtered.map(msg => (
              <motion.div
                key={msg.id}
                onClick={() => { setSelected(msg); markRead(msg.id); }}
                className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                  selected?.id === msg.id
                    ? 'border-violet-500/40 bg-violet-500/10'
                    : 'border-white/8 bg-white/3 hover:border-white/15 hover:bg-white/5'
                }`}
                layout
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    {msg.status === 'unread' && <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-0.5" />}
                    <span className="text-sm text-white font-medium truncate">{msg.name}</span>
                  </div>
                  <span className="text-[10px] text-white/25 whitespace-nowrap">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-xs text-white/50 font-medium truncate mb-1">{msg.subject}</div>
                <div className="text-xs text-white/25 truncate">{msg.message}</div>
                <div className="mt-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] capitalize ${statusColors[msg.status]}`}>
                    {msg.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                className="h-full rounded-xl border border-white/8 bg-white/3 p-6 flex flex-col"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6 pb-4 border-b border-white/5">
                  <div>
                    <h3 className="text-base font-medium text-white">{selected.subject}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-white/50">{selected.name}</span>
                      <span className="text-white/20">·</span>
                      <a href={`mailto:${selected.email}`} className="text-sm text-violet-400 hover:text-violet-300">
                        {selected.email}
                      </a>
                    </div>
                    <div className="text-xs text-white/25 mt-0.5">
                      {new Date(selected.created_at).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => archiveMsg(selected.id)}
                      className="p-2 rounded-lg hover:bg-white/10 text-white/30 hover:text-white/60 transition-colors"
                      title="Archive"
                    >
                      <Archive size={14} />
                    </button>
                    <button
                      onClick={() => deleteMsg(selected.id)}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-white/60 leading-relaxed flex-1">{selected.message}</p>

                {/* Reply */}
                <div className="mt-6 pt-4 border-t border-white/5">
                  <textarea
                    placeholder="Write a reply..."
                    className="w-full h-24 px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/20 text-sm outline-none focus:border-violet-500/40 resize-none"
                  />
                  <div className="flex gap-2 mt-2">
                    <a
                      href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors"
                    >
                      <Reply size={13} />
                      Reply via Email
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="h-full rounded-xl border border-white/5 bg-white/2 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-center">
                  <Mail size={32} className="text-white/10 mx-auto mb-3" />
                  <p className="text-sm text-white/20">Select a message to view</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
