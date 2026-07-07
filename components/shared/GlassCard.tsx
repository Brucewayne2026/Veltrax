"use client";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export default function GlassCard({
  children,
  className,
  glow = false,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative rounded-2xl border backdrop-blur-lg border-white/8 bg-white/[0.03] dark:border-white/8 dark:bg-white/[0.03] light:border-black/10 light:bg-black/[0.03]",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset] light:shadow-[0_1px_0_0_rgba(0,0,0,0.05)_inset]",
        glow &&
          "hover:shadow-[0_0_60px_-15px_rgba(79,140,255,0.35)] hover:border-white/15 dark:hover:shadow-[0_0_60px_-15px_rgba(79,140,255,0.35)] dark:hover:border-white/15 light:hover:shadow-[0_0_60px_-15px_rgba(79,140,255,0.25)] light:hover:border-black/20",
        "transition-[box-shadow,border-color] duration-500",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}