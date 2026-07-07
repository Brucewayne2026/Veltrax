"use client";

import Image from "next/image";

const navLinks = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "AI Assistant", href: "#ai" },
      { label: "Gamification", href: "#automation" },
      { label: "Security", href: "#security" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Contact", href: "mailto:hello@veltrax.in" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Request Demo", href: "#contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-white/[0.015] dark:border-white/8 dark:bg-white/[0.015] light:border-black/10 light:bg-black/[0.015]">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Veltrax"
                width={32}
                height={32}
                className="drop-shadow-lg drop-shadow-blue-500/20"
              />
              <div className="flex flex-col">
                <span className="font-bold text-white tracking-tight dark:text-white light:text-black">
                  Veltrax
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/40 dark:text-white/40 light:text-black/40">
                  Workforce Intelligence
                </span>
              </div>
              </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/45 dark:text-white/45 light:text-black/45">
              A workforce intelligence platform built on a real production floor —
              engineered, not templated.
            </p>
          </div>

          {/* Nav columns */}
          {navLinks.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 dark:text-white/35 light:text-black/35">
                {col.heading}
              </span>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 transition-colors duration-200 hover:text-white/85 dark:text-white/50 dark:hover:text-white/85 light:text-black/50 light:hover:text-black/85"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 sm:flex-row dark:border-white/8 light:border-black/10">
          <p className="text-xs text-white/30 dark:text-white/30 light:text-black/30">
            © {new Date().getFullYear()} Veltrax. All rights reserved.
          </p>
          <p className="font-mono text-xs text-white/20 dark:text-white/20 light:text-black/20">
            Built on a real production floor · IntelliRCM
          </p>
        </div>
      </div>
    </footer>
  );
}