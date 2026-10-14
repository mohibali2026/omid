import Link from "next/link";

type Props = { href: string; children: React.ReactNode; className?: string };

/** The one prominent action in a section. */
export function PrimaryLink({ href, children, className = "" }: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex h-11 items-center rounded-full bg-action px-6 text-[17px] text-white transition-colors hover:bg-action-hover active:scale-[0.98] ${className}`}
    >
      {children}
    </Link>
  );
}

/** Secondary action: text with a chevron, colour inherited so it works on any tile. */
export function ChevronLink({ href, children, className = "" }: Props) {
  return (
    <Link
      href={href}
      className={`group inline-flex h-11 items-center gap-1 text-[17px] hover:underline underline-offset-4 ${className}`}
    >
      {children}
      <svg
        width="8"
        height="13"
        viewBox="0 0 8 13"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="mt-px transition-transform group-hover:translate-x-0.5"
      >
        <path d="M1.5 1.5l5 5-5 5" />
      </svg>
    </Link>
  );
}
