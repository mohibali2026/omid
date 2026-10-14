"use client";

import Link from "next/link";
import { useFavorites } from "@/lib/favorites";
import { products } from "@/lib/products";
import { ProductCard } from "./product-card";

/** Products saved with the heart on a product card, newest first. */
export function Wishlist() {
  const { ready, slugs } = useFavorites();
  if (!ready)
    return (
      <div
        aria-hidden="true"
        className="h-[480px] animate-pulse rounded-3xl bg-white"
      />
    );

  const saved = [...slugs]
    .reverse()
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p) => p !== undefined);

  if (saved.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <h1 className="heading text-[40px] text-neutral-900 sm:text-[48px]">
          Your wishlist is empty.
        </h1>
        <p className="mt-3 text-[17px] text-label-2">
          Tap the heart on any piece to save it here.
        </p>
        <Link
          href="/marketplace/products"
          className="mt-8 inline-flex h-12 items-center justify-center squircle bg-ink px-7 text-[17px] font-medium text-white transition-colors hover:bg-action-hover"
        >
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="heading text-[40px] text-neutral-900 sm:text-[48px]">
        Wishlist
      </h1>
      <p className="mt-2 text-[17px] text-label-2">
        {saved.length} saved {saved.length === 1 ? "piece" : "pieces"}
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {saved.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </>
  );
}
