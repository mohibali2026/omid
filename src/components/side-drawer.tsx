"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const subscribeNever = () => () => {};

/**
 * Panel that slides in from the right edge over a dimmed page. Escape, the backdrop or the close button close it;
 * Tab stays inside while it's open, focus goes back to whatever opened it, and the page behind doesn't scroll.
 * It renders into <body>, so a blurred parent (like the scrolled header) can't trap the fixed panel inside itself.
 */
export function SideDrawer({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  // <body> only exists in the browser, so the portal waits until after hydration.
  const mounted = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
  const panel = useRef<HTMLDivElement>(null);
  // Latest onClose, so the effect below runs only when the drawer opens or closes
  // (re-running it would pull focus back to the panel while someone is using the controls).
  const close = useRef(onClose);
  useEffect(() => {
    close.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    // Whatever opened the drawer, to hand focus back to when it closes.
    const opener = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close.current();
      if (e.key !== "Tab" || !panel.current) return;
      // Keep Tab inside the drawer: wrap from the last control to the first and back.
      const items = [
        ...panel.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), input:not([disabled]), select",
        ),
      ];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const at = document.activeElement;
      if (e.shiftKey && (at === first || at === panel.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && at === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        inert={!open}
        className={`absolute inset-y-0 right-0 flex w-[min(400px,100vw)] flex-col bg-white outline-none transition-[translate,box-shadow] duration-300 ease-out motion-reduce:transition-none ${
          // The shadow only while open, so it doesn't show along the screen edge when the drawer is away.
          open
            ? "translate-x-0 shadow-[0_0_40px_rgb(0_0_0/0.15)]"
            : "translate-x-full shadow-none"
        }`}
      >
        <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
          <h2 className="text-[19px] font-semibold tracking-tight text-neutral-900">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title.toLowerCase()}`}
            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full text-neutral-900 hover:bg-background"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-6">
          {children}
        </div>

        {footer && (
          <div className="flex items-center gap-3 border-t border-hairline px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
