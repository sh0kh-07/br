import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Lightweight, graceful petal count (14 petals) — buttery smooth 60fps on mobile without lag
const AMBIENT_PETAL_COUNT = 14;

const PETAL_COLORS = [
  '#E64C65', // vibrant crimson
  '#F07188', // coral rose
  '#F79EB0', // blush pink
  '#FBCCD7', // soft pastel petal
  '#D93856', // deep tulip petal
];

export default function PetalBackground({ cascadeActive = false, bursts = [] }) {
  // Generate stable, lightweight ambient petals
  const ambientPetals = useMemo(() => {
    return Array.from({ length: AMBIENT_PETAL_COUNT }).map((_, i) => {
      const left = (i / AMBIENT_PETAL_COUNT) * 94 + (Math.sin(i * 3) * 3 + 3);
      const width = 24 + ((i * 7) % 16); // 24px - 40px elegant size
      const height = width * 1.45;
      const duration = 9 + ((i * 5) % 8); // 9s - 16s calm drift
      const delay = (i * 0.7) % 7;
      const color = PETAL_COLORS[i % PETAL_COLORS.length];
      const driftX = (i % 2 === 0 ? 1 : -1) * (20 + (i % 25));

      return {
        id: `amb-${i}`,
        left: `${left}%`,
        width,
        height,
        duration,
        delay,
        color,
        driftX,
        rotateStart: (i * 35) % 360,
      };
    });
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-10"
      style={{ willChange: 'transform' }}
    >
      {/* 1. Ambient Gently Drifting Petals (Floating in background behind text) */}
      {ambientPetals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute top-[-80px]"
          style={{
            left: petal.left,
            width: petal.width,
            height: petal.height,
            willChange: 'transform, opacity',
          }}
          initial={{ y: -80, opacity: 0, rotate: petal.rotateStart }}
          animate={{
            y: ['0vh', '115vh'],
            x: [0, petal.driftX, -petal.driftX * 0.5, petal.driftX * 0.8],
            rotate: [petal.rotateStart, petal.rotateStart + 180, petal.rotateStart + 360],
            opacity: [0, 0.85, 0.9, 0],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: 'linear',
          }}
        >
          <svg
            viewBox="0 0 32 46"
            className="w-full h-full drop-shadow-[0_4px_8px_rgba(180,40,65,0.12)]"
            fill="none"
          >
            <path
              d="M 16 1 C 5 7, 0 20, 1 31 C 2 40, 10 45, 16 45 C 22 45, 30 40, 31 31 C 32 20, 27 7, 16 1 Z"
              fill={petal.color}
            />
            {/* Soft inner petal luster */}
            <path
              d="M 16 5 C 10 11, 7 22, 9 32 C 11 39, 15 42, 16 42"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.35"
            />
          </svg>
        </motion.div>
      ))}

      {/* 2. Opening Cascade Petals (Lightweight 12 petals when opened) */}
      {cascadeActive &&
        Array.from({ length: 12 }).map((_, i) => {
          const left = 5 + (i * 8);
          const width = 26 + (i % 14);
          const height = width * 1.45;
          const color = PETAL_COLORS[(i + 2) % PETAL_COLORS.length];

          return (
            <motion.div
              key={`cascade-${i}`}
              className="absolute top-[-70px]"
              style={{
                left: `${left}%`,
                width,
                height,
                willChange: 'transform, opacity',
              }}
              initial={{ y: -70, opacity: 0, scale: 0.7 }}
              animate={{
                y: ['0vh', '115vh'],
                x: [0, (i % 2 === 0 ? 30 : -30)],
                rotate: [0, (i % 2 === 0 ? 360 : -360)],
                opacity: [0, 0.9, 0.85, 0],
                scale: [0.7, 1, 0.95],
              }}
              transition={{
                duration: 6 + (i % 4),
                delay: i * 0.18,
                ease: 'easeOut',
              }}
            >
              <svg viewBox="0 0 32 46" className="w-full h-full drop-shadow-[0_4px_8px_rgba(180,40,65,0.12)]" fill="none">
                <path
                  d="M 16 1 C 5 7, 0 20, 1 31 C 2 40, 10 45, 16 45 C 22 45, 30 40, 31 31 C 32 20, 27 7, 16 1 Z"
                  fill={color}
                />
              </svg>
            </motion.div>
          );
        })}

      {/* 3. Interactive Bursts (Gentle, lightweight petals on tap) */}
      <AnimatePresence>
        {bursts.map((b) => (
          <motion.div
            key={b.id}
            className="absolute top-0 left-0"
            style={{
              width: b.size,
              height: b.size * 1.45,
              willChange: 'transform, opacity',
            }}
            initial={{
              x: b.x - b.size / 2,
              y: b.y,
              opacity: 0.95,
              scale: 0.8,
              rotate: b.rotation,
            }}
            animate={{
              x: b.x + b.dx,
              y: b.y + b.dy + 80,
              opacity: 0,
              scale: 1.05,
              rotate: b.rotation + 180,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <svg viewBox="0 0 32 46" className="w-full h-full drop-shadow-[0_4px_6px_rgba(180,40,65,0.1)]" fill="none">
              <path
                d="M 16 1 C 5 7, 0 20, 1 31 C 2 40, 10 45, 16 45 C 22 45, 30 40, 31 31 C 32 20, 27 7, 16 1 Z"
                fill={b.color || '#E64C65'}
              />
              <path
                d="M 16 6 C 11 12, 8 22, 10 32 C 12 38, 15 41, 16 41"
                stroke="#FFFFFF"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
