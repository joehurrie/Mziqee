'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll } from 'motion/react';

interface VideoBackgroundProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function VideoBackground({ containerRef }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState('/mziiki.mp4');
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // The video source — set NEXT_PUBLIC_VIDEO_URL in .env.local to point at a CDN
  // for fast byte-range seeking on mobile (e.g. Cloudinary, Vercel Blob, S3+CloudFront).
  // Falls back to the local /mziiki.mp4 file.
  const VIDEO_SRC = process.env.NEXT_PUBLIC_VIDEO_URL || '/mziiki.mp4';

  // Blob-preload for local files so scrubbing seeks into memory instead of disk.
  // For remote CDN URLs, skip blob wrapping — the server handles range requests natively.
  useEffect(() => {
    // Only blob-cache local assets; CDN URLs have native range-request support.
    if (VIDEO_SRC.startsWith('http')) {
      setVideoSrc(VIDEO_SRC);
      return;
    }

    let objectUrl = '';
    fetch(VIDEO_SRC)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch video');
        return res.blob();
      })
      .then((blob) => {
        objectUrl = URL.createObjectURL(blob);
        setVideoSrc(objectUrl);
      })
      .catch((err) => {
        console.error('Error preloading video blob:', err);
        // Fall back to direct src on error
        setVideoSrc(VIDEO_SRC);
      });

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Force video reload when source swaps
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
    }
  }, [videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    const updateTargetTime = (progress: number) => {
      if (video.duration) {
        // Map 0-100% scroll directly to 0-100% video (minus 0.05s to prevent end-flicker)
        const safeDuration = video.duration - 0.05;
        targetTimeRef.current = progress * safeDuration;
      }
    };

    const unsubscribe = scrollYProgress.on('change', updateTargetTime);

    const handleLoadedMetadata = () => {
      if (video.duration) {
        const safeDuration = video.duration - 0.05;
        const progress = scrollYProgress.get();
        targetTimeRef.current = progress * safeDuration;
        
        // Match currentTimeRef to prevent snap transitions
        currentTimeRef.current = targetTimeRef.current;
        video.currentTime = currentTimeRef.current;
      }
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
          
          // Guard with seeking state to prevent overloading browser decoder queue
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
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        style={{ filter: 'brightness(0.6) contrast(1.05)', transform: 'scale(1.04)' }}
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