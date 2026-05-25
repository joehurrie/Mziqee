'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function VideoScrubber() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Circle wipe on enter: 0% → 100% within first 8% of scroll
  const clipRadius = useTransform(scrollYProgress, [0, 0.08], [0, 100]);
  const clipPath = useTransform(clipRadius, (r: number) => `circle(${r}% at 50% 50%)`);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.load();

    const updateTargetTime = (progress: number) => {
      if (video.duration) {
        // Scrub video: completes by ~55% scroll (speed multiplier 2.0)
        const accelerated = Math.min(progress * 2.0, 1);
        targetTimeRef.current = accelerated * video.duration;
      }
    };

    const unsubscribe = scrollYProgress.on('change', updateTargetTime);

    const handleLoadedMetadata = () => {
      if (video.duration) {
        const progress = scrollYProgress.get();
        const accelerated = Math.min(progress * 2.0, 1);
        targetTimeRef.current = accelerated * video.duration;
        currentTimeRef.current = targetTimeRef.current;
        video.currentTime = currentTimeRef.current;
      }
    };

    if (video.readyState >= 1 && video.duration) {
      handleLoadedMetadata();
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    const LERP_FACTOR = 0.12;

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function tick() {
      if (video && video.duration) {
        const delta = targetTimeRef.current - currentTimeRef.current;

        if (Math.abs(delta) > 0.001) {
          currentTimeRef.current = lerp(currentTimeRef.current, targetTimeRef.current, LERP_FACTOR);
          
          if (!video.seeking) {
            video.currentTime = currentTimeRef.current;
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      unsubscribe();
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} style={{ height: '800vh' }}>
      {/* Sticky viewport-pinned canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div style={{ clipPath }} className="absolute inset-0">
          <video
            ref={videoRef}
            src="/video.mp4"
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.85)' }}
          />
          {/* Overlay for text contrast at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#121212]/70 pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
}
