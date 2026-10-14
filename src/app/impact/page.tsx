import type { Metadata } from "next";
import { CountUp } from "@/components/count-up";
import { DonateButton } from "@/components/donate-button";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "How Omid measures its impact: artisans onboarded, products sold, funds raised and businesses started.",
};

/*
 * Placeholder figures for the prototype. Replace with real, verified numbers (and their date)
 * before launch; impact claims on a campaign site need to be accurate and approved by STFA.
 */
type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
  tone?: "ink" | "sun" | "aqua";
  wide?: boolean;
};

const STATS: Stat[] = [
  {
    value: 35,
    prefix: "$",
    suffix: "K",
    label: "Funds raised",
    detail:
      "Donated through the Be the Hope campaign for training, grants and equipment.",
    tone: "ink",
    wide: true,
  },
  {
    value: 2000,
    suffix: "+",
    label: "Products sold and shipped",
    detail: "Handmade pieces bought by customers and delivered worldwide.",
    tone: "sun",
    wide: true,
  },
  {
    value: 20,
    label: "Artisans onboarded",
    detail: "Makers with their own shop on Omid.",
  },
  {
    value: 10,
    label: "Businesses started from zero",
    detail: "Opened with Omid's training and grants.",
  },
  {
    value: 28,
    label: "Countries shipped to",
    detail: "From Kabul and Herat to buyers on five continents.",
  },
  {
    value: 12,
    label: "Provinces reached",
    detail: "Artisans and businesses across Afghanistan.",
  },
  {
    value: 60,
    suffix: "%",
    label: "Women-led businesses",
    detail: "Of the businesses supported are run by women.",
    tone: "aqua",
  },
  {
    value: 45,
    label: "New jobs created",
    detail: "Apprentices and workers hired by supported businesses.",
  },
  {
    value: 90,
    suffix: "%",
    label: "Still trading after six months",
    detail: "Of the businesses started, checked on our follow-up visits.",
  },
  {
    value: 400,
    suffix: "+",
    label: "Hours of business training",
    detail: "Pricing, bookkeeping, selling online and finding customers.",
  },
];

const tones = {
  ink: "bg-ink text-white",
  sun: "bg-sun text-white",
  aqua: "bg-aqua/45 text-ink",
  default: "bg-white text-neutral-900",
};

export default function ImpactPage() {
  return (
    <main className="flex-1 px-4 pb-24 pt-28 sm:px-8 sm:pt-44 lg:px-14">
      <div className="mx-auto max-w-[1200px]">
        {/* Same type as the Support hero: centred DM Serif title. */}
        <header className="mx-auto max-w-4xl text-center">
          <h1 className="rise display text-balance text-[40px] text-neutral-900 sm:text-[56px] lg:text-[64px]">
            Our impact
          </h1>
          <p
            className="rise mx-auto mt-4 max-w-3xl text-balance text-[17px] leading-snug text-neutral-900 sm:text-[19px]"
            style={{ "--delay": "90ms" } as React.CSSProperties}
          >
            Every figure here is something we can count: a maker onboarded, a
            piece delivered, a business that opened its doors. This is how we
            measure whether hope is turning into income.
          </p>
        </header>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <li key={stat.label} className={stat.wide ? "sm:col-span-2" : ""}>
              <Reveal delay={(i % 4) * 70} className="h-full">
                <div
                  className={`flex h-full flex-col justify-between rounded-3xl p-6 sm:p-7 ${tones[stat.tone ?? "default"]} ${
                    stat.wide ? "min-h-[220px]" : "min-h-[200px]"
                  }`}
                >
                  <p
                    className={`font-semibold leading-none tracking-[-0.04em] ${
                      stat.wide
                        ? "text-[64px] sm:text-[80px]"
                        : "text-[48px] sm:text-[56px]"
                    }`}
                  >
                    <CountUp
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </p>
                  <div className="mt-6">
                    <p className="text-[17px] font-semibold tracking-tight">
                      {stat.label}
                    </p>
                    <p
                      className={`mt-1 text-[14px] leading-snug ${stat.tone === "ink" ? "text-white/70" : stat.tone === "sun" ? "text-white/90" : "opacity-70"}`}
                    >
                      {stat.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 rounded-3xl bg-white p-8 sm:mt-28 sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="heading text-[28px] text-neutral-900">
              Help us grow these numbers
            </p>
            <p className="mt-2 text-[16px] text-label-2">
              $1,000 gives one business training, a small grant, and equipment.
            </p>
          </div>
          <DonateButton shape="squircle" className="shrink-0">
            Donate Now
          </DonateButton>
        </div>
      </div>
    </main>
  );
}
