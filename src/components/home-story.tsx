import { asset } from "@/lib/base-path";
import Image from "next/image";
import { DonationCard } from "./donation-card";
import { Reveal } from "./reveal";

/** Campaign section: the story on the left, the donation card on the right. */
export function HomeStory() {
  return (
    <section className="px-4 pb-8 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:px-14">
      <div className="mx-auto grid max-w-[1200px] items-start gap-8 md:grid-cols-[minmax(0,1fr)_360px] lg:grid-cols-[minmax(0,1fr)_444px] lg:gap-12">
        <Reveal>
          {/* Inset from the hero image edge so the story reads as its own block. */}
          <div className="max-w-2xl px-2 pt-2 sm:px-4 md:pl-10 md:pt-6 lg:pl-16">
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
                Small businesses are the backbone of every Afghan neighbourhood:
                the tailor on the corner, the weaver working from home, the
                potter and the shopkeeper who keep a street alive. They create
                work for families and for the people around them, yet many never
                get the small start they need to grow.
              </p>
              <p>
                Be the Hope helps them take that first step. For $1,000, one
                business receives practical training, a small grant, and the
                equipment it needs, whether that&rsquo;s a sewing machine, a
                loom or a first stock of materials. It&rsquo;s not charity
                &mdash; it&rsquo;s a foundation to build on.
              </p>
              <p>
                The training covers what keeps a business going: pricing work
                fairly, keeping simple accounts, and finding customers beyond
                the local market. Through Omid, owners can also sell their
                products to buyers around the world, so growth doesn&rsquo;t
                stop at the end of the street.
              </p>
              <p>
                Our goal is 300 small businesses. Three hundred families moving
                from uncertainty to income, from waiting to working, from
                surviving to building. Every donation, of any size, brings the
                next business closer to opening its doors.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Campaign summary: progress, Donate now, Share and recent donations. Stays in view beside the story; inset from the hero image edge like the story text. */}
        <Reveal delay={120} className="md:sticky md:top-24 md:pr-10 lg:pr-16">
          <DonationCard />
        </Reveal>
      </div>
    </section>
  );
}
