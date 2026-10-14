"use client";

import { useState, useSyncExternalStore } from "react";
import { formatReviewDate, type Review } from "@/lib/reviews";

/*
 * Reviews written on this page are kept in this browser only (prototype: nothing is sent anywhere).
 */
const keyFor = (slug: string) => `omid-reviews:${slug}`;
const EMPTY: Review[] = [];
const cache = new Map<string, Review[]>();
const listeners = new Set<() => void>();

function readLocal(slug: string): Review[] {
  if (!cache.has(slug)) {
    let list: Review[] = EMPTY;
    try {
      const saved = JSON.parse(localStorage.getItem(keyFor(slug)) ?? "[]");
      if (Array.isArray(saved)) list = saved;
    } catch {
      // Storage blocked or corrupt: no saved reviews.
    }
    cache.set(slug, list);
  }
  return cache.get(slug)!;
}

function addLocal(slug: string, review: Review) {
  const next = [review, ...readLocal(slug)];
  cache.set(slug, next);
  try {
    localStorage.setItem(keyFor(slug), JSON.stringify(next));
  } catch {
    // Not saved, but shown for this visit.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const STAR_PATH =
  "M10 1.8l2.4 5 5.4.7-4 3.8 1 5.4L10 14.1l-4.8 2.6 1-5.4-4-3.8 5.4-.7L10 1.8z";

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} width={size} height={size} viewBox="0 0 20 20">
          <path
            d={STAR_PATH}
            className={
              n <= Math.round(rating) ? "fill-sun" : "fill-neutral-200"
            }
          />
        </svg>
      ))}
    </span>
  );
}

export function ProductReviews({
  slug,
  productName,
  initial,
}: {
  slug: string;
  productName: string;
  initial: Review[];
}) {
  const local = useSyncExternalStore(
    subscribe,
    () => readLocal(slug),
    () => EMPTY,
  );
  const reviews = [...local, ...initial];
  const average = reviews.reduce((n, r) => n + r.rating, 0) / reviews.length;
  const counts = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
  }));

  const [writing, setWriting] = useState(false);
  const [thanks, setThanks] = useState(false);

  return (
    <section aria-labelledby="reviews" className="mt-20 sm:mt-28">
      <h2
        id="reviews"
        className="heading text-[28px] text-neutral-900 sm:text-[36px]"
      >
        Reviews
      </h2>

      <div className="mt-6 grid items-start gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-12">
        {/* Summary */}
        <div className="rounded-3xl bg-white p-6 lg:sticky lg:top-24">
          <div className="flex items-end gap-3">
            <p className="text-[48px] font-semibold leading-none tracking-tight text-neutral-900">
              {average.toFixed(1)}
            </p>
            <div className="pb-1">
              <Stars rating={average} />
              <p className="mt-1 text-[14px] text-label-2">
                {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>
          <p className="sr-only">
            Rated {average.toFixed(1)} out of 5 from {reviews.length} reviews.
          </p>

          <ul className="mt-5 space-y-2" aria-label="Rating breakdown">
            {counts.map(({ stars, count }) => (
              <li
                key={stars}
                className="flex items-center gap-3 text-[13px] text-label-2"
              >
                <span className="w-10 tabular-nums">{stars} star</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-background">
                  <span
                    className="block h-full rounded-full bg-sun"
                    style={{ width: `${(count / reviews.length) * 100}%` }}
                  />
                </span>
                <span className="w-5 text-right tabular-nums">{count}</span>
              </li>
            ))}
          </ul>

          {!writing && (
            <button
              type="button"
              onClick={() => {
                setWriting(true);
                setThanks(false);
              }}
              className="mt-6 flex h-11 w-full items-center justify-center squircle border border-ink text-[15px] font-medium text-ink transition-colors hover:bg-ink/5"
            >
              Write a review
            </button>
          )}
          {thanks && (
            <p role="status" className="mt-4 text-[14px] text-action">
              Thank you. Your review has been added.
            </p>
          )}
        </div>

        <div>
          {writing && (
            <ReviewForm
              productName={productName}
              onCancel={() => setWriting(false)}
              onSubmit={(review) => {
                addLocal(slug, {
                  ...review,
                  id: `${slug}-local-${Date.now()}`,
                });
                setWriting(false);
                setThanks(true);
              }}
            />
          )}

          <ul className="divide-y divide-hairline">
            {reviews.map((r) => (
              <li key={r.id} className="py-6 first:pt-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Stars rating={r.rating} />
                  <time dateTime={r.date} className="text-[13px] text-label-2">
                    {formatReviewDate(r.date)}
                  </time>
                </div>
                <span className="sr-only">Rated {r.rating} out of 5.</span>
                {r.title && (
                  <h3 className="mt-3 text-[17px] font-semibold tracking-tight text-neutral-900">
                    {r.title}
                  </h3>
                )}
                <p className="mt-1.5 text-[16px] leading-relaxed text-neutral-800">
                  {r.body}
                </p>
                <p className="mt-3 text-[13px] text-label-2">
                  {r.name}
                  {r.country && ` · ${r.country}`}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ReviewForm({
  productName,
  onSubmit,
  onCancel,
}: {
  productName: string;
  onSubmit: (review: Omit<Review, "id">) => void;
  onCancel: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<{
    rating?: string;
    body?: string;
    name?: string;
  }>({});

  const field =
    "mt-1.5 w-full rounded-xl border border-field bg-white px-4 text-[16px] text-neutral-900 placeholder:text-placeholder";

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const found = {
          rating: rating ? undefined : "Choose a star rating.",
          body:
            body.trim().length >= 10
              ? undefined
              : "Write at least a sentence about the piece.",
          name: name.trim() ? undefined : "Enter your name.",
        };
        setErrors(found);
        if (found.rating || found.body || found.name) return;
        const now = new Date();
        const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
        onSubmit({
          rating,
          title: title.trim(),
          body: body.trim(),
          name: name.trim(),
          country: "",
          date,
        });
      }}
      className="mb-8 rounded-3xl bg-white p-6"
    >
      <h3 className="text-[19px] font-semibold tracking-tight text-neutral-900">
        Review {productName}
      </h3>

      <fieldset className="mt-4">
        <legend className="text-[14px] font-medium text-neutral-900">
          Your rating
        </legend>
        <div className="mt-1.5 flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <label
              key={n}
              className="cursor-pointer rounded-md has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-action"
            >
              <input
                type="radio"
                name="rating"
                value={n}
                checked={rating === n}
                onChange={() => setRating(n)}
                className="sr-only"
              />
              <span className="sr-only">
                {n} {n === 1 ? "star" : "stars"}
              </span>
              <svg
                width="28"
                height="28"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  d={STAR_PATH}
                  className={
                    n <= rating
                      ? "fill-sun"
                      : "fill-neutral-200 hover:fill-sun/50"
                  }
                />
              </svg>
            </label>
          ))}
        </div>
        {errors.rating && (
          <p className="mt-1.5 text-[13px] text-red-700">{errors.rating}</p>
        )}
      </fieldset>

      <label className="mt-4 block">
        <span className="text-[14px] font-medium text-neutral-900">
          Title (optional)
        </span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`${field} h-12`}
        />
      </label>

      <label className="mt-4 block">
        <span className="text-[14px] font-medium text-neutral-900">
          Your review
        </span>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          aria-invalid={errors.body ? true : undefined}
          className={`${field} py-3 ${errors.body ? "border-red-600" : ""}`}
        />
        {errors.body && (
          <span className="mt-1.5 block text-[13px] text-red-700">
            {errors.body}
          </span>
        )}
      </label>

      <label className="mt-4 block">
        <span className="text-[14px] font-medium text-neutral-900">
          Your name
        </span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="given-name"
          aria-invalid={errors.name ? true : undefined}
          className={`${field} h-12 ${errors.name ? "border-red-600" : ""}`}
        />
        {errors.name && (
          <span className="mt-1.5 block text-[13px] text-red-700">
            {errors.name}
          </span>
        )}
      </label>

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center squircle bg-ink px-6 text-[15px] font-medium text-white transition-colors hover:bg-action-hover"
        >
          Post review
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex h-11 items-center justify-center px-4 text-[15px] font-medium text-action underline-offset-4 hover:underline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
