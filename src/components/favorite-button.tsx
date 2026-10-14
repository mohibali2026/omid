"use client";

import { useState } from "react";

/** "Add to Favorites" toggle. Not saved anywhere yet. */
export function FavoriteButton({ className = "" }: { className?: string }) {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => setOn((v) => !v)}
      className={`flex h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-field px-3 text-[14px] text-neutral-900 transition-colors hover:bg-background ${className}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={on ? "#00788e" : "none"}
        stroke={on ? "#00788e" : "currentColor"}
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0112 7.6a4.3 4.3 0 017.5 2.7c0 5.6-7.5 10.2-7.5 10.2z" />
      </svg>
      {on ? "In Favorites" : "Add to Favorites"}
    </button>
  );
}
