import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FavoriteButton } from "@/components/favorite-button";
import { donateHref } from "@/lib/campaign";
import { ShopLogo } from "@/components/shop-logo";
import { ShopProducts } from "@/components/shop-products";
import { MoreArtisans } from "@/components/more-artisans";
import { artisans, formatJoined } from "@/lib/products";

export function generateStaticParams() {
  return artisans.map((shop) => ({ slug: shop.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: artisans.find((s) => s.slug === slug)?.name ?? "Shop" };
}

type Params = { params: Promise<{ slug: string }> };

// The shop is read from the URL inside Suspense, so navigation shows the page frame immediately.
export default function ShopPage({ params }: Params) {
  return (
    <main className="flex-1 px-4 pb-8 pt-24 sm:px-8 sm:pb-24 sm:pt-36 lg:px-14">
      <div className="mx-auto max-w-[1400px]">
        <Suspense fallback={<ShopSkeleton />}>
          <Shop params={params} />
        </Suspense>
      </div>
    </main>
  );
}

function ShopSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="grid animate-pulse items-start gap-6 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-8"
    >
      <div className="h-[560px] rounded-3xl bg-white" />
      <div className="h-[720px] rounded-3xl bg-white" />
    </div>
  );
}

async function Shop({ params }: Params) {
  const { slug } = await params;
  const shop = artisans.find((s) => s.slug === slug);
  if (!shop) notFound();

  return (
    <>
      <Link
        href="/marketplace/artisans"
        className="mb-5 inline-flex items-center gap-1.5 text-[15px] text-label-2 hover:text-neutral-900"
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
        All artisans
      </Link>

      <div className="grid items-start gap-6 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-8">
        {/* Profile */}
        <aside className="rounded-3xl bg-white p-6 lg:sticky lg:top-24 sm:p-8">
          <div className="flex flex-col items-center text-center">
            <ShopLogo
              shop={shop}
              className="h-36 w-36 rounded-full ring-4 ring-background"
            />
            <h1 className="mt-5 flex items-center gap-2 text-[26px] font-semibold tracking-tight text-neutral-900">
              {shop.name}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-label="Verified shop"
                role="img"
                className="shrink-0"
              >
                <path
                  fill="#00788e"
                  d="M17.9012 4.99851C18.1071 5.49653 18.5024 5.8924 19.0001 6.09907L20.7452 6.82198C21.2433 7.02828 21.639 7.42399 21.8453 7.92206C22.0516 8.42012 22.0516 8.97974 21.8453 9.47781L21.1229 11.2218C20.9165 11.7201 20.9162 12.2803 21.1236 12.7783L21.8447 14.5218C21.9469 14.7685 21.9996 15.0329 21.9996 15.2999C21.9997 15.567 21.9471 15.8314 21.8449 16.0781C21.7427 16.3249 21.5929 16.549 21.4041 16.7378C21.2152 16.9266 20.991 17.0764 20.7443 17.1785L19.0004 17.9009C18.5023 18.1068 18.1065 18.5021 17.8998 18.9998L17.1769 20.745C16.9706 21.2431 16.575 21.6388 16.0769 21.8451C15.5789 22.0514 15.0193 22.0514 14.5212 21.8451L12.7773 21.1227C12.2792 20.9169 11.7198 20.9173 11.2221 21.1239L9.47689 21.8458C8.97912 22.0516 8.42001 22.0514 7.92237 21.8453C7.42473 21.6391 7.02925 21.2439 6.82281 20.7464L6.09972 19.0006C5.8938 18.5026 5.49854 18.1067 5.00085 17.9L3.25566 17.1771C2.75783 16.9709 2.36226 16.5754 2.15588 16.0777C1.94951 15.5799 1.94923 15.0205 2.1551 14.5225L2.87746 12.7786C3.08325 12.2805 3.08283 11.7211 2.8763 11.2233L2.15497 9.47678C2.0527 9.2301 2.00004 8.96568 2 8.69863C1.99996 8.43159 2.05253 8.16715 2.15472 7.92043C2.25691 7.67372 2.40671 7.44955 2.59557 7.26075C2.78442 7.07195 3.00862 6.92222 3.25537 6.8201L4.9993 6.09772C5.49687 5.89197 5.89248 5.4972 6.0993 5.00006L6.82218 3.25481C7.02848 2.75674 7.42418 2.36103 7.92222 2.15473C8.42027 1.94842 8.97987 1.94842 9.47792 2.15473L11.2218 2.87712C11.7199 3.08291 12.2793 3.08249 12.7771 2.87595L14.523 2.15585C15.021 1.94966 15.5804 1.9497 16.0784 2.15597C16.5763 2.36223 16.972 2.75783 17.1783 3.25576L17.9014 5.00153L17.9012 4.99851Z"
                />
                <path
                  d="M9 12L11 14L15.5 9.5M17.9012 4.99851C18.1071 5.49653 18.5024 5.8924 19.0001 6.09907L20.7452 6.82198C21.2433 7.02828 21.639 7.42399 21.8453 7.92206C22.0516 8.42012 22.0516 8.97974 21.8453 9.47781L21.1229 11.2218C20.9165 11.7201 20.9162 12.2803 21.1236 12.7783L21.8447 14.5218C21.9469 14.7685 21.9996 15.0329 21.9996 15.2999C21.9997 15.567 21.9471 15.8314 21.8449 16.0781C21.7427 16.3249 21.5929 16.549 21.4041 16.7378C21.2152 16.9266 20.991 17.0764 20.7443 17.1785L19.0004 17.9009C18.5023 18.1068 18.1065 18.5021 17.8998 18.9998L17.1769 20.745C16.9706 21.2431 16.575 21.6388 16.0769 21.8451C15.5789 22.0514 15.0193 22.0514 14.5212 21.8451L12.7773 21.1227C12.2792 20.9169 11.7198 20.9173 11.2221 21.1239L9.47689 21.8458C8.97912 22.0516 8.42001 22.0514 7.92237 21.8453C7.42473 21.6391 7.02925 21.2439 6.82281 20.7464L6.09972 19.0006C5.8938 18.5026 5.49854 18.1067 5.00085 17.9L3.25566 17.1771C2.75783 16.9709 2.36226 16.5754 2.15588 16.0777C1.94951 15.5799 1.94923 15.0205 2.1551 14.5225L2.87746 12.7786C3.08325 12.2805 3.08283 11.7211 2.8763 11.2233L2.15497 9.47678C2.0527 9.2301 2.00004 8.96568 2 8.69863C1.99996 8.43159 2.05253 8.16715 2.15472 7.92043C2.25691 7.67372 2.40671 7.44955 2.59557 7.26075C2.78442 7.07195 3.00862 6.92222 3.25537 6.8201L4.9993 6.09772C5.49687 5.89197 5.89248 5.4972 6.0993 5.00006L6.82218 3.25481C7.02848 2.75674 7.42418 2.36103 7.92222 2.15473C8.42027 1.94842 8.97987 1.94842 9.47792 2.15473L11.2218 2.87712C11.7199 3.08291 12.2793 3.08249 12.7771 2.87595L14.523 2.15585C15.021 1.94966 15.5804 1.9497 16.0784 2.15597C16.5763 2.36223 16.972 2.75783 17.1783 3.25576L17.9014 5.00153L17.9012 4.99851Z"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </h1>
            <p className="mt-1 text-[16px] text-label-2">
              {shop.province} Province, Afghanistan
            </p>
            <p className="mt-1 text-[14px] text-label-2">
              On Omid since {formatJoined(shop.joined)}
            </p>
            <p className="mt-1 text-[14px] text-label-2">by {shop.maker}</p>

            <dl className="mt-5 grid w-full grid-cols-3 rounded-xl bg-background px-3 py-3">
              {[
                { label: "Rating", value: shop.rating.toFixed(1) },
                { label: "Sales", value: shop.sales.toString() },
                { label: "Years", value: shop.years.toString() },
              ].map((stat) => (
                <div key={stat.label}>
                  <dd className="text-[18px] font-semibold tracking-tight text-neutral-900">
                    {stat.value}
                  </dd>
                  <dt className="text-[12px] text-label-2">{stat.label}</dt>
                </div>
              ))}
            </dl>

            {/* Side by side when they fit; stacked at equal (full) width when they don't. */}
            <div className="mt-5 flex w-full flex-wrap gap-2">
              {/* Plain anchor so the Campaign+ script opens the donation window from the hash. */}
              <a
                href={donateHref()}
                className="flex h-11 flex-1 basis-36 items-center justify-center whitespace-nowrap rounded-xl bg-action px-3 text-[14px] font-medium text-white transition-colors hover:bg-action-hover"
              >
                Donate Now
              </a>
              <FavoriteButton className="flex-1 basis-36" />
            </div>
          </div>

          <div className="mt-6 border-t border-hairline pt-6">
            <h2 className="text-[17px] font-semibold text-neutral-900">
              About
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-neutral-700">
              {shop.story}
            </p>
          </div>
        </aside>

        {/* Products */}
        <ShopProducts products={shop.products} />
      </div>

      {/* Other shops, so a visitor can keep browsing makers. */}
      <MoreArtisans currentSlug={shop.slug} />
    </>
  );
}
