"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import LogoScene from "./LogoScene";

export default function CanvasWrapper() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="absolute inset-0 z-10 pointer-events-none">
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 45,
        }}
        dpr={[1, 1.5]}
        // "always" only while the hero is actually on screen — once the
        // user scrolls past it, drop to "never" so this stops eating
        // GPU/CPU for a logo nobody can see anymore.
        frameloop={inView ? "always" : "never"}
        gl={{ antialias: true, powerPreference: "low-power" }}
      >
        <Suspense fallback={null}>
          <LogoScene />
        </Suspense>
      </Canvas>
    </div>
  );
}