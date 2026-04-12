"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { badgeVariants } from "@/components/ui/badge";

const SERVICES = [
  {
    title: "Men's Haircut",
    label: "Precision cut",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/c_fill,g_auto:faces,w_800,h_1000,f_auto,q_auto/v1767534115/IMG_5409_shfn4c.jpg",
    alt: "Men's haircut service at The Grooming Room Barbershop",
    imageTitle: "Precision haircut service - Kellyville barber",
    text: "We specialise in men’s haircuts including skin fades, taper fades, classic cuts, scissor cuts, French crop, mullet, textured styles, undercuts, and modern men’s styles—delivered by our friendly Kellyville barbers to suit your look and lifestyle.",
  },
  {
    title: "Beard Trims & Beard Shaping",
    label: "Beard work",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/c_fill,g_auto:faces,w_800,h_1000,f_auto,q_auto/v1768167106/WhatsApp_Image_2026-01-11_at_17.25.03_2_f88hyp.jpg",
    alt: "Beard trimming service at The Grooming Room Barbershop",
    imageTitle: "Beard trim and shape service - Kellyville barber",
    text: "Our beard trim and shaping service delivers clean lines, balanced shape, and a polished finish—keeping your look sharp, well-groomed, and easy to maintain.",
  },
  {
    title: "Grey Hair Coloring Services",
    label: "Grey blending",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/c_fill,g_auto:faces,w_800,h_1000,f_auto,q_auto/v1768167322/WhatsApp_Image_2026-01-11_at_17.25.03_vi332u.jpg",
    alt: "Grey hair coloring service at The Grooming Room Barbershop",
    imageTitle: "Grey hair coloring service - Kellyville barber",
    text: "Our grey hair and beard colouring service covers grey for natural, long-lasting results, delivered in a quick, comfortable session by our friendly Kellyville barbers—perfect to add to your regular haircut and keep you looking fresh and confident.",
  },
];

export default function OurWork() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section
      className="bg-[var(--background)] pt-10 pb-16 sm:pt-12 sm:pb-20"
      id="services"
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-extrabold tracking-[-0.03em] text-[var(--foreground)] sm:text-5xl">
              Our Services
            </h2>
          </div>

      
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {SERVICES.map((service, index) => (
            <Link
              key={service.title}
              href="/mens-haircuts-beard-trims-kellyville"
              className={`group ${index === 1 ? "md:translate-y-10" : ""}`}
            >
              <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#e5e7eb]">
                <Image
                  src={service.image}
                  alt={service.alt}
                  title={service.imageTitle}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                />
              </div>

              <div className="flex items-start justify-between gap-5">
                <div>
                  <span
                    className={badgeVariants({
                      variant: "secondary",
                      className:
                        "mb-2 bg-[#f5f5f5] text-[var(--brand-accent)] shadow-none",
                    })}
                  >
                    {service.label}
                  </span>

                  <h3 className="text-2xl font-bold tracking-[-0.02em] text-[var(--foreground)]">
                    {service.title}
                  </h3>

                  {/* Preview / Expand Text */}
                  <p
                    className={`mt-2 text-sm leading-7 text-[var(--muted-foreground)] ${
                      expanded === index ? "" : "line-clamp-3"
                    }`}
                  >
                    {service.text}
                  </p>

                  {/* Toggle */}
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // prevent Link navigation
                      setExpanded(expanded === index ? null : index);
                    }}
                    className="mt-2 text-xs font-semibold text-[var(--brand-accent)]"
                  >
                    {expanded === index ? "Show less" : "Read more"}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}