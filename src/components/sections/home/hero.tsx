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

// Replace with the actual maps URL for the shop
const DIRECTIONS_LINK = "https://maps.google.com/?q=The+Grooming+Room+Kellyville";

export default function Hero() {
  return (
    <section className="relative flex min-h-[78vh] items-center overflow-hidden px-4 pt-10 sm:px-8 lg:px-8">
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

        <div className="absolute inset-0 bg-black/28 sm:bg-black/24" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,145,0,0.16)_0%,rgba(255,145,0,0.05)_28%,rgba(255,255,255,0.02)_52%,rgba(0,0,0,0.12)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.2)_38%,rgba(0,0,0,0.12)_65%,rgba(0,0,0,0.18)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.06)_58%,rgba(0,0,0,0.16)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-screen-xl">
        <div className="max-w-3xl text-left sm:max-w-[44rem]">
          <h1 className="mt-6 text-[clamp(2rem,5.4vw,4.9rem)] font-semibold leading-[0.94] tracking-[-0.045em] text-white">
            <span className="block whitespace-nowrap">Premium barber <span className=" text-[var(--brand-accent)]">Shop</span>   
            </span>

          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/74 sm:text-base">
            The Grooming Room Barber Shop provides men&apos;s haircuts, skin
            fades, coloring and beard trimming services in Kellyville.
          </p>

          <div className="mt-6 space-y-3">
            {HIGHLIGHTS.map((item) => (
              <div key={item} className="flex items-center gap-3 text-left">
                <CheckCircle2
                  size={22}
                  className="shrink-0 text-[var(--brand-accent)]"
                />
                <span className="text-base font-medium text-white/92 sm:text-[1.05rem]">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a
              href={PHONE_LINK}
              aria-label="Book an appointment"
              className="group inline-flex items-center gap-3 rounded-full border border-white/16 bg-white/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md transition-all duration-300 hover:border-[var(--brand-accent)] hover:bg-[var(--brand-accent)] hover:text-white"
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
              className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-black/18 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/92 backdrop-blur-md transition-all duration-300 hover:border-white/28 hover:bg-white/10 hover:text-white"
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