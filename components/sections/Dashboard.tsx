"use client";

import { motion } from "framer-motion";
import { Clock, CalendarCheck2, TrendingUp } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";
import GlassCard from "@/components/shared/GlassCard";

const sessions = [
  { name: "A. Mehta", task: "Claims review", time: "2h 14m", live: true },
  { name: "R. Iyer", task: "Data entry — batch 12", time: "1h 02m", live: true },
  { name: "S. Kapoor", task: "QA pass", time: "44m", live: false },
];

export default function Dashboard() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-36">
      <Container id="dashboard">
        <SectionTitle
          eyebrow="01 — See it happen live"
          title="One dashboard, the actual state of the floor"
          description="Not a report someone compiles at 5pm. Sessions, targets, and leave status update as they happen, scoped to exactly what each role should see."
          align="left"
          className="mb-14"
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Live sessions panel */}
          <GlassCard glow className="lg:col-span-2 p-6 sm:p-8">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-white dark:text-white light:text-black">
                Live sessions
              </h3>
              <span className="flex items-center gap-1.5 font-mono text-xs text-[#39D98A]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#39D98A] animate-pulse" />
                Updating in real time
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {sessions.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center justify-between rounded-xl border border-white/6 bg-white/[0.02] px-4 py-3 dark:border-white/6 light:border-black/10 light:bg-black/[0.02]"
                >
                  <div>
                    <p className="text-sm font-medium text-white/90 dark:text-white/90 light:text-black/90">{s.name}</p>
                    <p className="text-xs text-white/45 dark:text-white/45 light:text-black/50">{s.task}</p>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-white/60 dark:text-white/60 light:text-black/60">
                    <Clock className="h-3.5 w-3.5" />
                    {s.time}
                    {s.live && (
                      <span className="ml-1 h-1.5 w-1.5 rounded-full bg-[#39D98A]" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* Side stats */}
          <div className="flex flex-col gap-6">
            <GlassCard className="p-6">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#39D98A]/10">
                <TrendingUp className="h-4 w-4 text-[#39D98A]" />
              </div>
              <p className="text-sm font-medium text-white/80 dark:text-white/80 light:text-black/80">Target hit rate</p>
              <p className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white dark:text-white light:text-black">
                86%
              </p>
              <p className="mt-1 text-xs text-white/40 dark:text-white/40 light:text-black/40">net of break time</p>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#4F8CFF]/10">
                <CalendarCheck2 className="h-4 w-4 text-[#4F8CFF]" />
              </div>
              <p className="text-sm font-medium text-white/80 dark:text-white/80 light:text-black/80">Leave requests</p>
              <p className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white dark:text-white light:text-black">
                3 pending
              </p>
              <p className="mt-1 text-xs text-white/40 dark:text-white/40 light:text-black/40">awaiting TL approval</p>
            </GlassCard>
          </div>
        </div>
      </Container>
    </section>
  );
}