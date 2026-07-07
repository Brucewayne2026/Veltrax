"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import VideoModal from "@/components/shared/VideoModal";

export default function CTAButtons() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="flex flex-wrap items-center justify-center gap-6"
      >
        {/* Primary CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 px-8 py-4 text-base font-semibold bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 text-white rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 backdrop-blur-xl border border-white/10"
        >
          Get Started
          <ArrowRight className="h-4 w-4" />
        </motion.button>

        {/* Secondary CTA Button */}
        <motion.button
          onClick={() => setIsVideoOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 px-8 py-4 text-base font-semibold border border-white/8 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 hover:border-white/12 transition-all duration-300 rounded-xl hover:shadow-lg dark:border-white/8 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:hover:border-white/12 light:border-black/10 light:bg-black/5 light:text-black light:hover:bg-black/10 light:hover:border-black/15"
        >
          Watch Demo
          <Play className="h-4 w-4" />
        </motion.button>
      </motion.div>

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoSrc="/video/admin.mp4"
      />
    </>
  );
}
