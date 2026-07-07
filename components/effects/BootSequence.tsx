"use client";

// The one deliberately orchestrated scroll moment on the page. Everywhere
// else on the site uses the same small fade/slide-up on scroll — fine, but
// unremarkable. This is the single seam where motion does real work: as
// the visitor crosses from the hero into the stats strip, a faint grid
// "compiles" — lines sharpen and a handful of points light up in sequence,
// like a system finishing a boot check. Runs once, respects reduced motion.

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const POINTS = [
  { x: "12%", y: "30%", delay: 0 },
  { x: "28%", y: "65%", delay: 0.08 },
  { x: "46%", y: "20%", delay: 0.16 },
  { x: "58%", y: "70%", delay: 0.24 },
  { x: "74%", y: "35%", delay: 0.32 },
  { x: "88%", y: "60%", delay: 0.4 },
];

export default function BootSequence() {
  const ref = useRef<HTMLDivElement>(null);
  const inViewRaw = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();
  // Reduced-motion visitors still get the end state (sharpened grid, lit
  // points, "System online") — just without the sweep/stagger getting there.
  const inView = reduceMotion || inViewRaw;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none relative h-24 overflow-hidden sm:h-32"
    >
      {/* Grid that sharpens from faint to defined */}
      <motion.div
        initial={{ opacity: 0.02 }}
        animate={inView ? { opacity: 0.06 } : {}}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Scan line sweeping once, left to right */}
      <motion.div
        initial={{ x: "-10%", opacity: 0 }}
        animate={inView ? { x: "110%", opacity: [0, 1, 1, 0] } : {}}
        transition={{ duration: 1.1, ease: "easeInOut" }}
        className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-[#47D7FF]/70 to-transparent"
      />

      {/* Data points lighting up in sequence */}
      {POINTS.map((p, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={inView ? { opacity: [0, 1, 0.5], scale: [0.4, 1.3, 1] } : {}}
          transition={{ duration: 0.6, delay: 0.5 + p.delay, ease: "easeOut" }}
          className="absolute h-1.5 w-1.5 rounded-full bg-[#4F8CFF] shadow-[0_0_8px_2px_rgba(79,140,255,0.6)]"
          style={{ left: p.x, top: p.y }}
        />
      ))}

      {/* Center readout line, appears once the sweep finishes */}
      <motion.span
        initial={{ opacity: 0, y: 6 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 dark:text-white/25 light:text-black/30"
      >
        System online
      </motion.span>
    </div>
  );
}