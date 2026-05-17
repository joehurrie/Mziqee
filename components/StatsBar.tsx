'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface StatProps {
  value: string;
  unit?: string;
  label: string;
}

function Stat({ value, unit, label }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-end justify-center gap-1"
        style={{ textShadow: '0 4px 40px rgba(0,0,0,1)' }}
      >
        <span className="font-display font-bold text-white" style={{ fontSize: 'clamp(3rem,6vw,5rem)', lineHeight: 1 }}>
          {value}
        </span>
        {unit && (
          <span className="font-display font-bold text-[#39FF14]" style={{ fontSize: 'clamp(1.5rem,3vw,2.5rem)', lineHeight: 1.2 }}>
            {unit}
          </span>
        )}
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
        className="font-body text-xs uppercase tracking-[0.15em] text-white/80 mt-2"
        style={{ textShadow: '0 2px 20px rgba(0,0,0,1)' }}
      >
        {label}
      </motion.p>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="relative z-10 py-24 border-y border-white/5">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-12">
        <Stat value="40" unit="h" label="Battery Life" />
        <Stat value="30" unit="mm" label="Driver Size" />
        <Stat value="99" unit="%" label="Noise Reduction" />
        <Stat value="4.9" label="User Rating" />
      </div>
    </section>
  );
}
