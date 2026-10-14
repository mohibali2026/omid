"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Photo = { src: string; alt: string; position?: string };

const arrow =
  "flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink backdrop-blur transition-colors hover:bg-white disabled:cursor-default disabled:opacity-40";

/**
 * Swipeable photo carousel: arrows bottom-right, position dots bottom-left.
 * Slides scroll natively (touch, trackpad, keyboard); the arrows move one photo at a time.
 */
export function PhotoCarousel({
  photos,
  className = "",
}: {
  photos: Photo[];
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Campaign photos"
      className={`relative overflow-hidden rounded-lg sm:rounded-2xl ${className}`}
    >
      <div
        ref={track}
        onScroll={(e) => {
          const el = e.currentTarget;
          setIndex(Math.round(el.scrollLeft / el.clientWidth));
        }}
        className="flex h-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo, i) => (
          <div
            key={photo.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${photos.length}`}
            className="relative h-full w-full shrink-0 snap-start"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority={i === 0}
              sizes="(min-width: 1312px) 780px, (min-width: 768px) 60vw, 100vw"
              className="object-cover"
              style={{ objectPosition: photo.position }}
            />
          </div>
        ))}
      </div>

      {/* Position dots */}
      <div
        className="pointer-events-none absolute bottom-5 left-5 flex gap-1.5"
        aria-hidden="true"
      >
        {photos.map((photo, i) => (
          <span
            key={photo.src}
            className={`h-1.5 rounded-full bg-white transition-all duration-300 ${i === index ? "w-6" : "w-1.5 opacity-60"}`}
          />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Photo {index + 1} of {photos.length}
      </p>

      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Previous photo"
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
            <path d="M13 8H3M7 3.5L2.5 8 7 12.5" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={index === photos.length - 1}
          aria-label="Next photo"
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
            <path d="M3 8h10M9 3.5L13.5 8 9 12.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
