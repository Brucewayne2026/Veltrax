"use client";

import { motion } from "framer-motion";
import { Trophy, Flame, Award } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";
import GlassCard from "@/components/shared/GlassCard";
import BadgeCoinShowcase from "./BadgeCoinShowcase";

const nodes = [
  {
    icon: Trophy,
    title: "Bingo line completed",
    description: "A staff member finishes a row on the productivity board.",
  },
  {
    icon: Flame,
    title: "Award flag checked",
    description: "Server checks bingo_awarded — already claimed, or fresh?",
  },
  {
    icon: Award,
    title: "Badge unlocked, once",
    description: "Points and badge issue exactly once. No duplicate awards, no race conditions.",
  },
];

export default function Automation() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-36">
      <Container id="automation">
        <SectionTitle
          eyebrow="03 — Let it run itself"
          title="Gamification that's actually trustworthy"
          description="Streaks, badges, and leaderboards run on explicit server-side award logic — the same flags that fixed real duplicate-point bugs in production."
          className="mb-16"
        />

        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* connecting line for desktop */}
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent dark:from-transparent dark:via-white/15 dark:to-transparent light:from-transparent light:via-black/15 light:to-transparent md:block" />

          {nodes.map((node, i) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.15 }}
                className="relative"
              >
                <GlassCard glow className="h-full p-7 pt-9">
                  <div className="absolute -top-4 left-7 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[#0E1323] font-mono text-xs text-white/50 dark:border-white/15 dark:bg-[#0E1323] dark:text-white/50 light:border-black/15 light:bg-white light:text-black/50">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-[#4F8CFF]/20 via-[#47D7FF]/10 to-[#9D7DFF]/20 dark:border-white/10 light:border-black/10">
                    <Icon className="h-5 w-5 text-[#47D7FF]" strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-2 font-[family-name:var(--font-heading)] text-base font-semibold text-white dark:text-white light:text-black">
                    {node.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/55 dark:text-white/55 light:text-black/55">
                    {node.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        <BadgeCoinShowcase />
      </Container>
    </section>
  );
}