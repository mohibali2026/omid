"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A number that counts up from zero the first time it scrolls into view.
 * Shows the final value straight away for reduced motion, and in the server-rendered HTML.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1400,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          // Ease out so the count settles gently on the final value.
          setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setShown(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {/* Screen readers get the final figure, not the moving count. */}
      <span aria-hidden="true">
        {prefix}
        {shown.toLocaleString("en-US")}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {value.toLocaleString("en-US")}
        {suffix}
      </span>
    </span>
  );
}
