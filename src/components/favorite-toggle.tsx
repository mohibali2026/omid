"use client";

import { toggleFavorite, useIsFavorite } from "@/lib/favorites";
import type { Product } from "@/lib/products";

/** Heart button on a product card: saves the product to favourites; sits above the card's full-card link. */
export function FavoriteToggle({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const saved = useIsFavorite(product.slug);
  return (
    <button
      type="button"
      onClick={() => toggleFavorite(product.slug)}
      aria-pressed={saved}
      aria-label={`Save ${product.name} to favourites`}
      title={saved ? "Saved to favourites" : "Add to favourites"}
      className={`z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_1px_3px_rgb(0_0_0/0.1)] transition-transform hover:scale-105 active:scale-90 ${
        saved ? "text-[#e0245e]" : "text-ink"
      } ${className}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M11.993 5.136c-2-2.338-5.333-2.966-7.838-.826s-2.858 5.719-.89 8.25c1.635 2.105 6.585 6.544 8.207 7.98.182.162.272.242.378.274a.5.5 0 0 0 .286 0c.106-.032.197-.112.378-.273 1.623-1.437 6.573-5.876 8.208-7.98 1.967-2.532 1.658-6.133-.89-8.251-2.549-2.118-5.84-1.512-7.839.826Z" />
      </svg>
    </button>
  );
}
