import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

// Decorative red light beams, adapted from the "Background Beams" pattern.
// Pure SVG + framer-motion; weighted to the right side (near the scan card).
const paths = [
  "M-60 340C80 300 260 260 420 200C580 140 700 60 860 -20",
  "M-40 380C120 330 300 300 470 240C640 180 760 110 900 30",
  "M-80 420C100 380 320 360 500 300C680 240 800 170 940 90",
  "M20 460C200 420 380 400 560 340C720 290 840 230 980 150",
  "M-100 300C60 270 220 220 380 150C520 90 640 20 780 -60",
  "M100 500C280 460 460 440 620 380C760 330 880 270 1000 200",
];

export function BackgroundBeams({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_70%_60%_at_75%_50%,black,transparent)]",
        className,
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 900 500"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {paths.map((d, i) => (
          <path key={`base-${i}`} d={d} className="stroke-primary" strokeOpacity="0.12" strokeWidth="1" />
        ))}
        {paths.map((d, i) => (
          <path key={`beam-${i}`} d={d} stroke={`url(#beam-grad-${i})`} strokeWidth="2" strokeLinecap="round" />
        ))}
        <defs>
          {paths.map((_, i) =>
            reduce ? (
              <linearGradient key={i} id={`beam-grad-${i}`} x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
                <stop offset="70%" stopColor="var(--primary)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
              </linearGradient>
            ) : (
              <motion.linearGradient
                key={i}
                id={`beam-grad-${i}`}
                gradientUnits="userSpaceOnUse"
                initial={{ x1: -200, x2: -50, y1: 0, y2: 0 }}
                animate={{ x1: [ -200, 1000 ], x2: [ -50, 1150 ] }}
                transition={{
                  duration: 7 + (i % 3) * 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: i * 0.9,
                }}
              >
                <stop stopColor="var(--primary)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="var(--primary-strong)" stopOpacity="0" />
              </motion.linearGradient>
            ),
          )}
        </defs>
      </svg>
    </motion.div>
  );
}
