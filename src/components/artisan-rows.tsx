import Image from "next/image";
import Link from "next/link";
import type { artisans } from "@/lib/products";

type Artisan = (typeof artisans)[number];

// 16×16 outline icons for the stats line.
const ICONS = {
  products: (
    <>
      <path d="M3 5.5h10l-.8 8.5H3.8L3 5.5z" />
      <path d="M5.8 5.5V4.3a2.2 2.2 0 014.4 0v1.2" />
    </>
  ),
  rating: (
    <path d="M8 1.8l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.6l-3.8 2 .7-4.3-3.1-3 4.3-.6L8 1.8z" />
  ),
};

/** A pill linking to a shop: round headshot, shop name, and its products and rating. */
export function ArtisanPill({
  shop,
  hidden,
  className = "shrink-0",
  compact,
}: {
  shop: Artisan;
  hidden?: boolean;
  className?: string;
  /** Smaller photo, type and padding, for fitting four pills in a row. */
  compact?: boolean;
}) {
  const stats = [
    {
      key: "products",
      label: "Products",
      value: `${shop.products.length} ${shop.products.length === 1 ? "product" : "products"}`,
    },
    { key: "rating", label: "Rating", value: shop.rating.toFixed(1) },
  ] as const;
  return (
    <Link
      href={`/marketplace/artisans/${shop.slug}`}
      // The second copy of each row only exists for the loop, so it's skipped by keyboards and screen readers.
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={`group flex items-center rounded-full bg-white transition-transform duration-300 hover:-translate-y-0.5 ${
        compact
          ? "gap-3 p-1.5 pr-4"
          : "gap-3 p-1.5 pr-6 sm:gap-4 sm:p-2 sm:pr-8"
      } ${className}`}
    >
      <span
        className={`relative shrink-0 overflow-hidden rounded-full bg-background ${
          compact ? "h-12 w-12" : "h-12 w-12 sm:h-16 sm:w-16"
        }`}
      >
        {shop.photo && (
          <Image
            src={shop.photo}
            alt={hidden ? "" : `${shop.name} profile photo`}
            fill
            sizes="64px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </span>
      <span className="flex min-w-0 flex-col">
        <span
          className={`truncate font-medium tracking-tight text-neutral-900 ${
            compact ? "text-[16px]" : "text-[16px] sm:text-[19px]"
          }`}
        >
          {shop.name}
        </span>
        <span
          className={`mt-0.5 flex items-center whitespace-nowrap font-mono text-label-2 ${
            compact
              ? "gap-2 text-[11px]"
              : "gap-2.5 text-[11px] sm:gap-3 sm:text-[12px]"
          }`}
        >
          {stats.map((stat) => (
            <span key={stat.key} className="flex items-center gap-1">
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {ICONS[stat.key]}
              </svg>
              <span className="sr-only">{stat.label}: </span>
              {stat.value}
            </span>
          ))}
        </span>
      </span>
    </Link>
  );
}

/**
 * Rows of shop pills drifting sideways in alternating directions, cropped by the screen edges. Phones get a plain list instead.
 * Each row repeats its shops so the loop is seamless; with reduced motion the rows sit still and scroll by hand.
 */
export function ArtisanRows({
  shops,
  listOnPhones = true,
}: {
  shops: Artisan[];
  /** Show phones a plain one-per-row list instead of the moving rows. */
  listOnPhones?: boolean;
}) {
  // Same shops in a different order per row, so neighbours don't line up.
  // Deal the shops into three rows, each starting at a different point so neighbours don't line up.
  const rows = [0, 1, 2].map((row) => {
    const list = shops.filter((_, i) => i % 3 === row);
    const start = (row * 3) % list.length;
    return [...list.slice(start), ...list.slice(0, start)];
  });
  return (
    <>
      {listOnPhones && (
        // Phones: one shop per row, in a plain list.
        <ul className="flex flex-col gap-3 px-4 sm:hidden">
          {shops.map((shop) => (
            <li key={shop.slug}>
              <ArtisanPill shop={shop} className="w-full" />
            </li>
          ))}
        </ul>
      )}
      <div
        className={`flex-col gap-2 sm:flex sm:gap-3 ${listOnPhones ? "hidden" : "flex"}`}
      >
        {rows.map((list, row) => {
          return (
            <div
              key={row}
              className="marquee-row overflow-x-auto [scrollbar-width:none] motion-safe:overflow-hidden"
            >
              <div
                className="marquee flex w-max gap-3 py-2 pl-3 sm:gap-4 sm:pl-4"
                style={
                  {
                    "--duration": `${55 + row * 12}s`,
                    "--direction": row % 2 ? "reverse" : "normal",
                  } as React.CSSProperties
                }
              >
                {/* Two copies: the track moves by half (one copy of the row, six or seven shops), wider than any screen. */}
                {[0, 1].flatMap((copy) =>
                  list.map((shop) => (
                    <ArtisanPill
                      key={`${shop.slug}-${copy}`}
                      shop={shop}
                      hidden={copy > 0}
                    />
                  )),
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
