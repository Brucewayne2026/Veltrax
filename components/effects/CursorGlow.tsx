"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [active, setActive] = useState(false);
  const [glowSize, setGlowSize] = useState(300);
  const [glowOpacity, setGlowOpacity] = useState(0);
  const [glowColor, setGlowColor] = useState("rgba(79, 140, 255, 0.15)");
  const [cursorSize, setCursorSize] = useState(12);
  const [cursorScale, setCursorScale] = useState(1);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 500, damping: 30 });
  const springY = useSpring(y, { stiffness: 500, damping: 30 });
  
  const cursorSpringX = useSpring(x, { stiffness: 1000, damping: 50 });
  const cursorSpringY = useSpring(y, { stiffness: 1000, damping: 50 });
  
  const interactiveSelectors = [
    "button",
    "a",
    "input",
    "textarea",
    "[role='button']",
    "[tabindex]:not([tabindex='-1'])",
    ".cursor-pointer",
    ".interactive"
  ].join(",");

  useEffect(() => {
    // Check if touch device
    const checkTouchDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(hasTouch);
    };
    
    checkTouchDevice();
    
    // If it's a touch device, don't do anything else
    if (isTouchDevice) {
      return;
    }
    
    // Hide native cursor only on non-touch devices
    document.body.style.cursor = "none";
    
    let rafId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const elements = document.elementsFromPoint(e.clientX, e.clientY);
        const isNearInteractive = elements.some(el => 
          el.matches(interactiveSelectors)
        );
        
        if (isNearInteractive) {
          setActive(true);
          setGlowSize(450);
          setGlowOpacity(0.4);
          setCursorScale(1.8);
          
          // Detect which interactive element to change color
          const interactiveEl = elements.find(el => 
            el.matches(interactiveSelectors)
          );
          
          if (interactiveEl) {
            const computedStyle = window.getComputedStyle(interactiveEl);
            const borderColor = computedStyle.borderColor;
            
            if (borderColor.includes("79, 140, 255") || borderColor.includes("#4F8CFF")) {
              setGlowColor("rgba(79, 140, 255, 0.25)");
            } else if (borderColor.includes("71, 215, 255") || borderColor.includes("#47D7FF")) {
              setGlowColor("rgba(71, 215, 255, 0.25)");
            } else if (borderColor.includes("157, 125, 255") || borderColor.includes("#9D7DFF")) {
              setGlowColor("rgba(157, 125, 255, 0.25)");
            } else {
              setGlowColor("rgba(79, 140, 255, 0.25)");
            }
          }
        } else {
          setActive(false);
          setGlowSize(300);
          setGlowOpacity(0);
          setCursorScale(1);
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      // Restore native cursor on unmount
      document.body.style.cursor = "default";
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Don't render anything on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Custom cursor dot */}
      <motion.div
        className="pointer-events-none fixed z-[10000] rounded-full bg-white dark:bg-white light:bg-black"
        style={{
          left: cursorSpringX,
          top: cursorSpringY,
          width: cursorSize,
          height: cursorSize,
          x: -cursorSize / 2,
          y: -cursorSize / 2,
          scale: cursorScale,
          transition: "scale 0.2s ease-out, background-color 0.2s ease-out"
        }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[9999]"
        style={{
          background: `radial-gradient(${glowSize}px circle at ${springX}px ${springY}px, ${glowColor}, transparent 60%)`,
          opacity: glowOpacity,
          transition: "opacity 0.3s ease-out, background 0.3s ease-out"
        }}
      />
    </>
  );
}
