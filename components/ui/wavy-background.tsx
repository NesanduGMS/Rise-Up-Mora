"use client";
import { cn } from "../../lib/utils";
import { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";
 
export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "medium" | "fast" | "ultra";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const noise = createNoise3D();
  let w: number,
    h: number,
    nt: number,
    i: number,
    x: number,
    ctx: any,
    canvas: any;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.0008;
      case "medium":
        return 0.002;
      case "fast":
        return 0.004;
      case "ultra":
        return 0.007;
      default:
        return 0.002;
    }
  };
 
  const init = () => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
    ctx.filter = `blur(${blur}px)`;
    nt = 0;
    window.onresize = function () {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };
    render();
  };
 
  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c084fc",
    "#e879f9",
    "#22d3ee",
  ];
  
  const drawWave = (n: number) => {
    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      
      // Add shimmer effect with varying opacity based on time
      const shimmerOpacity = 0.7 + Math.sin(Date.now() / (1000 + i * 300)) * 0.3;
      ctx.globalAlpha = shimmerOpacity * waveOpacity;
      
      // Use a different frequency and amplitude for each wave
      const frequency = 800 - (i * 50); // Smaller numbers create wider waves
      const amplitude = 100 + (i * 10); // Larger numbers create taller waves
      
      for (x = 0; x < w; x += 5) {
        var y = noise(x / frequency, 0.3 * i, nt) * amplitude;
        ctx.lineTo(x, y + h * 0.5); // adjust for height, currently at 50% of the container
      }
      
      ctx.stroke();
      ctx.closePath();
    }
    
    // Reset global alpha after drawing all waves
    ctx.globalAlpha = 1;
  };
 
  let animationId: number;
  const render = () => {
    ctx.fillStyle = backgroundFill || "black";
    ctx.globalAlpha = waveOpacity || 0.5;
    ctx.fillRect(0, 0, w, h);
    drawWave(5);
    animationId = requestAnimationFrame(render);
  };
 
  useEffect(() => {
    init();
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
 
  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    // Support for Safari
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);
 
  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};