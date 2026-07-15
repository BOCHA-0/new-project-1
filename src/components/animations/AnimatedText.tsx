'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  stagger?: number;
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  once = true,
  tag: Tag = 'p',
  stagger = 0.05,
}: AnimatedTextProps) {
  const words = text.split(' ');

  return (
    <Tag className={cn('overflow-hidden', className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once }}
            transition={{
              duration: 0.7,
              delay: delay + i * stagger,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function AnimatedChars({
  text,
  className,
  delay = 0,
  once = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const chars = text.split('');

  return (
    <span className={cn('inline-flex', className)}>
      {chars.map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            whileInView={{ y: 0 }}
            viewport={{ once }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.03,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
