"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BE_THE_HOPE_CAMPAIGN } from "@/lib/campaign";

type Props = {
  widgetId: string;
  type: string;
  campaign?: string;
  className?: string;
  /** Shown in the widget's place until its iframe has loaded. */
  fallback?: React.ReactNode;
};

const noop = () => () => {};

/**
 * An inline Campaign+ widget (filled in by elements-v1.js), e.g. a progress bar or donation form.
 * Rendered only after hydration: the script injects an iframe and rewrites the element's id,
 * which would otherwise clash with React's server-rendered HTML. The script watches the DOM,
 * so it picks the element up as soon as it appears.
 */
export function CampaignWidget({
  widgetId,
  type,
  campaign = BE_THE_HOPE_CAMPAIGN,
  className,
  fallback,
}: Props) {
  const mounted = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
  const hostRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  // The script marks its iframe loading="lazy"; switch it to eager so the widget
  // starts loading with the page, and note when it has finished.
  useEffect(() => {
    const host = hostRef.current;
    if (!mounted || !host) return;
    const hook = (iframe: HTMLIFrameElement) => {
      iframe.loading = "eager";
      iframe.addEventListener("load", () => setLoaded(true), { once: true });
    };
    // Safety net: never keep the widget hidden if its load event was missed.
    const reveal = window.setTimeout(() => setLoaded(true), 6000);
    const existing = host.querySelector("iframe");
    if (existing) {
      hook(existing);
      return () => window.clearTimeout(reveal);
    }
    const observer = new MutationObserver(() => {
      const iframe = host.querySelector("iframe");
      if (iframe) {
        observer.disconnect();
        hook(iframe);
      }
    });
    observer.observe(host, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      window.clearTimeout(reveal);
    };
  }, [mounted]);

  // The script only notices newly inserted elements (not attribute changes),
  // so the widget element is added as a fresh child once mounted.
  return (
    <div className={`relative ${className ?? ""}`}>
      {fallback && !loaded && (
        <div className="absolute inset-0">{fallback}</div>
      )}
      {mounted && (
        <div
          ref={hostRef}
          className={loaded || !fallback ? "" : "opacity-0"}
          data-aidos-widget-type={type}
          data-aidos-campaign={campaign}
          data-aidos-widget-id={widgetId}
        />
      )}
    </div>
  );
}
