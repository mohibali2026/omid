"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cart, useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";
import { QuantityStepper } from "./quantity-stepper";

/** Quantity, Add to Bag and Buy Now for one product, kept within the stock left after what's already in the bag. */
export function AddToBag({ product }: { product: Product }) {
  const router = useRouter();
  const { items } = useCart();
  const inBag = items.find((i) => i.slug === product.slug)?.qty ?? 0;
  const left = product.stock - inBag;
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const amount = Math.max(1, Math.min(qty, left));

  const add = () => {
    cart.add(product.slug, amount);
    setAdded(true);
    setQty(1);
  };

  if (left <= 0) {
    return (
      <div className="rounded-2xl bg-background p-4 text-[15px] text-neutral-900">
        {product.stock === 1
          ? "This piece is in your cart."
          : "All available pieces are in your cart."}{" "}
        <Link
          href="/cart"
          className="font-medium text-action underline-offset-4 hover:underline"
        >
          View cart
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        {product.stock > 1 && (
          <QuantityStepper
            value={amount}
            max={left}
            onChange={setQty}
            label={`Quantity of ${product.name}`}
          />
        )}
        <button
          type="button"
          onClick={add}
          className="inline-flex h-12 flex-1 items-center justify-center squircle bg-ink px-7 text-[17px] font-medium text-white transition-colors hover:bg-action-hover active:scale-[0.98] sm:flex-none sm:min-w-44"
        >
          Add to Cart
        </button>
        <button
          type="button"
          onClick={() => {
            cart.add(product.slug, amount);
            router.push("/checkout");
          }}
          className="inline-flex h-12 flex-1 items-center justify-center squircle border border-ink px-7 text-[17px] font-medium text-ink transition-colors hover:bg-ink/5 active:scale-[0.98] sm:flex-none sm:min-w-36"
        >
          Buy Now
        </button>
      </div>
      <p role="status" className="mt-3 min-h-6 text-[15px] text-neutral-900">
        {added && (
          <>
            <span className="text-action">✓</span> Added to your cart.{" "}
            <Link
              href="/cart"
              className="font-medium text-action underline-offset-4 hover:underline"
            >
              View cart
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
