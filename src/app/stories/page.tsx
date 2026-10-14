import type { Metadata } from "next";
import { StoriesIndex } from "@/components/stories-index";

export const metadata: Metadata = {
  title: "Stories of Impact",
};

export default function StoriesPage() {
  return (
    <main className="flex-1">
      <StoriesIndex />
    </main>
  );
}
