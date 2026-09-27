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
  const [wishIndex, setWishIndex] = useState(-1);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [hasSentSmile, setHasSentSmile] = useState(false);

  const handleBouquetTap = (coords) => {
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
    <div className="relative w-full h-[100dvh] max-h-[100dvh] flex flex-col justify-between items-center px-4 py-4 sm:py-6 overflow-hidden select-none">
      {/* 1. Header Stamp & Dedication */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full text-center z-10 pt-1"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FAF0F2] border border-[#F2D7DC] mb-1.5 shadow-2xs">
          <Sparkles className="w-2.5 h-2.5 text-[#C5A059]" />
       
        </div>

        <h1 className="font-serif text-2xl sm:text-[28px] text-[#3A1821] font-medium tracking-tight">
          Xadicha uchun  <span className="inline-block hover:scale-110 transition-transform">🌷</span>
        </h1>
 
      </motion.header>

      {/* 2. Centerpiece: The Luxurious Botanical Tulip Bouquet */}
      <motion.main
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full flex justify-center items-center my-auto flex-1 min-h-0"
      >
        <TulipBouquet onFlowerTap={handleBouquetTap} />
      </motion.main>

      {/* 3. Bottom Section: Dynamic Heartfelt Wish Card & Actions */}
      <motion.footer
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
        className="relative z-10 w-full max-w-sm text-center flex flex-col items-center gap-2.5 pb-1"
      >
        {/* Dynamic wish card when flowers are tapped */}
        <div className="min-h-[58px] sm:min-h-[62px] flex items-center justify-center w-full px-2">
          <AnimatePresence mode="wait">
            {wishIndex >= 0 ? (
              <motion.div
                key={`wish-${wishIndex}`}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="luxury-glass px-4 py-2 rounded-2xl shadow-[0_6px_20px_rgba(94,25,38,0.07)] flex flex-col items-center justify-center gap-0.5 border border-[#E8C4C4]/50 max-w-[340px]"
              >
                <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#A06E76]">
                  <Sparkles className="w-2.5 h-2.5 text-[#C5A059]" />
                </div>
                <p className="font-serif italic text-sm sm:text-base text-[#42141E] leading-snug">
                  "{RESPECTFUL_WISHES[wishIndex]}"
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="default-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <p className="font-serif italic text-base sm:text-lg text-[#5E1926] font-medium">
                  Sizning borligingiz — eng katta sabab.
                </p>
                <span className="text-[11px] text-[#8C6269] font-light">
                  Har doim shunday kulib yuring 🤍
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

     
      </motion.footer>

      {/* ================= SECRET LETTER MODAL ================= */}
      <AnimatePresence>
        {isLetterOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/35 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 10 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[360px] p-6 sm:p-7 rounded-3xl bg-[#FFFDF9] border border-[#DEBCC3]/80 shadow-[0_20px_50px_rgba(94,25,38,0.18)] text-center overflow-hidden"
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
                  Har doim kulib yuring — siz kulganingizda dunyo yanada go‘zal.
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
