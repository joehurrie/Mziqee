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
          
          {/* 03 · Sound Quality — slide left */}
          <FeatureSection
            label="001 / Sound"
            heading={"Pure Sound.\nEvery Frequency."}
            body="40mm titanium drivers engineered for audiophile-grade clarity. From bone-shaking bass to crystalline highs — Mziqee Buds render music the way artists intended it."
            align="left"
            animation="slide-left"
            accent="#39FF14"
          />

          {/* 04 · Marquee */}
          <Marquee text="Feel the Rhythm" speed={-20} />

          {/* 05 · Comfort — slide right */}
          <FeatureSection
            label="002 / Comfort"
            heading={"Wear All Day.\nForget They're There."}
            body="Memory-foam ear cushions that mould to your shape. Weighing just 198g with balanced pressure distribution, Mziqee Buds go the distance — work, gym, commute, sleep."
            align="right"
            animation="slide-right"
            accent="#FF2D78"
          />

          {/* 06 · Stats */}
          <StatsBar />

          {/* 07 · Value — clip reveal */}
          <FeatureSection
            label="003 / Value"
            heading={"Premium Sound.\nAccessible Price."}
            body="Industry-leading specs at a fraction of the cost. Mziqee Buds prove you don't need to spend a fortune to experience extraordinary audio. Because great music is for everyone."
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
