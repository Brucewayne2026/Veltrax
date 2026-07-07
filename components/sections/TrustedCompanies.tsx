"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import Container from "@/components/shared/Container";

const stats = [
  { value: 12, suffix: "+", label: "Core Modules", sub: "Tracking to AI assistant" },
  { value: 99.9, suffix: "%", label: "Uptime", sub: "Waitress + AD-backed auth" },
  { value: 100, suffix: "%", label: "Role-Scoped Data", sub: "Row-level security, fail-closed" },
  { value: 24, suffix: "/7", label: "Live Monitoring", sub: "Real-time session tracking" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1.4, bounce: 0 });
  const isDecimal = !Number.isInteger(value);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent =
          (isDecimal ? latest.toFixed(1) : Math.round(latest).toString()) + suffix;
      }
    });
  }, [spring, isDecimal, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function TrustedCompanies() {
  return (
    <section className="relative border-y border-white/8 bg-white/[0.015] dark:border-white/8 dark:bg-white/[0.015] light:border-black/10 light:bg-black/[0.015] py-16">
      <Container>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center font-mono text-xs uppercase tracking-[0.2em] text-white/40 dark:text-white/40 light:text-black/40"
        >
          Built and battle-tested on a real production floor
        </motion.p>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center gap-1 text-center"
            >
              <span className="font-[family-name:var(--font-heading)] text-3xl font-bold text-gradient sm:text-4xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-sm font-medium text-white/80 dark:text-white/80 light:text-black/80">{stat.label}</span>
              <span className="text-xs text-white/40 dark:text-white/40 light:text-black/40">{stat.sub}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
