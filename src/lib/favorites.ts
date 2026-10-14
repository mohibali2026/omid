"use client";

import { useSyncExternalStore } from "react";

/** Favourite products, kept in this browser only (prototype: no account, no server). */
const KEY = "omid-favorites";
const EMPTY: string[] = [];
let slugs: string[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded) return;
  loaded = true;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    if (Array.isArray(saved))
      slugs = saved.filter((s) => typeof s === "string");
  } catch {
    // Storage blocked or corrupt: start with none.
  }
}

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  // Keep tabs in step with each other.
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    loaded = false;
    load();
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function toggleFavorite(slug: string) {
  slugs = slugs.includes(slug)
    ? slugs.filter((s) => s !== slug)
    : [...slugs, slug];
  try {
    localStorage.setItem(KEY, JSON.stringify(slugs));
  } catch {
    // Not saved, but still works for this visit.
  }
  listeners.forEach((l) => l());
}

// Returned during server rendering and hydration, before the saved list has been read.
const NOT_LOADED: string[] = [];

/** Favourite product slugs, newest last; `ready` is false until the browser has loaded them. */
export function useFavorites() {
  const list = useSyncExternalStore(
    subscribe,
    () => {
      load();
      return slugs;
    },
    () => NOT_LOADED,
  );
  return { ready: list !== NOT_LOADED, slugs: list };
}

/** Whether a product is a favourite (false until the browser has loaded the saved list). */
export function useIsFavorite(slug: string) {
  return useFavorites().slugs.includes(slug);
}
