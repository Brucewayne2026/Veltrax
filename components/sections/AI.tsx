"use client";

import { motion } from "framer-motion";
import { Sparkles, Database, ShieldCheck } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";
import GlassCard from "@/components/shared/GlassCard";

export default function AI() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-36">
      <Container id="ai">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionTitle
              eyebrow="02 — Ask it anything"
              title="An assistant with real, scoped access — not a script"
              description="It runs live, read-only SQL through a role-aware database connection. A team lead and a staff member asking the same question get different, correctly scoped answers."
              align="left"
              className="mb-8"
            />

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Database className="mt-0.5 h-4 w-4 shrink-0 text-[#47D7FF]" />
                <p className="text-sm text-white/60 dark:text-white/60 light:text-black/60">
                  Tool-calling on Groq, querying production data directly — answers reflect what&apos;s true right now.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#39D98A]" />
                <p className="text-sm text-white/60 dark:text-white/60 light:text-black/60">
                  Row-level security at the database role, not just the application layer — fail-closed by default.
                </p>
              </div>
            </div>
          </div>

          {/* Conversation mock */}
          <GlassCard glow className="p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#4F8CFF] to-[#9D7DFF]">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-white/80 dark:text-white/80 light:text-black/80">Veltrax Assistant</span>
            </div>

            <div className="flex flex-col gap-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-white/8 px-4 py-2.5 text-sm text-white/90 dark:bg-white/8 dark:text-white/90 light:bg-black/5 light:text-black/90"
              >
                How many people on my team hit target today?
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="max-w-[88%] rounded-2xl rounded-tl-sm border border-white/8 bg-gradient-to-br from-[#4F8CFF]/10 to-[#9D7DFF]/10 px-4 py-2.5 text-sm text-white/85 dark:border-white/8 dark:text-white/85 light:border-black/10 light:text-black/85"
              >
                7 of 9 hit target — net of breaks. Priya and Arjun are at 92% and 88%.
                Want the full breakdown or just the two who are behind?
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="flex items-center gap-1.5 px-1 py-1 font-mono text-[11px] text-white/30 dark:text-white/30 light:text-black/40"
              >
                <Database className="h-3 w-3" />
                queried: today&apos;s sessions, role-scoped to your team
              </motion.div>
            </div>
          </GlassCard>
        </div>
      </Container>
    </section>
  );
}