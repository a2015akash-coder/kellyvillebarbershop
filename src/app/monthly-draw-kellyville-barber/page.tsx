import type { Metadata } from "next";
import PromoHero from "@/components/sections/promotions/promo-hero";
import MonthlyPrizePool from "@/components/sections/promotions/monthly-prize-pool";
import HowToEnterDraw from "@/components/sections/promotions/how-to-enter-draw";
import PromoFinalCTA from "@/components/sections/promotions/promo-final-cta";

export const metadata: Metadata = {
  title:
    "Monthly Lucky Draw – Win $1,000 | The Grooming Room Barbershop Kellyville",
  description:
    "Get a chance to win cash prizes with every haircut, beard trim, or colouring service at The Grooming Room Barbershop in Kellyville. 37 winners every month.",
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
