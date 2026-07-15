'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useSpring(cursorX, { stiffness: 80, damping: 20 });
  const trailY = useSpring(cursorY, { stiffness: 80, damping: 20 });
  const glowX = useSpring(cursorX, { stiffness: 40, damping: 15 });
  const glowY = useSpring(cursorY, { stiffness: 40, damping: 15 });

  const [isHovering, setIsHovering] = useState(false);
  const [isMagnetic, setIsMagnetic] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    const handleElementHover = (e: Event) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor]');
      if (interactive) {
        setIsHovering(true);
        const text = (interactive as HTMLElement).dataset.cursorText || '';
        setCursorText(text);
        const magnetic = (interactive as HTMLElement).dataset.magnetic !== undefined;
        setIsMagnetic(magnetic);
      } else {
        setIsHovering(false);
        setCursorText('');
        setIsMagnetic(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleElementHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: isHidden ? 0 : 0.6 }}
      >
        <motion.div
          className="rounded-full bg-violet-500/30"
          animate={{
            width: isHovering ? 120 : 80,
            height: isHovering ? 120 : 80,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{ filter: 'blur(20px)' }}
        />
      </motion.div>

      {/* Trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: isHidden ? 0 : 1 }}
      >
        <motion.div
          className="rounded-full border border-white/20 backdrop-blur-sm flex items-center justify-center"
          animate={{
            width: isHovering ? 60 : 40,
            height: isHovering ? 60 : 40,
            borderColor: isHovering ? 'rgba(139,92,246,0.6)' : 'rgba(255,255,255,0.2)',
            scale: isMagnetic ? 1.4 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {cursorText && (
            <motion.span
              className="text-[9px] font-medium text-white/80 uppercase tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: isHidden ? 0 : 1, scale: isHovering ? 0 : 1 }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </motion.div>
    </>
  );
}
