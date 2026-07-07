"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  const handleExplore = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.8 }}
      className="absolute bottom-24 left-1/2 z-20 -translate-x-1/2"
    >
      <button
        type="button"
        onClick={handleExplore}
        aria-label="Scroll to explore"
        className="flex flex-col items-center gap-2 cursor-pointer"
      >
        <span className="text-xs tracking-[3px] uppercase text-white/60 dark:text-white/60 light:text-black/50">
          Explore Further
        </span>

        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/8 hover:border-white/12 hover:bg-white/10 transition-all duration-300 dark:bg-white/5 dark:border-white/8 dark:hover:border-white/12 dark:hover:bg-white/10 light:bg-black/5 light:border-black/10 light:hover:border-black/20 light:hover:bg-black/10"
        >
          <ChevronDown className="h-4 w-4 text-white/80 transition-transform duration-300 dark:text-white/80 light:text-black/60" />
        </motion.div>

        <div className="flex space-x-2 mt-2">
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-1 h-1 bg-white/50 rounded-full dark:bg-white/50 light:bg-black/40"
              style={{
                animationDelay: `${i * 0.2}s`,
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
          ))}
        </div>
      </button>
    </motion.div>
  );
}