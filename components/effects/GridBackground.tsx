"use client";

import { useEffect, useRef } from "react";

interface GridBackgroundProps {
  className?: string;
  size?: number;
  opacity?: number;
  color?: string;
}

export function GridBackground({ 
  className = "", 
  size = 60,
  opacity = 0.05,
  color = "rgba(255,255,255,0.08)"
}: GridBackgroundProps) {
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

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += size) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += size) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    drawGrid();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [size, opacity, color]);

  return <canvas className={className} ref={canvasRef} />;
}