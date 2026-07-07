"use client";

import { motion } from "framer-motion";
import { ShieldCheck, KeyRound, Database, Network, Lock } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";

const specs = [
  {
    icon: KeyRound,
    label: "Authentication",
    value: "Active Directory / LDAP",
    detail: "with local bcrypt fallback — no plaintext, no hardcoded credentials.",
  },
  {
    icon: ShieldCheck,
    label: "Access control",
    value: "Role-based, fail-closed",
    detail: "staff, team lead, admin, and super admin each see only what their role permits, enforced server-side.",
  },
  {
    icon: Database,
    label: "Data isolation",
    value: "Row-level security",
    detail: "a read-only database role scopes every query — including the AI assistant's — at the database layer, not just the app.",
  },
  {
    icon: Network,
    label: "Connection handling",
    value: "Pooled & multi-threaded",
    detail: "psycopg2 ThreadedConnectionPool behind Waitress, built to hold up under real concurrent load.",
  },
  {
    icon: Lock,
    label: "Perimeter",
    value: "CORS-restricted, lockout-protected",
    detail: "whitelisted origins and login lockout after repeated failures, served over HTTPS.",
  },
];

export default function Security() {
  return (
    <section className="relative py-28 sm:py-36">
      <Container id="security">
        <SectionTitle
          eyebrow="How it's actually built"
          title="Security as architecture, not a feature checkbox"
          description="Every claim below is enforced in the code that runs today — not aspirational, not roadmap."
          align="left"
          className="mb-14"
        />

        <div className="divide-y divide-white/8 rounded-2xl border border-white/8 bg-white/[0.02] dark:divide-white/8 dark:border-white/8 dark:bg-white/[0.02] light:divide-black/10 light:border-black/10 light:bg-black/[0.02]">
          {specs.map((spec, i) => {
            const Icon = spec.icon;
            return (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="grid grid-cols-1 gap-3 px-6 py-6 sm:grid-cols-[200px_1fr] sm:items-start sm:gap-8 sm:px-8"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0 text-[#47D7FF]" strokeWidth={1.75} />
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-white/40 dark:text-white/40 light:text-black/40">
                    {spec.label}
                  </span>
                </div>
                <div>
                  <p className="text-base font-medium text-white dark:text-white light:text-black">{spec.value}</p>
                  <p className="mt-1 text-sm text-white/50 dark:text-white/50 light:text-black/50">{spec.detail}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}