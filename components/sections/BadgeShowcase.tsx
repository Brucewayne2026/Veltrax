"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import BadgeCoin, { BadgeCategory } from "@/components/three/BadgeCoin";
import GlassCard from "@/components/shared/GlassCard";
import { MousePointer2 } from "lucide-react";

const BADGES: { category: BadgeCategory; label: string }[] = [
  { category: "streak", label: "Streak badge" },
  { category: "points", label: "Points coin" },
  { category: "anniversary", label: "Anniversary" },
  { category: "special", label: "Special award" },
];

function BadgeCanvas({ category }: { category: BadgeCategory }) {
  const dragRef = useRef({ dx: 0, dy: 0, dragging: false });
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragRef.current.dragging = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.dragging) return;
    dragRef.current.dx += e.movementX;
    dragRef.current.dy += e.movementY;
  };

  const handlePointerUp = () => {
    dragRef.current.dragging = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative h-40 w-full cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.8} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={1.2} />
        <spotLight position={[-5, 5, -5]} angle={0.3} penumbra={1} intensity={0.8} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <BadgeCoin category={category} dragRef={dragRef} />
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={6}
            blur={2}
            far={2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default function BadgeShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
      className="mt-12"
    >
      <GlassCard className="p-6 sm:p-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 dark:text-white/40 light:text-black/40">
              Interactive · drag to inspect
            </span>
            <h3 className="mt-1 font-[family-name:var(--font-heading)] text-lg font-semibold text-white dark:text-white light:text-black">
              Category-differentiated badges
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-white/40 dark:text-white/40 light:text-black/40">
            <MousePointer2 className="h-3.5 w-3.5" />
            <span>Drag to spin</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BADGES.map((badge, i) => (
            <div
              key={badge.category}
              className="flex flex-col items-center gap-2 rounded-xl border border-white/8 bg-white/[0.02] p-4 dark:border-white/8 dark:bg-white/[0.02] light:border-black/10 light:bg-black/[0.02]"
            >
              <BadgeCanvas category={badge.category} />
              <span className="text-xs font-medium text-white/70 dark:text-white/70 light:text-black/70">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}