"use client";

import { ArrowUpRight, CheckCircle2, MapPin } from "lucide-react";
import Image from "next/image";
import { PHONE_LINK } from "@/lib/constants";

const HERO_IMAGE_DESKTOP =
  "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_1800/v1767533105/d947c12c1ba7078487fe710fa4283bc8_kz0u54.jpg";

const HERO_IMAGE_MOBILE =
  "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_1200/v1767533105/ChatGPT_Image_Apr_11_2026_12_34_08_AM_fytako.png";

const HERO_SIZES =
  "(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) calc(100vw - 3rem), calc(100vw - 4rem)";

const HIGHLIGHTS = [
  "Walk-ins Welcome",
  "Free On-Site Parking",
  "Special deals available for Senior & Kids",
];

const DIRECTIONS_LINK =
  "https://maps.google.com/?q=The+Grooming+Room+Kellyville";

export default function Hero() {
  return (
    <section className="relative flex min-h-[78vh] items-center overflow-hidden px-4 pt-10 sm:px-8 lg:px-8">
      
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE_MOBILE}
          alt="The Grooming Room barbershop"
          fill
          priority
          sizes={HERO_SIZES}
          className="object-cover object-center sm:hidden"
        />

        <Image
          src={HERO_IMAGE_DESKTOP}
          alt="The Grooming Room barbershop"
          fill
          priority
          sizes={HERO_SIZES}
          className="hidden object-cover object-center sm:block"
        />

        <div className="absolute inset-0 bg-black/30 sm:bg-black/26" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,145,0,0.14)_0%,rgba(255,145,0,0.05)_30%,rgba(0,0,0,0.15)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-screen-xl">
        <div className="max-w-3xl sm:max-w-[48rem] text-center sm:text-left mx-auto sm:mx-0">

          {/* Headline */}
          <h1 className="mt-4 font-semibold leading-[1.02] tracking-[-0.035em] text-white">
            <span className="block text-[clamp(1.9rem,6vw,4.6rem)]">
              Premium barbershop
            </span>
            <span className="block text-[clamp(2.1rem,6.5vw,5rem)] text-white sm:whitespace-nowrap">
              in Kellyville
            </span>
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-xl mx-auto sm:mx-0 text-sm leading-7 text-white/75 sm:text-base">
            The Grooming Room Barber Shop provides men&apos;s haircuts, skin
            fades, coloring and beard trimming services.
          </p>

          {/* Highlights */}
          <div className="mt-5 space-y-2.5 flex flex-col items-center sm:items-start">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 justify-center sm:justify-start"
              >
                <CheckCircle2
                  size={20}
                  className="shrink-0 text-[var(--brand-accent)]"
                />
                <span className="text-[0.98rem] sm:text-[1.02rem] text-white/90">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-6 flex flex-row flex-wrap justify-center gap-3 sm:flex-nowrap sm:justify-start sm:items-center">
            <a
              href={PHONE_LINK}
              aria-label="Call now"
              className="flex-1 sm:flex-none group inline-flex justify-center items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md transition-all duration-300 hover:border-[var(--brand-accent)] hover:bg-[var(--brand-accent)]"
            >
              <span>Call Now</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowUpRight size={16} strokeWidth={2.4} />
              </span>
            </a>

            <a
              href={DIRECTIONS_LINK}
              target="_blank"
              rel="noreferrer"
              aria-label="Get directions"
              className="flex-1 sm:flex-none inline-flex justify-center items-center gap-2 rounded-full border border-white/15 bg-black/20 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              <MapPin size={16} strokeWidth={2.2} />
              <span>Get Directions</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}