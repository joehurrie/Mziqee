'use client';

import { useEffect, useRef } from 'react';
import { useScroll } from 'motion/react';

interface VideoBackgroundProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function VideoBackground({ containerRef }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Pause and preload so we can seek freely
    video.pause();
    video.load();

    const updateTargetTime = (progress: number) => {
      if (video.duration) {
        // Map 0-100% scroll directly to 0-100% video (minus 0.05s to prevent end-flicker)
        const safeDuration = video.duration - 0.05;
        targetTimeRef.current = progress * safeDuration;
      }
    };

    const unsubscribe = scrollYProgress.on('change', updateTargetTime);

    const handleLoadedMetadata = () => {
      updateTargetTime(scrollYProgress.get());
    };

    if (video.readyState >= 1 && video.duration) {
      handleLoadedMetadata();
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    // Smooth lerp loop
    const LERP_FACTOR = 0.12;

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function tick() {
      if (video && video.duration) {
        const delta = targetTimeRef.current - currentTimeRef.current;

        if (Math.abs(delta) > 0.001) {
          currentTimeRef.current = lerp(currentTimeRef.current, targetTimeRef.current, LERP_FACTOR);
          video.currentTime = currentTimeRef.current;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    // Start the render loop
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      unsubscribe();
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollYProgress]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <video
        ref={videoRef}
        src="/mziiki.mp4" /* Optimized with -g 1 (every frame is keyframe) for ultra-smooth scrubbing */
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        style={{ filter: 'brightness(0.6) contrast(1.05)' }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
        }}
      />
    </div>
  );
}