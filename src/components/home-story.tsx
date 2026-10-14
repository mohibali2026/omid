import { asset } from "@/lib/base-path";
import Image from "next/image";
import { DonationCard } from "./donation-card";
import { PhotoCarousel } from "./photo-carousel";
import { Reveal } from "./reveal";

const PHOTOS = [
  {
    src: asset("/images/embroidery.jpg"),
    alt: "A woman embroidering flowers on white fabric at a sewing machine.",
  },
  {
    src: asset("/images/weaver.jpg"),
    alt: "A man working at a loom in a weaving workshop.",
    position: "60% 30%",
  },
  {
    src: asset("/images/women-field.jpg"),
    alt: "A group of women sitting together in a field, with trees and sandstone cliffs behind them.",
  },
];

/** Campaign section: photo carousel and story on the left, the donation card on the right. */
export function HomeStory() {
  return (
    <section className="px-4 pb-24 pt-12 sm:px-8 sm:pt-16 lg:px-14">
      <div className="mx-auto grid max-w-[1200px] items-start gap-8 md:grid-cols-[minmax(0,1fr)_320px] lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
        <Reveal>
          <PhotoCarousel photos={PHOTOS} className="aspect-[16/10]" />

          <div className="mt-8 max-w-2xl">
            <h2 className="display flex items-center gap-3 text-[28px] text-neutral-900 lg:text-[32px]">
              <Image
                src={asset("/logos/icon.png")}
                alt=""
                width={69}
                height={69}
                className="h-8 w-8 shrink-0 lg:h-9 lg:w-9"
              />
              Be the hope
            </h2>
            <div className="mt-4 space-y-4 text-[16px] leading-relaxed text-neutral-800">
              <p>
                Every family deserves a fair shot at building something of their
                own. Across Afghanistan, skilled weavers, tailors, potters and
                shopkeepers have the talent and the will to work, but not the
                small amount of capital it takes to start or grow a business.
              </p>
              <p>
                For $1,000, we can give one family the business training, small
                grant, and equipment they need to get started. That&rsquo;s not
                charity &mdash; that&rsquo;s a foundation: a sewing machine, a
                loom or a stock of materials, and the know-how to price, sell
                and keep simple accounts.
              </p>
              <p>
                And with your help, we can do this for 300 families. Three
                hundred households moving from uncertainty to income, from
                waiting to working, from surviving to building. Every donation,
                of any size, brings the next family closer.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Campaign summary: progress, Donate now, Share and recent donations. Stays in view beside the story. */}
        <Reveal delay={120} className="md:sticky md:top-24">
          <DonationCard />
        </Reveal>
      </div>
    </section>
  );
}
