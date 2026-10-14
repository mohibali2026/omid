/**
 * Placeholder product reviews for the prototype: invented buyers and text, picked per product
 * from a small pool so each page looks lived-in. Replace with real reviews (or remove) before launch.
 */
export type Review = {
  id: string;
  rating: number;
  title: string;
  body: string;
  name: string;
  country: string;
  /** "YYYY-MM-DD" */
  date: string;
};

const POOL: Omit<Review, "id" | "name" | "country" | "date">[] = [
  {
    rating: 5,
    title: "Even better in person",
    body: "The photos don't do it justice. You can see the hand work in every detail, and it feels made to last.",
  },
  {
    rating: 5,
    title: "Beautifully packed",
    body: "It arrived wrapped with real care, with a small card about the maker. A lovely touch.",
  },
  {
    rating: 4,
    title: "Worth the wait",
    body: "Shipping took a little longer than I expected, but it was tracked the whole way and the piece is perfect.",
  },
  {
    rating: 5,
    title: "A gift that meant something",
    body: "I bought this for my mother. Knowing who made it, and where, made it so much more special than anything from a shop.",
  },
  {
    rating: 4,
    title: "Lovely, slightly different colour",
    body: "The colour is a touch warmer than in the photo, which I actually prefer. Exactly as described otherwise.",
  },
  {
    rating: 5,
    title: "Proper craftsmanship",
    body: "You can tell this was made by someone who has done it for years. Nothing about it feels mass-produced.",
  },
  {
    rating: 5,
    title: "Second purchase from this maker",
    body: "I loved my first piece so much I came back. Same quality, same care. Will buy again.",
  },
  {
    rating: 3,
    title: "Nice, but smaller than I imagined",
    body: "Well made and pretty, but check the size before you order. I should have read the details more carefully.",
  },
  {
    rating: 5,
    title: "Gets compliments every time",
    body: "Everyone who visits asks where it's from. I love telling them about the artisan behind it.",
  },
  {
    rating: 4,
    title: "Great quality",
    body: "Solid, well finished and clearly handmade. Small imperfections, but that's the charm of it.",
  },
];

const PEOPLE = [
  ["Sarah M.", "United States"],
  ["Daniel K.", "Germany"],
  ["Leyla A.", "Türkiye"],
  ["Tom B.", "United Kingdom"],
  ["Amina R.", "Canada"],
  ["Jonas W.", "Sweden"],
  ["Priya S.", "Australia"],
  ["Marco D.", "Netherlands"],
  ["Hannah L.", "France"],
  ["Omar H.", "United Arab Emirates"],
];

const DATES = [
  "2026-09-28",
  "2026-09-12",
  "2026-08-30",
  "2026-08-14",
  "2026-07-21",
  "2026-06-30",
  "2026-06-02",
];

/** Small, stable hash so a product always gets the same reviews. */
function seed(text: string) {
  let h = 0;
  for (const ch of text) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h;
}

/** 3–6 placeholder reviews for a product, newest first. */
export function reviewsFor(slug: string): Review[] {
  const s = seed(slug);
  const count = 3 + (s % 4);
  return Array.from({ length: count }, (_, i) => {
    const pick = POOL[(s + i * 3) % POOL.length];
    const [name, country] = PEOPLE[(s + i * 7) % PEOPLE.length];
    return {
      ...pick,
      id: `${slug}-${i}`,
      name,
      country,
      date: DATES[i % DATES.length],
    };
  });
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** "2026-09-28" → "September 28, 2026". */
export function formatReviewDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}
