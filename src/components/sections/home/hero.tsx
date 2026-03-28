"use client";

import { useState } from "react";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Scissors,
  Star,
} from "lucide-react";
import Image from "next/image";
import { DIRECTIONS_LINK, PHONE_LINK } from "@/lib/constants";
import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const IMAGES = [
  {
    desktop:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_1200/v1767533105/39f80663-2183-43e8-9b0d-a8a8df717517_bfnmjt.jpg",
    mobile:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_720/v1767533105/39f80663-2183-43e8-9b0d-a8a8df717517_bfnmjt.jpg",
    alt: "Barbers and customer posing inside The Grooming Room Barbershop in Kellyville",
    title: "Friendly team at The Grooming Room Barbershop - Kellyville",
  },
  {
    desktop:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_1200/v1767533862/IMG_4985_bhflvo.jpg",
    mobile:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_720/v1767533862/IMG_4985_bhflvo.jpg",
    alt: "Clean fade haircut with coloured top finished at The Grooming Room Barbershop in Kellyville",
    title: "Clean fade haircut result - Kellyville barber",
  },
  {
    desktop:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_1200/v1767533885/IMG_7763_mjbc36.jpg",
    mobile:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_720/v1767533885/IMG_7763_mjbc36.jpg",
    alt: "Professional barber cutting men's hair at The Grooming Room Barbershop in Kellyville",
    title: "Men's haircut service in progress - The Grooming Room Kellyville",
  },
];

const REVIEWS = [
  { text: "Clean fades every time. Best barber in Kellyville.", name: "James R." },
  { text: "Walked in, no wait, perfect cut. Highly recommend.", name: "Daniel M." },
  { text: "Great with kids and very professional service.", name: "Alex P." },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const total = IMAGES.length;

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  return (
    <section className="bg-white pt-4">
      <div className="mx-auto max-w-screen-xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div
              className={badgeVariants({
                className: "w-fit px-4 py-2 text-[0.72rem]",
              })}
            >
              <Image
                src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
                alt="Google icon"
                width={20}
                height={20}
                title="Google reviews"
              />
              <div className="flex gap-[2px] text-[#FFB400]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" stroke="none" />
                ))}
              </div>
              <span className="font-semibold tracking-normal">4.4 stars</span>
              <span className="tracking-normal text-slate-500">
                from 200+ reviews
              </span>
            </div>

            <h1 className="mt-6 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-[3.35rem] lg:leading-[1.03]">
              Premium barber shop
              <span className="block text-[var(--brand-accent-strong)]">
                in Kellyville
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              The Grooming Room Barber Shop provides men&apos;s haircuts, skin
              fades, coloring and beard trimming services in Kellyville.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Walk-ins Welcome",
                "Free On-Site Parking",
                "Special deals available for Senior & Kids",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-slate-700 sm:text-base"
                >
                  <CheckCircle
                    size={18}
                    className="mt-0.5 shrink-0 text-[var(--brand-accent)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={PHONE_LINK}
                className={buttonVariants({ variant: "accent", size: "xl" })}
              >
                Call Now
              </a>
              <a
                href={DIRECTIONS_LINK}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: "secondary", size: "xl" })}
              >
                Get Directions
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <div
                className={badgeVariants({
                  variant: "muted",
                  className:
                    "px-4 py-2 text-sm font-medium normal-case tracking-normal",
                })}
              >
                <CheckCircle size={16} className="text-green-600" />
                Clear pricing
              </div>
              <div
                className={badgeVariants({
                  variant: "muted",
                  className:
                    "px-4 py-2 text-sm font-medium normal-case tracking-normal",
                })}
              >
                <Scissors size={16} className="text-orange-600" />
                Experienced local barbers
              </div>
            </div>
          </div>

          <div className="relative">
            <Card className="relative overflow-hidden p-3">
              <div className="absolute left-8 top-8 z-10">
                <div
                  className={badgeVariants({
                    variant: "dark",
                    className: "tracking-[0.16em]",
                  })}
                >
                  Fresh cuts daily
                </div>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-slate-950">
                <div
                  className="absolute inset-0 flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${current * 100}%)` }}
                >
                  {IMAGES.map((image, index) => (
                    <div key={image.desktop} className="relative h-full min-w-full">
                      <Image
                        src={image.desktop}
                        alt={image.alt}
                        title={image.title}
                        className="object-cover"
                        fill
                        priority={index === 0}
                      />
                    </div>
                  ))}
                </div>

                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                  <div className="max-w-[18rem] rounded-2xl bg-white/92 px-4 py-3 shadow-lg backdrop-blur">
                    <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Local favourite
                    </div>
                    <div className="mt-1 text-sm font-medium text-slate-900">
                      Sharp fades, classic cuts, and beard tidy-ups
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={prev}
                      className={buttonVariants({
                        variant: "secondary",
                        size: "icon",
                        className: "border-white/80 bg-white/92 shadow-lg",
                      })}
                      type="button"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={next}
                      className={buttonVariants({
                        variant: "secondary",
                        size: "icon",
                        className: "border-white/80 bg-white/92 shadow-lg",
                      })}
                      type="button"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Reviews strip */}
      <div className="mt-12 border-y border-[var(--border)] bg-[#FFF3E6]">
        <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {REVIEWS.map((review) => (
              <Card
                key={review.name}
                className="rounded-[24px] px-5 py-5 text-center shadow-none"
              >
                <p className="text-sm italic leading-6 text-[var(--muted-foreground)]">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-3 font-semibold text-slate-900">
                  {review.name}
                </div>
                <div className="mt-2 flex justify-center gap-[2px] text-[#FFB400]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" stroke="none" />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
