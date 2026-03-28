import Image from "next/image";
import { CarFront, Scissors, Sparkles, Star } from "lucide-react";
import { DIRECTIONS_LINK, PHONE_LINK } from "@/lib/constants";
import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionHeading from "@/components/ui/section-heading";

const FEATURES = [
  {
    Icon: Star,
    label: "Trusted locally",
    title: "4.4 rating - 200+ reviews",
    subtitle:
      "Rated 4.4 stars on Google by 200+ local customers. Known for consistent results, professional barbering, and a friendly experience.",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_900/v1768167196/WhatsApp_Image_2026-01-11_at_17.25.04_tmugsj.jpg",
    alt: "Customers waiting inside The Grooming Room Barbershop at Kellyville Village Shopping Centre",
    imageTitle: "The Grooming Room Barbershop - Kellyville Village",
  },
  {
    Icon: Scissors,
    label: "Sharp finishing",
    title: "Experienced & Professional",
    subtitle:
      "Full service barbering in Kellyville including precision haircuts, hairline tidy ups, skin fades, beard trims, and light styling.",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_900/v1767804237/rs_w_730_h_730_cg_true_m_1_nh3xdo.webp",
    alt: "Professional barber performing a clean fade haircut at The Grooming Room Barbershop in Kellyville",
    imageTitle: "Clean fade haircut service - Kellyville barber",
  },
  {
    Icon: Sparkles,
    label: "Family friendly",
    title: "Soon to Be a Man",
    subtitle:
      "Children's haircuts for ages zero to twelve with simple styles, tidy finishes, optional hair art, and complimentary lollies.",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_900/v1767804241/rs_w_730_h_730_cg_true_m_uxntcz.webp",
    alt: "Happy child after a fresh haircut at The Grooming Room Barbershop in Kellyville",
    imageTitle: "Children's haircut at The Grooming Room Barbershop",
  },
  {
    Icon: CarFront,
    label: "Easy access",
    title: "Free Parking",
    subtitle:
      "Located in Kellyville Village Shopping Centre with free parking, plus Coles, Woolworths, Aldi, and nearby dining options.",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_900/v1767804242/rs_w_730_h_730_cg_true_k61xmd.webp",
    alt: "Kellyville Village Shopping Centre with free parking near The Grooming Room Barbershop",
    imageTitle: "Free parking at Kellyville Village Shopping Centre",
  },
];

export default function WhyLocalsChooseUs() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What To Expect"
          title="What to Expect"
          description="We focus on the basics done right - quality haircuts, friendly service, and a clean, relaxed space that keeps locals coming back."
          className="mb-10 max-w-3xl"
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((item) => (
            <Card
              key={item.title}
              className="group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_-42px_rgba(15,23,42,0.65)]"
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  title={item.imageTitle}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  fill
                />
                <div className="absolute left-5 top-5 flex items-center gap-2">
                  <span
                    className={badgeVariants({
                      variant: "dark",
                      className: "tracking-[0.16em]",
                    })}
                  >
                    {item.label}
                  </span>
                </div>
                <div className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 text-slate-900 shadow-lg">
                  <item.Icon size={18} />
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm leading-6 text-slate-600">
                  {item.subtitle}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={PHONE_LINK}
            className={buttonVariants({ variant: "accent", size: "xl" })}
          >
            Call Now
          </a>
          <a
            href={DIRECTIONS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "secondary", size: "xl" })}
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
