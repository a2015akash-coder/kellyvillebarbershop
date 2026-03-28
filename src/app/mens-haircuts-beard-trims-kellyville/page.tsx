import type { Metadata } from "next";
import ServicesHero from "@/components/sections/services/services-hero";
import OurService from "@/components/sections/services/our-service";
import QuoteCard from "@/components/sections/services/quote-card";
import ProductsSection from "@/components/sections/services/products-section";
import ServicesWhyChooseUs from "@/components/sections/services/services-why-choose-us";
import FAQs from "@/components/sections/services/faqs";

export const metadata: Metadata = {
  title:
    "Men's Haircuts & Beard Trims in Kellyville | The Grooming Room Barbershop",
  description:
    "Professional men's haircuts, skin fades, taper fades, beard trims, and hair colouring services at The Grooming Room Barbershop in Kellyville. Walk-ins welcome.",
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
