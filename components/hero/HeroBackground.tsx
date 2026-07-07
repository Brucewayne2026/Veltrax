"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

export default function HeroBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <div ref={ref} className="absolute inset-0">
      {/* Base Background */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(circle at 50% 40%, #050816 0%, #02040a 100%)"
            : "radial-gradient(circle at 50% 40%, #f8fafc 0%, #e2e8f0 100%)",
        }}
      />

      {/* Central Glow - Soft Light */}
      <div className="absolute left-1/2 top-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/5 via-cyan-500/10 to-violet-500/5 blur-3xl" />

      {/* Secondary Glows — animation only runs while the hero is on screen */}
      <motion.div
        animate={
          inView
            ? {
                x: [-60, 60, -60],
                y: [-30, 30, -30],
                scale: [0.9, 1.1, 0.9],
              }
            : {}
        }
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[-200px] top-[-100px] h-[700px] w-[700px] rounded-full bg-blue-600/15 blur-[120px]"
      />

      <motion.div
        animate={
          inView
            ? {
                x: [60, -60, 60],
                y: [30, -30, 30],
                scale: [0.8, 1.2, 0.8],
              }
            : {}
        }
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-200px] bottom-[-100px] h-[700px] w-[700px] rounded-full bg-violet-600/10 blur-[140px]"
      />

      {/* Depth fade to next section */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 dark:to-black/40 light:to-white/60" />
    </div>
  );
}