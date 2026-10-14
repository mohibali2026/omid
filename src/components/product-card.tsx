import Image from "next/image";
import Link from "next/link";
import { productImage, shops, type Product } from "@/lib/products";
import { ShopLogo } from "./shop-logo";
import { FavoriteToggle } from "./favorite-toggle";
import { QuickAdd } from "./quick-add";

export function ProductCard({ product }: { product: Product }) {
  const shop = shops.find((s) => s.maker === product.maker);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgb(0_0_0/0.05)] sm:rounded-3xl">
      <div
        className="relative aspect-square overflow-hidden"
        style={{ backgroundColor: product.imageBg ?? "#f5f5f5" }}
      >
        <Image
          src={productImage(product)}
          alt={product.alt}
          fill
          sizes="(min-width: 1280px) 430px, (min-width: 768px) 45vw, 100vw"
          className={`transition-transform duration-500 ease-out group-hover:scale-[1.04] ${
            product.imageFit === "cover" ? "object-cover" : "object-contain"
          }`}
        />
        <FavoriteToggle product={product} className="absolute left-4 top-4" />
        <QuickAdd product={product} className="absolute right-4 top-4" />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h2 className="text-[21px] font-medium tracking-tight text-neutral-900">
          {/* The link covers the whole card. */}
          <Link
            href={`/marketplace/products/${product.slug}`}
            className="after:absolute after:inset-0"
          >
            {product.name}
          </Link>
        </h2>
        <div className="mt-2 flex items-center gap-1.5 text-[13px] text-label-2">
          {shop && (
            <ShopLogo
              shop={shop}
              decorative
              sizes="20px"
              className="h-5 w-5 shrink-0 rounded-full"
            />
          )}
          <span className="min-w-0">
            {product.maker} · {product.place}
          </span>
        </div>
        <p className="mt-3 text-[16px] leading-relaxed text-neutral-700">
          {product.description}
        </p>
        <div className="mt-auto flex items-baseline justify-between pt-6">
          <p className="text-[21px] text-neutral-900">{product.price}</p>
          <p className="text-[15px] text-label-2">{product.availability}</p>
        </div>
      </div>
    </article>
  );
}
