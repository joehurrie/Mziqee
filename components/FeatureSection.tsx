'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { clsx } from 'clsx';

type AnimationType = 'slide-left' | 'slide-right' | 'fade-up' | 'scale-up' | 'clip-reveal';

interface FeatureSectionProps {
  label: string;
  heading: string;
  body: string;
  align: 'left' | 'right';
  animation: AnimationType;
  accent?: string;
}

const variants: Record<AnimationType, {
  hidden: any;
  visible: any;
}> = {
  'slide-left': {
    hidden: { x: -80, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  'slide-right': {
    hidden: { x: 80, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  'fade-up': {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
  'scale-up': {
    hidden: { scale: 0.85, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  },
  'clip-reveal': {
    hidden: { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
    visible: { clipPath: 'inset(0% 0 0 0)', opacity: 1 },
  },
};

const transition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1],
} as any;

export default function FeatureSection({
  label,
  heading,
  body,
  align,
  animation,
  accent = '#39FF14',
}: FeatureSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-20% 0px' });

  const v = variants[animation];

  return (
    <section
      ref={ref}
      className={clsx(
        'relative z-10 min-h-screen flex items-center py-24',
        'px-6 sm:px-0',
        align === 'left'
          ? 'sm:justify-start sm:pl-[5vw] sm:pr-[52vw]'
          : 'sm:justify-end sm:pr-[5vw] sm:pl-[52vw]'
      )}
    >
      <div className="w-full max-w-full sm:max-w-[42vw]" style={{ textShadow: '0 2px 30px rgba(0,0,0,0.9)' }}>
        {/* Label */}
        <motion.span
          initial={v.hidden}
          animate={isInView ? v.visible : v.hidden}
          transition={{ ...transition, delay: 0 }}
          className="block text-[0.7rem] uppercase tracking-[0.2em] mb-4"
          style={{ color: accent }}
        >
          {label}
        </motion.span>

        {/* Heading */}
        <motion.h2
          initial={v.hidden}
          animate={isInView ? v.visible : v.hidden}
          transition={{ ...transition, delay: 0.12 }}
          className="font-display text-[clamp(2.3rem,5vw,5rem)] font-bold leading-[1.0] text-white mb-6"
          style={{ textShadow: '0 4px 40px rgba(0,0,0,1), 0 0 80px rgba(0,0,0,0.8)' }}
        >
          {heading.split('\n').map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={v.hidden}
          animate={isInView ? v.visible : v.hidden}
          transition={{ ...transition, delay: 0.24 }}
          className="font-body text-[1.0rem] sm:text-[1.1rem] text-[#888] leading-relaxed"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,1)' }}
        >
          {body}
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ ...transition, delay: 0.36 }}
          className="mt-8 h-[2px] w-24 origin-left"
          style={{ backgroundColor: accent }}
        />
      </div>
    </section>
  );
}
