import { asset } from "@/lib/base-path";
import Image from "next/image";
import { DonateButton } from "./donate-button";

// Staggers the hero's entrance; see .rise / .settle in globals.css.
const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

export function HomeHero() {
  return (
    // The home header is fixed, so the top padding clears it.
    <section className="pt-28 sm:pt-44 lg:pt-52">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        {/* Eyebrow: the slogan artwork (the PNG has transparent padding, hence the tight margin). */}
        <Image
          src={asset("/logos/slogan.png")}
          alt="Omid: Be the hope"
          width={914}
          height={228}
          priority
          className="rise -mb-2 h-auto w-[170px] sm:w-[200px]"
        />
        <h1
          className="rise display text-balance text-[40px] text-ink sm:text-[56px] lg:text-[64px]"
          style={delay(90)}
        >
          <span className="italic text-sun">Help</span> Afghan small businesses{" "}
          <span className="italic text-sun">grow</span>
        </h1>
        <p
          style={delay(180)}
          className="rise mt-4 max-w-3xl text-balance text-[17px] leading-snug text-neutral-900 sm:text-[19px]"
        >
          $1,000 gives one business training, a small grant, and equipment.{" "}
          <br className="hidden sm:block" />
          Together we can help 300 families get to work.
        </p>
        <div
          className="rise mt-7 flex flex-wrap justify-center gap-4"
          style={delay(270)}
        >
          <DonateButton shape="squircle" className="min-w-40">
            Donate Now
          </DonateButton>
        </div>
      </div>

      <div className="px-4 pt-9 sm:px-8 lg:px-14">
        <div
          className="settle relative mx-auto aspect-video max-w-[1200px] overflow-hidden rounded-lg sm:rounded-2xl"
          style={delay(320)}
        >
          <Image
            src={asset("/images/hero-16x9.jpg")}
            alt="A group of women sitting together in a field doing embroidery, with cliffs and trees behind them."
            fill
            priority
            sizes="(min-width: 1312px) 1200px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
