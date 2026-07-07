"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Container from "@/components/shared/Container";
import DemoRequestForm from "@/components/sections/DemoRequestForm";

export default function CTA() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[700px] rounded-full bg-[#4F8CFF]/8 blur-[120px]" />
      </div>

      <Container id="contact" className="relative z-10">
        <div className="mx-auto max-w-xl rounded-2xl border border-white/8 bg-white/[0.03] px-8 py-16 text-center sm:px-12 dark:border-white/8 dark:bg-white/[0.03] light:border-black/10 light:bg-black/[0.03]">
          {/* top accent */}
          <div className="absolute left-8 right-8 top-0 mx-auto h-px max-w-xs bg-gradient-to-r from-transparent via-[#4F8CFF] to-transparent" />

          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-5 block font-mono text-xs uppercase tracking-[0.2em] text-[#47D7FF]/80"
          >
            Ready to deploy
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mb-4 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-white sm:text-4xl dark:text-white light:text-black"
          >
            See it running on your data
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-10 text-base text-white/55 dark:text-white/55 light:text-black/55"
          >
            A 30-minute demo with your actual workflow and team structure.
            No slides — just the live system.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <DemoRequestForm />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-xs text-white/30 dark:text-white/30 light:text-black/35"
          >
            <span>On-premise deployment · No lock-in · Setup in under 2 weeks</span>
          </motion.p>

          <motion.a
            href="mailto:hello@veltrax.in"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-4 inline-flex items-center gap-2 text-xs text-white/40 transition-colors hover:text-white/70 dark:text-white/40 dark:hover:text-white/70 light:text-black/45 light:hover:text-black/75"
          >
            <Mail className="h-3.5 w-3.5" />
            Prefer email? hello@veltrax.in
          </motion.a>
        </div>
      </Container>
    </section>
  );
}