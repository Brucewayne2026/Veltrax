"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Monitor, User, X } from "lucide-react";
import VideoModal from "@/components/shared/VideoModal";

const DEMO_OPTIONS = [
  {
    label: "Admin Panel",
    tag: "Team access",
    description: "Team Lead, Admin & Super Admin",
    videoSrc: "https://j2cchazv6wokg45d.public.blob.vercel-storage.com/admin.mp4",
    icon: Monitor,
  },
  {
    label: "User Panel",
    tag: "Employee access",
    description: "Employee / User View",
    videoSrc: "https://j2cchazv6wokg45d.public.blob.vercel-storage.com/user.mp4",
    icon: User,
  },
];

export default function CTAButtons() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll & handle Escape when picker is open
  useEffect(() => {
    if (!isPickerOpen) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsPickerOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isPickerOpen]);

  const handleDemoSelect = (videoSrc: string) => {
    setSelectedVideo(videoSrc);
    setIsPickerOpen(false);
    setIsVideoOpen(true);
  };

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
          onClick={() => setIsPickerOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 px-8 py-4 text-base font-semibold border border-white/8 bg-white/5 backdrop-blur-xl text-white hover:bg-white/10 hover:border-white/12 transition-all duration-300 rounded-xl hover:shadow-lg dark:border-white/8 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:hover:border-white/12 light:border-black/10 light:bg-black/5 light:text-black light:hover:bg-black/10 light:hover:border-black/15"
        >
          Watch Demo
          <Play className="h-4 w-4" />
        </motion.button>
      </motion.div>

      {/* Demo Picker Modal (Portal) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isPickerOpen && (
              <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-[#05070D]/85 backdrop-blur-2xl"
                  onClick={() => setIsPickerOpen(false)}
                />

                {/* Modal Content */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 w-full max-w-xl"
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setIsPickerOpen(false)}
                    className="absolute -top-14 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110 border border-white/15"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  {/* Panel — matches the site's standard glass panel (see Security.tsx list, GlassCard) */}
                  <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8 sm:p-10 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
                    {/* Header — same eyebrow / heading pattern as SectionTitle */}
                    <div className="text-center mb-9">
                      <span className="mb-3 block font-mono text-xs uppercase tracking-[0.2em] text-[#47D7FF]/80">
                        Live product tour
                      </span>
                      <h3 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold tracking-tight text-white">
                        Choose Your Demo
                      </h3>
                      <p className="mt-2 text-sm text-white/50">
                        Two live views into the same production system
                      </p>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {DEMO_OPTIONS.map((option, i) => {
                        const Icon = option.icon;
                        return (
                          <motion.button
                            key={option.label}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: 0.15 + i * 0.08,
                              duration: 0.5,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleDemoSelect(option.videoSrc)}
                            className="group relative flex flex-col gap-5 rounded-xl border border-white/8 bg-white/[0.03] p-5 text-left transition-all duration-300 hover:border-white/15 hover:shadow-[0_0_60px_-15px_rgba(79,140,255,0.35)] cursor-pointer"
                          >
                            {/* Icon — same tri-gradient tile used in Features.tsx */}
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-[#4F8CFF]/20 via-[#47D7FF]/10 to-[#9D7DFF]/20">
                              <Icon className="h-5 w-5 text-white/85" strokeWidth={1.75} />
                            </div>

                            {/* Label */}
                            <div className="flex flex-col gap-1.5">
                              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/40">
                                {option.tag}
                              </span>
                              <span className="text-base font-semibold text-white">
                                {option.label}
                              </span>
                              <span className="text-xs leading-relaxed text-white/50">
                                {option.description}
                              </span>
                            </div>

                            {/* Footer row */}
                            <div className="flex items-center justify-between pt-4 border-t border-white/8">
                              <span className="flex items-center gap-1.5 text-xs font-medium text-white/70">
                                <Play className="h-3 w-3 fill-white/70" />
                                Watch
                              </span>
                              <ArrowRight className="h-3.5 w-3.5 text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/70" />
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoSrc={selectedVideo}
      />
    </>
  );
}
