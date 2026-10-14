"use client";

import { useSyncExternalStore } from "react";
import { products, type Product } from "./products";

/**
 * The shopping bag, kept in this browser only (prototype: no account, no server).
 * Only product slugs and quantities are stored, never personal or payment details.
 */
export type CartLine = { slug: string; qty: number };

const KEY = "omid-bag";
const EMPTY: CartLine[] = [];
// Returned during server rendering and hydration, before the saved bag has been read.
const NOT_LOADED: CartLine[] = [];
let lines: CartLine[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded) return;
  loaded = true;
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    if (Array.isArray(saved)) lines = clamp(saved);
  } catch {
    // Storage blocked or corrupt: start with an empty bag.
  }
}

/** Drops unknown products and keeps quantities within stock. */
function clamp(list: CartLine[]) {
  return list.flatMap((line) => {
    const product = products.find((p) => p.slug === line.slug);
    const qty = Math.min(
      Math.floor(Number(line.qty)) || 0,
      product?.stock ?? 0,
    );
    return product && qty > 0 ? [{ slug: line.slug, qty }] : [];
  });
}

function commit(next: CartLine[]) {
  lines = clamp(next);
  try {
    localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    // Not saved, but the bag still works for this visit.
  }
  listeners.forEach((l) => l());
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

const getSnapshot = () => {
  load();
  return lines;
};

export const cart = {
  add(slug: string, qty = 1) {
    const current = lines.find((l) => l.slug === slug)?.qty ?? 0;
    commit(
      current
        ? lines.map((l) => (l.slug === slug ? { ...l, qty: current + qty } : l))
        : [...lines, { slug, qty }],
    );
  },
  setQty(slug: string, qty: number) {
    commit(lines.map((l) => (l.slug === slug ? { ...l, qty } : l)));
  },
  remove(slug: string) {
    commit(lines.filter((l) => l.slug !== slug));
  },
  clear() {
    commit([]);
  },
};

export type CartItem = CartLine & { product: Product; total: number };

/** The bag's lines with their products, plus totals. Empty until the browser has loaded it. */
export function useCart() {
  const current = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => NOT_LOADED,
  );
  const items: CartItem[] = current.map((line) => {
    const product = products.find((p) => p.slug === line.slug)!;
    return { ...line, product, total: product.priceValue * line.qty };
  });
  return {
    ready: current !== NOT_LOADED,
    items,
    count: items.reduce((n, i) => n + i.qty, 0),
    subtotal: items.reduce((n, i) => n + i.total, 0),
  };
}

export const formatPrice = (value: number) =>
  `$${value.toLocaleString("en-US", { minimumFractionDigits: value % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;
