/** "Secure payment" reassurance line with a shield-and-tick icon. */
export function SecurePayment({ className = "" }: { className?: string }) {
  return (
    <p
      className={`flex items-center justify-center gap-2 text-[14px] text-label-2 ${className}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="text-action"
      >
        <path d="M12 2.5l7.5 3v5.6c0 4.6-3.1 8.7-7.5 10.4-4.4-1.7-7.5-5.8-7.5-10.4V5.5L12 2.5z" />
        <path d="M8.8 12.2l2.2 2.2 4.3-4.4" />
      </svg>
      Secure payment
    </p>
  );
}
