"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { useFavorites } from "@/lib/favorites";

const CART_ICON =
  "M18.48 2.64C18.304 2.40533 18.216 2.288 18.1045 2.20338C18.0057 2.12842 17.8938 2.0725 17.7746 2.03845C17.64 2 17.4933 2 17.2 2H6.8C6.50667 2 6.36 2 6.22539 2.03845C6.10616 2.0725 5.9943 2.12842 5.89552 2.20338C5.784 2.288 5.696 2.40533 5.52 2.64L3.96 4.72C3.65102 5.13198 3.49652 5.33797 3.50011 5.51039C3.50323 5.66044 3.57358 5.80115 3.69175 5.89368C3.82754 6 4.08503 6 4.6 6H19.4C19.915 6 20.1725 6 20.3083 5.89368C20.4264 5.80115 20.4968 5.66044 20.4999 5.51039C20.5035 5.33797 20.349 5.13198 20.04 4.72L18.48 2.64ZM5.52 2.64L3.64 5.14666C3.40254 5.46328 3.28381 5.62159 3.1995 5.79592C3.12469 5.95062 3.07012 6.11431 3.03715 6.28296C3 6.47301 3 6.6709 3 7.06666L3 18.8C3 19.9201 3 20.4802 3.21799 20.908C3.40973 21.2843 3.71569 21.5903 4.09202 21.782C4.51984 22 5.07989 22 6.2 22L17.8 22C18.9201 22 19.4802 22 19.908 21.782C20.2843 21.5903 20.5903 21.2843 20.782 20.908C21 20.4802 21 19.9201 21 18.8V7.06667C21 6.6709 21 6.47301 20.9628 6.28296C20.9299 6.11431 20.8753 5.95062 20.8005 5.79592C20.7162 5.62159 20.5975 5.46328 20.36 5.14667L18.48 2.64M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10";
const HEART_ICON =
  "M11.993 5.136c-2-2.338-5.333-2.966-7.838-.826s-2.858 5.719-.89 8.25c1.635 2.105 6.585 6.544 8.207 7.98.182.162.272.242.378.274a.5.5 0 0 0 .286 0c.106-.032.197-.112.378-.273 1.623-1.437 6.573-5.876 8.208-7.98 1.967-2.532 1.658-6.133-.89-8.251-2.549-2.118-5.84-1.512-7.839.826Z";

function Icon({ d, size = 20 }: { d: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

/**
 * Header bag button: opens a small menu with Cart and Wishlist, each with its count.
 * Escape, a click outside or choosing an item closes it.
 */
export function BagLink({ className = "" }: { className?: string }) {
  const { count } = useCart();
  const { slugs: favorites } = useFavorites();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const items = [
    { href: "/cart", label: "Cart", icon: CART_ICON, count },
    {
      href: "/wishlist",
      label: "Wishlist",
      icon: HEART_ICON,
      count: favorites.length,
    },
  ];
  const active =
    pathname === "/cart" ||
    pathname === "/checkout" ||
    pathname === "/wishlist";

  return (
    <div ref={ref} className="relative -mr-2">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="bag-menu"
        aria-label={
          count
            ? `Cart and wishlist, ${count} ${count === 1 ? "item" : "items"} in cart`
            : "Cart and wishlist"
        }
        onClick={() => setOpen((v) => !v)}
        className={`relative flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0_1px_3px_rgb(0_0_0/0.1),0_4px_12px_rgb(0_0_0/0.05)] transition-colors sm:h-12 sm:w-12 ${
          active ? "text-action" : "text-neutral-900 hover:text-label-2"
        } ${className}`}
      >
        <Icon d={CART_ICON} />
        {count > 0 && (
          <span
            aria-hidden="true"
            className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-action px-1 text-[11px] font-semibold text-white ring-2 ring-background"
          >
            {count}
          </span>
        )}
      </button>

      {open && (
        <nav
          id="bag-menu"
          aria-label="Cart and wishlist"
          className="absolute right-0 top-full mt-2 w-60 rounded-2xl bg-white p-1.5 shadow-[0_12px_40px_rgb(0_0_0/0.14)] ring-1 ring-black/5"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={pathname === item.href ? "page" : undefined}
              className="flex h-12 items-center gap-3 rounded-xl px-3 text-[15px] font-medium text-neutral-900 transition-colors hover:bg-background"
            >
              <span className="text-label-2">
                <Icon d={item.icon} size={18} />
              </span>
              <span className="flex-1">{item.label}</span>
              {item.count > 0 && (
                <span className="rounded-full bg-background px-2 py-0.5 text-[12px] font-semibold tabular-nums text-label-2">
                  {item.count}
                </span>
              )}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="text-label-2"
              >
                <path d="M5.5 3l4 4-4 4" />
              </svg>
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
