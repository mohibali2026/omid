import { asset } from "@/lib/base-path";
import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About",
};

const stats = [
  [
    { value: "12", label: "Small Business to Support" },
    { value: "600+", label: "Products to List for Sale" },
  ],
  [
    { value: "Global", label: "Reach for handmade products" },
    { value: "100%", label: "Direct to artisan funding" },
  ],
];

const pillars = [
  {
    title: "Our Vision",
    body: "Omid connects Afghan artisans and small business owners with a global community of supporters who believe talent should have no borders. We provide a simple, trusted crowdfunding platform where artisans can raise the funds they need, share their story, and sell their handmade products to the world — turning generosity into opportunity, one campaign at a time.",
    className: "bg-action",
  },
  {
    title: "Our Mission",
    body: "A world where an embroiderer in Kabul, a woodworker in Herat, or a weaver in Mazar-i-Sharif has the same access to markets, capital, and customers as any artisan anywhere else. We envision an Afghanistan where traditional craftsmanship is not just preserved — it thrives, sustains families, and carries the culture forward with dignity and pride.",
    className: "bg-ink",
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1 px-4 pb-24 pt-20 sm:px-8 sm:pt-36 lg:px-14">
      <div className="mx-auto max-w-[1400px]">
        {/* Hero */}
        <div className="settle relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg sm:aspect-video sm:rounded-2xl">
          <Image
            src={asset("/images/embroidery.jpg")}
            alt="A woman embroidering flowers on white fabric at a sewing machine."
            fill
            priority
            sizes="(min-width: 1512px) 1400px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
          <h1
            className="rise relative text-[40px] font-medium tracking-tight text-white sm:text-[56px]"
            style={{ "--delay": "400ms" } as React.CSSProperties}
          >
            About Us
          </h1>
        </div>

        <div className="mt-10 grid gap-6 sm:mt-14 lg:grid-cols-[360px_minmax(0,1fr)]">
          <Reveal className="self-start">
            <p className="flex items-center gap-2.5 text-[19px] text-neutral-900">
              <Image
                src={asset("/logos/icon.png")}
                alt=""
                width={69}
                height={69}
                className="h-7 w-7"
              />
              About Us
            </p>
          </Reveal>

          <div>
            <Reveal delay={80}>
              <p className="text-[24px] leading-[1.35] text-neutral-900 sm:text-[32px]">
                In Dari, omid means hope. We are a crowdfunding platform built
                for Afghan artisans and small business owners &mdash; giving
                skilled craftspeople a place to raise funds, share their story,
                and sell handmade products to a global audience. Because behind
                every carpet and hand-stitched garment is a real person building
                a livelihood with their own hands.
              </p>
            </Reveal>

            <div className="mt-8 flex flex-col gap-4">
              {pillars.map((pillar, i) => (
                <div
                  key={pillar.title}
                  className="grid gap-4 md:grid-cols-[minmax(0,11fr)_minmax(0,3fr)_minmax(0,3fr)]"
                >
                  <Reveal className="h-full">
                    <div
                      className={`h-full rounded-xl p-6 text-white ${pillar.className}`}
                    >
                      <h2 className="text-[22px] font-medium">
                        {pillar.title}
                      </h2>
                      <p className="mt-4 text-[14px] leading-snug text-white/90">
                        {pillar.body}
                      </p>
                    </div>
                  </Reveal>
                  <div className="grid grid-cols-2 gap-4 md:contents">
                    {stats[i].map((stat, j) => (
                      <Reveal
                        key={stat.label}
                        delay={100 + j * 100}
                        className="h-full"
                      >
                        <div className="flex h-full min-h-[140px] flex-col justify-between rounded-xl bg-white p-5 md:min-h-0">
                          <p className="text-[30px] leading-none text-neutral-900">
                            {stat.value}
                          </p>
                          <p className="mt-6 text-[13px] leading-snug text-neutral-900">
                            {stat.label}
                          </p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
