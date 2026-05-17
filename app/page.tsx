'use client';

import { useRef } from 'react';
import LenisSmoothScroll from '@/components/LenisSmoothScroll';
import Hero from '@/components/Hero';
import VideoBackground from '@/components/VideoBackground';
import FeatureSection from '@/components/FeatureSection';
import Marquee from '@/components/Marquee';
import StatsBar from '@/components/StatsBar';
import PreOrderForm from '@/components/PreOrderForm';
import Footer from '@/components/Footer';

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <LenisSmoothScroll>
      <main className="relative bg-[#121212] text-white overflow-x-hidden">

        {/* Fixed video background — scrubs against scrollContainerRef */}
        <VideoBackground containerRef={scrollContainerRef} />

        {/* Everything in this div drives the video scrub (excludes footer) */}
        <div ref={scrollContainerRef} className="relative z-10">

          {/* 01 · Hero */}
          <Hero />

          {/* 03 · Sound Quality — slide right (alternating alignment) */}
          <FeatureSection
            label="001 / Sound"
            heading={"Experience Music\nAt Its Best."}
            body="Powered by our custom-engineered 11mm titanium-coated dynamic drivers, delivering audiophile-grade detail. Experience bone-shaking bass and crystalline highs exactly the way the artist recorded them."
            align="right"
            animation="slide-right"
            accent="#39FF14"
          />

          {/* 03b · Smart Experience (New Section) — slide left */}
          <FeatureSection
            label="002 / Experience"
            heading={"Smart Noise Isolation.\nCrystal-Clear Calls."}
            body="Adaptive Active Noise Cancellation isolates you from the chaos, while three beamforming microphones and an intelligent wind-noise reduction grille keep your voice crisp and unfiltered in any environment."
            align="left"
            animation="slide-left"
            accent="#39FF14"
          />

          {/* 04 · Marquee */}
          <Marquee text="Feel the Rhythm" speed={-20} />

          {/* 05 · Comfort — slide right */}
          <FeatureSection
            label="003 / Comfort"
            heading={"Designed for Comfort."}
            body="Ergonomically sculpted to lock gently into your ear. With an ultra-lightweight 5.2g profile and pressure-relieving acoustic vents, they offer an effortless, secure fit for work, gym, or all-day listening."
            align="right"
            animation="slide-right"
            accent="#39FF14"
          />

          {/* 06 · Stats */}
          <StatsBar />

          {/* 07 · Value — clip reveal */}
          <FeatureSection
            label="004 / Value"
            heading={"Premium Sound\nEngineered."}
            body="By utilizing a direct-to-consumer design and proprietary Mziqee audio intelligence chips, we deliver state-of-the-art specs and incredible acoustic performance without the inflated premium markup."
            align="left"
            animation="clip-reveal"
            accent="#39FF14"
          />

          {/* 08 · Second marquee */}
          <Marquee text="Mziqee Buds ·" speed={20} />

          {/* 09 · Pre-order with color picker */}
          <PreOrderForm />

        </div>

        {/* 10 · Footer (outside scroll container — video won't play here) */}
        <div className="relative z-10">
          <Footer />
        </div>

      </main>
    </LenisSmoothScroll>
  );
}
