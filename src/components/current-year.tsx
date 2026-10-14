"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// Read on the client only so the year isn't frozen into the prerendered HTML.
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => null,
  );
  return <>{year}</>;
}
