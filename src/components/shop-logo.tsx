import Image from "next/image";
import type { Shop } from "@/lib/products";

/** Shop avatar: the artisan's photo, or a monogram badge in the shop's colours when there's none. */
export function ShopLogo({
  shop,
  className = "",
  decorative = false,
  sizes = "144px",
}: {
  shop: Shop;
  className?: string;
  /** Hide from screen readers when the shop's name is already written next to it. */
  decorative?: boolean;
  sizes?: string;
}) {
  if (shop.photo) {
    return (
      // Image fill needs a positioned parent; keep the caller's absolute positioning when given.
      <div
        className={`${className.includes("absolute") ? "" : "relative"} overflow-hidden bg-background ${className}`}
      >
        <Image
          src={shop.photo}
          alt={decorative ? "" : `${shop.name} profile photo`}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : `${shop.name} logo`}
      aria-hidden={decorative || undefined}
      className={`flex items-center justify-center [container-type:inline-size] ${className}`}
      style={{ backgroundColor: shop.logoBg }}
    >
      <div
        className="flex aspect-square w-[62%] items-center justify-center rounded-full border-2"
        style={{ borderColor: shop.logoFg, color: shop.logoFg }}
      >
        <span className="font-semibold text-[28cqw] leading-none tracking-tight">
          {shop.monogram}
        </span>
      </div>
    </div>
  );
}
