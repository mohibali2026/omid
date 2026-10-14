"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import {
  categories,
  categorySlug,
  colorSwatches,
  featuredProducts,
  products,
  shops,
  type Product,
} from "@/lib/products";
import { ProductCard } from "./product-card";
import { Reveal } from "./reveal";

const PRICE_RANGES = [
  { id: "under-100", label: "Under $100", test: (p: number) => p < 100 },
  {
    id: "100-500",
    label: "$100 – $500",
    test: (p: number) => p >= 100 && p <= 500,
  },
  {
    id: "500-1000",
    label: "$500 – $1,000",
    test: (p: number) => p > 500 && p <= 1000,
  },
  { id: "over-1000", label: "Over $1,000", test: (p: number) => p > 1000 },
];
const SIZES = ["Small", "Medium", "Large"] as const;
const AVAILABILITY = [
  { id: "one", label: "One of a kind", test: (p: Product) => p.stock === 1 },
  { id: "several", label: "More than one", test: (p: Product) => p.stock > 1 },
];
const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
];

const PAGE_SIZES = [12, 24, 48, 60];

const unique = (values: string[]) => Array.from(new Set(values)).sort();
const COLORS = unique(products.flatMap((p) => p.colors));
const MATERIALS = unique(products.map((p) => p.material));

type Filters = {
  prices: string[];
  colors: string[];
  materials: string[];
  sizes: string[];
  availability: string[];
};
const EMPTY: Filters = {
  prices: [],
  colors: [],
  materials: [],
  sizes: [],
  availability: [],
};

// Underline tabs: grey labels on a hairline, the current one dark with a bar beneath it.
const tab = (active: boolean) =>
  `-mb-px flex h-11 shrink-0 items-center whitespace-nowrap border-b-2 text-[16px] transition-colors ${
    active
      ? "border-neutral-900 font-medium text-neutral-900"
      : "border-transparent text-label-2 hover:text-neutral-900"
  }`;
/** Products with a filter sidebar; the category lives in ?category= so it can be linked to. */
export function ProductGrid() {
  const params = useSearchParams();
  return (
    <Catalogue active={params.get("category")} shopSlug={params.get("shop")} />
  );
}

/** Same page without reading the URL, used while it's read and as the prerendered page. */
export function AllProducts() {
  return <Catalogue active={null} />;
}

function Catalogue({
  active,
  shopSlug = null,
}: {
  active: string | null;
  shopSlug?: string | null;
}) {
  const shop = shops.find((s) => s.slug === shopSlug);
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [sort, setSort] = useState("featured");
  const [query, setQuery] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);

  const toggle = (key: keyof Filters, value: string) =>
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(value)
        ? f[key].filter((v) => v !== value)
        : [...f[key], value],
    }));
  const activeCount = Object.values(filters).reduce(
    (n, list) => n + list.length,
    0,
  );

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = featuredProducts.filter(
      (p) =>
        (!q ||
          `${p.name} ${p.description} ${p.category} ${p.maker} ${p.place} ${p.material}`
            .toLowerCase()
            .includes(q)) &&
        (!active || categorySlug(p.category) === active) &&
        (!shop || p.maker === shop.maker) &&
        (filters.prices.length === 0 ||
          PRICE_RANGES.some(
            (r) => filters.prices.includes(r.id) && r.test(p.priceValue),
          )) &&
        (filters.colors.length === 0 ||
          p.colors.some((c) => filters.colors.includes(c))) &&
        (filters.materials.length === 0 ||
          filters.materials.includes(p.material)) &&
        (filters.sizes.length === 0 || filters.sizes.includes(p.size)) &&
        (filters.availability.length === 0 ||
          AVAILABILITY.some(
            (a) => filters.availability.includes(a.id) && a.test(p),
          )),
    );
    if (sort === "price-asc")
      return [...list].sort((a, b) => a.priceValue - b.priceValue);
    if (sort === "price-desc")
      return [...list].sort((a, b) => b.priceValue - a.priceValue);
    return list;
  }, [active, shop, filters, sort, query]);

  // The page is tied to the current category, filters, sort, search and page size,
  // so changing any of them starts again from page 1.
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const listKey = JSON.stringify([
    active,
    shopSlug,
    filters,
    sort,
    query.trim(),
    pageSize,
  ]);
  const [paging, setPaging] = useState({ key: listKey, page: 1 });
  const pageCount = Math.max(1, Math.ceil(shown.length / pageSize));
  const page = paging.key === listKey ? Math.min(paging.page, pageCount) : 1;
  const visible = shown.slice((page - 1) * pageSize, page * pageSize);
  const gridTop = useRef<HTMLDivElement>(null);
  const goTo = (next: number) => {
    setPaging({ key: listKey, page: next });
    // Bring the top of the grid back into view, below the fixed header.
    const top = gridTop.current?.getBoundingClientRect().top;
    if (top !== undefined && top < 0)
      window.scrollBy({ top: top - 120, behavior: "smooth" });
  };

  return (
    <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      {/* Filters: a sidebar on desktop, a toggled panel on smaller screens. */}
      <aside aria-label="Filters" className="mb-6 lg:mb-0">
        <button
          type="button"
          aria-expanded={panelOpen}
          aria-controls="product-filters"
          onClick={() => setPanelOpen((v) => !v)}
          className="flex h-11 w-full items-center justify-between rounded-xl bg-white px-4 text-[15px] text-neutral-900 lg:hidden"
        >
          Filters{activeCount > 0 && ` (${activeCount})`}
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
            className={`transition-transform ${panelOpen ? "rotate-180" : ""}`}
          >
            <path d="M2.5 4.5l3.5 3.5 3.5-3.5" />
          </svg>
        </button>

        <div
          id="product-filters"
          className={`${panelOpen ? "mt-3 block" : "hidden"} rounded-2xl bg-white p-5 lg:sticky lg:top-24 lg:mt-0 lg:block lg:max-h-[calc(100svh-7rem)] lg:overflow-y-auto lg:overscroll-contain lg:bg-transparent lg:p-0 lg:pb-6 lg:pr-3 lg:[scrollbar-width:thin]`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-semibold text-ink">Filters</h2>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={() => setFilters(EMPTY)}
                className="text-[14px] text-action underline-offset-4 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          <FilterGroup legend="Sort by">
            <div className="relative">
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
            </div>
          </FilterGroup>

          <FilterGroup legend="Price">
            {PRICE_RANGES.map((r) => (
              <Check
                key={r.id}
                label={r.label}
                checked={filters.prices.includes(r.id)}
                onChange={() => toggle("prices", r.id)}
              />
            ))}
          </FilterGroup>

          <FilterGroup legend="Color">
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => {
                const on = filters.colors.includes(c);
                return (
                  <label
                    key={c}
                    className={`flex h-9 cursor-pointer items-center gap-2 rounded-full border px-3 text-[14px] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-action ${
                      on
                        ? "border-ink bg-ink text-white"
                        : "border-neutral-200 bg-white text-neutral-900 hover:border-neutral-400"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={on}
                      onChange={() => toggle("colors", c)}
                    />
                    <span
                      className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10"
                      style={{ backgroundColor: colorSwatches[c] }}
                    />
                    {c}
                  </label>
                );
              })}
            </div>
          </FilterGroup>

          <FilterGroup legend="Material">
            {MATERIALS.map((m) => (
              <Check
                key={m}
                label={m}
                checked={filters.materials.includes(m)}
                onChange={() => toggle("materials", m)}
              />
            ))}
          </FilterGroup>

          <FilterGroup legend="Size">
            <div className="flex gap-2">
              {SIZES.map((s) => {
                const on = filters.sizes.includes(s);
                return (
                  <label
                    key={s}
                    className={`flex h-9 flex-1 cursor-pointer items-center justify-center rounded-lg border text-[14px] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-action ${
                      on
                        ? "border-ink bg-ink text-white"
                        : "border-neutral-200 bg-white text-neutral-900 hover:border-neutral-400"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={on}
                      onChange={() => toggle("sizes", s)}
                    />
                    {s}
                  </label>
                );
              })}
            </div>
          </FilterGroup>

          <FilterGroup legend="Availability">
            {AVAILABILITY.map((a) => (
              <Check
                key={a.id}
                label={a.label}
                checked={filters.availability.includes(a.id)}
                onChange={() => toggle("availability", a.id)}
              />
            ))}
          </FilterGroup>
        </div>
      </aside>

      <div>
        {shop && (
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white px-5 py-4">
            <p className="text-[15px] text-neutral-900">
              Showing products from{" "}
              <span className="font-semibold">{shop.name}</span> ·{" "}
              {shop.province} Province
            </p>
            <Link
              href="/marketplace/products"
              className="text-[15px] text-action underline-offset-4 hover:underline"
            >
              View all products
            </Link>
          </div>
        )}

        {/* Category tabs, with search on the right (below them on narrower screens). */}
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between xl:gap-8">
          <nav
            aria-label="Filter by category"
            className="flex min-w-0 flex-1 gap-7 overflow-x-auto border-b border-hairline [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <Link
              href="/marketplace/products"
              aria-current={!active ? "page" : undefined}
              className={tab(!active)}
            >
              All
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/marketplace/products?category=${c.slug}`}
                aria-current={active === c.slug ? "page" : undefined}
                className={tab(active === c.slug)}
              >
                {c.name}
              </Link>
            ))}
          </nav>

          <label className="relative w-full shrink-0 sm:w-56 xl:w-48">
            <span className="sr-only">Search products</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-label-2"
            >
              <circle cx="7" cy="7" r="5" />
              <path d="M11 11l3.5 3.5" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="h-10 w-full rounded-full bg-white pl-10 pr-4 text-[15px] text-neutral-900 outline-none! transition-shadow placeholder:text-placeholder focus:shadow-[0_4px_16px_rgb(0_0_0/0.1)]"
            />
          </label>
        </div>

        <p className="sr-only" aria-live="polite">
          {shown.length} {shown.length === 1 ? "product" : "products"}
        </p>

        {shown.length === 0 ? (
          <p className="mt-10 text-center text-[17px] text-label-2">
            No products match
            {query.trim() ? ` “${query.trim()}”` : " these filters"}.{" "}
            <button
              type="button"
              onClick={() => {
                setFilters(EMPTY);
                setQuery("");
              }}
              className="text-action underline-offset-4 hover:underline"
            >
              Clear filters
            </button>
          </p>
        ) : (
          <>
            <div
              ref={gridTop}
              className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {visible.map((product, i) => (
                <Reveal
                  key={product.slug}
                  delay={(i % 3) * 100}
                  className="h-full"
                >
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
            {/* Page size on the left, page numbers on the right. */}
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
              <label className="flex items-center gap-3 text-[15px] text-label-2">
                Show
                <span className="relative">
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    className="h-10 appearance-none rounded-xl border border-field bg-white pl-3 pr-9 text-[15px] tabular-nums text-neutral-900 outline-none! transition-[border-color,box-shadow] focus:border-transparent focus:shadow-[0_4px_16px_rgb(0_0_0/0.1)]"
                  >
                    {PAGE_SIZES.map((n) => (
                      <option key={n} value={n}>
                        {n}
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
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-900"
                  >
                    <path d="M2.5 4.5l3.5 3.5 3.5-3.5" />
                  </svg>
                </span>
                per page
              </label>
              {pageCount > 1 && (
                <Pagination page={page} pageCount={pageCount} onChange={goTo} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  legend,
  children,
}: {
  legend: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="mt-5 border-t border-hairline pt-5">
      <legend className="float-left mb-3 w-full text-[14px] font-semibold text-neutral-900">
        {legend}
      </legend>
      <div className="clear-left flex flex-col gap-2.5">{children}</div>
    </fieldset>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-[15px] text-neutral-900">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-[#00788e]"
      />
      {label}
    </label>
  );
}

const pageButton =
  "flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-[15px] tabular-nums transition-colors";

/** Previous / page numbers / Next. */
function Pagination({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}) {
  const arrow = (direction: -1 | 1) => (
    <button
      type="button"
      onClick={() => onChange(page + direction)}
      disabled={direction === -1 ? page === 1 : page === pageCount}
      aria-label={direction === -1 ? "Previous page" : "Next page"}
      className={`${pageButton} bg-white text-neutral-900 hover:bg-neutral-100 disabled:cursor-default disabled:text-neutral-300 disabled:hover:bg-white`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path
          d={
            direction === -1 ? "M10 3.5L5.5 8l4.5 4.5" : "M6 3.5L10.5 8 6 12.5"
          }
        />
      </svg>
    </button>
  );

  return (
    <nav
      aria-label="Pages"
      className="mt-12 flex items-center justify-center gap-2"
    >
      {arrow(-1)}
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-label={`Page ${n}`}
          aria-current={n === page ? "page" : undefined}
          // Phones show "Page x of y" instead of every number.
          className={`${pageButton} hidden sm:flex ${n === page ? "bg-ink text-white" : "text-neutral-900 hover:bg-white"}`}
        >
          {n}
        </button>
      ))}
      <p className="px-2 text-[15px] tabular-nums text-label-2 sm:hidden">
        Page <span className="font-semibold text-neutral-900">{page}</span> of{" "}
        {pageCount}
      </p>
      {arrow(1)}
    </nav>
  );
}
