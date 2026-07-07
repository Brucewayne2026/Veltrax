"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import type { BadgeCategory } from "@/components/three/BadgeCoin";

const BadgeCoinCanvas = dynamic(() => import("@/components/three/BadgeCoinCanvas"), {
  ssr: false,
});

const CATEGORIES: { id: BadgeCategory; label: string }[] = [
  { id: "streak", label: "Streak" },
  { id: "points", label: "Points" },
  { id: "anniversary", label: "Anniversary" },
  { id: "special", label: "Special" },
];

export default function BadgeCoinShowcase() {
  const [category, setCategory] = useState<BadgeCategory>("points");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
      className="mx-auto mt-14 flex max-w-md flex-col items-center gap-5"
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 dark:text-white/40 light:text-black/40">
        Drag to inspect · a real badge, not a mockup
      </span>

      <BadgeCoinCanvas category={category} />

      <div className="flex flex-wrap items-center justify-center gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCategory(c.id)}
            aria-pressed={category === c.id}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-300 ${
              category === c.id
                ? "border-[#4F8CFF]/50 bg-[#4F8CFF]/15 text-white dark:text-white light:text-black"
                : "border-white/10 bg-white/[0.02] text-white/50 hover:text-white/80 dark:border-white/10 dark:bg-white/[0.02] dark:text-white/50 dark:hover:text-white/80 light:border-black/10 light:bg-black/[0.02] light:text-black/50 light:hover:text-black/80"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <p className="max-w-xs text-center text-xs text-white/35 dark:text-white/35 light:text-black/40">
        Each category gets its own material treatment server-side — this coin
        renders the same way the app does, just with sample data.
      </p>
    </motion.div>
  );
}
