"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ClipboardList, Trophy, Users, MessageSquare,
  CalendarClock, Download, ShieldCheck, BarChart3,
  Flame, Star, Clock, TrendingUp, AlertCircle,
  UserCheck, Lock, Activity, ChevronLeft, ChevronRight
} from "lucide-react";
import Container from "@/components/shared/Container";
import SectionTitle from "@/components/shared/SectionTitle";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Chip {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  color: string;
}

interface SlideImage {
  src: string;
  alt: string;
  label: string; // shown on the toggle button e.g. "Leave Calendar"
  width: number;  // intrinsic pixel width of the source PNG
  height: number; // intrinsic pixel height of the source PNG
  // ── Light-mode variant (optional) ──────────────────────────────────────────
  // Drop a light-mode screenshot in /public/screenshots and point lightSrc at
  // it (e.g. "/screenshots/staff-submissions-light.png"). Until this is set,
  // the dark-mode screenshot is used in both themes — this is intentional
  // (a light theme fade over a dark screenshot looks broken, so the component
  // keeps the dark fade/image paired together until a real light shot exists).
  // If the light screenshot has different pixel dimensions than the dark one,
  // set lightWidth/lightHeight too; otherwise it reuses width/height.
  lightSrc?: string;
  lightWidth?: number;
  lightHeight?: number;
}

interface Section {
  role: string;
  roleColor: string;
  title: string;
  description: string;
  images: SlideImage[];   // array — single item = no slider shown
  chips: Chip[];
  flip: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const sections: Section[] = [
  // ── STAFF ──────────────────────────────────────────────────────────────────
  {
    role: "Staff",
    roleColor: "text-[#39D98A] border-[#39D98A]/30 bg-[#39D98A]/10",
    title: "Every task, every second — tracked automatically",
    description:
      "Staff submit tasks with facility, type, CPT counts and exact timestamps. The timer runs live, locks after 24 hours, and syncs to the team dashboard instantly. No manual entry, no guesswork at audit time.",
    images: [
      { src: "/screenshots/staff-submissions.png", alt: "My Submissions — task rows with facility, CPT counts and time intervals", label: "Submissions", width: 1720, height: 911, lightSrc: "/screenshots/staff-submissions-light.png", lightWidth: 1698, lightHeight: 910 },
      { src: "/screenshots/staff-monthly-recap.png", alt: "Monthly Recap — score, days worked, streak and mood trend", label: "Monthly Recap", width: 1722, height: 912, lightSrc: "/screenshots/staff-monthly-recap-light.png", lightWidth: 1700, lightHeight: 910 },
    ],
    chips: [
      { icon: ClipboardList, label: "Tasks this month",  value: "22 records",  color: "text-[#39D98A]" },
      { icon: Clock,         label: "Avg work hours/day", value: "7.4 hrs",    color: "text-[#47D7FF]" },
      { icon: Activity,      label: "Monthly recap score", value: "80 / 100",  color: "text-[#9D7DFF]" },
    ],
    flip: false,
  },
  {
    role: "Staff",
    roleColor: "text-[#39D98A] border-[#39D98A]/30 bg-[#39D98A]/10",
    title: "Gamification that's actually server-enforced",
    description:
      "Points, streaks, and 13 achievement badges — all awarded exactly once, server-side. The leaderboard updates on every submission. Streaks survive weekends. Badges can't double-fire.",
    images: [
      { src: "/screenshots/staff-gamification.png", alt: "Gamification — coin, badges and live leaderboard", label: "Gamification", width: 1721, height: 907, lightSrc: "/screenshots/staff-gamification-light.png", lightWidth: 1715, lightHeight: 912 },
    ],
    chips: [
      { icon: Flame,  label: "Current streak",   value: "5 days", color: "text-orange-400" },
      { icon: Star,   label: "Total points",      value: "2,340",  color: "text-yellow-400" },
      { icon: Trophy, label: "Leaderboard rank",  value: "#2",     color: "text-[#47D7FF]" },
    ],
    flip: true,
  },

  // ── TEAM LEAD ──────────────────────────────────────────────────────────────
  {
    role: "Team Lead",
    roleColor: "text-[#47D7FF] border-[#47D7FF]/30 bg-[#47D7FF]/10",
    title: "See your entire team's live status at a glance",
    description:
      "Team Leads get a real-time overview of who's working, who's on break, and who hasn't submitted yet. Drill into any staff member's day without leaving the dashboard.",
    images: [
      { src: "/screenshots/tl-team-overview.png", alt: "Team overview with live staff status and submission counts", label: "Team Overview", width: 1722, height: 910, lightSrc: "/screenshots/tl-team-overview-light.png" },
    ],
    chips: [
      { icon: Users,       label: "Active now",         value: "12", color: "text-[#39D98A]" },
      { icon: Clock,       label: "On break",            value: "3",  color: "text-orange-400" },
      { icon: AlertCircle, label: "Not submitted yet",   value: "2",  color: "text-red-400" },
    ],
    flip: false,
  },
  {
    role: "Team Lead",
    roleColor: "text-[#47D7FF] border-[#47D7FF]/30 bg-[#47D7FF]/10",
    title: "Leave calendar, backup persons and announcements — all managed here",
    description:
      "View the full team leave calendar, assign backup staff when someone's away, and post scoped announcements. All actions notify the right people automatically.",
    images: [
      { src: "/screenshots/tl-leave-calendar.png",  alt: "Team Leave Calendar — June 2026 with colour-coded leave types", label: "Leave Calendar", width: 1755, height: 912, lightSrc: "/screenshots/tl-leave-calendar-light.png", lightWidth: 1754, lightHeight: 910 },
      { src: "/screenshots/tl-backup-person.png",   alt: "Assign Backup Person — modal with existing backup assignments", label: "Backup Person", width: 742, height: 459, lightSrc: "/screenshots/tl-backup-person-light.png", lightWidth: 742, lightHeight: 460 },
      { src: "/screenshots/tl-announcements.png",   alt: "Announcements Manager — post form and announcement list", label: "Announcements", width: 946, height: 908, lightSrc: "/screenshots/tl-announcements-light.png", lightWidth: 947, lightHeight: 909 },
    ],
    chips: [
      { icon: MessageSquare, label: "Announcements posted", value: "6",   color: "text-[#47D7FF]" },
      { icon: UserCheck,     label: "On leave this month",  value: "8",   color: "text-yellow-400" },
      { icon: Users,         label: "Backup assignments",   value: "4",   color: "text-[#39D98A]" },
    ],
    flip: true,
  },

  // ── ADMIN ──────────────────────────────────────────────────────────────────
  {
    role: "Admin",
    roleColor: "text-[#9D7DFF] border-[#9D7DFF]/30 bg-[#9D7DFF]/10",
    title: "Shift schedules and force logout — all admin-controlled",
    description:
      "Set individual shift start and end times per staff member. Force-logout any active session instantly when needed — no server restart required.",
    images: [
      { src: "/screenshots/admin-shifts-announcements.png", alt: "Shift assignment time-picker and announcements noticeboard", label: "Shift Assignment", width: 1716, height: 722, lightSrc: "/screenshots/admin-shifts-announcements-light.png", lightWidth: 1714, lightHeight: 722 },
    ],
    chips: [
      { icon: CalendarClock, label: "Shifts configured",   value: "24",  color: "text-[#9D7DFF]" },
      { icon: Lock,          label: "Force logouts today", value: "1",   color: "text-red-400" },
      { icon: Activity,      label: "Active sessions",     value: "18",  color: "text-[#39D98A]" },
    ],
    flip: false,
  },
  {
    role: "Admin",
    roleColor: "text-[#9D7DFF] border-[#9D7DFF]/30 bg-[#9D7DFF]/10",
    title: "Bulk import historical data and export anything, instantly",
    description:
      "Import months of historical task data from Excel in one shot — timezone-safe parsing, deduplication and wellness metric backfill handled automatically. Export filtered XLSX or CSV in one click.",
    images: [
      { src: "/screenshots/admin-import.png",  alt: "Import Historical Data — parsed preview with days, task rows and total time", label: "Import", width: 1697, height: 911, lightSrc: "/screenshots/admin-import-light.png", lightWidth: 1698, lightHeight: 911 },
      { src: "/screenshots/admin-export.png",  alt: "Data Export Center — filters for user, date, department and task type", label: "Export", width: 1642, height: 907, lightSrc: "/screenshots/admin-export-light.png", lightWidth: 1645, lightHeight: 911 },
    ],
    chips: [
      { icon: Download,      label: "Records imported",   value: "12,480",     color: "text-[#47D7FF]" },
      { icon: ClipboardList, label: "Export formats",     value: "XLSX / CSV", color: "text-[#39D98A]" },
      { icon: ShieldCheck,   label: "Duplicates blocked", value: "0",          color: "text-[#9D7DFF]" },
    ],
    flip: true,
  },

  // ── SUPER ADMIN ────────────────────────────────────────────────────────────
  {
    role: "Super Admin",
    roleColor: "text-amber-400 border-amber-400/30 bg-amber-400/10",
    title: "Full user management with role-based access control",
    description:
      "Create users, assign roles across all 5 levels, manage AD sync, and control department scoping. Every permission is enforced server-side with fail-closed logic — no client-side role bypass possible.",
    images: [
      { src: "/screenshots/superadmin-users.png", alt: "User management table with role assignment and department filters", label: "User Management", width: 1675, height: 910, lightSrc: "/screenshots/superadmin-users-light.png", lightWidth: 1677, lightHeight: 910 },
    ],
    chips: [
      { icon: Users,       label: "Total users",    value: "68",       color: "text-amber-400" },
      { icon: ShieldCheck, label: "Roles enforced", value: "5 levels", color: "text-[#9D7DFF]" },
      { icon: UserCheck,   label: "AD sync active", value: "Yes",      color: "text-[#39D98A]" },
    ],
    flip: false,
  },
  {
    role: "Super Admin",
    roleColor: "text-amber-400 border-amber-400/30 bg-amber-400/10",
    title: "Organisation-wide analytics and target hit rate trends",
    description:
      "Track target hit rates across departments, monitor Monthly Recap scores, and spot burnout signals via the wellness check-in heatmap. All charts pull live from the same database the floor uses every day.",
    images: [
      { src: "/screenshots/superadmin-analytics.png", alt: "Analytics dashboard with target hit rate trend and wellness heatmap", label: "Analytics", width: 1721, height: 912, lightSrc: "/screenshots/superadmin-analytics-light.png", lightWidth: 1722, lightHeight: 912 },
    ],
    chips: [
      { icon: TrendingUp, label: "Avg target hit rate",  value: "87%",      color: "text-[#39D98A]" },
      { icon: BarChart3,  label: "Monthly recap score",  value: "94 / 100", color: "text-[#47D7FF]" },
      { icon: Activity,   label: "Burnout flags",        value: "2",        color: "text-red-400" },
    ],
    flip: true,
  },
];

// ─── Stat chip ────────────────────────────────────────────────────────────────
function StatChip({ chip, delay }: { chip: Chip; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = chip.icon;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 dark:border-white/10 dark:bg-white/[0.05] light:border-black/10 light:bg-black/[0.03]"
    >
      <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] dark:border-white/10 dark:bg-white/[0.06] light:border-black/10 light:bg-black/[0.05] ${chip.color}`}>
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </div>
      <div className="min-w-0">
        <p className="text-[12px] uppercase tracking-widest text-white/35 dark:text-white/35 light:text-black/40">{chip.label}</p>
        <p className={`text-sm font-semibold ${chip.color}`}>{chip.value}</p>
      </div>
    </motion.div>
  );
}

// ─── Image slider ─────────────────────────────────────────────────────────────
function ImageSlider({ images, flip }: { images: SlideImage[]; flip: boolean }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const multi = images.length > 1;
  const { resolvedTheme } = useTheme();
  // The server always renders the dark-mode asset (it has no way to know a
  // visitor's stored theme preference ahead of time). Swapping to the light
  // asset based on resolvedTheme *before* mount would render differently on
  // the client than what the server sent, which React flags as a hydration
  // mismatch and forces a full re-render for. Gating on `mounted` keeps the
  // first client render identical to the server, then swaps the image right
  // after — same pattern already used in ThemeToggle.tsx.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const go = useCallback((idx: number) => {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  }, [active]);

  const prev = useCallback(() => go((active - 1 + images.length) % images.length), [active, go, images.length]);
  const next = useCallback(() => go((active + 1) % images.length), [active, go, images.length]);

  const current = images[active];
  // Only switch to the light-mode asset if this slide actually has one.
  // Otherwise keep showing the dark screenshot (with its matching dark
  // fade below) even while the site itself is in light mode — a light
  // fade over a dark screenshot looks broken, so image + fade always
  // travel together.
  const useLight = mounted && resolvedTheme === "light" && !!current.lightSrc;
  const displaySrc = useLight ? current.lightSrc! : current.src;
  const displayWidth = useLight ? (current.lightWidth ?? current.width) : current.width;
  const displayHeight = useLight ? (current.lightHeight ?? current.height) : current.height;

  return (
    <div className="relative">
      {/* Glow */}
      <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-gradient-to-br from-[#4F8CFF]/10 via-transparent to-[#9D7DFF]/8 blur-xl" />

      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_60px_-8px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.04)] dark:border-white/10 light:border-black/12">

        {/* Slide area */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={displaySrc}
                alt={current.alt}
                width={displayWidth}
                height={displayHeight}
                className="w-full h-auto block"
                draggable={false}
                loading="lazy"
                sizes="(min-width: 1024px) 45vw, 100vw"
                quality={75}
              />
            </motion.div>
          </AnimatePresence>

          {/* Bottom dissolve */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t to-transparent pointer-events-none ${
              useLight ? "from-white" : "from-[#080810]"
            }`}
          />

          {/* Arrow buttons — only shown for multi-image */}
          {multi && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/70 transition-all hover:bg-white/20 hover:text-white hover:border-white/30"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/70 transition-all hover:bg-white/20 hover:text-white hover:border-white/30"
                aria-label="Next screenshot"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        {/* Tab strip — only shown for multi-image */}
        {multi && (
          <div className="flex items-center gap-1 border-t border-white/8 bg-white/[0.02] px-3 py-2 dark:border-white/8 dark:bg-white/[0.02] light:border-black/10 light:bg-black/[0.02]">
            {images.map((img, i) => (
              <button
                key={img.label}
                onClick={() => go(i)}
                className={`relative rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  i === active
                    ? "text-white dark:text-white light:text-black"
                    : "text-white/35 hover:text-white/60 dark:text-white/35 dark:hover:text-white/60 light:text-black/40 light:hover:text-black/65"
                }`}
              >
                {i === active && (
                  <motion.div
                    layoutId="slide-active"
                    className="absolute inset-0 rounded-md border border-white/12 bg-white/10 dark:border-white/12 dark:bg-white/10 light:border-black/12 light:bg-black/8"
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                <span className="relative">{img.label}</span>
              </button>
            ))}

            {/* dot indicators */}
            <div className="ml-auto flex items-center gap-1.5 pr-1">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-4 bg-white/60 dark:bg-white/60 light:bg-black/50"
                      : "w-1.5 bg-white/20 hover:bg-white/40 dark:bg-white/20 dark:hover:bg-white/40 light:bg-black/20 light:hover:bg-black/35"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

// ─── Showcase row ─────────────────────────────────────────────────────────────
function ShowcaseRow({ section }: { section: Section }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const textCol = (
    <motion.div
      initial={{ opacity: 0, x: section.flip ? 32 : -32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-6"
    >
      <span className={`self-start rounded-full border px-3 py-1 font-mono text-[12px] uppercase tracking-[0.18em] ${section.roleColor}`}>
        {section.role}
      </span>
      <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl dark:text-white light:text-black">
        {section.title}
      </h3>
      <p className="text-base leading-relaxed text-white/50 dark:text-white/50 light:text-black/55">
        {section.description}
      </p>
      <div className="flex flex-col gap-3 pt-2">
        {section.chips.map((chip, i) => (
          <StatChip key={chip.label} chip={chip} delay={0.15 + i * 0.08} />
        ))}
      </div>
    </motion.div>
  );

  const imageCol = (
    <motion.div
      initial={{ opacity: 0, x: section.flip ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
    >
      <ImageSlider images={section.images} flip={section.flip} />
    </motion.div>
  );

  const gridClass = section.flip
    ? "grid grid-cols-1 items-center gap-12 lg:grid-cols-[3fr_2fr] lg:gap-14 xl:gap-20"
    : "grid grid-cols-1 items-center gap-12 lg:grid-cols-[2fr_3fr] lg:gap-14 xl:gap-20";

  return (
    <div ref={ref} className={gridClass}>
      {section.flip ? (
        <>
          <div className="order-2 lg:order-1">{imageCol}</div>
          <div className="order-1 lg:order-2">{textCol}</div>
        </>
      ) : (
        <>
          <div>{textCol}</div>
          <div>{imageCol}</div>
        </>
      )}
    </div>
  );
}

// ─── Role divider ─────────────────────────────────────────────────────────────
function RoleDivider({ role, color }: { role: string; color: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-white/6 dark:bg-white/6 light:bg-black/6" />
      <span className={`font-mono text-[15px] uppercase tracking-[0.2em] ${color}`}>{role} View</span>
      <div className="h-px flex-1 bg-white/6 dark:bg-white/6 light:bg-black/6" />
    </div>
  );
}

const ROLE_COLORS: Record<string, string> = {
  "Staff":       "text-[#39D98A]/60 dark:text-[#39D98A]/60 light:text-[#1A9A5C]",
  "Team Lead":   "text-[#47D7FF]/60 dark:text-[#47D7FF]/60 light:text-[#0E7490]",
  "Admin":       "text-[#9D7DFF]/60 dark:text-[#9D7DFF]/60 light:text-[#6D4FD1]",
  "Super Admin": "text-amber-400/60 dark:text-amber-400/60 light:text-amber-600",
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ProductShowcase() {
  const rendered: React.ReactNode[] = [];
  let lastRole = "";

  sections.forEach((section) => {
    if (section.role !== lastRole) {
      rendered.push(
        <RoleDivider key={`divider-${section.role}`} role={section.role} color={ROLE_COLORS[section.role]} />
      );
      lastRole = section.role;
    }
    rendered.push(<ShowcaseRow key={section.title} section={section} />);
  });

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-36">
      <div className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#39D98A]/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-2/3 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-[#9D7DFF]/6 blur-[120px]" />

      <Container id="product">
        <SectionTitle
          eyebrow="Real Product, Real Data"
          title="Every role. Every screen. The actual tool."
          description="No mockups. No demo environments. These are screenshots of the live Veltrax application — exactly what your staff, team leads, admins and super admins see every day."
          className="mb-24"
        />
        <div className="flex flex-col gap-24 lg:gap-32">
          {rendered}
        </div>
      </Container>
    </section>
  );
}