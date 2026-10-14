import { asset } from "@/lib/base-path";
import type { Metadata } from "next";
import { Inter, DM_Serif_Display, Vazirmatn } from "next/font/google";
import "./globals.css";
import { AIDOS_CDN, AIDOS_ORGANIZATION } from "@/lib/campaign";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

// Only for the Persian word امید, which DM Serif and Inter don't cover.
const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  weight: ["500", "700"],
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: { default: "Omid", template: "%s · Omid" },
  description: "Omid means hope. Be the hope.",
  icons: { icon: asset("/logos/logo-mark.png") },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSerif.variable} ${vazirmatn.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Without JavaScript, scroll reveals never fire, so show their content straight away. */}
        <noscript>
          <style>{".reveal{opacity:1;transform:none}"}</style>
        </noscript>
        <SiteHeader />
        {children}
        <SiteFooter />
        {/* Campaign+ donation dialog and inline widgets, placed before </body> as Aseel specifies */}
        <script
          defer
          src={`${AIDOS_CDN}/widget-v1.js`}
          data-organization={AIDOS_ORGANIZATION}
        />
        <script
          defer
          src={`${AIDOS_CDN}/elements-v1.js`}
          data-organization={AIDOS_ORGANIZATION}
        />
      </body>
    </html>
  );
}
