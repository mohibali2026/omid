import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DonateButton } from "@/components/donate-button";
import { Reveal } from "@/components/reveal";
import { ShopLogo } from "@/components/shop-logo";
import { StoryCard, StoryPicture, StoryTag } from "@/components/story-card";
import { shops } from "@/lib/products";
import { formatStoryDate, stories } from "@/lib/stories";

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  return story
    ? { title: story.title, description: story.excerpt }
    : { title: "Story" };
}

type Params = { params: Promise<{ slug: string }> };

// The story is read from the URL inside Suspense, so navigation shows the page frame immediately.
export default function StoryPage({ params }: Params) {
  return (
    <main className="flex-1 px-4 pb-8 pt-24 sm:px-8 sm:pb-24 sm:pt-36 lg:px-14">
      <Suspense fallback={<StorySkeleton />}>
        <StoryArticle params={params} />
      </Suspense>
    </main>
  );
}

function StorySkeleton() {
  return (
    <div aria-hidden="true" className="mx-auto max-w-[1100px] animate-pulse">
      <div className="mx-auto h-40 max-w-3xl rounded-3xl bg-white" />
      <div className="mt-10 aspect-video rounded-2xl bg-white" />
    </div>
  );
}

async function StoryArticle({ params }: Params) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) notFound();

  const shop = shops.find((s) => s.slug === story.shop);
  // Same category first, then the newest of the rest.
  const more = [
    ...stories.filter(
      (s) => s.slug !== story.slug && s.category === story.category,
    ),
    ...stories.filter(
      (s) => s.slug !== story.slug && s.category !== story.category,
    ),
  ].slice(0, 3);

  return (
    <>
      <article className="mx-auto max-w-[1100px]">
        <header className="mx-auto max-w-3xl text-center">
          <Link
            href="/stories"
            className="rise inline-flex items-center gap-1.5 text-[15px] text-label-2 hover:text-neutral-900"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8.5 3L4.5 7l4 4" />
            </svg>
            Stories of Impact
          </Link>
          <div
            className="rise mt-6 flex items-center justify-center gap-3 text-[14px] text-label-2"
            style={{ "--delay": "60ms" } as React.CSSProperties}
          >
            <StoryTag>{story.category}</StoryTag>
            <time dateTime={story.date}>{formatStoryDate(story.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{story.readMinutes} min read</span>
          </div>
          <h1
            className="rise heading mt-4 text-balance text-[40px] leading-[1.05] text-ink sm:text-[56px]"
            style={{ "--delay": "120ms" } as React.CSSProperties}
          >
            {story.title}
          </h1>
          <p
            className="rise mx-auto mt-5 max-w-2xl text-balance text-[19px] leading-snug text-label-2 sm:text-[21px]"
            style={{ "--delay": "180ms" } as React.CSSProperties}
          >
            {story.excerpt}
          </p>
        </header>

        <div
          className="settle mt-10 sm:mt-14"
          style={{ "--delay": "240ms" } as React.CSSProperties}
        >
          <StoryPicture
            story={story}
            priority
            sizes="(min-width: 960px) 880px, 100vw"
            wide
            className="mx-auto aspect-[4/3] max-w-[880px] rounded-lg sm:rounded-2xl"
          />
        </div>

        <div className="mx-auto mt-12 max-w-[680px] sm:mt-16">
          {story.body.map((block, i) =>
            block.startsWith("## ") ? (
              <h2
                key={i}
                className="heading mt-10 text-[28px] leading-tight text-ink first:mt-0"
              >
                {block.slice(3)}
              </h2>
            ) : (
              <p
                key={i}
                className="mt-5 text-[18px] leading-[1.65] text-neutral-800 first:mt-0 sm:text-[19px]"
              >
                {block}
              </p>
            ),
          )}

          {/* Next step: the maker's shop for craft stories, a donation for impact stories. */}
          {shop ? (
            <div className="mt-12 flex items-center gap-4 rounded-3xl bg-white p-5 shadow-[0_8px_30px_rgb(0_0_0/0.05)] sm:p-6">
              <ShopLogo
                shop={shop}
                className="h-14 w-14 shrink-0 rounded-full"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[17px] font-semibold tracking-tight text-neutral-900">
                  {shop.name}
                </p>
                <p className="text-[14px] text-label-2">
                  {shop.province} Province, Afghanistan
                </p>
              </div>
              <Link
                href={`/marketplace/artisans/${shop.slug}`}
                className="inline-flex h-10 shrink-0 items-center gap-1 rounded-full bg-ink pl-4 pr-3.5 text-[15px] font-medium text-white transition-colors hover:bg-action-hover active:scale-[0.97]"
              >
                Visit shop
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3.5 9h11M10 4.5L14.5 9 10 13.5" />
                </svg>
              </Link>
            </div>
          ) : story.category === "Impact" ? (
            <div className="mt-12 rounded-3xl bg-white p-6 text-center shadow-[0_8px_30px_rgb(0_0_0/0.05)] sm:p-8">
              <p className="heading text-[28px] leading-tight text-ink">
                Help the next business grow
              </p>
              <p className="mx-auto mt-2 max-w-md text-[16px] leading-relaxed text-label-2">
                $1,000 gives one business training, a small grant, and
                equipment.
              </p>
              <DonateButton shape="squircle" className="mt-6 min-w-40">
                Donate Now
              </DonateButton>
            </div>
          ) : null}
        </div>
      </article>

      <section className="mx-auto mt-20 max-w-[1400px] border-t border-hairline pt-14 sm:mt-28">
        <h2 className="heading text-[32px] leading-tight text-ink sm:text-[40px]">
          More stories
        </h2>
        <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((s, i) => (
            <Reveal key={s.slug} delay={i * 80} className="h-full">
              <StoryCard story={s} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
