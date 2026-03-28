import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  BUSINESS_JSON_LD,
} from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Grooming Room Barbershop | Kellyville Barber",
    template: "%s | The Grooming Room Barbershop",
  },
  description:
    "Premium barber shop in Kellyville offering men's haircuts, skin fades, beard trims, and colouring services. Walk-ins welcome. Free parking at Kellyville Village.",
  keywords: [
    "barber kellyville",
    "mens haircut kellyville",
    "skin fade kellyville",
    "beard trim kellyville",
    "hair colouring kellyville",
    "barber shop hills district",
    "the grooming room barbershop",
    "kellyville village barber",
    "kids haircut kellyville",
    "walk in barber kellyville",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "The Grooming Room Barbershop | Kellyville Barber",
    description:
      "Premium barber shop in Kellyville offering men's haircuts, skin fades, beard trims, and colouring services. Walk-ins welcome.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "The Grooming Room Barbershop interior in Kellyville",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Grooming Room Barbershop | Kellyville Barber",
    description:
      "Premium barber shop in Kellyville offering men's haircuts, skin fades, beard trims, and colouring services.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TC5XGDJG');`,
          }}
        />
        {/* End Google Tag Manager */}

        {/* Preconnect to Cloudinary */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(BUSINESS_JSON_LD),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TC5XGDJG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="GTM"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
