"use client";

// The hero's signature element. Not another particle field — a scrolling
// readout that looks like what Veltrax actually produces all day on a real
// floor: submission timestamps, streak updates, queue syncs. Content is
// illustrative (not real client/staff data), styled as a log rather than
// as marketing copy, set in the mono face so it reads as *system output*
// sitting behind the *human* headline above it.

const LOG_LINES = [
  "[09:14:22] SESSION_ACTIVE · 42 task counts logged",
  "[09:14:41] STREAK +1 · daily target met",
  "[09:15:03] OFFLINE QUEUE FLUSHED · 3 submissions synced",
  "[09:16:12] TL_REVIEW · team overview refreshed",
  "[09:17:38] BADGE_UNLOCKED · monthly consistency",
  "[09:18:05] AI_QUERY · role-scoped read, 0 rows outside scope",
  "[09:19:44] LEAVE_REQUEST · approved, calendar synced",
  "[09:21:09] EXPORT · daily report generated (PDF)",
];

export default function ProductionTicker() {
  // Duplicate the line set once so the CSS animation can loop seamlessly
  // from -50% back to 0% with no visible seam.
  const lines = [...LOG_LINES, ...LOG_LINES];

  return (
    <div
      className="production-ticker relative z-10 mt-14 w-full overflow-hidden border-y border-white/8 bg-white/[0.015] py-3 dark:border-white/8 dark:bg-white/[0.015] light:border-black/10 light:bg-black/[0.015]"
      aria-hidden="true"
    >
      <div className="production-ticker-track flex w-max items-center gap-10 whitespace-nowrap">
        {lines.map((line, i) => (
          <span
            key={i}
            className="font-mono text-[11px] tracking-wide text-white/35 dark:text-white/35 light:text-black/40"
          >
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}