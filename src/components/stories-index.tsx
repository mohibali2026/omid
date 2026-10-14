"use client";

import Link from "next/link";
import { useState } from "react";
import { stories, storyCategories, type StoryCategory } from "@/lib/stories";
import { Reveal } from "./reveal";
import { StoryCard, StoryPicture, StoryTag } from "./story-card";

const chip = (active: boolean) =>
  `flex h-9 items-center rounded-full border px-4 text-[14px] transition-colors ${
    active
      ? "border-ink bg-ink text-white"
      : "border-neutral-300 bg-transparent text-neutral-900 hover:border-neutral-500"
  }`;

/** The newest story in the chosen category is featured; the rest fill the grid below. */
export function StoriesIndex() {
  const [category, setCategory] = useState<StoryCategory | null>(null);
  const [featured, ...rest] = category
    ? stories.filter((s) => s.category === category)
    : stories;

  return (
    <>
      <section className="bg-white px-4 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-40 lg:px-14">
        <div className="mx-auto max-w-[1400px]">
          <h1 className="rise heading text-[44px] leading-none text-ink sm:text-[64px]">
            Stories of Impact
          </h1>

          <div
            role="group"
            aria-label="Filter stories"
            className="rise mt-7 flex flex-wrap gap-2"
            style={{ "--delay": "90ms" } as React.CSSProperties}
          >
            <button
              type="button"
              aria-pressed={!category}
              onClick={() => setCategory(null)}
              className={chip(!category)}
            >
              All
            </button>
            {storyCategories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={chip(category === c)}
              >
                {c}
              </button>
            ))}
          </div>

          <article
            key={featured.slug}
            className="settle group relative mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] lg:gap-10"
            style={{ "--delay": "180ms" } as React.CSSProperties}
          >
            <StoryPicture
              story={featured}
              priority
              sizes="(min-width: 1512px) 880px, (min-width: 1024px) 60vw, 100vw"
              wide
              className="aspect-[4/3] rounded-2xl"
            />
            <div className="flex flex-col items-start lg:py-4">
              <StoryTag>{featured.category}</StoryTag>
              <h2 className="heading mt-3 text-balance text-[32px] leading-[1.1] text-ink sm:text-[40px]">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-md text-[17px] leading-relaxed text-label-2">
                {featured.excerpt}
              </p>
              <Link
                href={`/stories/${featured.slug}`}
                className="mt-7 inline-flex h-12 items-center justify-center squircle bg-ink px-7 text-[16px] font-medium text-white transition-colors after:absolute after:inset-0 hover:bg-action-hover active:scale-[0.98] lg:mt-auto"
              >
                Read more
              </Link>
            </div>
          </article>
        </div>
      </section>

      {rest.length > 0 && (
        <section className="px-4 py-14 sm:px-8 sm:py-20 lg:px-14">
          <div className="mx-auto max-w-[1400px]">
            <p className="flex items-center gap-2 text-[14px] text-neutral-900">
              <span
                className="h-1.5 w-1.5 rounded-full bg-ink"
                aria-hidden="true"
              />
              {category ?? "All stories"}
            </p>
            <h2 className="heading mt-3 text-[36px] leading-tight text-ink sm:text-[48px]">
              More stories
            </h2>

            <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((story, i) => (
                <Reveal
                  key={story.slug}
                  delay={(i % 3) * 80}
                  className="h-full"
                >
                  <StoryCard story={story} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
