"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
}

export default function VideoModal({ isOpen, onClose, videoSrc }: VideoModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12 transition-opacity duration-500 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Premium Glass Backdrop */}
      <div
        className="absolute inset-0 bg-[#05070D]/70 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Video Container Wrapper (for absolute positioning of the close button) */}
      <div
        className={`relative w-full max-w-6xl transition-all duration-700 delay-100 ${
          isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-8"
        }`}
      >
        {/* Floating Close Button outside the video */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 sm:-right-4 sm:-top-14 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110 border border-white/20 shadow-lg"
          aria-label="Close video"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Video Player Container */}
        <div className="aspect-video w-full overflow-hidden border border-white/20 bg-black shadow-[0_0_80px_-20px_rgba(157,125,255,0.3)]">
          {isOpen && (
            <video
              className="h-full w-full object-contain"
              controls
              autoPlay
              playsInline
              src={videoSrc}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
