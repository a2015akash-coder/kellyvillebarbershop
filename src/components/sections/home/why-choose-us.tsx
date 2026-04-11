"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  CarFront,
  CheckCircle2,
  Scissors,
  ShieldCheck,
  Star,
} from "lucide-react";

const REASONS = [
  {
    icon: Star,
    eyebrow: "Trusted locally",
    title: "4.4 Rating",
    subtitle: "200+ Google reviews",
    text: "A strong local reputation built through consistent service, reliable results, and returning clients across Kellyville.",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_900/v1768167196/WhatsApp_Image_2026-01-11_at_17.25.04_tmugsj.jpg",
    alt: "Inside The Grooming Room Barbershop in Kellyville",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Professional service",
    title: "Experienced & Professional",
    subtitle: "Skilled local barbers",
    text: "Every cut is handled with care, practical consultation, and a focus on clean finishing that suits everyday maintenance.",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_900/v1767804237/rs_w_730_h_730_cg_true_m_1_nh3xdo.webp",
    alt: "Professional barber service in Kellyville",
  },
  {
    icon: Scissors,
    eyebrow: "For every age",
    title: "Cuts for All Ages",
    subtitle: "Kids to adults",
    text: "From first haircuts to regular trims and sharp adult styles, services are shaped around comfort, suitability, and ease.",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_900/v1767804241/rs_w_730_h_730_cg_true_m_uxntcz.webp",
    alt: "Haircut service suitable for all ages at The Grooming Room",
  },
  {
    icon: CarFront,
    eyebrow: "Convenient visit",
    title: "Free Parking",
    subtitle: "Easy access",
    text: "A straightforward visit with on-site parking, making appointments easier for busy locals and family bookings.",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_900/v1767804242/rs_w_730_h_730_cg_true_k61xmd.webp",
    alt: "Convenient visit to The Grooming Room Barbershop in Kellyville",
  },
];

export default function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeReason = REASONS[activeIndex];
  const Icon = activeReason.icon;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % REASONS.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#f5f5f5] py-20 sm:py-24">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-accent)]">
            Why Choose Us
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.03em] text-[var(--foreground)] sm:text-4xl">
            A better grooming experience, for simple reasons
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-6xl">
          <div className="overflow-hidden rounded-[2rem] border border-[rgba(17,24,39,0.08)] bg-white shadow-[0_30px_90px_-50px_rgba(17,24,39,0.22)]">
            <div className="grid md:grid-cols-[1.08fr_0.92fr]">
              <div className="relative min-h-[18rem] sm:min-h-[24rem] md:min-h-[30rem]">
                <Image
                  key={activeReason.image}
                  src={activeReason.image}
                  alt={activeReason.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover transition-opacity duration-500"
                  priority={activeIndex === 0}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.08)_100%)]" />
              </div>

              <div className="flex flex-col justify-between p-6 sm:p-8 md:p-10">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(255,122,26,0.1)] text-[var(--brand-accent)]">
                    <Icon size={22} strokeWidth={2.2} />
                  </div>

                  <div
                    key={`copy-${activeIndex}`}
                    className="transition-all duration-300"
                  >
                    <div className="mt-6 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--brand-accent)]">
                      {activeReason.eyebrow}
                    </div>

                    <h3 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[var(--foreground)] sm:text-[2.2rem]">
                      {activeReason.title}
                    </h3>

                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--foreground)]/65">
                      {activeReason.subtitle}
                    </p>

                    <p className="mt-6 max-w-xl text-base leading-8 text-[var(--muted-foreground)]">
                      {activeReason.text}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-3 text-sm font-medium text-[var(--foreground)]">
                    <CheckCircle2
                      size={18}
                      className="text-[var(--brand-accent)]"
                    />
                    <span>Clean finishes</span>

                    <span className="h-1 w-1 rounded-full bg-[var(--foreground)]/25" />

                    <span>Local convenience</span>
                  </div>
                </div>

                <div className="mt-10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {REASONS.map((reason, index) => (
                      <button
                        key={reason.title}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Show ${reason.title}`}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          index === activeIndex
                            ? "w-8 bg-[var(--brand-accent)]"
                            : "w-2.5 bg-[rgba(17,24,39,0.16)] hover:bg-[rgba(17,24,39,0.28)]"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]/55">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(REASONS.length).padStart(2, "0")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}