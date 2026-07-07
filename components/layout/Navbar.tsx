"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import MobileMenu from "@/components/layout/MobileMenu";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { scrollToSection } from "@/lib/scrollTo";

const links = [
  { label: "Features", href: "#features" },
  { label: "AI Assistant", href: "#ai" },
  { label: "Gamification", href: "#automation" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/5 backdrop-blur-xl dark:bg-white/5 light:bg-black/5" : "bg-transparent"}`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Veltrax"
              width={36}
              height={36}
              className="drop-shadow-lg drop-shadow-blue-500/20"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-white dark:text-white light:text-black">
                Veltrax
              </span>
              <span className="text-xs tracking-wider uppercase text-white/60 dark:text-white/60 light:text-black/60">
                Workforce Intelligence
              </span>
            </div>
          </div>

          {/* Navigation Links — desktop only */}
          <div className="hidden lg:flex gap-8">
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i, duration: 0.6 }}
                className="relative"
              >
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="relative text-sm font-medium transition-all duration-300 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-blue-400 after:via-cyan-300 after:to-violet-400 after:transition-all after:duration-300 hover:after:w-full text-white/70 hover:text-white dark:text-white/70 dark:hover:text-white light:text-black/70 light:hover:text-black"
                >
                  {link.label}
                </a>
              </motion.div>
            ))}
          </div>

          {/* CTA — desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <a href="https://localhost/">
              <Button
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 px-6 py-3 rounded-lg font-medium backdrop-blur-sm dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:hover:border-white/30 light:border-black/20 light:bg-black/5 light:text-black light:hover:bg-black/10 light:hover:border-black/30"
              >
                Login
              </Button>
            </a>
            <Button
              className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white transition-all duration-300 px-6 py-3 rounded-lg font-medium flex items-center gap-2 backdrop-blur-sm hover:backdrop-blur shadow-lg hover:shadow-xl dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/20 dark:hover:border-white/30 dark:text-white light:bg-black/10 light:hover:bg-black/20 light:border-black/20 light:hover:border-black/30 light:text-black"
            >
              Request Demo
            </Button>
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <MobileMenu />
          </div>
        </div>
      </div>
    </motion.header>
  );
}