'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { services as initialServices } from '@/lib/data';
import type { Service } from '@/types';
import { Plus, Edit2, Trash2, GripVertical } from 'lucide-react';

export default function ServicesAdmin() {
  const [items, setItems] = useState<Service[]>(initialServices);

  const toggleEnabled = (id: string) => {
    setItems(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  const deleteService = (id: string) => {
    setItems(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-light text-white">Services</h1>
          <p className="text-sm text-white/30 mt-0.5">{items.filter(s => s.enabled).length} active · {items.length} total</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors">
          <Plus size={16} />
          Add Service
        </button>
      </div>

      <div className="space-y-3 max-w-3xl">
        {items.map((service, i) => (
          <motion.div
            key={service.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
              service.enabled
                ? 'border-white/8 bg-white/3'
                : 'border-white/5 bg-white/2 opacity-50'
            }`}
          >
            <div className="text-white/15 cursor-grab">
              <GripVertical size={16} />
            </div>

            <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-violet-400 text-xs font-bold flex-shrink-0">
              {String(service.order).padStart(2, '0')}
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white">{service.title}</div>
              <div className="text-xs text-white/30 truncate">{service.description}</div>
            </div>

            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={service.enabled}
                  onChange={() => toggleEnabled(service.id)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-white/10 peer-checked:bg-violet-600 rounded-full transition-colors peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
              </label>

              <button className="p-1.5 rounded-lg hover:bg-white/10 text-white/30 hover:text-white transition-colors">
                <Edit2 size={13} />
              </button>
              <button
                onClick={() => deleteService(service.id)}
                className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-colors"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
