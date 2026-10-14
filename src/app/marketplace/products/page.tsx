import type { Metadata } from "next";
import { Suspense } from "react";
import { AllProducts, ProductGrid } from "@/components/product-grid";

export const metadata: Metadata = {
  title: "Shop",
};

export default function ProductsPage() {
  return (
    <main className="flex-1 px-4 pb-8 pt-24 sm:px-8 sm:pb-24 sm:pt-36 lg:px-14">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="sr-only">Shop</h1>
        {/* The category filter reads the URL, so it renders in the browser; the full list is the fallback. */}
        <Suspense fallback={<AllProducts />}>
          <ProductGrid />
        </Suspense>
      </div>
    </main>
  );
}
