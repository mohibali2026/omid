"use client";

/** − 1 + control, kept within 1 and the stock available. */
export function QuantityStepper({
  value,
  max,
  onChange,
  label,
  size = "md",
}: {
  value: number;
  max: number;
  onChange: (qty: number) => void;
  label: string;
  size?: "sm" | "md";
}) {
  const box = size === "sm" ? "h-9 w-9" : "h-12 w-11";
  const button = `${box} flex items-center justify-center text-neutral-900 transition-colors hover:bg-black/5 disabled:text-neutral-300 disabled:hover:bg-transparent`;
  return (
    <div
      role="group"
      aria-label={label}
      className={`inline-flex items-center overflow-hidden rounded-full border border-neutral-300 bg-white ${size === "sm" ? "text-[14px]" : "text-[16px]"}`}
    >
      <button
        type="button"
        className={button}
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Decrease quantity"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M2 6h8" />
        </svg>
      </button>
      <output
        aria-live="polite"
        className="min-w-6 text-center font-medium tabular-nums"
      >
        {value}
      </output>
      <button
        type="button"
        className={button}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M2 6h8M6 2v8" />
        </svg>
      </button>
    </div>
  );
}
