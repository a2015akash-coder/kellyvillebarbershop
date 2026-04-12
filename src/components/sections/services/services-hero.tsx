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
    <section className="relative flex min-h-[72vh] items-center overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE_URL}
          alt="Interior of The Grooming Room Barbershop in Kellyville showing barber chairs and waiting area"
          title="The Grooming Room Barbershop Interior - Kellyville"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/58 sm:bg-black/54" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.76)_26%,rgba(0,0,0,0.56)_48%,rgba(0,0,0,0.34)_72%,rgba(0,0,0,0.48)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,145,0,0.14)_0%,rgba(255,145,0,0.04)_24%,rgba(255,255,255,0.02)_50%,rgba(0,0,0,0.24)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(0,0,0,0.16)_0%,rgba(0,0,0,0.06)_32%,rgba(0,0,0,0.24)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-screen-xl">
        <div className="max-w-3xl sm:max-w-[44rem]">
          <h1 className="max-w-[12ch] text-[clamp(2.35rem,5vw,4.85rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-white">
            Precision Haircuts &amp; Expert Beard Barbers
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/78 sm:text-base">
            Clean fades. Sharp lines. No rushed appointments. At The Grooming
            Room Barbershop, we provide men&apos;s haircuts, skin fades, taper
            fades, and hair colouring services in Kellyville and the Hills
            District.
          </p>

          <div className="mt-7 space-y-3">
            {SERVICE_HIGHLIGHTS.map((label) => (
              <div key={label} className="flex items-center gap-3 text-left">
                <CheckCircle2
                  size={21}
                  className="shrink-0 text-[var(--brand-accent)]"
                />
                <span className="text-base font-medium text-white/92 sm:text-[1.05rem]">
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
