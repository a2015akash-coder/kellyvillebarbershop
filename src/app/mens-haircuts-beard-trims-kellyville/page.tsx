import type { Metadata } from "next";
import { Suspense } from "react";
import ServicesHero from "@/components/sections/services/services-hero";
import OurService from "@/components/sections/services/our-service";
import QuoteCard from "@/components/sections/services/quote-card";
import ProductsSection from "@/components/sections/services/products-section";
import FAQs from "@/components/sections/services/faqs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Men's Haircuts & Beard Trims in Kellyville | Grooming Room",
  description:
    "Sharp men's haircuts and professional beard trims in Kellyville. Clean fades, expert beard shaping, and walk-ins always welcome at The Grooming Room.",
  alternates: {
    canonical:
      "https://thegroomingroom.com.au/mens-haircuts-beard-trims-kellyville",
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
          </div>
        }
      >
        <OurService />
      </Suspense>
      <QuoteCard />
      <ProductsSection />
      <FAQs />
    </>
  );
}
