'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';

export default function VideoScrubber() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Circle wipe on enter: 0% → 100% within first 8% of scroll
  const clipRadius = useTransform(scrollYProgress, [0, 0.08], [0, 100]);
  const clipPath = useTransform(clipRadius, (r: number) => `circle(${r}% at 50% 50%)`);

  // Scrub video: completes by ~55% scroll (speed multiplier 2.0)
  useMotionValueEvent(scrollYProgress, 'change', (progress: number) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const accelerated = Math.min(progress * 2.0, 1);
    video.currentTime = accelerated * video.duration;
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.load();
  }, []);

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
