"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";

const tiers = [
  {
    name: "Starter",
    price: "₹15,000",
    usdNote: "~$180 USD/mo",
    period: "/mo",
    description: "One team, one floor. Everything you need to go live.",
    highlight: false,
    features: [
      { label: "Up to 25 staff seats", included: true },
      { label: "Live session tracking", included: true },
      { label: "Role-based dashboards (Staff + TL)", included: true },
      { label: "Basic gamification (points + streaks)", included: true },
      { label: "PDF daily reports", included: true },
      { label: "AI assistant", included: false },
      { label: "AD / LDAP authentication", included: false },
      { label: "Multi-department support", included: false },
    ],
    cta: "Request access",
  },
  {
    name: "Professional",
    price: "₹35,000",
    usdNote: "~$420 USD/mo",
    period: "/mo",
    description: "The full system — AI, gamification, and your full org chart.",
    highlight: true,
    features: [
      { label: "Up to 100 staff seats", included: true },
      { label: "Live session tracking", included: true },
      { label: "All four permission tiers", included: true },
      { label: "Full gamification suite — badges, bingo, leaderboards", included: true },
      { label: "PDF daily reports + anomaly alerts", included: true },
      { label: "Veltrax AI assistant (Groq / Llama)", included: true },
      { label: "AD / LDAP authentication", included: true },
      { label: "Multi-department support", included: false },
    ],
    cta: "Request demo",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Multi-site, custom integrations, dedicated support.",
    highlight: false,
    features: [
      { label: "Unlimited seats", included: true },
      { label: "Live session tracking", included: true },
      { label: "All four permission tiers", included: true },
      { label: "Full gamification suite", included: true },
      { label: "PDF reports + analytics", included: true },
      { label: "Veltrax AI (bring your own model)", included: true },
      { label: "AD / LDAP + SSO", included: true },
      { label: "Multi-department + custom modules", included: true },
    ],
    cta: "Talk to us",
  },
];

export default function Pricing() {
  return (
    <section className="relative py-28 sm:py-36">
      <Container id="pricing">
        <SectionTitle
          eyebrow="Pricing"
          title="Straightforward tiers"
          description="Estimates only — final pricing depends on your seat count and deployment. No surprise line items."
          className="mb-4"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16 text-center font-mono text-xs text-white/30 uppercase tracking-[0.15em] dark:text-white/30 light:text-black/40"
        >
          * Placeholder rates — contact us for a real quote
        </motion.p>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                tier.highlight
                  ? "border-[#4F8CFF]/50 bg-gradient-to-b from-[#4F8CFF]/10 to-[#9D7DFF]/5 shadow-[0_0_80px_-20px_rgba(79,140,255,0.4)]"
                  : "border-white/8 bg-white/[0.02] dark:border-white/8 dark:bg-white/[0.02] light:border-black/10 light:bg-black/[0.02]"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#4F8CFF] to-transparent" />
              )}
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-[#4F8CFF]/40 bg-[#0E1323] px-3 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#47D7FF] dark:bg-[#0E1323] light:bg-white">
                  Most complete
                </span>
              )}

              <div className="mb-6">
                <h3 className="mb-1 font-[family-name:var(--font-heading)] text-lg font-semibold text-white dark:text-white light:text-black">
                  {tier.name}
                </h3>
                <div className="mb-3 flex items-baseline gap-1">
                  <span className="font-[family-name:var(--font-heading)] text-4xl font-bold text-white dark:text-white light:text-black">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-sm text-white/40 dark:text-white/40 light:text-black/40">{tier.period}</span>
                  )}
                </div>
                {"usdNote" in tier && tier.usdNote && (
                  <p className="mb-2 text-xs text-white/30 dark:text-white/30 light:text-black/40">{tier.usdNote}</p>
                )}
                <p className="text-sm text-white/55 dark:text-white/55 light:text-black/55">{tier.description}</p>
              </div>

              <ul className="mb-8 flex flex-col gap-3">
                {tier.features.map((f) => (
                  <li key={f.label} className="flex items-start gap-3">
                    {f.included ? (
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#39D98A]"
                        strokeWidth={2}
                      />
                    ) : (
                      <Minus
                        className="mt-0.5 h-4 w-4 shrink-0 text-white/20 dark:text-white/20 light:text-black/20"
                        strokeWidth={1.5}
                      />
                    )}
                    <span
                      className={`text-sm ${f.included ? "text-white/75 dark:text-white/75 light:text-black/75" : "text-white/30 dark:text-white/30 light:text-black/30"}`}
                    >
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <button
                  className={`w-full rounded-xl py-3 text-sm font-semibold transition-all duration-300 ${
                    tier.highlight
                      ? "bg-gradient-to-r from-[#4F8CFF] to-[#9D7DFF] text-white hover:opacity-90 shadow-lg shadow-blue-500/20"
                      : "border border-white/15 bg-white/5 text-white hover:bg-white/10 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 light:border-black/15 light:bg-black/5 light:text-black light:hover:bg-black/10"
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}