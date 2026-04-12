"use client";

import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const HERO_IMAGE_URL =
  "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_2400,c_limit/v1767704060/interro_veoi1z.webp";

const SERVICE_HIGHLIGHTS = [
  "Walk-ins Welcome",
  "Kellyville Local",
  "Experienced Barbers",
];

export default function ServicesHero() {
  return (
    <section className="relative flex min-h-[68vh] sm:min-h-[72vh] items-center overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8">

      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE_URL}
          alt="Interior of The Grooming Room Barbershop in Kellyville"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_center]"
        />

        {/* ✅ LIGHTER OVERLAY (further reduced) */}
        <div className="absolute inset-0 bg-black/32 sm:bg-black/28" />

        {/* directional gradient (softer) */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.35)_35%,rgba(0,0,0,0.12)_70%,rgba(0,0,0,0.25)_100%)]" />

        {/* subtle brand tint */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,145,0,0.10)_0%,rgba(255,145,0,0.03)_45%,rgba(0,0,0,0.10)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-screen-xl">
        <div className="max-w-3xl sm:max-w-[48rem] text-center sm:text-left mx-auto sm:mx-0">

          {/* Headline */}
          <h1 className="mt-2 font-semibold leading-[1.02] tracking-[-0.035em] text-white">
            <span className="block text-[clamp(2rem,5vw,4.6rem)]">
              Precision Haircuts
            </span>
            <span className="block text-[clamp(2rem,5vw,4.6rem)]">
              & Expert Beard
            </span>
            <span className="block text-[clamp(2.1rem,5.5vw,5rem)] text-white sm:whitespace-nowrap">
              Barbers
            </span>
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-2xl mx-auto sm:mx-0 text-sm leading-7 text-white/80 sm:text-base">
            Clean fades. Sharp lines. No rushed appointments. At The Grooming
            Room Barbershop, we provide men&apos;s haircuts, skin fades, taper
            fades, and hair colouring services in Kellyville and the Hills
            District.
          </p>

          {/* Highlights */}
          <div className="mt-5 space-y-2.5 flex flex-col items-center sm:items-start">
            {SERVICE_HIGHLIGHTS.map((label) => (
              <div
                key={label}
                className="flex items-center gap-3 justify-center sm:justify-start"
              >
                <CheckCircle2
                  size={20}
                  className="shrink-0 text-[var(--brand-accent)]"
                />
                <span className="text-[0.98rem] sm:text-[1.02rem] text-white/92">
                  {label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}