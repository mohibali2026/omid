import type { Metadata } from "next";
import { Checkout } from "@/components/checkout";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <main className="flex-1 px-4 pb-8 pt-24 sm:px-8 sm:pb-24 sm:pt-36 lg:px-14">
      <div className="mx-auto max-w-[1200px]">
        <Checkout />
      </div>
    </main>
  );
}
