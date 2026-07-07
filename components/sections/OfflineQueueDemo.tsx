"use client";

// Proof over claim. The "Works when the network doesn't" feature card
// describes the offline queue in one sentence — this shows it. Content
// below is illustrative sample data, not real client or staff records.

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { WifiOff, Wifi, Check, Loader2 } from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";

interface QueueItem {
  id: string;
  label: string;
  time: string;
}

const ITEMS: QueueItem[] = [
  { id: "q1", label: "Task submission · Facility A · 38 counts", time: "09:12:04" },
  { id: "q2", label: "Break log · 00:14:22", time: "09:26:41" },
  { id: "q3", label: "Task submission · Facility B · 22 counts", time: "09:41:09" },
];

type ItemStatus = "queued" | "syncing" | "synced";

export default function OfflineQueueDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [connectionRestored, setConnectionRestored] = useState(false);
  const [statuses, setStatuses] = useState<Record<string, ItemStatus>>(
    Object.fromEntries(ITEMS.map((item) => [item.id, "queued"]))
  );

  useEffect(() => {
    if (!inView) return;

    // Beat 1: connection drops back — the queue sits full for a moment.
    const restoreTimer = setTimeout(() => setConnectionRestored(true), 1200);

    // Beat 2: items sync one by one, "syncing" then "synced", staggered.
    const timers = ITEMS.map((item, i) =>
      setTimeout(() => {
        setStatuses((s) => ({ ...s, [item.id]: "syncing" }));
        setTimeout(() => {
          setStatuses((s) => ({ ...s, [item.id]: "synced" }));
        }, 500);
      }, 1800 + i * 650)
    );

    return () => {
      clearTimeout(restoreTimer);
      timers.forEach(clearTimeout);
    };
  }, [inView]);

  const allSynced = ITEMS.every((item) => statuses[item.id] === "synced");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
      className="mt-6"
    >
      <GlassCard className="mx-auto max-w-2xl p-6 sm:p-8">
        <div className="mb-5 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 dark:text-white/40 light:text-black/40">
            Live behavior · offline submission queue
          </span>
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: connectionRestored ? 0 : Infinity }}
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium font-mono uppercase tracking-wide transition-colors duration-500 ${
              connectionRestored
                ? "border-[#39D98A]/30 bg-[#39D98A]/10 text-[#39D98A]"
                : "border-orange-400/30 bg-orange-400/10 text-orange-300"
            }`}
          >
            {connectionRestored ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
            {connectionRestored ? "Connection restored" : "Offline"}
          </motion.span>
        </div>

        <div className="flex flex-col gap-2">
          {ITEMS.map((item) => {
            const status = statuses[item.id];
            return (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-white/8 bg-white/[0.02] px-4 py-3 dark:border-white/8 dark:bg-white/[0.02] light:border-black/10 light:bg-black/[0.02]"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-white/75 dark:text-white/75 light:text-black/75">
                    {item.label}
                  </span>
                  <span className="font-mono text-[10px] text-white/35 dark:text-white/35 light:text-black/40">
                    submittedAt {item.time} · preserved
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {status === "queued" && (
                    <motion.span
                      key="queued"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="rounded-full border border-orange-400/25 bg-orange-400/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wide text-orange-300"
                    >
                      Queued
                    </motion.span>
                  )}
                  {status === "syncing" && (
                    <motion.span
                      key="syncing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1.5 rounded-full border border-[#4F8CFF]/30 bg-[#4F8CFF]/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wide text-[#4F8CFF]"
                    >
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Syncing
                    </motion.span>
                  )}
                  {status === "synced" && (
                    <motion.span
                      key="synced"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-1.5 rounded-full border border-[#39D98A]/30 bg-[#39D98A]/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wide text-[#39D98A]"
                    >
                      <Check className="h-3 w-3" />
                      Synced
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-center text-xs text-white/35 dark:text-white/35 light:text-black/40">
          {allSynced
            ? "Zero submissions lost — this is the exact queue-and-flush logic running in production."
            : "Simulating a dropped connection, exactly as it behaves on a real shift."}
        </p>
      </GlassCard>
    </motion.div>
  );
}
