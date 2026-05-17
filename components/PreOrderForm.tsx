'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

const COLORS = [
  { name: 'Midnight Black', hex: '#1a1a1a', border: '#444' },
  { name: 'Neon Pink', hex: '#FF2D78', border: '#FF2D78' },
  { name: 'Glacier White', hex: '#F0F0F0', border: '#ddd' },
  { name: 'Cosmic Blue', hex: '#0066FF', border: '#0066FF' },
  { name: 'Forest Green', hex: '#39FF14', border: '#39FF14' },
];

export default function PreOrderForm() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setSubmitted(true);
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
      className="relative z-10 min-h-screen bg-[#0e0e0e]/20 backdrop-blur-md flex flex-col items-center justify-center px-6 py-32"
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
          Pick Your Color.
          <br />
          <span className="text-[#39FF14]">Secure Yours.</span>
        </motion.h2>

        <motion.p variants={itemVariants} className="font-body text-[1.05rem] text-[#888] mb-10">
          Limited quantities per colorway. Be first in line — pre-orders ship within 2 weeks.
        </motion.p>

        {/* Color Picker */}
        <motion.div variants={itemVariants} className="mb-10">
          <p className="text-xs uppercase tracking-[0.15em] text-[#666] mb-4">Select Color — {selectedColor.name}</p>
          <div className="flex gap-4 flex-wrap">
            {COLORS.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                title={color.name}
                className="relative w-14 h-14 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110 focus:outline-none"
                style={{
                  backgroundColor: color.hex,
                  border: `2px solid ${selectedColor.name === color.name ? color.border : 'transparent'}`,
                  boxShadow:
                    selectedColor.name === color.name
                      ? `0 0 20px ${color.hex}99`
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
        </motion.div>

        {/* Bud preview */}
        <motion.div
          variants={itemVariants}
          className="mb-12 flex items-center gap-6"
        >
          <div className="relative w-20 h-20">
            <div
              className="w-16 h-16 rounded-full absolute top-2 left-2"
              style={{
                backgroundColor: selectedColor.hex,
                boxShadow: `0 0 40px ${selectedColor.hex}88`,
                transition: 'all 0.5s ease',
              }}
            />
            <div
              className="w-10 h-10 rounded-full absolute bottom-0 right-0 opacity-40"
              style={{ backgroundColor: selectedColor.hex, transition: 'all 0.5s ease' }}
            />
          </div>
          <div>
            <p className="font-display font-bold text-white text-2xl">{selectedColor.name}</p>
            <p className="font-body text-[#666] text-sm mt-1">Airbads Pro · Limited Edition</p>
          </div>
        </motion.div>

        {/* Form */}
        {!submitted ? (
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            noValidate
          >
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
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-5 py-4 text-white font-body text-sm placeholder:text-[#444] focus:outline-none focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] transition-colors duration-200"
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
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-5 py-4 text-white font-body text-sm placeholder:text-[#444] focus:outline-none focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] transition-colors duration-200"
                />
              </div>
            </div>

            <motion.button
              id="preorder-submit"
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-2 w-full sm:w-auto sm:px-16 py-5 rounded-full font-display font-bold text-black uppercase tracking-[0.1em] text-sm cursor-pointer transition-shadow duration-200"
              style={{
                backgroundColor: '#39FF14',
                boxShadow: '0 0 30px #39FF1460',
              }}
            >
              Reserve My Pair
            </motion.button>

            <p className="text-xs text-[#444] mt-2">No payment required now. We&apos;ll reach out before shipping.</p>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="py-12 px-8 rounded-2xl bg-[#1a1a1a] border border-[#39FF14]/20 text-center"
          >
            <div
              className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{ backgroundColor: '#39FF1420', boxShadow: '0 0 40px #39FF1440' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="font-display font-bold text-white text-3xl mb-2">You&apos;re on the list!</p>
            <p className="font-body text-[#888] text-sm">We&apos;ll email you when your <strong style={{ color: selectedColor.name === 'Midnight Black' ? '#888' : selectedColor.hex }}>{selectedColor.name}</strong> Airbads Pro are ready to ship.</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
