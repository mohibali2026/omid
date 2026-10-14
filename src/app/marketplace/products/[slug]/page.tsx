import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AddToBag } from "@/components/add-to-bag";
import { ProductCard } from "@/components/product-card";
import { ProductReviews } from "@/components/product-reviews";
import { Reveal } from "@/components/reveal";
import { ShopLogo } from "@/components/shop-logo";
import {
  productImage,
  categorySlug,
  colorSwatches,
  products,
  shops,
} from "@/lib/products";
import { reviewsFor } from "@/lib/reviews";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return product
    ? { title: product.name, description: product.description }
    : { title: "Product" };
}

type Params = { params: Promise<{ slug: string }> };

// The product is read from the URL inside Suspense, so navigation shows the page frame immediately.
export default function ProductPage({ params }: Params) {
  return (
    <main className="flex-1 px-4 pb-8 pt-24 sm:px-8 sm:pb-24 sm:pt-36 lg:px-14">
      <div className="mx-auto max-w-[1400px]">
        <Suspense fallback={<ProductSkeleton />}>
          <ProductDetails params={params} />
        </Suspense>
      </div>
    </main>
  );
}

function ProductSkeleton() {
  return (
    <div aria-hidden="true" className="grid animate-pulse gap-8 lg:grid-cols-2">
      <div className="aspect-square rounded-3xl bg-white" />
      <div className="h-[480px] rounded-3xl bg-white" />
    </div>
  );
}

async function ProductDetails({ params }: Params) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const shop = shops.find((s) => s.maker === product.maker);
  const more = products.filter(
    (p) => p.maker === product.maker && p.slug !== product.slug,
  );
  const details = [
    { label: "Material", value: product.material },
    { label: "Size", value: product.size },
    { label: "Made in", value: `${product.place}, Afghanistan` },
    { label: "Availability", value: product.availability },
  ];

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-5 text-[14px] text-label-2">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link
              href="/marketplace/products"
              className="hover:text-neutral-900"
            >
              Shop
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/marketplace/products?category=${categorySlug(product.category)}`}
              className="hover:text-neutral-900"
            >
              {product.category}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-neutral-900">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
        <div
          className="settle relative aspect-square overflow-hidden rounded-2xl sm:rounded-3xl lg:sticky lg:top-24"
          style={{ backgroundColor: product.imageBg ?? "#f5f5f5" }}
        >
          <Image
            src={productImage(product)}
            alt={product.alt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={
              product.imageFit === "cover" ? "object-cover" : "object-contain"
            }
          />
        </div>

        <div className="lg:py-4">
          {/* The maker, small and clickable through to their shop. */}
          {shop && (
            <Link
              href={`/marketplace/artisans/${shop.slug}`}
              className="rise group inline-flex items-center gap-2 text-[14px] text-label-2"
            >
              <ShopLogo
                shop={shop}
                decorative
                sizes="24px"
                className="h-6 w-6 shrink-0 rounded-full"
              />
              <span>
                <span className="font-medium text-neutral-900 group-hover:underline group-hover:underline-offset-4">
                  {shop.name}
                </span>{" "}
                · {shop.province} Province
              </span>
            </Link>
          )}
          <h1
            className="rise heading mt-3 text-balance text-[36px] text-neutral-900 sm:text-[48px]"
            style={{ "--delay": "60ms" } as React.CSSProperties}
          >
            {product.name}
          </h1>
          <p
            className="rise mt-3 text-[24px] font-medium tracking-tight text-neutral-900"
            style={{ "--delay": "120ms" } as React.CSSProperties}
          >
            {product.price}
          </p>

          <p className="mt-6 text-[17px] leading-relaxed text-neutral-800">
            {product.description}
          </p>

          <div className="mt-6">
            <p className="text-[14px] font-semibold text-neutral-900">
              Colours
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <li
                  key={c}
                  className="flex h-8 items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 text-[14px] text-neutral-900"
                >
                  <span
                    className="h-3 w-3 rounded-full ring-1 ring-black/10"
                    style={{ backgroundColor: colorSwatches[c] }}
                  />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <AddToBag product={product} />
          </div>

          <dl className="mt-6 divide-y divide-hairline border-y border-hairline">
            {details.map((d) => (
              <div
                key={d.label}
                className="flex justify-between gap-4 py-3.5 text-[15px]"
              >
                <dt className="text-label-2">{d.label}</dt>
                <dd className="text-right text-neutral-900">{d.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-6 space-y-2 text-[14px] text-label-2">
            <li>
              Made by hand: colour and size may vary slightly from the photo.
            </li>
            <li>Ships from Afghanistan in 8–14 business days, tracked.</li>
          </ul>
        </div>
      </div>

      <ProductReviews
        slug={product.slug}
        productName={product.name}
        initial={reviewsFor(product.slug)}
      />

      {more.length > 0 && shop && (
        <section aria-labelledby="more-from-shop" className="mt-20 sm:mt-28">
          <h2
            id="more-from-shop"
            className="heading text-[28px] text-neutral-900 sm:text-[36px]"
          >
            More from {shop.name}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {more.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80} className="h-full">
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
