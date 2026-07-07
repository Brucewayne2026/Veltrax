"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";

const metrics = [
  {
    value: 8,
    suffix: "s",
    prefix: "<",
    label: "Average submit latency",
    sub: "Measured across 30-day production run",
    color: "#47D7FF",
  },
  {
    value: 4,
    suffix: " roles",
    prefix: "",
    label: "Permission tiers enforced",
    sub: "Staff → Team Lead → Admin → Super Admin",
    color: "#9D7DFF",
  },
  {
    value: 3,
    suffix: " providers",
    prefix: "",
    label: "AI backends battle-tested",
    sub: "Gemini, NVIDIA NIM, Groq — production, not demos",
    color: "#39D98A",
  },
  {
    value: 100,
    suffix: "%",
    prefix: "",
    label: "Offline submissions preserved",
    sub: "Queue syncs on reconnect, zero loss",
    color: "#4F8CFF",
  },
  {
    value: 9,
    suffix: "",
    prefix: "",
    label: "Blueprint API modules",
    sub: "Refactored from 3,500-line monolith",
    color: "#FF7B54",
  },
  {
    value: 0,
    suffix: " duplicates",
    prefix: "",
    label: "Duplicate badge awards",
    sub: "bingo_awarded flag, enforced server-side",
    color: "#47D7FF",
  },
];

function AnimatedNumber({
  value,
  prefix,
  suffix,
  color,
}: {
  value: number;
  prefix: string;
  suffix: string;
  color: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1.6, bounce: 0 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent =
          prefix + Math.round(latest).toString() + suffix;
      }
    });
  }, [spring, prefix, suffix]);

  return (
    <span
      ref={ref}
      className="font-[family-name:var(--font-heading)] text-4xl font-bold sm:text-5xl"
      style={{ color }}
    >
      {prefix}0{suffix}
    </span>
  );
}

export default function Statistics() {
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

      <Container id="statistics">
        <SectionTitle
          eyebrow="By the numbers"
          title="Not benchmarks — production data"
          description="Every figure comes from the actual system running on a real production operations floor."
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group relative flex flex-col gap-3 border border-white/8 bg-white/[0.02] p-8 transition-colors duration-500 hover:bg-white/[0.04] dark:border-white/8 dark:bg-white/[0.02] dark:hover:bg-white/[0.04] light:border-black/10 light:bg-black/[0.02] light:hover:bg-black/[0.04]"
            >
              <AnimatedNumber
                value={m.value}
                prefix={m.prefix}
                suffix={m.suffix}
                color={m.color}
              />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-white/80 dark:text-white/80 light:text-black/80">
                  {m.label}
                </span>
                <span className="text-xs text-white/40 dark:text-white/40 light:text-black/40">{m.sub}</span>
              </div>
              {/* bottom accent line */}
              <div
                className="absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                style={{
                  background: `linear-gradient(90deg, ${m.color}80, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}