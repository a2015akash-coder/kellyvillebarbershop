import type { Metadata } from "next";
import FAQs from "@/components/sections/services/faqs";
import OurService from "@/components/sections/services/our-service";
import ProductsSection from "@/components/sections/services/products-section";
import QuoteCard from "@/components/sections/services/quote-card";
import ServicesHero from "@/components/sections/services/services-hero";

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
      <OurService />
      <QuoteCard />
      <ProductsSection />
      <FAQs />
    </>
  );
}
