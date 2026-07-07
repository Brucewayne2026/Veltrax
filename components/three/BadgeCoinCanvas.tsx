"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState, useRef } from "react";
import Lights from "./Lights";
import BadgeCoin, { type BadgeCategory } from "./BadgeCoin";

export default function BadgeCoinCanvas({ category }: { category: BadgeCategory }) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  // Plain ref, not React state — updated every pointer move and read inside
  // useFrame, so dragging doesn't trigger a React re-render per pixel.
  const dragRef = useRef({ dx: 0, dy: 0, dragging: false });
  const lastPointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkTouchDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(hasTouch);
    };
    checkTouchDevice();
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isTouchDevice) return;
    dragRef.current.dragging = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isTouchDevice || !dragRef.current.dragging) return;
    dragRef.current.dx = e.clientX - lastPointer.current.x;
    dragRef.current.dy = e.clientY - lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };
  };

  const endDrag = () => {
    dragRef.current.dragging = false;
  };

  if (isTouchDevice) {
    return (
      <div className="relative h-48 w-48 sm:h-56 sm:w-56 flex items-center justify-center">
        <div className="text-center text-white/60 dark:text-white/60 light:text-black/60">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400/20 via-cyan-300/20 to-purple-400/20 border border-white/10 flex items-center justify-center mx-auto mb-2">
            <span className="text-3xl font-bold text-white dark:text-white light:text-black">V</span>
          </div>
          <p className="text-xs">3D badge preview</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative h-56 w-56 cursor-grab touch-none active:cursor-grabbing sm:h-64 sm:w-64"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <Canvas
        camera={{ position: [0, 0, 3.6], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "low-power" }}
      >
        <Suspense fallback={null}>
          <Lights />
          <BadgeCoin category={category} dragRef={dragRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
