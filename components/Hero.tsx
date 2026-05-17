'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  // Word-split for staggered entrance
  const line1Words = ['Feel', 'the'];
  const line2Words = ['Rhythm', 'in'];
  const line3Words = ['Every', 'Beat.'];

  const wordVariants = {
    hidden: { y: '110%', opacity: 0 },
    visible: { y: '0%', opacity: 1 },
  };

  const transition = {
    duration: 0.85,
    ease: [0.22, 1, 0.36, 1],
  } as any;

  return (
    <section
      ref={ref}
      className="relative z-10 h-screen flex flex-col items-start justify-center px-[6vw] overflow-hidden"
    >
      {/* Background noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Accent radial glow */}
      <div
        className="absolute bottom-0 left-[8%] w-[40vw] h-[40vw] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #39FF1412 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-[6vw] py-8"
      >
        <span className="font-display font-bold text-white text-xl tracking-tight">
          Mziqee<span className="text-[#39FF14]">.</span>
        </span>
        <motion.a
          href="#preorder"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="font-body text-xs uppercase tracking-[0.18em] text-black px-6 py-3 rounded-full cursor-pointer"
          style={{ backgroundColor: '#39FF14' }}
        >
          Pre-Order
        </motion.a>
      </motion.nav>

      {/* Hero heading — word split */}
      <div className="relative z-10 mt-8">
        <p className="font-body text-[0.7rem] uppercase tracking-[0.22em] text-[#39FF14] mb-6">
          000 / Mziqee Airbuds Pro
        </p>

        {[line1Words, line2Words, line3Words].map((line, lineIndex) => (
          <div key={lineIndex} className="overflow-hidden flex gap-4">
            {line.map((word, wordIndex) => (
              <motion.span
                key={word}
                variants={wordVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                transition={{
                  ...transition,
                  delay: 0.3 + (lineIndex * 2 + wordIndex) * 0.07,
                }}
                className="block font-display font-bold text-white"
                style={{
                  fontSize: 'clamp(4rem, 12vw, 12rem)',
                  lineHeight: '1.0',
                  letterSpacing: '-0.03em',
                }}
              >
                {word === 'Rhythm' ? (
                  <>
                    <span className="text-[#39FF14]">R</span>hythm
                  </>
                ) : word === 'Beat.' ? (
                  <>
                    Beat<span className="text-[#39FF14]">.</span>
                  </>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </div>
        ))}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1.1, ease: 'easeOut' }}
          className="font-body text-[#888] text-lg mt-8 max-w-md"
        >
          Premium wireless buds built for the ones who live for music.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 left-[6vw] flex items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-transparent via-[#39FF14] to-transparent"
        />
        <span className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-[#555]">Scroll</span>
      </motion.div>
    </section>
  );
}
