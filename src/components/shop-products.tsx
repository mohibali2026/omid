"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { ProductCard } from "./product-card";

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
];

const chip = (active: boolean) =>
  `flex h-10 items-center rounded-full px-4 text-[15px] transition-colors ${
    active
      ? "bg-ink text-white"
      : "bg-background text-neutral-900 hover:bg-neutral-200"
  }`;

/** A shop's products with category chips, search and sort. */
export function ShopProducts({ products }: { products: Product[] }) {
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter(
      (p) =>
        (!category || p.category === category) &&
        (!q ||
          `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(q)),
    );
    if (sort === "price-asc")
      return [...list].sort((a, b) => a.priceValue - b.priceValue);
    if (sort === "price-desc")
      return [...list].sort((a, b) => b.priceValue - a.priceValue);
    return list;
  }, [products, category, query, sort]);

  return (
    <div className="rounded-3xl bg-white p-4 sm:p-6">
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by category"
      >
        <button
          type="button"
          aria-pressed={!category}
          onClick={() => setCategory(null)}
          className={chip(!category)}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
            className={chip(category === c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 border-b border-hairline pb-5 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search this shop</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-label-2"
          >
            <circle cx="7" cy="7" r="5" />
            <path d="M11 11l3.5 3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search items…"
            className="h-11 w-full rounded-xl bg-background pl-10 pr-3 text-[15px] text-neutral-900 placeholder:text-placeholder outline-none! transition-[background-color,box-shadow] focus:bg-white focus:shadow-[0_4px_16px_rgb(0_0_0/0.1)]"
          />
        </label>
        <label className="relative sm:w-56">
          <span className="sr-only">Sort by</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-11 w-full appearance-none rounded-xl border border-field bg-white pl-3 pr-10 text-[15px] text-neutral-900 outline-none! transition-[border-color,box-shadow] focus:border-transparent focus:shadow-[0_4px_16px_rgb(0_0_0/0.1)]"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-900"
          >
            <path d="M2.5 4.5l3.5 3.5 3.5-3.5" />
          </svg>
        </label>
      </div>

      <p className="sr-only" aria-live="polite">
        {shown.length} {shown.length === 1 ? "product" : "products"}
      </p>

      {shown.length === 0 ? (
        <p className="py-16 text-center text-[16px] text-label-2">
          No items match your search.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
