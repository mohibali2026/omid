"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const plural = (n: number, unit: string) => `${n} ${unit}${n === 1 ? "" : "s"}`;

/** Whole months from "YYYY-MM" to today (at least 1, so a new shop doesn't read "0m"). */
function monthsSince(joined: string) {
  const [year, month] = joined.split("-").map(Number);
  const now = new Date();
  return Math.max(
    1,
    (now.getFullYear() - year) * 12 + now.getMonth() + 1 - month,
  );
}

/**
 * How long a shop has been on Omid, e.g. "2y 5m" or "9m" (read out in full).
 * Read on the client only so the duration isn't frozen into the prerendered HTML.
 */
export function TimeOnOmid({ joined }: { joined: string }) {
  const months = useSyncExternalStore(
    subscribe,
    () => monthsSince(joined),
    () => null,
  );
  if (months === null) return null;
  const y = Math.floor(months / 12);
  const m = months % 12;
  const short = [y && `${y}y`, m && `${m}m`].filter(Boolean).join(" ");
  const long = [y && plural(y, "year"), m && plural(m, "month")]
    .filter(Boolean)
    .join(" ");
  return (
    <>
      <span aria-hidden="true">{short}</span>
      <span className="sr-only">{long}</span>
    </>
  );
}
