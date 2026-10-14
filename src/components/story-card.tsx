import Image from "next/image";
import Link from "next/link";
import type { StoryEntry } from "@/lib/stories";

export function StoryTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-6 items-center rounded-md bg-ink/[0.07] px-2 text-[12px] font-medium text-ink">
      {children}
    </span>
  );
}

/** A story photo on its own background colour, zooming slightly when the card is hovered. */
export function StoryPicture({
  story,
  sizes,
  priority,
  wide,
  className = "",
}: {
  story: StoryEntry;
  sizes: string;
  priority?: boolean;
  /** Wide frames crop product photos to fill, since a whole square photo would leave the piece tiny. */
  wide?: boolean;
  className?: string;
}) {
  const { picture } = story;
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: picture.background }}
    >
      <Image
        src={picture.src}
        alt={picture.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`transition-transform duration-500 ease-out group-hover:scale-[1.04] ${
          picture.fit === "cover" || wide ? "object-cover" : "object-contain"
        }`}
      />
    </div>
  );
}

export function StoryCard({ story }: { story: StoryEntry }) {
  return (
    <article className="group relative flex h-full flex-col">
      <StoryPicture
        story={story}
        sizes="(min-width: 1024px) 440px, (min-width: 640px) 45vw, 100vw"
        className="aspect-[10/9] rounded-2xl"
      />
      <div className="mt-4">
        <StoryTag>{story.category}</StoryTag>
      </div>
      <h3 className="mt-2.5 text-[19px] font-medium leading-snug tracking-tight text-neutral-900">
        {/* The link covers the whole card. */}
        <Link
          href={`/stories/${story.slug}`}
          className="after:absolute after:inset-0"
        >
          {story.title}
        </Link>
      </h3>
      <p className="mt-1.5 line-clamp-2 text-[15px] leading-relaxed text-label-2">
        {story.excerpt}
      </p>
    </article>
  );
}
