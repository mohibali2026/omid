import type { Metadata } from "next";
import { ArtisanRows } from "@/components/artisan-rows";
import { artisans } from "@/lib/products";

export const metadata: Metadata = {
  title: "Artisans",
  description:
    "Local Afghan artisans, connected with buyers around the world so every purchase helps their businesses grow.",
};

export default function ArtisansPage() {
  return (
    // Full-bleed so the rows run off both edges of the screen.
    <main className="flex flex-1 flex-col justify-center overflow-hidden pb-24 pt-28 sm:pt-44">
      <header className="mx-auto max-w-4xl px-6 text-center">
        {/* Same type as the home hero: DM Serif title with sun-yellow italic accents. */}
        <h1 className="rise display text-balance text-[40px] text-ink sm:text-[56px] lg:text-[64px]">
          The <span className="italic text-sun">hands</span> behind
          <br />
          every <span className="italic text-sun">piece</span>
        </h1>
        <p
          className="rise mx-auto mt-4 max-w-3xl text-balance text-[17px] leading-snug text-neutral-900 sm:text-[19px]"
          style={{ "--delay": "90ms" } as React.CSSProperties}
        >
          Each of these makers is a local artisan in Afghanistan, working by
          hand in their own workshop. We connect them with buyers around the
          world, so every purchase helps their business grow.
        </p>
      </header>

      <div
        className="settle mt-10 sm:mt-14"
        style={{ "--delay": "180ms" } as React.CSSProperties}
      >
        <ArtisanRows shops={artisans} />
      </div>
    </main>
  );
}
