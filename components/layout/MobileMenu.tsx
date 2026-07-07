"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { scrollToSection } from "@/lib/scrollTo";

const links = [
  { label: "Features", href: "#features" },
  { label: "AI Assistant", href: "#ai" },
  { label: "Gamification", href: "#automation" },
  { label: "Security", href: "#security" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Hamburger trigger */}
      <button
        onClick={() => setOpen(true)}
        className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden dark:border-white/15 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white light:border-black/15 light:bg-black/5 light:text-black/70 light:hover:bg-black/10 light:hover:text-black"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Overlay + drawer */}
      {mounted && createPortal(
        <div 
          className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90"
            onClick={() => setOpen(false)}
          />

          {/* Slide-in panel */}
          <div 
            className={`absolute right-0 top-0 flex h-full w-72 flex-col border-l bg-[#0A0A0F] px-6 py-8 border-white/8 dark:bg-[#0A0A0F] dark:border-white/8 light:bg-white light:border-black/10 shadow-2xl transition-transform duration-300 ease-out ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="mb-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="Veltrax" width={28} height={28} />
                <span className="font-bold text-white dark:text-white light:text-black">Veltrax</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/50 hover:text-white dark:border-white/15 dark:bg-white/5 dark:text-white/50 dark:hover:text-white light:border-black/15 light:bg-black/5 light:text-black/50 light:hover:text-black"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-1">
              {links.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    // wait for the drawer to close before measuring/scrolling
                    setTimeout(() => scrollToSection(link.href), 250);
                  }}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-white/65 transition-colors duration-200 hover:bg-white/5 hover:text-white dark:text-white/65 dark:hover:bg-white/5 dark:hover:text-white light:text-black/65 light:hover:bg-black/5 light:hover:text-black"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="mt-auto flex flex-col gap-3">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  setTimeout(() => scrollToSection("#contact"), 250);
                }}
                className="rounded-xl bg-gradient-to-r from-[#4F8CFF] to-[#9D7DFF] py-3 text-center text-sm font-semibold text-white shadow-lg shadow-blue-500/20"
              >
                Request Demo
              </a>
              <a
                href="https://localhost/"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/15 bg-white/5 py-3 text-center text-sm font-medium text-white/70 transition-colors hover:bg-white/10 dark:border-white/15 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10 light:border-black/15 light:bg-black/5 light:text-black/70 light:hover:bg-black/10"
              >
                Login
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
