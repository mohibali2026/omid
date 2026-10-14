"use client";

import { useState } from "react";
import { BASE_PATH } from "@/lib/base-path";
import { donateHref } from "@/lib/campaign";

/*
 * Placeholder campaign figures and donors for the prototype. Hook these up to Campaign+ before
 * launch, and only show donor names with STFA's agreement (donor data belongs to STFA); otherwise
 * show them as "Anonymous".
 */
const RAISED = 7099;
const GOAL = 15000;
const DONATIONS = 48;
// Fewer donors than donations: some people give more than once (e.g. monthly).
const DONORS = 41;
const RECENT = [
  { name: "Farhad A.", amount: 100, ago: "2 h" },
  { name: "Mariam S.", amount: 50, ago: "1 d" },
  { name: "Anonymous", amount: 1000, ago: "3 d" },
  { name: "Ahmad Z.", amount: 25, ago: "1 wk" },
  { name: "Zahra H.", amount: 75, ago: "2 wks" },
];

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

/** Campaign progress ring: aqua track with the raised share in teal. */
function ProgressRing({ percent }: { percent: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-16 w-16 shrink-0">
      <svg
        viewBox="0 0 64 64"
        className="h-full w-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          strokeWidth="7"
          className="stroke-background"
        />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${(Math.max(percent, 2) / 100) * c} ${c}`}
          className="stroke-action"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[13px] font-semibold tabular-nums text-neutral-900">
        {percent}%
      </span>
    </div>
  );
}

/** Campaign summary: progress, Donate now, Share and the latest donations. */
export function DonationCard() {
  const percent = Math.round((RAISED / GOAL) * 100);
  const [shareNote, setShareNote] = useState("");

  const share = async () => {
    const url = `${window.location.origin}${BASE_PATH}`;
    const data = {
      title: "Omid: Be the hope",
      text: "Help Afghan small businesses grow.",
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareNote("Link copied");
    } catch (error) {
      // Closing the share sheet isn't an error worth reporting.
      if ((error as Error).name !== "AbortError")
        setShareNote("Couldn't share. Copy the address bar link instead.");
    }
    window.setTimeout(() => setShareNote(""), 2500);
  };

  return (
    <div className="w-full rounded-3xl border border-neutral-200 bg-white p-6 sm:p-7">
      <div className="flex items-center gap-4">
        <ProgressRing percent={percent} />
        <div>
          <p className="text-[22px] leading-tight tracking-tight text-neutral-900">
            <span className="font-semibold">{usd(RAISED)} raised</span>{" "}
            <span className="text-[16px] text-label-2">of {usd(GOAL)}</span>
          </p>
          <p className="mt-1 text-[14px] text-label-2">
            {DONATIONS} donations <span aria-hidden="true">·</span> {DONORS}{" "}
            donors
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2.5">
        <a
          href={donateHref()}
          className="flex h-12 items-center justify-center squircle bg-sun text-[16px] font-semibold text-ink transition-[filter] hover:brightness-95 active:scale-[0.99]"
        >
          Donate now
        </a>
        <button
          type="button"
          onClick={share}
          className="flex h-12 items-center justify-center squircle bg-ink text-[16px] font-semibold text-white transition-colors hover:bg-action-hover active:scale-[0.99]"
        >
          {shareNote || "Share"}
        </button>
        <p role="status" className="sr-only">
          {shareNote}
        </p>
      </div>

      <h3 className="sr-only">Recent donations</h3>
      <ul className="mt-6 flex flex-col gap-5">
        {RECENT.map((d) => (
          <li key={d.name + d.ago} className="flex items-center gap-3.5">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-background text-[15px] font-semibold text-ink"
            >
              {d.name === "Anonymous" ? "?" : d.name[0]}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[16px] text-neutral-900">{d.name}</p>
              <p className="mt-0.5 flex items-center gap-2 text-[14px] text-label-2">
                <span className="font-semibold text-neutral-900">
                  {usd(d.amount)}
                </span>
                <span aria-hidden="true">·</span>
                <span>{d.ago}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
