import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const SITE_URL = "https://aetheris-status.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aetheris Status - Service Monitor",
    template: "%s | Aetheris Status"
  },
  description:
    "Real-time status monitoring for all Aetheris platform services, APIs and integrations.",
  keywords: ["status", "monitor", "uptime", "aetheris", "service health", "api status"],
  authors: [{ name: "Leonardo Galli", url: "https://github.com/Leo-Galli" }],
  creator: "Leonardo Galli",
  publisher: "Aetheris Project",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" }
  },
  icons: {
    icon: "/favicon.ico",
    other: { rel: "icon", type: "image/svg+xml", url: "/logo.svg" }
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Aetheris Status",
    title: "Aetheris Status - Service Monitor",
    description:
      "Real-time status monitoring for all Aetheris platform services, APIs and integrations.",
    url: SITE_URL,
    images: [{ url: "/logo.svg", width: 1200, height: 630, alt: "Aetheris Status" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Aetheris Status",
    description: "Real-time status monitoring for all Aetheris platform services.",
    images: ["/logo.svg"],
    creator: "@aetheris"
  },
  alternates: { canonical: SITE_URL },
  other: { "theme-color": "#09090B" }
};

export const viewport: Viewport = {
  themeColor: "#09090B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aetheris",
  url: "https://aetheris-web.vercel.app",
  logo: "https://aetheris-web.vercel.app/logo.svg",
  description: "Enterprise billing and virtualization management platform",
  email: "hello@another-horizon.eu",
  sameAs: ["https://github.com/aetheris-project", "https://discord.gg/6GcfebuT2A"]
};

const webApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Aetheris Status",
  url: SITE_URL,
  description: "Real-time status monitoring for all Aetheris platform services.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
};

function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('aetheris-theme')||'dark';if(t==='system'){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme:light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans`}>
        {children}
        <JsonLdScript data={organizationJsonLd} />
        <JsonLdScript data={webApplicationJsonLd} />
      </body>
    </html>
  );
}
