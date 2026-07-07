"use client";

import { motion, useTransform } from "framer-motion";
import { useViewportScroll } from "framer-motion";

export default function FloatingLogo() {
  const { scrollYProgress } = useViewportScroll();
  
  // Make logo float based on scroll position
  const floatOffset = useTransform(scrollYProgress, [0, 0.3], [0, 20]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute top-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2"
      >
        {/* Animated Logo */}
        <motion.div
          className="w-12 h-12"
          style={{
            transform: `translateY(${floatOffset}px)`
          }}
        >
          {/* Outer Glow */}
          <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-blue-400/20 via-cyan-400/15 to-violet-400/20 blur-3xl animate-pulse-slow" />
          
          {/* Logo Icon */}
          <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-white/5 backdrop-blur-xl rounded-xl border border-white/8 shadow-inner-lg">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white/20 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
          </div>
          
          {/* Floating Particles */}
          <div className="absolute -z-0 inset-0 pointer-events-none">
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-400/50 rounded-full animate-float" style={{ animationDelay: "0s" }}></div>
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-cyan-400/50 rounded-full animate-float" style={{ animationDelay: "0.5s" }}></div>
            <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-violet-400/50 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
          </div>
        </motion.div>
        
        {/* Brand Name */}
        <div className="flex flex-col items-start text-white">
          <span className="font-bold text-lg tracking-tight">Veltrax</span>
          <span className="text-xs text-white/60 uppercase tracking-wider">Workforce Intelligence</span>
        </div>
      </motion.div>
    </motion.div>
  );
}