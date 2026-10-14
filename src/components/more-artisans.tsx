"use client";

import { useEffect, useRef, useState } from "react";
import { artisans } from "@/lib/products";
import { ArtisanPill } from "./artisan-rows";

const arrow =
  "flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink transition-colors hover:bg-ink hover:text-white disabled:cursor-default disabled:text-neutral-300 disabled:hover:bg-white";

/**
 * Every other shop in a horizontal row (4 visible on wide screens), starting with the one after
 * this shop. The arrows scroll a page at a time; swiping and keyboard scrolling work too.
 */
export function MoreArtisans({ currentSlug }: { currentSlug: string }) {
  const start = artisans.findIndex((s) => s.slug === currentSlug);
  const others = artisans
    .map((_, i) => artisans[(start + 1 + i) % artisans.length])
    .slice(0, -1);

  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = () => {
    const el = track.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft < 4,
      end: el.scrollLeft + el.clientWidth > el.scrollWidth - 4,
    });
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const page = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="more-artisans" className="mt-16 sm:mt-20">
      <div className="flex items-end justify-between gap-4">
        <h2
          id="more-artisans"
          className="heading text-[32px] leading-tight text-ink sm:text-[40px]"
        >
          More artisans
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => page(-1)}
            disabled={edges.start}
            aria-label="Previous artisans"
            className={arrow}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M10 3.5L5.5 8l4.5 4.5" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => page(1)}
            disabled={edges.end}
            aria-label="Next artisans"
            className={arrow}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 3.5L10.5 8 6 12.5" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={track}
        onScroll={update}
        className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {others.map((shop) => (
          <div
            key={shop.slug}
            className="w-full shrink-0 snap-start md:w-[calc((100%-0.75rem)/2)] xl:w-[calc((100%-2.25rem)/4)]"
          >
            <ArtisanPill shop={shop} className="w-full" compact />
          </div>
        ))}
      </div>
    </section>
  );
}
