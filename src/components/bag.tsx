"use client";

import Image from "next/image";
import Link from "next/link";
import { cart, formatPrice, useCart } from "@/lib/cart";
import { productImage, shops } from "@/lib/products";
import { QuantityStepper } from "./quantity-stepper";
import { SecurePayment } from "./secure-payment";

export function Bag() {
  const { ready, items, count, subtotal } = useCart();

  if (!ready)
    return (
      <div
        aria-hidden="true"
        className="h-[480px] animate-pulse rounded-3xl bg-white"
      />
    );

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <h1 className="heading text-[40px] text-neutral-900 sm:text-[48px]">
          Your cart is empty.
        </h1>
        <p className="mt-3 text-[17px] text-label-2">
          Every piece on Omid is made by hand by an Afghan artisan.
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
        Your cart
      </h1>
      <p className="mt-2 text-[17px] text-label-2">
        {count} {count === 1 ? "item" : "items"} · {formatPrice(subtotal)}
      </p>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <ul className="divide-y divide-hairline rounded-3xl bg-white px-5 shadow-[0_8px_30px_rgb(0_0_0/0.05)] sm:px-7">
          {items.map(({ product, qty, total }) => {
            const shop = shops.find((s) => s.maker === product.maker);
            return (
              <li
                key={product.slug}
                className="flex gap-4 py-5 sm:gap-6 sm:py-6"
              >
                <Link
                  href={`/marketplace/products/${product.slug}`}
                  className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl sm:w-32"
                  style={{ backgroundColor: product.imageBg ?? "#f5f5f5" }}
                >
                  <Image
                    src={productImage(product)}
                    alt={product.alt}
                    fill
                    sizes="128px"
                    className={
                      product.imageFit === "cover"
                        ? "object-cover"
                        : "object-contain"
                    }
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <Link
                        href={`/marketplace/products/${product.slug}`}
                        className="text-[17px] font-semibold tracking-tight text-neutral-900 hover:underline hover:underline-offset-4"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-0.5 text-[14px] text-label-2">
                        {shop?.name ?? product.maker}
                      </p>
                    </div>
                    <p className="text-[17px] font-medium tabular-nums text-neutral-900">
                      {formatPrice(total)}
                    </p>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                    {product.stock > 1 ? (
                      <QuantityStepper
                        size="sm"
                        value={qty}
                        max={product.stock}
                        onChange={(n) => cart.setQty(product.slug, n)}
                        label={`Quantity of ${product.name}`}
                      />
                    ) : (
                      <p className="text-[14px] text-label-2">One of a kind</p>
                    )}
                    <button
                      type="button"
                      onClick={() => cart.remove(product.slug)}
                      className="text-[14px] font-medium text-action underline-offset-4 hover:underline"
                    >
                      Remove<span className="sr-only"> {product.name}</span>
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgb(0_0_0/0.05)] lg:sticky lg:top-24 sm:p-7">
          <h2 className="text-[19px] font-semibold tracking-tight text-neutral-900">
            Summary
          </h2>
          <dl className="mt-4 space-y-3 text-[15px]">
            <div className="flex justify-between">
              <dt className="text-label-2">Subtotal</dt>
              <dd className="tabular-nums text-neutral-900">
                {formatPrice(subtotal)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-label-2">Shipping</dt>
              <dd className="text-neutral-900">Calculated at checkout</dd>
            </div>
            <div className="flex justify-between border-t border-hairline pt-3 text-[17px] font-semibold">
              <dt className="text-neutral-900">Total</dt>
              <dd className="tabular-nums text-neutral-900">
                {formatPrice(subtotal)}
              </dd>
            </div>
          </dl>
          <Link
            href="/checkout"
            className="mt-6 flex h-12 w-full items-center justify-center squircle bg-ink text-[17px] font-medium text-white transition-colors hover:bg-action-hover active:scale-[0.98]"
          >
            Check Out
          </Link>
          <SecurePayment className="mt-4" />
        </aside>
      </div>
    </>
  );
}
