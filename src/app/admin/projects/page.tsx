'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects as initialProjects } from '@/lib/data';
import type { Project } from '@/types';
import {
  Plus, Search, Star, Edit2, Trash2, Copy, Archive,
  Eye, EyeOff, MoreVertical, Filter
} from 'lucide-react';

export default function ProjectsAdmin() {
  const [items, setItems] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'archived'>('all');
  const [selected, setSelected] = useState<string[]>([]);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = items.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || p.status === filter;
    return matchSearch && matchFilter;
  });

  const toggleSelect = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const deleteProject = (id: string) => {
    setItems(prev => prev.filter(p => p.id !== id));
    setOpenMenu(null);
  };

  const duplicateProject = (id: string) => {
    const project = items.find(p => p.id === id);
    if (!project) return;
    const newProject = {
      ...project,
      id: Date.now().toString(),
      title: `${project.title} (Copy)`,
      slug: `${project.slug}-copy`,
      status: 'draft' as const,
    };
    setItems(prev => [newProject, ...prev]);
    setOpenMenu(null);
  };

  const toggleFeatured = (id: string) => {
    setItems(prev => prev.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
  };

  const changeStatus = (id: string, status: Project['status']) => {
    setItems(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    setOpenMenu(null);
  };

  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-xl font-light text-white">Projects</h1>
          <p className="text-sm text-white/30 mt-0.5">{items.length} total · {items.filter(p => p.status === 'published').length} published</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors">
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex-1 min-w-48 relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/25 text-sm outline-none focus:border-violet-500/40"
          />
        </div>

        <div className="flex gap-1 p-1 rounded-lg border border-white/10 bg-white/5">
          {(['all', 'published', 'draft', 'archived'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-md text-xs capitalize transition-colors ${
                filter === f ? 'bg-violet-600 text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk actions */}
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            className="mb-4 flex items-center gap-3 px-4 py-2 rounded-lg border border-violet-500/30 bg-violet-500/10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <span className="text-xs text-violet-400">{selected.length} selected</span>
            <button
              onClick={() => { setItems(prev => prev.filter(p => !selected.includes(p.id))); setSelected([]); }}
              className="text-xs text-red-400 hover:text-red-300"
            >
              Delete
            </button>
            <button onClick={() => setSelected([])} className="text-xs text-white/30 hover:text-white ml-auto">
              Clear
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects Table */}
      <div className="rounded-xl border border-white/8 bg-white/3 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={e => setSelected(e.target.checked ? filtered.map(p => p.id) : [])}
                    checked={selected.length === filtered.length && filtered.length > 0}
                    className="accent-violet-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs text-white/30 uppercase tracking-widest font-normal">Project</th>
                <th className="px-4 py-3 text-left text-xs text-white/30 uppercase tracking-widest font-normal">Category</th>
                <th className="px-4 py-3 text-left text-xs text-white/30 uppercase tracking-widest font-normal">Status</th>
                <th className="px-4 py-3 text-left text-xs text-white/30 uppercase tracking-widest font-normal">Featured</th>
                <th className="px-4 py-3 text-left text-xs text-white/30 uppercase tracking-widest font-normal">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(project => (
                <tr key={project.id} className="hover:bg-white/3 transition-colors group">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(project.id)}
                      onChange={() => toggleSelect(project.id)}
                      className="accent-violet-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-900/50 to-indigo-900/50 border border-white/8 flex-shrink-0" />
                      <div>
                        <div className="text-sm text-white font-medium">{project.title}</div>
                        <div className="text-xs text-white/30">/{project.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-white/40">{project.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] capitalize ${
                      project.status === 'published' ? 'bg-emerald-500/15 text-emerald-400' :
                      project.status === 'draft' ? 'bg-white/8 text-white/30' :
                      'bg-orange-500/15 text-orange-400'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleFeatured(project.id)}>
                      <Star
                        size={14}
                        className={project.featured ? 'fill-amber-400 text-amber-400' : 'text-white/20 hover:text-amber-400'}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors" title="Edit">
                        <Edit2 size={13} />
                      </button>
                      <button
                        className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                        title="Duplicate"
                        onClick={() => duplicateProject(project.id)}
                      >
                        <Copy size={13} />
                      </button>
                      <button
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-colors"
                        title="Delete"
                        onClick={() => deleteProject(project.id)}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-white/20 text-sm">
              No projects found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
