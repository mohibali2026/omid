"use client";

import { useEffect, useRef } from "react";

// Brand colours on a white panel: teal for troughs, aqua for ribbons, sun at the brightest crests.
const TEAL = [0, 151, 178];
const AQUA = [111, 227, 225];
const SUN = [251, 189, 3];
const GAP = 11; // px between dots

function mix(a: number[], b: number[], t: number) {
  return a.map((v, i) => Math.round(v + (b[i] - v) * t));
}

/**
 * Animated field of dots rippling in waves, drawn on a canvas.
 * Pauses off screen and in hidden tabs; shows a still frame for reduced motion.
 */
export function WaveField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let onScreen = false;

    const draw = (ms: number) => {
      const t = ms / 1000;
      ctx.clearRect(0, 0, width, height);
      for (let x = -GAP; x <= width + GAP; x += GAP) {
        for (let y = -GAP * 3; y <= height + GAP * 3; y += GAP) {
          // Two travelling waves bend the rows into flowing ribbons.
          const swell =
            Math.sin(x * 0.009 + t * 0.5) * 38 +
            Math.sin(y * 0.014 - t * 0.35 + x * 0.004) * 22;
          const px = x + Math.cos(y * 0.01 + t * 0.3) * 8;
          const py = y + swell;
          // Depth (0–1) drives size, brightness and colour: crests glow, troughs fade to dark gaps.
          const depth =
            (Math.sin(x * 0.008 + y * 0.011 + t * 0.5) +
              Math.sin(x * 0.004 - y * 0.006 - t * 0.3) +
              2) /
            4;
          // On white: faint aqua in the gaps, solid teal through the ribbons, sun on the crests.
          const alpha = Math.min(1, 0.08 + depth * depth * 1.25);
          if (alpha < 0.12) continue;
          const size = 0.8 + depth * 1.8;
          const rgb =
            depth < 0.6
              ? mix(AQUA, TEAL, depth / 0.6)
              : mix(TEAL, SUN, Math.min(1, (depth - 0.6) / 0.4));
          ctx.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${Math.min(1, alpha)})`;
          ctx.beginPath();
          ctx.arc(px, py, size / 2 + 0.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (ms: number) => {
      draw(ms);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduceMotion || frame || !onScreen || document.hidden) return;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    visibility.observe(canvas);
    const onVisibilityChange = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibilityChange);

    resize();
    return () => {
      stop();
      resizeObserver.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
