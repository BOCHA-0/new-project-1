'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { testimonials as initial } from '@/lib/data';
import type { Testimonial } from '@/types';
import { Plus, Edit2, Trash2, Star } from 'lucide-react';

export default function TestimonialsAdmin() {
  const [items, setItems] = useState<Testimonial[]>(initial);

  const deleteItem = (id: string) => setItems(prev => prev.filter(t => t.id !== id));
  const toggleFeatured = (id: string) => setItems(prev => prev.map(t => t.id === id ? { ...t, featured: !t.featured } : t));

  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-light text-white">Testimonials</h1>
          <p className="text-sm text-white/30 mt-0.5">{items.length} total</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors">
          <Plus size={16} />
          Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
        {items.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="rounded-xl border border-white/8 bg-white/3 p-5 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{t.name}</div>
                  <div className="text-xs text-white/30">{t.role} · {t.company}</div>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => toggleFeatured(t.id)}>
                  <Star size={13} className={t.featured ? 'fill-amber-400 text-amber-400' : 'text-white/25 hover:text-amber-400'} />
                </button>
                <button className="p-1 text-white/25 hover:text-white transition-colors">
                  <Edit2 size={13} />
                </button>
                <button onClick={() => deleteItem(t.id)} className="p-1 text-white/25 hover:text-red-400 transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} size={11} className="fill-amber-400 text-amber-400" />
              ))}
            </div>

            <p className="text-xs text-white/50 leading-relaxed line-clamp-3">"{t.content}"</p>

            {t.featured && (
              <div className="mt-3 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-[10px] text-amber-400">Featured</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
