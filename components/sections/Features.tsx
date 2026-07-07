"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Trophy,
  CalendarCheck,
  Sparkles,
  LayoutDashboard,
  WifiOff,
} from "lucide-react";
import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";
import GlassCard from "@/components/shared/GlassCard";
import OfflineQueueDemo from "./OfflineQueueDemo";

const features = [
  {
    icon: Activity,
    title: "Live session tracking",
    description:
      "Every work block is tracked in real time, net of breaks, so the numbers on the dashboard match what actually happened on the floor — not what got typed in at 5pm.",
  },
  {
    icon: Trophy,
    title: "Gamification that holds up",
    description:
      "Streaks, badges, and team challenges run on server-enforced award logic, so points can't double-fire and leaderboards stay trustworthy.",
  },
  {
    icon: CalendarCheck,
    title: "Leave & attendance, unified",
    description:
      "Leave requests, approvals, and attendance live in the same system as daily output, so managers see capacity and performance side by side instead of in two tools.",
  },
  {
    icon: Sparkles,
    title: "An AI assistant with real access",
    description:
      "Ask it about team performance in plain language. It runs live, role-scoped SQL against your data through a read-only database role — not a static report it memorized.",
  },
  {
    icon: LayoutDashboard,
    title: "Role-aware dashboards",
    description:
      "Staff, team leads, admins, and super admins each see exactly the view their role needs, enforced server-side with fail-closed access control.",
  },
  {
    icon: WifiOff,
    title: "Works when the network doesn't",
    description:
      "A PWA with offline sync and local session backup means a dropped connection doesn't mean lost work — it reconnects and pushes state back automatically.",
  },
];

export default function Features() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-36">
      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.03] light:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <Container id="features">
        <SectionTitle
          eyebrow="The Platform"
          title="Built for the floor, not the boardroom slide"
          description="Every feature here exists because a real team needed it — and runs on the same production system used to track daily work, every day."
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              >
                <GlassCard glow className="h-full p-7">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-[#4F8CFF]/20 via-[#47D7FF]/10 to-[#9D7DFF]/20 dark:border-white/10 light:border-black/10">
                    <Icon className="h-5 w-5 text-[#47D7FF]" strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-2 font-[family-name:var(--font-heading)] text-lg font-semibold text-white dark:text-white light:text-black">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/55 dark:text-white/55 light:text-black/55">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        <OfflineQueueDemo />
      </Container>
    </section>
  );
}