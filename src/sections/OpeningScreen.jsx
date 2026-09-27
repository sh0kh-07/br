import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function OpeningScreen({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 overflow-hidden select-none"
      style={{
        background: 'radial-gradient(circle at 50% 45%, #FFFFFF 0%, #FAF5F0 50%, #F5EFEB 100%)',
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Delicate ambient warm glow aura */}
      <div className="absolute w-[380px] h-[380px] bg-gradient-radial from-[#FCEAEB] via-[#FFF5F6] to-transparent rounded-full blur-3xl opacity-75 pointer-events-none animate-breathe-glow" />

      {/* Decorative hairline card border accent */}
      <div className="relative z-10 max-w-sm w-full text-center flex flex-col items-center">
        {/* Soft crown monogram */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="mb-6 flex flex-col items-center"
        >
          <div className="w-14 h-14 rounded-full bg-white shadow-[0_8px_24px_rgba(212,122,136,0.18)] border border-[#F2D7DC] flex items-center justify-center mb-3">
            <span className="text-2xl transform hover:scale-110 transition-transform">🌷</span>
          </div>
   
        </motion.div>

        {/* Introductory dedicated note */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          className="font-serif text-3xl sm:text-4xl text-[#3A1E24] font-medium tracking-tight mb-4"
        >
          Xadicha uchun...
        </motion.h1>

        {/* Gentle invitation text in respectful SIZ form */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: 'easeOut' }}
          className="text-base sm:text-lg text-[#6B5358] font-light leading-relaxed mb-9 max-w-[280px]"
        >
          Bir oz vaqt ajrating.
          <br />
          Sizga kichkina sovg‘am bor.
        </motion.p>

        {/* Premium Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative"
        >
          {/* Subtle gold/rose pulsing halo behind button */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-[#D47A88]/30 via-[#E8C4C4]/50 to-[#C5A059]/30 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse-gently" />

          <button
            onClick={handleOpenClick}
            disabled={isOpening}
            className={`relative flex items-center justify-center gap-2.5 px-9 py-3.5 rounded-full text-base font-medium text-white transition-all duration-300 shadow-[0_12px_28px_rgba(94,25,38,0.22)] active:scale-95 ${
              isOpening
                ? 'bg-[#4A111E] scale-98'
                : 'bg-gradient-to-r from-[#5E1926] via-[#7D2134] to-[#5E1926] hover:shadow-[0_16px_34px_rgba(94,25,38,0.32)] border border-[#E8C4C4]/30'
            }`}
          >
            <span className="font-serif text-lg tracking-wide">Ochish</span>
            <span className="text-base transform transition-transform group-hover:rotate-12">🌷</span>
          </button>
        </motion.div>
      </div>

      {/* Opening celebration burst effect */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            className="absolute inset-0 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-[120vw] h-[120vw] rounded-full bg-white/70 backdrop-blur-md animate-ping" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
