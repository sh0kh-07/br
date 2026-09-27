import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import OpeningScreen from './sections/OpeningScreen';
import MainExperience from './sections/MainExperience';
import PetalBackground from './components/PetalBackground';

export default function App() {
  const [hasOpened, setHasOpened] = useState(false);
  const [cascadeActive, setCascadeActive] = useState(false);
  const [bursts, setBursts] = useState([]);

  const handleOpen = () => {
    setHasOpened(true);
    setCascadeActive(true);

    // Initial celebratory petal shower burst from center & top
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.35;
    
    // Radial burst + falling curtain of petals
    const initialBurst = [
      ...Array.from({ length: 24 }).map((_, i) => {
        const angle = (i / 24) * Math.PI * 2 + (Math.random() * 0.2 - 0.1);
        const distance = 80 + Math.random() * 140;
        return {
          id: `open-rad-${Date.now()}-${i}`,
          x: centerX,
          y: centerY,
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance + 50,
          size: 28 + Math.random() * 18, // 28px - 46px
          rotation: Math.random() * 360,
          duration: 2.6,
          color: ['#E25B71', '#CB3550', '#F492A3', '#FFF0F3'][i % 4],
        };
      }),
      // Top falling shower right across the card
      ...Array.from({ length: 16 }).map((_, i) => ({
        id: `open-top-${Date.now()}-${i}`,
        x: (i * 6.2 + Math.random() * 4) * (window.innerWidth / 100),
        y: -30,
        dx: (Math.random() - 0.5) * 80,
        dy: window.innerHeight * 0.8 + Math.random() * 150,
        size: 30 + Math.random() * 16,
        rotation: Math.random() * 360,
        duration: 3.2 + Math.random() * 1.5,
        color: ['#E25B71', '#CB3550', '#F492A3', '#991E33'][i % 4],
      })),
    ];

    setBursts((prev) => [...prev, ...initialBurst]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => !initialBurst.some((ib) => ib.id === b.id)));
    }, 4500);
  };

  // Trigger floating petal shower right on top of the flowers and card when tapped
  const handleFlowerTap = (coords) => {
    const x = coords?.x || window.innerWidth / 2;
    const y = coords?.y || window.innerHeight * 0.42;

    const newPetals = [
      // 1. Petals bursting directly outwards from the touch point
      ...Array.from({ length: 14 }).map((_, i) => {
        const angle = (i / 14) * Math.PI * 2 + (Math.random() * 0.3 - 0.15);
        const distance = 60 + Math.random() * 110;
        return {
          id: `flower-rad-${Date.now()}-${i}-${Math.random()}`,
          x,
          y,
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance - 25,
          size: 26 + Math.random() * 18, // 26px - 44px
          rotation: Math.random() * 360,
          duration: 2.5,
          color: ['#E25B71', '#CB3550', '#F492A3', '#FAAEC0'][i % 4],
        };
      }),
      // 2. Extra large petals falling DOWN directly across the flower and card
      ...Array.from({ length: 10 }).map((_, i) => ({
        id: `flower-fall-${Date.now()}-${i}-${Math.random()}`,
        x: Math.max(20, Math.min(window.innerWidth - 40, x + (i - 5) * 28 + (Math.random() * 20 - 10))),
        y: Math.max(0, y - 180 - Math.random() * 80),
        dx: (Math.random() - 0.5) * 60,
        dy: 260 + Math.random() * 120, // Rains down over the flower
        size: 30 + Math.random() * 16, // 30px - 46px
        rotation: Math.random() * 360,
        duration: 2.8 + Math.random() * 0.8,
        color: ['#E25B71', '#CB3550', '#F492A3', '#991E33'][i % 4],
      })),
    ];

    setBursts((prev) => [...prev.slice(-35), ...newPetals]);

    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => !newPetals.some((nb) => nb.id === b.id)));
    }, 3600);
  };

  const handleLoveBurst = (coords) => {
    const x = coords?.x || window.innerWidth / 2;
    const y = coords?.y || window.innerHeight * 0.85;

    const newBursts = [
      ...Array.from({ length: 18 }).map((_, i) => {
        const angle = (i / 18) * Math.PI * 2 + (Math.random() * 0.25 - 0.12);
        const distance = 80 + Math.random() * 120;
        return {
          id: `love-${Date.now()}-${i}-${Math.random()}`,
          x,
          y,
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance - 50,
          size: 28 + Math.random() * 18,
          rotation: Math.random() * 360,
          duration: 2.6,
          color: ['#CB3550', '#E25B71', '#F492A3'][i % 3],
        };
      }),
      // Top shower down
      ...Array.from({ length: 10 }).map((_, i) => ({
        id: `love-top-${Date.now()}-${i}`,
        x: (i * 10 + 5) * (window.innerWidth / 100),
        y: -20,
        dx: (Math.random() - 0.5) * 50,
        dy: window.innerHeight * 0.75,
        size: 32 + Math.random() * 16,
        rotation: Math.random() * 360,
        duration: 3.0,
        color: ['#CB3550', '#E25B71', '#991E33'][i % 3],
      })),
    ];

    setBursts((prev) => [...prev.slice(-35), ...newBursts]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => !newBursts.some((nb) => nb.id === b.id)));
    }, 3600);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#FAF7F2] text-[#2D2325] selection:bg-[#E8C4C4] selection:text-[#3B1E22] relative overflow-hidden flex justify-center">
      {/* 
        Background & Foreground Petal Rain Layer:
        z-35 with pointer-events-none ensures petals float DIRECTLY OVER the flower and card
        on all phone screens without blocking interactions!
      */}
      <PetalBackground
        cascadeActive={cascadeActive}
        bursts={bursts}
      />

      {/* Intro Curtain Screen */}
      <AnimatePresence>
        {!hasOpened && (
          <OpeningScreen onOpen={handleOpen} />
        )}
      </AnimatePresence>

      {/* Main Single-Screen Experience Layout (Mobile-first centered column 390px - 440px) */}
      <div className="w-full max-w-[440px] h-[100dvh] max-h-[100dvh] flex flex-col relative z-20 shadow-[0_0_50px_rgba(94,25,38,0.03)] sm:border-x sm:border-[#F0E5E7] bg-[#FAF7F2] overflow-hidden">
        <MainExperience
          onFlowerTap={handleFlowerTap}
          onLoveBurst={handleLoveBurst}
        />
      </div>
    </div>
  );
}
