import type { Metadata } from "next";
import { Wishlist } from "@/components/wishlist";

export const metadata: Metadata = {
  title: "Wishlist",
};

export default function WishlistPage() {
  return (
    <main className="flex-1 px-4 pb-24 pt-24 sm:px-8 sm:pt-36 lg:px-14">
      <div className="mx-auto max-w-[1400px]">
        <Wishlist />
      </div>
    </main>
  );
}
