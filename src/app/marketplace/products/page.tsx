import type { Metadata } from "next";
import { Suspense } from "react";
import { ArtisanRows } from "@/components/artisan-rows";
import { AllProducts, ProductGrid } from "@/components/product-grid";
import { artisans } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
};

export default function ProductsPage() {
  return (
    <main className="flex-1 pb-8 pt-24 sm:pb-24 sm:pt-36">
      <div className="px-4 sm:px-8 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <h1 className="sr-only">Shop</h1>
          {/* The category filter reads the URL, so it renders in the browser; the full list is the fallback. */}
          <Suspense fallback={<AllProducts />}>
            <ProductGrid />
          </Suspense>
        </div>
      </div>

      {/* The makers behind the shop, drifting edge to edge under the products. */}
      <section aria-label="Artisans" className="mt-16 sm:mt-24">
        <ArtisanRows shops={artisans} listOnPhones={false} />
      </section>
    </main>
  );
}
