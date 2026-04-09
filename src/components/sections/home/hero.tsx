"use client";

import { CheckCircle, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PHONE_LINK } from "@/lib/constants";
import { useReviews } from "./reviews-context";

const HERO_IMAGE =
  "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_1600/v1767704060/interro_veoi1z.webp";

const PROOF_ITEMS = [
  "Walk-ins welcome",
  "Free on-site parking",
  "Senior & kids deals",
];

export default function Hero() {
  const { summary } = useReviews();
  const rating = summary.rating > 0 ? summary.rating.toFixed(1) : "4.4";
  const reviews =
    summary.userRatingCount > 0
      ? `${summary.userRatingCount}+ reviews`
      : "Google reviews";

  return (
    <>
      <section className="relative flex min-h-[76vh] items-center justify-center overflow-hidden px-4 pt-14 text-center sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Interior of The Grooming Room Barbershop in Kellyville"
            fill
            priority
            className="object-cover opacity-100"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,249,246,0.68)_0%,rgba(251,249,246,0.42)_28%,rgba(251,249,246,0.32)_68%,rgba(251,249,246,0.76)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,249,246,0.68)_0%,rgba(251,249,246,0.42)_28%,rgba(251,249,246,0.32)_68%,rgba(251,249,246,0.76)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,249,246,0.78)_0%,rgba(251,249,246,0.52)_28%,rgba(251,249,246,0.42)_68%,rgba(251,249,246,0.82)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#fbf9f6_0%,rgba(251,249,246,0.72)_28%,rgba(251,249,246,0.6)_68%,#fbf9f6_100%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--brand-accent)]">
            Established in Kellyville
          </div>

          <h1 className="mt-6 text-[clamp(2.9rem,9vw,6.4rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-[var(--foreground)]">
            Elevated Barbering
            <span className="block font-semibold italic text-[var(--brand-accent)]">
              Reimagined.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
            A refined grooming space for Kellyville locals, built around
            thoughtful service, clean finishing, and a sharper everyday look.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={PHONE_LINK}
              className={buttonVariants({
                variant: "accent",
                size: "xl",
                className: "min-w-[15rem]",
              })}
            >
              Secure an Appointment
            </a>
            <Link
              href="/mens-haircuts-beard-trims-kellyville"
              className="border-b border-[rgba(148,69,23,0.28)] pb-1 text-sm font-semibold uppercase tracking-[0.12em] text-[var(--foreground)] transition-colors hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
            >
              Explore our Services
            </Link>
          </div>

          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {PROOF_ITEMS.map((item) => (
              <div
                key={item}
                className="flex items-center justify-center gap-2 rounded-lg bg-white/72 px-4 py-3 text-sm font-medium text-[var(--foreground)] shadow-[0_20px_50px_-38px_rgba(27,28,26,0.55)] backdrop-blur"
              >
                <CheckCircle size={16} className="text-[var(--brand-accent)]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(136,115,105,0.12)] bg-[#f5f3f0] py-6">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-center gap-6 px-4 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--foreground)] opacity-80 sm:gap-10 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Star
              size={16}
              className="fill-[var(--brand-accent)] text-[var(--brand-accent)]"
            />
            {rating}/5 rating
          </div>
          <div>{reviews}</div>
          <div>Kellyville&apos;s local barber</div>
        </div>
      </section>
    </>
  );
}
