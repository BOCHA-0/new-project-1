'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { siteSettings } from '@/lib/data';
import { Save, Upload, Globe, Mail, MapPin, Link, Palette } from 'lucide-react';

const tabs = ['General', 'SEO', 'Social Links', 'Branding', 'Sections'];

export default function SettingsAdmin() {
  const [activeTab, setActiveTab] = useState('General');
  const [settings, setSettings] = useState(siteSettings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const Field = ({
    label,
    value,
    onChange,
    type = 'text',
    placeholder,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    type?: string;
    placeholder?: string;
  }) => (
    <div>
      <label className="block text-xs text-white/40 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/20 text-sm outline-none focus:border-violet-500/40 focus:bg-violet-500/5 transition-all"
      />
    </div>
  );

  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-light text-white">Settings</h1>
          <p className="text-sm text-white/30 mt-0.5">Manage your portfolio configuration</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            saved
              ? 'bg-emerald-600 text-white'
              : 'bg-violet-600 hover:bg-violet-500 text-white'
          }`}
        >
          <Save size={14} />
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl border border-white/8 bg-white/3 w-fit mb-8">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
              activeTab === tab
                ? 'bg-violet-600 text-white'
                : 'text-white/40 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* General */}
      {activeTab === 'General' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl"
        >
          <Field
            label="Your Name"
            value={settings.name}
            onChange={v => setSettings(p => ({ ...p, name: v }))}
            placeholder="Your full name"
          />
          <Field
            label="Professional Title"
            value={settings.title}
            onChange={v => setSettings(p => ({ ...p, title: v }))}
            placeholder="UI/UX Designer"
          />
          <div className="md:col-span-2">
            <Field
              label="Tagline"
              value={settings.tagline}
              onChange={v => setSettings(p => ({ ...p, tagline: v }))}
              placeholder="Your hero tagline"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs text-white/40 mb-1.5">Bio / Description</label>
            <textarea
              value={settings.description}
              onChange={e => setSettings(p => ({ ...p, description: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/20 text-sm outline-none focus:border-violet-500/40 resize-none transition-all"
            />
          </div>
          <Field
            label="Email"
            type="email"
            value={settings.email}
            onChange={v => setSettings(p => ({ ...p, email: v }))}
            placeholder="you@domain.com"
          />
          <Field
            label="Location"
            value={settings.location}
            onChange={v => setSettings(p => ({ ...p, location: v }))}
            placeholder="City, Country"
          />
          <div className="md:col-span-2">
            <label className="block text-xs text-white/40 mb-1.5">Availability Status</label>
            <select
              value={settings.availability}
              onChange={e => setSettings(p => ({ ...p, availability: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-[#0a0a0a] text-white text-sm outline-none focus:border-violet-500/40"
            >
              <option value="Open to Projects">Open to Projects</option>
              <option value="Fully Booked">Fully Booked</option>
              <option value="Available Part-time">Available Part-time</option>
            </select>
          </div>
        </motion.div>
      )}

      {/* SEO */}
      {activeTab === 'SEO' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-5 max-w-2xl"
        >
          <Field
            label="SEO Title"
            value={settings.seo.title}
            onChange={v => setSettings(p => ({ ...p, seo: { ...p.seo, title: v } }))}
            placeholder="Page title for search engines"
          />
          <div>
            <label className="block text-xs text-white/40 mb-1.5">Meta Description</label>
            <textarea
              value={settings.seo.description}
              onChange={e => setSettings(p => ({ ...p, seo: { ...p.seo, description: e.target.value } }))}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white text-sm outline-none focus:border-violet-500/40 resize-none"
            />
            <p className="text-xs text-white/20 mt-1">{settings.seo.description.length}/160 characters</p>
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5">Keywords (comma separated)</label>
            <input
              type="text"
              value={settings.seo.keywords.join(', ')}
              onChange={e => setSettings(p => ({
                ...p,
                seo: { ...p.seo, keywords: e.target.value.split(',').map(k => k.trim()) }
              }))}
              className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white text-sm outline-none focus:border-violet-500/40"
            />
          </div>
          <div>
            <label className="block text-xs text-white/40 mb-1.5">OG Image URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={settings.seo.og_image || ''}
                onChange={e => setSettings(p => ({ ...p, seo: { ...p.seo, og_image: e.target.value } }))}
                placeholder="https://..."
                className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white text-sm outline-none focus:border-violet-500/40"
              />
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white/50 hover:text-white text-sm transition-colors">
                <Upload size={14} />
                Upload
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Social Links */}
      {activeTab === 'Social Links' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-4 max-w-2xl"
        >
          {Object.entries(settings.social_links).map(([key, value]) => (
            <Field
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              value={value || ''}
              onChange={v => setSettings(p => ({ ...p, social_links: { ...p.social_links, [key]: v } }))}
              placeholder={`https://${key}.com/username`}
            />
          ))}
        </motion.div>
      )}

      {/* Branding */}
      {activeTab === 'Branding' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 max-w-2xl"
        >
          <div className="rounded-xl border border-white/8 bg-white/3 p-5">
            <h3 className="text-sm font-medium text-white mb-4">Logo</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white/20 text-2xl font-bold">
                T
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white/50 hover:text-white text-sm transition-colors">
                <Upload size={14} />
                Upload Logo
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-white/8 bg-white/3 p-5">
            <h3 className="text-sm font-medium text-white mb-4">Favicon</h3>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/20 text-sm font-bold">
                T
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white/50 hover:text-white text-sm transition-colors">
                <Upload size={14} />
                Upload Favicon
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-white/8 bg-white/3 p-5">
            <h3 className="text-sm font-medium text-white mb-4">Resume</h3>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/30">No resume uploaded</span>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white/50 hover:text-white text-sm transition-colors">
                <Upload size={14} />
                Upload PDF
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Sections */}
      {activeTab === 'Sections' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md space-y-3"
        >
          <p className="text-xs text-white/30 mb-4">Toggle sections on/off. Drag to reorder (coming soon).</p>
          {settings.sections_order.map(section => (
            <div
              key={section}
              className="flex items-center justify-between p-4 rounded-xl border border-white/8 bg-white/3"
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-0.5 text-white/20">
                  <div className="w-4 h-px bg-current" />
                  <div className="w-4 h-px bg-current" />
                  <div className="w-4 h-px bg-current" />
                </div>
                <span className="text-sm text-white capitalize">{section}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.sections_enabled[section] ?? true}
                  onChange={e => setSettings(p => ({
                    ...p,
                    sections_enabled: { ...p.sections_enabled, [section]: e.target.checked }
                  }))}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-white/10 peer-checked:bg-violet-600 rounded-full transition-colors peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" />
              </label>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
