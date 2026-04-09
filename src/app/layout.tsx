import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import {
  BUSINESS_JSON_LD,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Grooming Room Barber Shop | Kellyville Barber",
    template: "%s",
  },
  description:
    "The Grooming Room Barber Shop provides men's haircuts, skin fades, colouring, and beard trimming services in Kellyville. Walk-ins are welcome for men and children.",
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
    title: "The Grooming Room Barber Shop | Kellyville Barber",
    description:
      "The Grooming Room Barber Shop provides men's haircuts, skin fades, colouring, and beard trimming services in Kellyville. Walk-ins are welcome for men and children.",
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
    title: "The Grooming Room Barber Shop | Kellyville Barber",
    description:
      "The Grooming Room Barber Shop provides men's haircuts, skin fades, colouring, and beard trimming services in Kellyville.",
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
  icons: {
    icon: "/barber.ico",
    shortcut: "/barber.ico",
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
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        {/* Preconnect to Cloudinary */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body className="flex min-h-full flex-col">
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TC5XGDJG');`}
        </Script>
        <Script id="business-jsonld" type="application/ld+json">
          {JSON.stringify(BUSINESS_JSON_LD)}
        </Script>

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
