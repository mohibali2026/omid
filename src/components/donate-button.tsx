import { donateHref } from "@/lib/campaign";

type Props = {
  children: React.ReactNode;
  campaign?: string;
  variant?: "primary" | "light";
  shape?: "pill" | "squircle";
  className?: string;
};

const variants = {
  primary: "bg-action text-white hover:bg-action-hover",
  light: "bg-white text-ink hover:bg-white/90",
};

/** Opens the Campaign+ donation dialog via the #?campaign= link (handled by widget-v1.js). */
export function DonateButton({
  children,
  campaign,
  variant = "primary",
  shape = "pill",
  className = "",
}: Props) {
  return (
    <a
      href={donateHref(campaign)}
      className={`inline-flex h-12 items-center justify-center px-7 ${shape === "pill" ? "rounded-full" : "squircle"} text-[17px] font-medium transition-colors active:scale-[0.98] ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
