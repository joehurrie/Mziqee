'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, useInView } from 'motion/react';

interface LenisSmoothScrollProps {
  children: React.ReactNode;
}

export default function LenisSmoothScroll({ children }: LenisSmoothScrollProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const raf_id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(raf_id);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
