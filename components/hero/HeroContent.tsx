"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import CTAButtons from "./CTAButtons";

export default function HeroContent() {
  // Mouse parallax via motion values — no React re-renders on mousemove
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(((e.clientX / window.innerWidth) - 0.5) * 16);
      rawY.set(((e.clientY / window.innerHeight) - 0.5) * 16);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [rawX, rawY]);

  return (
    <div className="relative z-20 flex min-h-screen items-center justify-center pb-20">
      <div className="relative w-full max-w-7xl px-6">
        <motion.div style={{ x, y }} className="pointer-events-none flex flex-col items-center text-center">

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-6 max-w-4xl font-[family-name:var(--font-heading)]"
          >
            <span className="mb-2 block text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl dark:text-white light:text-black">
              Track work the way it
            </span>
            <span className="block text-4xl font-black leading-tight text-gradient sm:text-5xl lg:text-6xl">
              actually happens
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-10 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg lg:text-xl dark:text-white/65 light:text-black/65"
          >
            Live session tracking, leave management, and an AI assistant with real,
            role-scoped access to your data — running on the same production system
            a real team relies on every day.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="pointer-events-auto flex flex-wrap justify-center gap-6"
          >
            <CTAButtons />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}