import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

/* 
  Anatomically perfect Tulip in bouquet:
  - cx, cy: center position of flower head
  - angle: tilt of flower head
  - stemStartX, stemStartY: bundle gathering point at the ribbon
  - stemControlX, stemControlY: organic curve control
  - colorScheme: 'blush' | 'crimson' | 'ruby' | 'cream' | 'coral'
*/
const TULIP_SPECS = [
  // 1. Back-Left Tulip (taller, tilted left)
  {
    id: 1,
    cx: 95,
    cy: 88,
    angle: -16,
    scale: 0.88,
    stemStart: [155, 340],
    stemCtrl: [110, 220],
    stemEnd: [95, 126],
    type: 'ruby',
    z: 1,
  },
  // 2. Back-Right Tulip (taller, tilted right)
  {
    id: 2,
    cx: 215,
    cy: 92,
    angle: 15,
    scale: 0.88,
    stemStart: [165, 340],
    stemCtrl: [205, 220],
    stemEnd: [215, 130],
    type: 'crimson',
    z: 1,
  },
  // 3. Back-Center Crown Tulip (highest point)
  {
    id: 3,
    cx: 155,
    cy: 58,
    angle: 1,
    scale: 0.95,
    stemStart: [160, 340],
    stemCtrl: [157, 190],
    stemEnd: [155, 98],
    type: 'blush',
    z: 2,
  },
  // 4. Mid-Left Tulip
  {
    id: 4,
    cx: 75,
    cy: 148,
    angle: -24,
    scale: 0.92,
    stemStart: [152, 340],
    stemCtrl: [95, 250],
    stemEnd: [75, 186],
    type: 'cream',
    z: 3,
  },
  // 5. Mid-Right Tulip
  {
    id: 5,
    cx: 235,
    cy: 152,
    angle: 22,
    scale: 0.92,
    stemStart: [168, 340],
    stemCtrl: [220, 255],
    stemEnd: [235, 190],
    type: 'coral',
    z: 3,
  },
  // 6. Center-Mid Bloom (lush & vibrant)
  {
    id: 6,
    cx: 122,
    cy: 130,
    angle: -6,
    scale: 1.02,
    stemStart: [157, 340],
    stemCtrl: [134, 230],
    stemEnd: [122, 172],
    type: 'crimson',
    z: 4,
  },
  // 7. Center-Right Bloom (lush)
  {
    id: 7,
    cx: 188,
    cy: 132,
    angle: 7,
    scale: 1.02,
    stemStart: [163, 340],
    stemCtrl: [178, 230],
    stemEnd: [188, 174],
    type: 'blush',
    z: 4,
  },
  // 8. Front Center Queen Tulip (focal centerpiece, majestic)
  {
    id: 8,
    cx: 155,
    cy: 175,
    angle: 0,
    scale: 1.08,
    stemStart: [160, 340],
    stemCtrl: [159, 250],
    stemEnd: [155, 218],
    type: 'ruby',
    z: 5,
  },
];

export default function TulipBouquet({ onFlowerTap }) {
  const [isWobbling, setIsWobbling] = useState(false);
  const [activeBloomId, setActiveBloomId] = useState(null);

  const handleBouquetTap = (e, bloomId = null) => {
    setIsWobbling(true);
    setActiveBloomId(bloomId);
    setTimeout(() => {
      setIsWobbling(false);
      setActiveBloomId(null);
    }, 900);

    if (onFlowerTap) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height * 0.35;
      onFlowerTap({ x, y, bloomId });
    }
  };

  return (
    <div
      onClick={(e) => handleBouquetTap(e)}
      className="relative cursor-pointer select-none flex flex-col items-center justify-center w-[290px] h-[375px] max-h-[46vh] transition-transform active:scale-98"
    >
      {/* Soft warm romantic halo behind bouquet */}
      <div className="absolute top-[10%] w-60 h-60 rounded-full bg-gradient-radial from-[#F7CCD3]/65 via-[#FDF3EE]/35 to-transparent blur-3xl pointer-events-none -z-10 animate-breathe-glow" />

      {/* Swaying Bouquet Container */}
      <motion.div
        className="w-full h-full relative origin-bottom flex items-center justify-center"
        animate={
          isWobbling
            ? {
                rotate: [0, -4, 3.5, -2, 1, 0],
                scale: [1, 1.02, 0.99, 1.01, 1],
                y: [0, -5, 2, -1, 0],
              }
            : {
                rotate: [-1.4, 1.4, -1.4],
                y: [0, -3.5, 0],
              }
        }
        transition={
          isWobbling
            ? { duration: 0.85, ease: 'easeOut' }
            : { duration: 6.5, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <svg
          viewBox="0 0 310 420"
          className="w-full h-full drop-shadow-[0_16px_26px_rgba(94,25,38,0.13)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Stem Gradient */}
            <linearGradient id="bq-stem-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#385430" />
              <stop offset="35%" stopColor="#648A54" />
              <stop offset="70%" stopColor="#4D6F41" />
              <stop offset="100%" stopColor="#2F4628" />
            </linearGradient>

            {/* Leaves Gradients */}
            <linearGradient id="bq-leaf-left" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7DA26B" />
              <stop offset="50%" stopColor="#557946" />
              <stop offset="100%" stopColor="#2E4526" />
            </linearGradient>

            <linearGradient id="bq-leaf-right" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#324A29" />
              <stop offset="50%" stopColor="#5B7E4C" />
              <stop offset="100%" stopColor="#82A76F" />
            </linearGradient>

            {/* Silk Ribbon Gradient */}
            <linearGradient id="ribbon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9DFE4" />
              <stop offset="30%" stopColor="#E599A7" />
              <stop offset="70%" stopColor="#B34458" />
              <stop offset="100%" stopColor="#751A2B" />
            </linearGradient>

            <linearGradient id="gold-thread" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C5A059" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#FFF2D6" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#C5A059" stopOpacity="0.4" />
            </linearGradient>

            {/* Receptacle / Calyx Gradient */}
            <linearGradient id="bq-calyx" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#4A6A3F" />
              <stop offset="60%" stopColor="#6C8D5B" />
              <stop offset="100%" stopColor="#8A4A57" />
            </linearGradient>

            {/* PETAL PALETTES */}
            {/* 1. Ruby / Velvet Wine */}
            <linearGradient id="petal-ruby-front" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FAAEC0" />
              <stop offset="25%" stopColor="#D9415C" />
              <stop offset="65%" stopColor="#9C1E34" />
              <stop offset="100%" stopColor="#5E0F1E" />
            </linearGradient>
            <linearGradient id="petal-ruby-rear" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#781324" />
              <stop offset="100%" stopColor="#3B0710" />
            </linearGradient>

            {/* 2. Crimson / Rose */}
            <linearGradient id="petal-crimson-front" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FCD1DB" />
              <stop offset="25%" stopColor="#EE6178" />
              <stop offset="65%" stopColor="#BD2E45" />
              <stop offset="100%" stopColor="#781424" />
            </linearGradient>
            <linearGradient id="petal-crimson-rear" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#871728" />
              <stop offset="100%" stopColor="#420912" />
            </linearGradient>

            {/* 3. Blush Pink */}
            <linearGradient id="petal-blush-front" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FFF2F4" />
              <stop offset="25%" stopColor="#F5A3B3" />
              <stop offset="65%" stopColor="#DA5E74" />
              <stop offset="100%" stopColor="#942639" />
            </linearGradient>
            <linearGradient id="petal-blush-rear" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#8A2537" />
              <stop offset="100%" stopColor="#4E0D19" />
            </linearGradient>

            {/* 4. Cream / Ivory with delicate pink flush */}
            <linearGradient id="petal-cream-front" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#FDF1F3" />
              <stop offset="70%" stopColor="#F2B6C3" />
              <stop offset="100%" stopColor="#BD586C" />
            </linearGradient>
            <linearGradient id="petal-cream-rear" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#984B5B" />
              <stop offset="100%" stopColor="#5E222D" />
            </linearGradient>

            {/* 5. Soft Coral */}
            <linearGradient id="petal-coral-front" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FFE0E4" />
              <stop offset="25%" stopColor="#FA878A" />
              <stop offset="65%" stopColor="#D84457" />
              <stop offset="100%" stopColor="#8A1E2F" />
            </linearGradient>
            <linearGradient id="petal-coral-rear" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#821C2B" />
              <stop offset="100%" stopColor="#480A14" />
            </linearGradient>

            {/* Dewdrop */}
            <radialGradient id="dewdrop" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#F7C4CE" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6B1322" stopOpacity="0.7" />
            </radialGradient>
          </defs>

          {/* ================= 1. BOUQUET STEMS (ALL CONVERGE TO RIBBON BUNDLE) ================= */}
          {/* Each stem is physically drawn directly from the ribbon knot at (160, 340) up into each flower's calyx */}
          <g className="stems">
            {TULIP_SPECS.map((spec) => (
              <path
                key={`stem-${spec.id}`}
                d={`M ${spec.stemStart[0]} ${spec.stemStart[1]} Q ${spec.stemCtrl[0]} ${spec.stemCtrl[1]} ${spec.stemEnd[0]} ${spec.stemEnd[1]}`}
                stroke="url(#bq-stem-grad)"
                strokeWidth={5.5 * spec.scale}
                strokeLinecap="round"
              />
            ))}
            {/* Lower stems extending down beneath the ribbon */}
            <path d="M 148 345 L 140 405" stroke="url(#bq-stem-grad)" strokeWidth="5" strokeLinecap="round" />
            <path d="M 154 345 L 150 412" stroke="url(#bq-stem-grad)" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 160 345 L 160 416" stroke="url(#bq-stem-grad)" strokeWidth="6" strokeLinecap="round" />
            <path d="M 166 345 L 170 410" stroke="url(#bq-stem-grad)" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M 172 345 L 180 404" stroke="url(#bq-stem-grad)" strokeWidth="5" strokeLinecap="round" />
          </g>

          {/* ================= 2. BOTANICAL WRAPPING FOLIAGE (LEAVES) ================= */}
          {/* Left sweeping leaf */}
          <path
            d="M 150 340 C 110 320, 40 260, 35 180 C 45 195, 75 240, 110 270 C 135 290, 148 325, 150 340 Z"
            fill="url(#bq-leaf-left)"
            opacity="0.95"
          />
          {/* Left leaf spine highlight */}
          <path
            d="M 150 340 C 115 320, 50 260, 42 188"
            stroke="#9BC288"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Right sweeping leaf */}
          <path
            d="M 170 340 C 210 320, 275 260, 280 180 C 270 195, 240 240, 205 270 C 180 290, 172 325, 170 340 Z"
            fill="url(#bq-leaf-right)"
            opacity="0.95"
          />
          {/* Right leaf spine highlight */}
          <path
            d="M 170 340 C 205 320, 265 260, 273 188"
            stroke="#A7CF93"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Inner accent leaves framing the bouquet */}
          <path
            d="M 155 330 C 130 290, 95 240, 98 170 C 105 190, 120 235, 148 275 Z"
            fill="url(#bq-leaf-left)"
            opacity="0.85"
          />
          <path
            d="M 165 330 C 190 290, 220 240, 218 170 C 210 190, 195 235, 172 275 Z"
            fill="url(#bq-leaf-right)"
            opacity="0.85"
          />

          {/* ================= 3. THE 8 TULIP BLOOMS (SEAMLESSLY ATTACHED TO STEM ENDS) ================= */}
          {TULIP_SPECS.map((spec) => {
            const frontGrad = `url(#petal-${spec.type}-front)`;
            const rearGrad = `url(#petal-${spec.type}-rear)`;

            return (
              <g
                key={`bloom-${spec.id}`}
                transform={`translate(${spec.cx}, ${spec.cy}) rotate(${spec.angle}) scale(${spec.scale})`}
                className="transition-transform active:scale-105"
                style={{ transformOrigin: '0px 25px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBouquetTap(e, spec.id);
                }}
              >
                {/* 3A. Seamless Calyx / Receptacle Neck:
                    Connects directly to the stem top at (0, 25..30) */}
                <path
                  d="M -7 25 C -5 20, -3 16, 0 16 C 3 16, 5 20, 7 25 C 4 28, -4 28, -7 25 Z"
                  fill="url(#bq-calyx)"
                />

                {/* 3B. Rear Inner Petals (Deep Velvety Shadow) */}
                <path
                  d="M -16 14 C -22 -6, -18 -32, 0 -44 C 18 -32, 22 -6, 16 14 C 8 18, -8 18, -16 14 Z"
                  fill={rearGrad}
                />

                {/* 3C. Left Flank Petal (Curving in) */}
                <path
                  d="M -17 16 C -29 6, -30 -16, -16 -34 C -11 -38, -6 -32, -4 -16 C -3 2, -10 12, -17 16 Z"
                  fill={frontGrad}
                />

                {/* 3D. Right Flank Petal (Overlapping) */}
                <path
                  d="M 17 16 C 29 6, 30 -16, 16 -34 C 11 -38, 6 -32, 4 -16 C 3 2, 10 12, 17 16 Z"
                  fill={frontGrad}
                />

                {/* 3E. Center Front Tulip Petal (Magnificent Velvety Cup) */}
                <path
                  d="M -13 18 C -22 6, -20 -18, -10 -36 C -4 -46, 4 -46, 10 -36 C 20 -18, 22 6, 13 18 C 7 22, -7 22, -13 18 Z"
                  fill={frontGrad}
                />

                {/* 3F. Petal Top Rim Translucency */}
                <path
                  d="M -8 -34 C -3 -44, 3 -44, 8 -34 C 5 -38, -5 -38, -8 -34 Z"
                  fill="#FFF5F7"
                  opacity="0.8"
                />

                {/* 3G. Subtle Dewdrop on prominent center tulip */}
                {spec.id === 8 && (
                  <circle cx="-3" cy="-10" r="2.2" fill="url(#dewdrop)" />
                )}
              </g>
            );
          })}

          {/* ================= 4. LUXURY FLORIST SILK RIBBON & BOW ================= */}
          {/* Band gathering the stems at (160, 340) */}
          <path
            d="M 136 333 C 148 330, 172 330, 184 333 L 186 348 C 172 345, 148 345, 134 348 Z"
            fill="url(#ribbon-grad)"
          />
          {/* Gold filament accent line */}
          <path
            d="M 135 340 C 150 338, 170 338, 185 340"
            stroke="url(#gold-thread)"
            strokeWidth="1.8"
          />

          {/* Left Ribbon Bow Loop */}
          <path
            d="M 160 340 C 145 328, 118 332, 122 348 C 126 360, 148 350, 160 342 Z"
            fill="url(#ribbon-grad)"
          />
          {/* Right Ribbon Bow Loop */}
          <path
            d="M 160 340 C 175 328, 202 332, 198 348 C 194 360, 172 350, 160 342 Z"
            fill="url(#ribbon-grad)"
          />

          {/* Bow Center Knot */}
          <ellipse cx="160" cy="341" rx="6" ry="5.5" fill="#5E1422" />
          <ellipse cx="160" cy="341" rx="4.5" ry="4" fill="url(#ribbon-grad)" />

          {/* Ribbon Tails flowing downwards */}
          <path
            d="M 158 345 C 154 365, 140 380, 136 400 C 140 395, 150 375, 158 350 Z"
            fill="url(#ribbon-grad)"
            opacity="0.9"
          />
          <path
            d="M 162 345 C 166 365, 178 382, 184 402 C 180 395, 170 375, 162 350 Z"
            fill="url(#ribbon-grad)"
            opacity="0.9"
          />
        </svg>

        {/* Small sparkling golden stars floating around bouquet */}
        <div className="absolute top-[6%] left-[6%] text-[#C5A059] opacity-75 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <div className="absolute top-[20%] right-[4%] text-[#E8A0AC] opacity-70 animate-pulse delay-500">
          <Sparkles className="w-4 h-4" />
        </div>
      </motion.div>

      {/* Subtle touch cue underneath */}
      <span className="text-[11px] font-light tracking-[0.22em] uppercase text-[#9E6D74] mt-1 flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
        <span>Gullarga teginib ko‘ring</span>
        <span className="text-xs">✨</span>
      </span>
    </div>
  );
}
