import React, { useMemo } from 'react';
import { motion } from 'motion/react';

// Luxury Tulip Petal SVG: Larger, vivid, richly shaded with organic folds & soft dropshadow
const LuxuryPetal = ({ color, size, rotation, opacity, variant = 0 }) => {
  const gradientId = `lux-petal-grad-${variant}-${color.replace('#', '')}`;

  return (
    <svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 36 54"
      fill="none"
      style={{
        transform: `rotate(${rotation}deg)`,
        filter: 'drop-shadow(0 6px 14px rgba(74, 15, 26, 0.22))',
      }}
    >
      <defs>
        <linearGradient id={gradientId} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#FFF2F4" stopOpacity="0.95" />
          <stop offset="20%" stopColor={color} stopOpacity="0.95" />
          <stop offset="65%" stopColor={color} stopOpacity="0.88" />
          <stop offset="100%" stopColor="#540C18" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id={`sheen-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Main realistic curved petal path */}
      <path
        d="M 18 0 C 28 8, 36 24, 32 40 C 28 52, 8 52, 4 40 C 0 24, 8 8, 18 0 Z"
        fill={`url(#${gradientId})`}
        opacity={opacity}
      />

      {/* Elegant center spine satin sheen */}
      <path
        d="M 18 6 C 24 16, 26 28, 22 42 C 18 32, 16 18, 18 6 Z"
        fill={`url(#sheen-${gradientId})`}
      />

      {/* Soft translucent edge glow */}
      <path
        d="M 18 1 C 26 9, 34 23, 31 38 C 29 25, 24 11, 18 1 Z"
        fill="#FFFFFF"
        opacity={0.35}
      />
    </svg>
  );
};

export default function PetalBackground({ cascadeActive = false, bursts = [] }) {
  // 1. Ambient continuous drifting petals (Large & vivid: 26px to 44px)
  const ambientPetals = useMemo(() => {
    const colors = [
      '#E25B71', // bright tulip ruby
      '#F492A3', // lush blush pink
      '#CB3550', // deep velvet crimson
      '#FAAEC0', // soft rose
      '#991E33', // dark burgundy
      '#FFF0F3', // creamy bridal pink
    ];

    return Array.from({ length: 32 }).map((_, i) => ({
      id: `ambient-${i}`,
      left: (i * 3.1 + Math.random() * 4) % 100,
      size: 26 + (i % 5) * 4 + Math.random() * 6, // Larger petals (26px - 46px)
      duration: 7 + (i % 6) * 1.8 + Math.random() * 3,
      delay: -(i * 0.4 + Math.random() * 5),
      color: colors[i % colors.length],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 320,
      driftX: (Math.random() - 0.5) * 140,
      opacity: 0.55 + (i % 4) * 0.12,
      variant: i % 4,
    }));
  }, []);

  // 2. Opening & On-Demand Cascade Petals (Large & dense: 28px to 50px)
  const cascadePetals = useMemo(() => {
    if (!cascadeActive) return [];
    const colors = ['#E25B71', '#CB3550', '#F492A3', '#FAAEC0', '#8C192E', '#FFF0F3'];

    return Array.from({ length: 50 }).map((_, i) => ({
      id: `cascade-${i}`,
      left: (i * 2 + Math.random() * 3) % 100,
      size: 28 + (i % 6) * 4 + Math.random() * 8, // 28px - 52px
      duration: 4.2 + Math.random() * 4,
      delay: (i * 0.05) + Math.random() * 0.35,
      color: colors[i % colors.length],
      rotation: Math.random() * 360,
      driftX: (Math.random() - 0.5) * 180,
      opacity: 0.75 + Math.random() * 0.25,
      variant: i % 4,
    }));
  }, [cascadeActive]);

  return (
    // Note: z-35 ensures petals fall IN FRONT of the flower card, but behind modals (z-50)
    <div className="fixed inset-0 pointer-events-none z-35 overflow-hidden">
      {/* Ambient Petals floating gently over everything */}
      {ambientPetals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute -top-20"
          style={{ left: `${p.left}%` }}
          animate={{
            y: ['0vh', '118vh'],
            x: [0, p.driftX, 0],
            rotate: [p.rotation, p.rotation + p.rotSpeed],
            scale: [0.92, 1.08, 0.95],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        >
          <LuxuryPetal
            color={p.color}
            size={p.size}
            rotation={p.rotation}
            opacity={p.opacity}
            variant={p.variant}
          />
        </motion.div>
      ))}

      {/* Massive Shower of Falling Petals on Opening / Trigger */}
      {cascadeActive &&
        cascadePetals.map((cp) => (
          <motion.div
            key={cp.id}
            className="absolute -top-24"
            style={{ left: `${cp.left}%` }}
            initial={{ y: '-10vh', opacity: 0 }}
            animate={{
              y: ['0vh', '120vh'],
              x: [0, cp.driftX, cp.driftX * 0.5],
              rotate: [cp.rotation, cp.rotation + 420],
              opacity: [0, cp.opacity, cp.opacity, 0],
            }}
            transition={{
              duration: cp.duration,
              delay: cp.delay,
              ease: 'easeInOut',
            }}
          >
            <LuxuryPetal
              color={cp.color}
              size={cp.size}
              rotation={cp.rotation}
              opacity={cp.opacity}
              variant={cp.variant}
            />
          </motion.div>
        ))}

      {/* Dynamic Interactive Petals (Flying from touch & tumbling down over the flowers & card) */}
      {bursts.map((b) => (
        <motion.div
          key={b.id}
          className="absolute"
          style={{ left: b.x, top: b.y }}
          initial={{
            opacity: 0,
            scale: 0.4,
            x: 0,
            y: 0,
            rotate: b.rotation,
          }}
          animate={{
            opacity: [0, 1, 0.95, 0],
            scale: [0.4, 1.15, 1, 0.9],
            x: [0, b.dx * 0.7, b.dx],
            y: [0, b.dy, b.dy + 80], // falls down gracefully over the flower
            rotate: [b.rotation, b.rotation + 220],
          }}
          transition={{
            duration: b.duration || 2.4,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <LuxuryPetal
            color={b.color}
            size={b.size}
            rotation={b.rotation}
            opacity={0.95}
            variant={0}
          />
        </motion.div>
      ))}
    </div>
  );
}
