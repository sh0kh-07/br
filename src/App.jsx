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

    // Initial celebratory petal shower (lightweight: 12 petals for smooth 60fps)
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.3;
    const initialBurst = Array.from({ length: 12 }).map((_, i) => {
      const angle = (i / 12) * Math.PI * 2 + (Math.random() * 0.2 - 0.1);
      const distance = 60 + Math.random() * 90;
      return {
        id: `open-${Date.now()}-${i}`,
        x: centerX,
        y: centerY,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance + 35,
        size: 26 + (i % 12),
        rotation: (i * 30) % 360,
        color: ['#E64C65', '#F07188', '#F79EB0', '#D93856'][i % 4],
      };
    });

    setBursts((prev) => [...prev, ...initialBurst]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => !initialBurst.some((ib) => ib.id === b.id)));
    }, 2200);
  };

  // Trigger smooth, lightweight petal drift when flowers are tapped (8 petals)
  const handleFlowerTap = (coords) => {
    const x = coords?.x || window.innerWidth / 2;
    const y = coords?.y || window.innerHeight * 0.45;

    const newBursts = Array.from({ length: 8 }).map((_, i) => {
      const angle = (i / 8) * Math.PI * 2 + (Math.random() * 0.3 - 0.15);
      const distance = 45 + Math.random() * 70;
      return {
        id: `flower-${Date.now()}-${i}-${Math.random()}`,
        x,
        y,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance - 20,
        size: 26 + (i % 10),
        rotation: (i * 45) % 360,
        color: ['#E64C65', '#F07188', '#F79EB0', '#D93856'][i % 4],
      };
    });

    setBursts((prev) => [...prev.slice(-16), ...newBursts]);

    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => !newBursts.some((nb) => nb.id === b.id)));
    }, 2100);
  };

  const handleLoveBurst = (coords) => {
    const x = coords?.x || window.innerWidth / 2;
    const y = coords?.y || window.innerHeight * 0.8;

    const newBursts = Array.from({ length: 8 }).map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const distance = 50 + Math.random() * 75;
      return {
        id: `love-${Date.now()}-${i}-${Math.random()}`,
        x,
        y,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance - 30,
        size: 26 + (i % 10),
        rotation: (i * 45) % 360,
        color: '#E64C65',
      };
    });

    setBursts((prev) => [...prev.slice(-16), ...newBursts]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => !newBursts.some((nb) => nb.id === b.id)));
    }, 2100);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-white text-[#2D2325] selection:bg-[#F2D7DC] selection:text-[#3B1E22] relative overflow-hidden flex justify-center">
      {/* 
        Background Petal Layer (z-10):
        Floats on pure white background, behind texts and cards ("липистки на фоне надписей")
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

      {/* Main Experience Layout (z-20 so typography and cards are crisp on top) */}
      <div className="w-full max-w-[430px] min-h-[100dvh] flex flex-col relative z-20 bg-transparent">
        <MainExperience
          onFlowerTap={handleFlowerTap}
          onLoveBurst={handleLoveBurst}
        />
      </div>
    </div>
  );
}
