import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { categories } from "@/lib/products";

export const metadata: Metadata = {
  title: "Categories",
};

export default function CategoriesPage() {
  return (
    <main className="flex-1 px-4 pb-8 pt-24 sm:px-8 sm:pb-24 sm:pt-36 lg:px-14">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="sr-only">Categories</h1>

        {/* Interlocking mosaic on desktop: 4 columns of short rows (wide cards span 3, tall cards 4); every six cards fill 7 rows, so the pattern repeats. */}
        <div className="grid auto-rows-[320px] gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[96px] lg:gap-6">
          {categories.map((c, i) => (
            <Reveal
              key={c.slug}
              delay={(i % 3) * 90}
              className={`h-full ${c.layout}`}
            >
              <Link
                href={`/marketplace/products?category=${c.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 shadow-[0_12px_30px_rgb(0_0_0/0.06)]"
                style={{ backgroundColor: c.background ?? "#f5f5f5" }}
              >
                {/* The card takes the shot's own studio colour, so each photo reads edge to edge. */}
                <div className={`absolute ${c.imageBox}`}>
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                <p className="relative text-[12px] font-semibold uppercase tracking-[0.08em] text-ink/70">
                  {c.count.toLocaleString("en-US")} Products
                </p>
                <h2 className="relative mt-2 max-w-[14ch] text-[26px] font-semibold leading-tight tracking-tight text-ink sm:text-[30px]">
                  {c.name}
                </h2>

                <span
                  aria-hidden="true"
                  className="relative mt-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white text-ink shadow-sm transition-transform duration-300 group-hover:translate-x-1"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3.5 9h11M10 4.5L14.5 9 10 13.5" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
