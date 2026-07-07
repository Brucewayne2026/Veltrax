"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";

const faqs = [
  {
    q: "What kind of companies is Veltrax built for?",
    a: "Any organization that tracks hourly or daily production output by staff — primarily RCM (Revenue Cycle Management) and medical billing teams. It's been running on a live production floor, so the workflows, field definitions, and KPIs are shaped by real RCM operations.",
  },
  {
    q: "Does Veltrax work on-premise, or is it cloud-only?",
    a: "On-premise first. Veltrax runs on your infrastructure — a Windows or Linux server on your network — with Waitress as the WSGI host and PostgreSQL as the database. There's no mandatory cloud dependency. The AI assistant connects externally to Groq, but that's configurable.",
  },
  {
    q: "How does the AI assistant access our data?",
    a: "It runs live SQL queries through a read-only PostgreSQL role scoped to your deployment. The AI never sees credentials or schema beyond what that role permits. Role-based access is enforced at the database layer, not just the application — so a staff member's session physically cannot pull another team's data.",
  },
  {
    q: "Can we use our existing Active Directory setup for login?",
    a: "Yes. Veltrax supports AD/LDAP authentication with a local bcrypt fallback for accounts not in the directory. There are no plaintext passwords in the system.",
  },
  {
    q: "What happens if the server goes offline mid-shift?",
    a: "Submissions made during an outage are queued in the browser via a local queue and automatically synced to the server once the connection is restored. Staff don't lose their work — they see a banner indicating offline mode and the queue drains silently on reconnect.",
  },
  {
    q: "Is the gamification system configurable?",
    a: "The points thresholds, badge categories, and streak logic are configured server-side per deployment. The award engine is idempotent — the bingo_awarded flag prevents duplicate point grants regardless of how many times the trigger fires, which was a real production bug we fixed and hardened.",
  },
  {
    q: "How long does a typical deployment take?",
    a: "A standard deployment — server setup, database migration, AD integration, and staff onboarding — typically runs one to two weeks depending on your infrastructure readiness. We handle the setup with your IT team.",
  },
  {
    q: "Can Veltrax support multiple departments with different task types?",
    a: "Yes, on the Enterprise tier. The task field definitions are department-agnostic — the frontend reads _fieldDefs and _taskFieldConfigs dynamically, so different departments can have different tracked fields without code changes.",
  },
  {
    q: "What happens to our data if we stop using Veltrax?",
    a: "Since deployment runs on your own infrastructure and database, your data never leaves your environment in the first place — there's nothing to migrate back. You can export any table via the built-in XLSX/CSV export tools at any time, and the Postgres database itself remains fully yours to keep, back up, or decommission whenever you choose.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="border-b border-white/8 dark:border-white/8 light:border-black/10"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-6 py-6 text-left"
      >
        <span className="text-sm font-medium text-white/85 sm:text-base dark:text-white/85 light:text-black/85">
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/50 dark:border-white/15 dark:text-white/50 light:border-black/15 light:text-black/50"
        >
          <Plus className="h-3 w-3" strokeWidth={2} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm leading-relaxed text-white/55 dark:text-white/55 light:text-black/55">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section className="relative py-28 sm:py-36">
      <Container id="faq">
        <div className="mx-auto max-w-3xl">
          <SectionTitle
            eyebrow="FAQ"
            title="Questions we actually get asked"
            className="mb-12"
          />

          <div>
            {faqs.map((item, i) => (
              <FAQItem key={item.q} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}