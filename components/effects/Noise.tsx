"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface NoiseProps {
  className?: string;
  opacity?: number;
}

export function Noise({ 
  className = "", 
  opacity = 0.02
}: NoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const drawNoise = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create noise by drawing random pixels
      for (let i = 0; i < (canvas.width * canvas.height) * 0.01; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 1.5 + 0.5;
        
        const color = isDark ? "255,255,255" : "0,0,0";
        ctx.fillStyle = `rgba(${color},${Math.random() * opacity})`;
        ctx.fillRect(x, y, size, size);
      }
    };

    drawNoise();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [opacity, theme]);

  return <canvas className={className} ref={canvasRef} />;
}