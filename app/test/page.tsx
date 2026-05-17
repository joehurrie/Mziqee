'use client';

import { motion } from 'motion/react';

export default function TestPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01]
        }}
        className="h-40 w-40 rounded-3xl bg-white"
      />
    </div>
  );
}
