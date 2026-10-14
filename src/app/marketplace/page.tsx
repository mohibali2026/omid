import { redirect } from "next/navigation";

// The Market Place menu has three sections; the bare address opens Products.
export default function MarketplacePage() {
  redirect("/marketplace/products");
}
