'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center px-6">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-8xl font-extralight text-white/10 mb-4">404</div>
        <h1 className="text-2xl font-light text-white mb-2">Page not found</h1>
        <p className="text-white/40 text-sm mb-8">The page you're looking for doesn't exist.</p>
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
}
