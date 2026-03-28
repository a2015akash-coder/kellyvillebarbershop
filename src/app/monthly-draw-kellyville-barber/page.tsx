import type { Metadata } from "next";
import PromoHero from "@/components/sections/promotions/promo-hero";
import MonthlyPrizePool from "@/components/sections/promotions/monthly-prize-pool";
import HowToEnterDraw from "@/components/sections/promotions/how-to-enter-draw";
import PromoFinalCTA from "@/components/sections/promotions/promo-final-cta";

export const metadata: Metadata = {
  title: "Monthly Draw | The Grooming Room Barbershop | Kellyville",
  description:
    "Monthly lucky draw available with eligible haircut and beard trim services at The Grooming Room Barbershop in Kellyville. Entry details, dates, and terms apply.",
  alternates: {
    canonical:
      "https://thegroomingroom.com.au/monthly-draw-kellyville-barber",
  },
};

export default function PromotionsPage() {
  return (
    <>
      <PromoHero />
      <MonthlyPrizePool />
      <HowToEnterDraw />
      <PromoFinalCTA />
    </>
  );
}
