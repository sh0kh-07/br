import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Mail, X } from 'lucide-react';
import TulipBouquet from '../components/TulipBouquet';

const RESPECTFUL_WISHES = [
  'Xadicha, sizning tabassumingiz har qanday kundan ham go‘zalroq.',
  'Bu gullar hech qachon so‘lmaydi — sizga atalgan eng samimiy tilaklar bilan ochilgan.',
  'Dunyo qanchalik shovqinli bo‘lmasin, sizning kulgingizda cheksiz halovat bor.',
  'Yuzingizdan hech qachon samimiy tabassum arimasin, Xadicha.',
  'Siz bor joyda doim iliqlik, mehr va bahor nafasi bor.',
  'Har bir kuningiz xuddi mana shu nafis tulpanlar guldastasidek tarovatli o‘tsin.',
];

export default function MainExperience({ onFlowerTap, onLoveBurst }) {
  const [wishIndex, setWishIndex] = useState(0);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [hasSentSmile, setHasSentSmile] = useState(false);

  const handleNextWish = (coords) => {
    setWishIndex((prev) => (prev + 1) % RESPECTFUL_WISHES.length);
    if (onFlowerTap) {
      onFlowerTap(coords);
    }
  };

  const handleOpenLetter = (e) => {
    setIsLetterOpen(true);
    if (onLoveBurst && e?.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      onLoveBurst({
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    }
  };

  const handleSendSmile = (e) => {
    setHasSentSmile(true);
    if (onLoveBurst && e?.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      onLoveBurst({
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    }
  };

  return (
    <div className="relative w-full h-[100dvh] max-h-[100dvh] flex flex-col justify-between items-center px-4 pt-3 pb-4 sm:pt-5 sm:pb-6 overflow-hidden select-none bg-transparent">
      {/* ================= 1. TOP HEADER & TILAKLAR (ABOVE THE FLOWER) ================= */}
      <div className="w-full text-center z-20 flex flex-col items-center">
        {/* Subtle Tag */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF3F5] border border-[#F5D5DC] mb-1.5 shadow-2xs"
        >
          <Sparkles className="w-2.5 h-2.5 text-[#C5A059]" />
   
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-2xl sm:text-[27px] text-[#3A1821] font-medium tracking-tight mb-2"
        >
          Xadicha uchun gaullar<span className="inline-block hover:scale-110 transition-transform">🌷</span>
        </motion.h1>

        {/* TILAKLAR (DYNAMIC WISH CARD DIRECTLY ABOVE THE FLOWER) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          onClick={() => handleNextWish()}
          className="cursor-pointer w-full max-w-[340px] px-3.5 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-[#F2D0D7] shadow-[0_4px_16px_rgba(94,25,38,0.06)] hover:border-[#E8B4BE] active:scale-98 transition-all min-h-[54px] flex flex-col items-center justify-center gap-0.5"
        >
          <div className="flex items-center gap-1 text-[9.5px] uppercase tracking-[0.18em] text-[#A66C75] font-medium">
            <Sparkles className="w-2.5 h-2.5 text-[#C5A059]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={`wish-${wishIndex}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.28 }}
              className="font-serif italic text-[13.5px] sm:text-[15px] text-[#42141E] leading-snug text-center px-1"
            >
              "{RESPECTFUL_WISHES[wishIndex]}"
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ================= 2. CENTERPIECE: TULIP BOUQUET ================= */}
      <motion.main
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full flex justify-center items-center my-auto flex-1 min-h-0"
      >
        <TulipBouquet onFlowerTap={handleNextWish} />
      </motion.main>

      {/* ================= 3. BOTTOM ACTIONS & NOTE ================= */}
      <motion.footer
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="relative z-20 w-full max-w-sm text-center flex flex-col items-center gap-2 pt-0.5"
      >
   

     
      </motion.footer>

      {/* ================= SECRET LETTER MODAL ================= */}
      <AnimatePresence>
        {isLetterOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[360px] p-6 sm:p-7 rounded-3xl bg-white border border-[#E8C4C4] shadow-[0_20px_50px_rgba(94,25,38,0.18)] text-center overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsLetterOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-[#A07077] hover:text-[#5E1926] hover:bg-[#F5EBEB] transition-colors"
                aria-label="Xatni yopish"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-10 h-10 rounded-full bg-[#FAF3F4] border border-[#E8C4C4] flex items-center justify-center mx-auto mb-3 shadow-inner">
                <span className="font-serif text-lg font-bold text-[#7D2134]">X</span>
              </div>

              <div className="text-[10px] tracking-[0.22em] uppercase text-[#9C6971] font-medium mb-3">
                Faqat Xadicha uchun
              </div>

              {/* Heartfelt Letter Content in respectful "Siz" form */}
              <div className="font-serif text-base sm:text-lg text-[#3E1A22] leading-relaxed space-y-3 mb-5 text-balance">
                <p className="italic text-xl text-[#781B2D]">Xadicha,</p>
                <p className="font-light text-sm sm:text-base text-[#522933]">
                  bu gullar bir kun so‘lib qolishi mumkin.
                </p>
                <p className="font-normal text-[#521824] leading-relaxed text-sm sm:text-base">
                  Lekin sizning tabassumingiz, qalbingizdagi poklik va ko‘zlaringizdagi nur
                  doim shunday chiroyli bo‘lib qolsin.
                </p>
                <p className="text-xs sm:text-sm italic text-[#823343] font-light">
                  Har doim kulib yuring — siz kulganingizda dunyo yanada go‘zallashadi.
                </p>
              </div>

              {/* Signature */}
              <div className="pt-3 border-t border-[#F2DCE0] flex items-center justify-center gap-1.5 text-[#7D2134]">
                <span className="text-lg">🌷</span>
                <span className="font-serif italic text-base tracking-wide">Siz uchun, Xadicha 🤍</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
