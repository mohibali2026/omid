import type { Metadata } from "next";
import { Bag } from "@/components/bag";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <main className="flex-1 px-4 pb-24 pt-24 sm:px-8 sm:pt-36 lg:px-14">
      <div className="mx-auto max-w-[1200px]">
        <Bag />
      </div>
    </main>
  );
}
