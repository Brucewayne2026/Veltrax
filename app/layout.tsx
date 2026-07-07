import type { Metadata } from "next";
import {
  Space_Grotesk,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "next-themes";

import "./globals.css";

const heading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// NOTE: update this if the production domain differs from veltrax.in
const SITE_URL = "https://veltrax.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Veltrax — The Workforce Intelligence Platform",
  description:
    "Veltrax is the workforce intelligence platform for production tracking, performance analytics, and AI-powered insight — running on the same production system a real team relies on every day.",
  openGraph: {
    title: "Veltrax — The Workforce Intelligence Platform",
    description:
      "Veltrax is the workforce intelligence platform for production tracking, performance analytics, and AI-powered insight — running on the same production system a real team relies on every day.",
    url: SITE_URL,
    siteName: "Veltrax",
    // TODO: replace with a dedicated 1200x630 OG image for a proper social preview card
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Veltrax" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Veltrax — The Workforce Intelligence Platform",
    description:
      "Veltrax is the workforce intelligence platform for production tracking, performance analytics, and AI-powered insight — running on the same production system a real team relies on every day.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

// GA4 measurement ID — set NEXT_PUBLIC_GA_MEASUREMENT_ID in your .env / server env.
// Analytics script simply won't load if this is unset, so it's safe to leave blank locally.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}