'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

const COLORS = [
  {
    name: 'Matte Charcoal',
    hex: '#262626',
    border: '#444',
    gradient: 'linear-gradient(135deg, #3a3a3a 0%, #1c1c1c 100%)',
    desc: 'A sleek, scratch-resistant industrial matte charcoal finish with a micro-textured grip.',
  },
  {
    name: 'Emerald Chrome',
    hex: '#00e676',
    border: '#00e676',
    gradient: 'linear-gradient(135deg, #09a356 0%, #00e676 45%, #054f2a 100%)',
    desc: 'A gorgeous, ultra-high gloss metallic chrome emerald plating that reflects light dynamically.',
  },
  {
    name: 'Obsidian Black',
    hex: '#0d0d0d',
    border: '#333',
    gradient: 'linear-gradient(135deg, #222 0%, #000 100%)',
    desc: 'A pristine, liquid-like mirror-gloss obsidian black inspired by polished volcanic glass.',
  },
  {
    name: 'Stealth Grey',
    hex: '#54626F',
    border: '#54626F',
    gradient: 'linear-gradient(135deg, #707f8c 0%, #434d57 100%)',
    desc: 'An anodized aerospace-grade stealth grey finish designed for premium durability.',
  },
];

export default function PreOrderForm() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/preorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          color: selectedColor.name,
          _subject: `New Pre-Order Reservation: ${name} (${selectedColor.name})`,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setErrorMessage('Submission failed. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } as any },
  };

  return (
    <section
      ref={ref}
      id="preorder"
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-32"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 80%, ${selectedColor.hex}18 0%, transparent 70%)`,
          transition: 'background 0.6s ease',
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative z-10 w-full max-w-3xl"
      >
        {/* Label */}
        <motion.span
          variants={itemVariants}
          className="block text-[0.7rem] uppercase tracking-[0.22em] text-[#39FF14] mb-5"
        >
          005 / Pre-Order
        </motion.span>

        {/* Heading */}
        <motion.h2
          variants={itemVariants}
          className="font-display text-[clamp(2.8rem,6vw,6rem)] font-bold leading-[1.0] text-white mb-4"
        >
          Pre-Order Yours.
        </motion.h2>

        <motion.p variants={itemVariants} className="font-body text-[1.05rem] text-[#888] mb-6">
          Limited quantities per colorway. Be first in line — pre-orders ship within 2 weeks.
        </motion.p>

        {/* High-visibility showcase spacer with balanced height for perfect video-to-scroll alignment */}
        <div className="h-20 sm:h-48 pointer-events-none" />

        {/* Form Card Container */}
        {!submitted ? (
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 bg-[#161616]/20 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            noValidate
          >
            {/* Launch Price Outline Badge */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-2">
              <span className="text-xs uppercase tracking-[0.15em] text-[#888] font-semibold">Special Launch Price</span>
              <span className="animate-price-shine font-display font-bold text-[#39FF14] text-sm px-4 py-1.5 rounded-full border border-[#39FF14]/30 bg-[#39FF14]/5 shadow-[0_0_20px_rgba(57,255,20,0.2)]">KSh 3,500</span>
            </div>

            {/* Color Picker Finish Select inside Card */}
            <div>
              <h3 className="font-display font-bold text-white text-xl mb-1">Pick Your Color</h3>
              <p className="text-xs text-[#888] mb-4">Select the premium finish for your Mziqee Airbuds Pro — {selectedColor.name}</p>
              <div className="flex gap-3 flex-wrap">
                {COLORS.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    className="relative w-12 h-12 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110 focus:outline-none"
                    style={{
                      background: color.gradient,
                      border: `2px solid ${selectedColor.name === color.name ? color.border : 'transparent'}`,
                      boxShadow:
                        selectedColor.name === color.name
                          ? `0 0 20px ${color.hex}aa`
                          : 'none',
                    }}
                    aria-label={`Select ${color.name}`}
                    aria-pressed={selectedColor.name === color.name}
                  >
                    {selectedColor.name === color.name && (
                      <motion.div
                        layoutId="color-indicator"
                        className="absolute inset-0 rounded-full ring-2 ring-white ring-offset-2 ring-offset-[#0e0e0e]"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Finish Preview inside Card */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
              <div className="relative w-14 h-14 shrink-0">
                <div
                  className="w-10 h-10 rounded-full absolute top-2 left-2"
                  style={{
                    background: selectedColor.gradient,
                    boxShadow: `0 0 25px ${selectedColor.hex}cc`,
                    transition: 'all 0.5s ease',
                  }}
                />
                <div
                  className="w-6 h-6 rounded-full absolute bottom-1 right-1 opacity-40"
                  style={{ background: selectedColor.gradient, transition: 'all 0.5s ease' }}
                />
              </div>
              <div>
                <p className="font-display font-bold text-white text-lg leading-tight">{selectedColor.name}</p>
                <p className="font-body text-[#39FF14] text-[0.65rem] uppercase tracking-widest mt-0.5">Mziqee Airbuds Pro · Premium Finish</p>
                <p className="font-body text-[#777] text-[0.75rem] mt-1 leading-relaxed transition-all duration-300">{selectedColor.desc}</p>
              </div>
            </div>

            <div className="h-px bg-white/5" />

            {/* Lead Capture Form Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="preorder-name" className="text-xs uppercase tracking-[0.15em] text-[#666]">Full Name</label>
                <input
                  id="preorder-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-5 py-4 text-white font-body text-sm placeholder:text-[#444] focus:outline-none focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] transition-colors duration-200"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="preorder-email" className="text-xs uppercase tracking-[0.15em] text-[#666]">Email Address</label>
                <input
                  id="preorder-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full bg-[#111] border border-white/10 rounded-lg px-5 py-4 text-white font-body text-sm placeholder:text-[#444] focus:outline-none focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] transition-colors duration-200"
                />
              </div>
            </div>

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs uppercase tracking-wider font-semibold"
              >
                {errorMessage}
              </motion.div>
            )}

            <motion.button
              id="preorder-submit"
              type="submit"
              disabled={loading}
              whileHover={loading ? {} : { scale: 1.02 }}
              whileTap={loading ? {} : { scale: 0.98 }}
              className="mt-2 w-full sm:w-auto sm:px-16 py-5 rounded-full font-display font-bold text-black uppercase tracking-[0.1em] text-sm cursor-pointer transition-shadow duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: '#39FF14',
                boxShadow: loading ? 'none' : '0 0 30px #39FF1460',
              }}
            >
              {loading ? 'Reserving...' : 'Reserve My Pair'}
            </motion.button>

            <p className="text-xs text-[#555] mt-2">No payment required now. We&apos;ll reach out before shipping.</p>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="py-12 px-8 rounded-2xl bg-[#161616]/20 backdrop-blur-xl border border-[#39FF14]/20 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            <div
              className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: '#39FF1420', boxShadow: '0 0 40px #39FF1440' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="font-display font-bold text-white text-3xl mb-3">Secured!</p>
            <p className="font-body text-[#888] text-sm leading-relaxed max-w-md mx-auto">
              Your <strong style={{ color: selectedColor.hex === '#0d0d0d' ? '#999' : selectedColor.hex }}>{selectedColor.name}</strong> Mziqee Airbuds have been secured. We will be in touch with you when they are released in two weeks.
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
