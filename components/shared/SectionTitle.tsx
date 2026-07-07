"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-base uppercase tracking-[0.2em] text-[#47D7FF]/80 dark:text-[#47D7FF]/80 light:text-[#0E7490]"
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="max-w-2xl font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl dark:text-white light:text-black"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-xl text-base text-white/60 sm:text-lg dark:text-white/60 light:text-black/60"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}