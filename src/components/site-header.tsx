"use client";

import { asset } from "@/lib/base-path";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { BagLink } from "./bag-link";

// Section icons (24×24 outline, drawn in the current text colour).
const ICONS = {
  Support:
    "M11.993 5.136c-2-2.338-5.333-2.966-7.838-.826s-2.858 5.719-.89 8.25c1.635 2.105 6.585 6.544 8.207 7.98.182.162.272.242.378.274a.5.5 0 0 0 .286 0c.106-.032.197-.112.378-.273 1.623-1.437 6.573-5.876 8.208-7.98 1.967-2.532 1.658-6.133-.89-8.251-2.549-2.118-5.84-1.512-7.839.826Z",
  Shop: "M12 6V22M12 6H8.46429C7.94332 6 7.4437 5.78929 7.07533 5.41421C6.70695 5.03914 6.5 4.53043 6.5 4C6.5 3.46957 6.70695 2.96086 7.07533 2.58579C7.4437 2.21071 7.94332 2 8.46429 2C11.2143 2 12 6 12 6ZM12 6H15.5357C16.0567 6 16.5563 5.78929 16.9247 5.41421C17.293 5.03914 17.5 4.53043 17.5 4C17.5 3.46957 17.293 2.96086 16.9247 2.58579C16.5563 2.21071 16.0567 2 15.5357 2C12.7857 2 12 6 12 6ZM20 11V18.8C20 19.9201 20 20.4802 19.782 20.908C19.5903 21.2843 19.2843 21.5903 18.908 21.782C18.4802 22 17.9201 22 16.8 22L7.2 22C6.07989 22 5.51984 22 5.09202 21.782C4.71569 21.5903 4.40973 21.2843 4.21799 20.908C4 20.4802 4 19.9201 4 18.8V11M2 7.6L2 9.4C2 9.96005 2 10.2401 2.10899 10.454C2.20487 10.6422 2.35785 10.7951 2.54601 10.891C2.75992 11 3.03995 11 3.6 11L20.4 11C20.9601 11 21.2401 11 21.454 10.891C21.6422 10.7951 21.7951 10.6422 21.891 10.454C22 10.2401 22 9.96005 22 9.4V7.6C22 7.03995 22 6.75992 21.891 6.54601C21.7951 6.35785 21.6422 6.20487 21.454 6.10899C21.2401 6 20.9601 6 20.4 6L3.6 6C3.03995 6 2.75992 6 2.54601 6.10899C2.35785 6.20487 2.20487 6.35785 2.10899 6.54601C2 6.75992 2 7.03995 2 7.6Z",
  Impact:
    "M6.9 11.4444V14.2222M6.9 11.4444V4.77778C6.9 3.8573 7.66112 3.11111 8.6 3.11111C9.53888 3.11111 10.3 3.8573 10.3 4.77778M6.9 11.4444C6.9 10.524 6.13888 9.77778 5.2 9.77778C4.26112 9.77778 3.5 10.524 3.5 11.4444V13.6667C3.5 18.269 7.30558 22 12 22C16.6944 22 20.5 18.269 20.5 13.6667V8.11111C20.5 7.19064 19.7389 6.44444 18.8 6.44444C17.8611 6.44444 17.1 7.19064 17.1 8.11111M10.3 4.77778V10.8889M10.3 4.77778V3.66667C10.3 2.74619 11.0611 2 12 2C12.9389 2 13.7 2.74619 13.7 3.66667V4.77778M13.7 4.77778V10.8889M13.7 4.77778C13.7 3.8573 14.4611 3.11111 15.4 3.11111C16.3389 3.11111 17.1 3.8573 17.1 4.77778V8.11111M17.1 8.11111V10.8889",
};

/** The three sections of the site; each stays selected on its inner pages. Support is the home page. */
const tabs = [
  { href: "/", label: "Support", match: (p: string) => p === "/" },
  {
    href: "/marketplace/products",
    label: "Shop",
    match: (p: string) =>
      p.startsWith("/marketplace") || p === "/cart" || p === "/checkout",
  },
  {
    href: "/impact",
    label: "Impact",
    match: (p: string) => p === "/impact",
  },
];

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

// True once the page has scrolled past the top of the hero.
function useScrolled() {
  return useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 24,
    () => false,
  );
}

/** Segmented control: equal-width segments with a white thumb that slides to the current one. */
function TabSwitcher({ pathname }: { pathname: string }) {
  const current = tabs.findIndex((t) => t.match(pathname));
  return (
    <nav
      aria-label="Main"
      className="relative grid grid-cols-3 rounded-full bg-black/[0.06] p-1"
    >
      {current >= 0 && (
        <span
          aria-hidden="true"
          className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-full bg-white shadow-[0_1px_3px_rgb(0_0_0/0.12),0_4px_12px_rgb(0_0_0/0.06)] transition-transform duration-300 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(${current * 100}%)` }}
        />
      )}
      {tabs.map((tab, i) => (
        <Link
          key={tab.label}
          href={tab.href}
          aria-current={i === current ? "page" : undefined}
          title={tab.label}
          className={`relative flex h-9 items-center justify-center gap-1.5 rounded-full px-3.5 text-[15px] font-medium transition-colors sm:h-10 sm:px-5 ${
            i === current ? "text-ink" : "text-label-2 hover:text-ink"
          }`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="shrink-0"
          >
            <path d={ICONS[tab.label as keyof typeof ICONS]} />
          </svg>
          {/* Icons only on phones, where three labels don't fit beside the logo and bag. */}
          <span className="sr-only sm:not-sr-only">{tab.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const scrolled = useScrolled();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,padding] duration-300 ${
        scrolled
          ? "border-b border-black/5 bg-background/80 backdrop-blur-xl backdrop-saturate-150"
          : "bg-transparent sm:pt-12"
      }`}
    >
      {/* Logo and bag at the edges; the switcher sits in the exact centre. */}
      <div
        className={`relative flex items-center justify-between px-4 transition-[height] duration-300 sm:px-10 lg:px-20 ${
          scrolled ? "h-16 sm:h-[76px]" : "h-16 sm:h-20"
        }`}
      >
        <Link
          href="/"
          aria-label="Omid home"
          className="-ml-2 flex h-11 items-center rounded-lg px-2"
        >
          <Image
            src={asset("/logos/logo-mark.png")}
            alt=""
            width={56}
            height={56}
            priority
            className={`transition-[width,height] duration-300 ${scrolled ? "h-9 w-9 sm:h-10 sm:w-10" : "h-11 w-11 sm:h-14 sm:w-14"}`}
          />
        </Link>

        <div className="absolute left-1/2 -translate-x-1/2">
          <TabSwitcher pathname={pathname} />
        </div>

        <BagLink />
      </div>
    </header>
  );
}
