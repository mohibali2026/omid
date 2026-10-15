"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  categories,
  inCategory,
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
  { id: "price-asc", label: "Lowest price" },
  { id: "price-desc", label: "Highest price" },
];

const PAGE_SIZES = [12, 24, 48, 60];

// Underline tabs: grey labels on a hairline, the current one dark with a bar beneath it.
const tab = (active: boolean) =>
  `-mb-px flex h-11 shrink-0 items-center whitespace-nowrap border-b-2 text-[14px] transition-colors ${
    active
      ? "border-neutral-900 font-medium text-neutral-900"
      : "border-transparent text-label-2 hover:text-neutral-900"
  }`;

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
  const [drawerOpen, setDrawerOpen] = useState(false);

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
        (!active || inCategory(p, active)) &&
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
    <div>
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

        {/* Category tabs on the left; filters, sort and search on the right (below on narrower screens). */}
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between xl:gap-8">
          <TabStrip label="Filter by category" activeKey={active ?? ""}>
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
          </TabStrip>

          {/* Filters, sort and search. */}
          <div className="flex w-full items-center gap-2 sm:w-auto sm:shrink-0">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-haspopup="dialog"
              aria-label={
                activeCount > 0 ? `Filters, ${activeCount} on` : "Filters"
              }
              title="Filters"
              className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full outline-none! transition-[color,background-color,box-shadow] focus-visible:shadow-[0_4px_16px_rgb(0_0_0/0.12)] ${
                activeCount > 0
                  ? "bg-ink text-white"
                  : "bg-white text-neutral-900 hover:text-label-2"
              }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M2.5 4.5h11M4.5 8h7M6.5 11.5h3" />
              </svg>
              {activeCount > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-action px-1 text-[11px] font-semibold text-white ring-2 ring-background"
                >
                  {activeCount}
                </span>
              )}
            </button>
            <label className="relative min-w-0 sm:shrink-0">
              <span className="sr-only">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-10 max-w-full appearance-none rounded-full bg-white pl-4 pr-9 text-[15px] text-neutral-900 outline-none! transition-shadow focus:shadow-[0_4px_16px_rgb(0_0_0/0.12)]"
              >
                {SORTS.map((so) => (
                  <option key={so.id} value={so.id}>
                    {so.label}
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
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-900"
              >
                <path d="M2.5 4.5l3.5 3.5 3.5-3.5" />
              </svg>
            </label>
            <label className="relative min-w-[6.5rem] flex-1 sm:w-40 sm:flex-none">
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
              className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {visible.map((product, i) => (
                <Reveal
                  key={product.slug}
                  delay={(i % 4) * 80}
                  className="h-full"
                >
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
            {/* Page size on the left, page numbers on the right, on one row even on phones. */}
            <div className="mt-8 flex items-center justify-between gap-3 sm:mt-12 sm:gap-4">
              <label className="flex shrink-0 items-center gap-2 text-[15px] text-label-2 sm:gap-3">
                <span className="sr-only sm:not-sr-only">Show</span>
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
      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        resultCount={shown.length}
        onClear={activeCount > 0 ? () => setFilters(EMPTY) : undefined}
      >
        <DrawerSection title="Price">
          <div className="flex flex-col gap-3">
            {PRICE_RANGES.map((r) => (
              <Check
                key={r.id}
                label={r.label}
                checked={filters.prices.includes(r.id)}
                onChange={() => toggle("prices", r.id)}
              />
            ))}
          </div>
        </DrawerSection>
        <DrawerSection title="Color">
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
        </DrawerSection>
        <DrawerSection title="Material">
          <div className="flex flex-col gap-3">
            {MATERIALS.map((m) => (
              <Check
                key={m}
                label={m}
                checked={filters.materials.includes(m)}
                onChange={() => toggle("materials", m)}
              />
            ))}
          </div>
        </DrawerSection>
        <DrawerSection title="Size">
          <div className="flex gap-2">
            {SIZES.map((sz) => {
              const on = filters.sizes.includes(sz);
              return (
                <label
                  key={sz}
                  className={`flex h-9 flex-1 cursor-pointer items-center justify-center rounded-lg border px-3 text-[14px] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-action ${
                    on
                      ? "border-ink bg-ink text-white"
                      : "border-neutral-200 bg-white text-neutral-900 hover:border-neutral-400"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={on}
                    onChange={() => toggle("sizes", sz)}
                  />
                  {sz}
                </label>
              );
            })}
          </div>
        </DrawerSection>
        <DrawerSection title="Availability">
          <div className="flex flex-col gap-3">
            {AVAILABILITY.map((av) => (
              <Check
                key={av.id}
                label={av.label}
                checked={filters.availability.includes(av.id)}
                onChange={() => toggle("availability", av.id)}
              />
            ))}
          </div>
        </DrawerSection>
      </FilterDrawer>
    </div>
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

/**
 * One-line strip of tabs that scrolls sideways. When tabs are hidden past an edge, that edge fades and shows an
 * arrow (a mouse wheel can't scroll it), and the current tab is scrolled into view, e.g. after a category card.
 */
function TabStrip({
  label,
  activeKey,
  children,
}: {
  label: string;
  activeKey: string;
  children: React.ReactNode;
}) {
  const nav = useRef<HTMLElement>(null);
  const [edges, setEdges] = useState({ start: false, end: false });

  useEffect(() => {
    const el = nav.current;
    if (!el) return;
    const update = () =>
      setEdges({
        start: el.scrollLeft > 1,
        end: el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
      });
    el.addEventListener("scroll", update, { passive: true });
    // Also reports the starting size, so the edges are known from the first frame.
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = nav.current;
    const current = el?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!el || !current) return;
    const box = el.getBoundingClientRect();
    const tab = current.getBoundingClientRect();
    if (tab.left < box.left || tab.right > box.right)
      el.scrollLeft += tab.left - box.left - (box.width - tab.width) / 2;
  }, [activeKey]);

  const scroll = (direction: -1 | 1) =>
    nav.current?.scrollBy({
      left: direction * nav.current.clientWidth * 0.6,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });

  return (
    <div className="relative min-w-0 flex-1">
      <nav
        ref={nav}
        aria-label={label}
        className="flex gap-5 overflow-x-auto border-b border-hairline [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </nav>
      {(["start", "end"] as const).map(
        (edge) =>
          edges[edge] && (
            <div
              key={edge}
              className={`pointer-events-none absolute bottom-px top-0 flex w-16 items-center ${
                edge === "start"
                  ? "left-0 justify-start bg-linear-to-r"
                  : "right-0 justify-end bg-linear-to-l"
              } from-background from-40% to-transparent`}
            >
              {/* Pointer convenience only; keyboard users reach every tab with Tab. */}
              <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                onClick={() => scroll(edge === "start" ? -1 : 1)}
                className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-900 shadow-[0_1px_3px_rgb(0_0_0/0.12),0_4px_12px_rgb(0_0_0/0.06)] transition-colors hover:text-label-2"
              >
                <svg
                  width="14"
                  height="14"
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
                      edge === "start"
                        ? "M10 3.5L5.5 8l4.5 4.5"
                        : "M6 3.5L10.5 8 6 12.5"
                    }
                  />
                </svg>
              </button>
            </div>
          ),
      )}
    </div>
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
    <nav aria-label="Pages" className="flex items-center gap-1 sm:gap-2">
      {arrow(-1)}
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-label={`Page ${n}`}
          aria-current={n === page ? "page" : undefined}
          // Below lg, "x of y" replaces the numbers so the row stays on one line.
          className={`${pageButton} hidden lg:flex ${n === page ? "bg-ink text-white" : "text-neutral-900 hover:bg-white"}`}
        >
          {n}
        </button>
      ))}
      <p className="whitespace-nowrap px-1.5 text-[15px] tabular-nums text-label-2 lg:hidden">
        <span className="sr-only">Page </span>
        <span className="font-semibold text-neutral-900">{page}</span> of{" "}
        {pageCount}
      </p>
      {arrow(1)}
    </nav>
  );
}

/** A titled block of options inside the filter drawer. */
function DrawerSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-hairline py-6 first:pt-2 last:border-b-0">
      <h3 className="mb-4 text-[15px] font-semibold text-neutral-900">
        {title}
      </h3>
      {children}
    </section>
  );
}

/**
 * Filters panel that slides in from the right edge. Escape, the backdrop or the close button
 * close it; the page behind doesn't scroll while it's open.
 */
function FilterDrawer({
  open,
  onClose,
  resultCount,
  onClear,
  children,
}: {
  open: boolean;
  onClose: () => void;
  resultCount: number;
  onClear?: () => void;
  children: React.ReactNode;
}) {
  const panel = useRef<HTMLDivElement>(null);
  // Latest onClose, so the effect below runs only when the drawer opens or closes
  // (re-running it would pull focus back to the panel while someone is ticking boxes).
  const close = useRef(onClose);
  useEffect(() => {
    close.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    // The Filters button, to hand focus back to when the drawer closes.
    const opener = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close.current();
      if (e.key !== "Tab" || !panel.current) return;
      // Keep Tab inside the drawer: wrap from the last control to the first and back.
      const items = [
        ...panel.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), input:not([disabled]), select",
        ),
      ];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const at = document.activeElement;
      if (e.shiftKey && (at === first || at === panel.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && at === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      opener?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Filters"
        tabIndex={-1}
        inert={!open}
        className={`absolute inset-y-0 right-0 flex w-[min(400px,100vw)] flex-col bg-white outline-none transition-[translate,box-shadow] duration-300 ease-out motion-reduce:transition-none ${
          // The shadow only while open, so it doesn't show along the screen edge when the drawer is away.
          open
            ? "translate-x-0 shadow-[0_0_40px_rgb(0_0_0/0.15)]"
            : "translate-x-full shadow-none"
        }`}
      >
        <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
          <h2 className="text-[19px] font-semibold tracking-tight text-neutral-900">
            Filters
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full text-neutral-900 hover:bg-background"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-6">
          {children}
        </div>

        <div className="flex items-center gap-3 border-t border-hairline px-6 py-4">
          <button
            type="button"
            onClick={onClear}
            disabled={!onClear}
            className="h-12 px-2 text-[15px] font-medium text-action underline-offset-4 hover:underline disabled:cursor-default disabled:text-neutral-300 disabled:no-underline"
          >
            Clear all
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex h-12 flex-1 items-center justify-center squircle bg-ink text-[16px] font-medium text-white transition-colors hover:bg-action-hover"
          >
            Show {resultCount} {resultCount === 1 ? "product" : "products"}
          </button>
        </div>
      </div>
    </div>
  );
}
