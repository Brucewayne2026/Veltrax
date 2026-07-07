"use client";

import { useEffect, useRef } from "react";

interface AuroraProps {
  className?: string;
  colors?: string[];
  speed?: number;
  intensity?: number;
}

export function Aurora({ 
  className = "", 
  colors = ["rgba(59, 130, 246, 0.1)", "rgba(139, 92, 246, 0.1)"],
  speed = 0.5,
  intensity = 1
}: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Aurora animation
    let time = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, colors[0] || "rgba(59, 130, 246, 0.1)");
      gradient.addColorStop(0.5, colors[1] || "rgba(139, 92, 246, 0.1)");
      gradient.addColorStop(1, colors[2] || "rgba(236, 72, 153, 0.1)");
      
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.1 * intensity;
      
      // Draw flowing blobs
      const waveCount = 3;
      for (let i = 0; i < waveCount; i++) {
        const offset = (i / waveCount) * Math.PI * 2;
        const waveWidth = canvas.width / (waveCount + 1);
        
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 20) {
          const waveOffset = Math.sin((x * 0.01) + time + offset) * (50 + i * 20);
          const y = canvas.height * 0.3 + waveOffset + Math.sin(x * 0.005 + time) * 20;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();
      }
      
      time += speed * 0.01;
      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [colors, speed, intensity]);

  return <canvas className={className} ref={canvasRef} />;
}