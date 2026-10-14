import { asset } from "@/lib/base-path";
import Image from "next/image";
import Link from "next/link";
import { donateHref } from "@/lib/campaign";
import { CurrentYear } from "./current-year";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/marketplace/products", label: "Products" },
      { href: "/marketplace/categories", label: "Categories" },
      { href: "/marketplace/artisans", label: "Artisans" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: donateHref(), label: "Donate Now" },
      { href: "/impact", label: "Impact" },
    ],
  },
  {
    title: "Omid",
    links: [
      { href: "/about", label: "About" },
      { href: "/stories", label: "Stories" },
    ],
  },
];

// Placeholder profile links: swap in Omid's real accounts before launch.
const SOCIAL = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: (
      <>
        <path d="M18.3952 7.02212C17.6005 7.02368 16.9543 6.3802 16.9528 5.58548C16.9512 4.79076 17.5947 4.14457 18.3898 4.14302C19.1848 4.14146 19.831 4.78531 19.8326 5.58004C19.8338 6.37476 19.1903 7.02057 18.3952 7.02212Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0115 18.161C8.60909 18.1676 5.8451 15.4149 5.8385 12.0117C5.83188 8.60923 8.58536 5.84481 11.9878 5.8382C15.3909 5.83159 18.1553 8.5859 18.1619 11.9879C18.1685 15.3912 15.4143 18.1544 12.0115 18.161ZM11.992 8.00035C9.78365 8.00424 7.99594 9.79858 7.99983 12.0074C8.0041 14.2166 9.79882 16.0039 12.0072 15.9996C14.2164 15.9954 16.0041 14.2014 15.9998 11.9922C15.9955 9.78302 14.2008 7.99608 11.992 8.00035Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.1192 0.646479C4.88126 0.347876 5.75333 0.143362 7.03015 0.0830982C8.31011 0.0216726 8.71872 0.00767102 11.9769 0.00145262C15.2358 -0.00476578 15.6444 0.00766862 16.9244 0.0644334C18.2016 0.119643 19.0741 0.321049 19.8377 0.616544C20.6277 0.920974 21.298 1.33078 21.966 1.99603C22.6339 2.66205 23.0453 3.33002 23.3536 4.1189C23.6518 4.88174 23.8563 5.75306 23.917 7.03068C23.9776 8.31023 23.9924 8.71847 23.9986 11.9771C24.0048 15.2353 23.9916 15.6443 23.9356 16.925C23.88 18.2014 23.679 19.0743 23.3835 19.8375C23.0783 20.6276 22.6693 21.2979 22.004 21.9659C21.3388 22.6342 20.6701 23.0452 19.8812 23.3539C19.1184 23.6517 18.2471 23.8562 16.9702 23.9173C15.6903 23.9779 15.2817 23.9923 12.0224 23.9985C8.76459 24.0048 8.35598 23.9923 7.07605 23.9359C5.79882 23.88 4.92597 23.6789 4.16275 23.3838C3.37271 23.0782 2.70242 22.6696 2.03446 22.004C1.36611 21.3383 0.954386 20.67 0.646458 19.8811C0.347858 19.1186 0.144107 18.2469 0.0830727 16.9705C0.0220359 15.6901 0.00765506 15.2811 0.00143906 12.0229C-0.00480094 8.76435 0.00803667 8.35611 0.0640167 7.07616C0.1204 5.79855 0.320637 4.92606 0.61613 4.16206C0.921328 3.37239 1.33035 2.70248 1.99637 2.03413C2.6616 1.36616 3.33033 0.954017 4.1192 0.646479ZM4.94154 21.3679C5.36494 21.5308 6.00023 21.7252 7.17014 21.7761C8.43607 21.8309 8.81514 21.843 12.0185 21.8368C15.223 21.8309 15.6021 21.8173 16.8676 21.7579C18.0363 21.7022 18.6716 21.5055 19.0939 21.3407C19.6541 21.1218 20.0531 20.8601 20.4722 20.4406C20.8913 20.0195 21.1506 19.6194 21.3676 19.0591C21.5309 18.6354 21.7249 17.9996 21.7758 16.8297C21.8314 15.5646 21.8431 15.1851 21.8368 11.9809C21.831 8.77757 21.8174 8.3981 21.7572 7.13254C21.7019 5.96339 21.5056 5.32808 21.3404 4.90623C21.1215 4.34519 20.8606 3.94705 20.4399 3.52753C20.0192 3.10801 19.6191 2.84945 19.0581 2.6325C18.6355 2.46881 17.9994 2.27518 16.8303 2.22426C15.5643 2.16865 15.1849 2.15737 11.9808 2.1636C8.77743 2.16982 8.39836 2.18264 7.13281 2.24253C5.9633 2.29812 5.32877 2.49447 4.90575 2.65972C4.34587 2.87861 3.94696 3.13872 3.52746 3.5598C3.10871 3.98087 2.84938 4.38018 2.63244 4.94161C2.46993 5.36464 2.27434 6.00072 2.2242 7.16987C2.16898 8.43581 2.15733 8.81529 2.16355 12.0187C2.16939 15.2228 2.18298 15.6023 2.24248 16.8671C2.29729 18.037 2.49518 18.6715 2.65966 19.0949C2.87855 19.6544 3.13944 20.0533 3.55973 20.4729C3.98081 20.8908 4.38088 21.1509 4.94154 21.3679Z"
        />
      </>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: (
      <>
        <path d="M12 0C18.6274 0 24 5.37259 24 12C24 18.1352 19.3955 23.1944 13.4538 23.9121V15.667L16.7001 15.667L17.3734 12H13.4538V10.7031C13.4538 9.73417 13.6439 9.06339 14.0799 8.63483C14.5159 8.20627 15.1979 8.01993 16.1817 8.01993C16.4307 8.01993 16.6599 8.02241 16.8633 8.02736C17.1591 8.03456 17.4002 8.047 17.568 8.06467V4.74048C17.501 4.72184 17.4218 4.70321 17.3331 4.68486C17.1321 4.6433 16.8822 4.60324 16.6136 4.56806C16.0523 4.49453 15.4093 4.4423 14.9594 4.4423C13.1424 4.4423 11.7692 4.83102 10.8107 5.63619C9.65388 6.60791 9.10108 8.18622 9.10108 10.4199V12H6.62659V15.667H9.10108V23.6466C3.87432 22.3498 0 17.6277 0 12C0 5.37259 5.37259 0 12 0Z" />
      </>
    ),
  },
  {
    label: "X",
    href: "https://x.com/",
    icon: (
      <>
        <path d="M18.3263 1.90393H21.6998L14.3297 10.3274L23 21.7899H16.2112L10.894 14.838L4.80995 21.7899H1.43443L9.31743 12.78L1 1.90393H7.96111L12.7674 8.25826L18.3263 1.90393ZM17.1423 19.7707H19.0116L6.94539 3.81706H4.93946L17.1423 19.7707Z" />
      </>
    ),
  },
];

const linkClass =
  "text-[15px] text-white/75 transition-colors hover:text-white";

/** Dark card footer with links and the copyright line. */
export function SiteFooter() {
  return (
    <footer className="mt-auto px-3 pb-3 pt-8 sm:px-4 sm:pb-4">
      <div className="relative overflow-hidden rounded-[28px] bg-ink px-6 pt-12 text-white sm:px-12 sm:pt-16 lg:px-20">
        {/* One grid for the whole footer: equal outer columns with the copyright in the middle, so it sits in
            the exact centre, Donate Now and the social icons share its row, and the icons line up with the Omid column. */}
        <div className="flex flex-col gap-10 pb-10 sm:pb-12 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-x-12 lg:gap-y-10">
          <div className="lg:col-start-1 lg:row-start-1">
            <Image
              src={asset("/logos/logo-white.png")}
              alt="Omid"
              width={289}
              height={362}
              className="mb-6 h-16 w-auto"
            />
            <p className="max-w-sm text-[15px] leading-relaxed text-white/75">
              In Dari, omid means hope. A home for Afghan artisans and small
              businesses to raise funds, share their story and sell what they
              make.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-[repeat(3,auto)] sm:justify-start sm:gap-x-14 lg:col-start-3 lg:row-start-1 lg:justify-self-end">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="text-[15px] font-semibold">{column.title}</p>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {/* The donation link stays a plain anchor so the Campaign+ script sees its hash. */}
                      {link.href.includes("#?campaign=") ? (
                        <a href={link.href} className={linkClass}>
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className={linkClass}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="lg:col-start-1 lg:row-start-2 lg:self-center">
            <a
              href={donateHref()}
              className="inline-flex h-11 items-center justify-center squircle bg-white px-6 text-[15px] font-semibold text-ink transition-colors hover:bg-aqua"
            >
              Donate Now
            </a>
          </div>

          {/* The negative margin offsets the icons' tap padding: on large screens the last icon lines up with
              the right edge of the Omid column, on smaller ones the first icon lines up with the text on the left. */}
          <ul className="-ml-2.5 flex gap-1 lg:col-start-3 lg:row-start-2 lg:-mr-2.5 lg:ml-0 lg:self-center lg:justify-self-end">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Omid on ${s.label}`}
                  className="flex h-10 w-10 items-center justify-center text-white/75 transition-colors hover:text-white"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    {s.icon}
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <p className="text-[13px] text-white/60 lg:col-start-2 lg:row-start-2 lg:self-center lg:text-center">
            Copyright © <CurrentYear /> Omid. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
