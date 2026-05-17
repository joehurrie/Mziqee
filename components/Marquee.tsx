'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface MarqueeProps {
  text: string;
  speed?: number;
}

export default function Marquee({ text, speed = -25 }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `${speed}%`]);
  const repeated = Array(6).fill(text).join(' · ');

  return (
    <div
      ref={containerRef}
      className="relative z-10 overflow-hidden py-6 border-y border-white/10"
    >
      <motion.div
        className="whitespace-nowrap font-display font-bold uppercase select-none"
        style={{
          fontSize: 'clamp(6rem, 14vw, 14rem)',
          lineHeight: '1',
          letterSpacing: '-0.02em',
          color: 'rgba(255,255,255,0.12)',
          textShadow: '0 4px 60px rgba(0,0,0,0.8)',
          x,
        }}
      >
        {repeated}
      </motion.div>
    </div>
  );
}
