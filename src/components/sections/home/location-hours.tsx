"use client";

import { useEffect, useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { DIRECTIONS_LINK, PHONE_LINK } from "@/lib/constants";

const OPENING_HOURS = [
  ["Monday", "9:00 am - 5:30 pm"],
  ["Tuesday", "9:00 am - 5:30 pm"],
  ["Wednesday", "9:00 am - 5:30 pm"],
  ["Thursday", "9:00 am - 9:00 pm"],
  ["Friday", "9:00 am - 5:30 pm"],
  ["Saturday", "9:00 am - 5:00 pm"],
  ["Sunday", "9:00 am - 4:00 pm"],
];

export default function LocationHours() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapVisible, setMapVisible] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(mapRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#f5f3f0] py-24 sm:py-32" id="location">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:gap-20">
          <div className="w-full md:w-[32%]">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-accent)]">
              Visit Us
            </div>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.03em] text-[var(--foreground)] sm:text-5xl">
              Find Us
            </h2>

            <div className="mt-10 space-y-10">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-accent)]">
                  Address
                </div>
                <p className="mt-3 text-lg leading-8 text-[var(--foreground)]">
                  90 Wrights Rd
                  <br />
                  Kellyville NSW 2155
                </p>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-accent)]">
                  Trading Times
                </div>
                <div className="mt-5 space-y-3">
                  {OPENING_HOURS.map(([day, time]) => (
                    <div
                      key={day}
                      className="flex items-center justify-between border-b border-[rgba(136,115,105,0.16)] pb-3 text-sm text-[var(--foreground)]"
                    >
                      <span>{day}</span>
                      <span>{time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                  className={buttonVariants({
                    variant: "secondary",
                    size: "xl",
                  })}
                >
                  Directions
                </a>
              </div>
            </div>
          </div>

          <div ref={mapRef} className="w-full md:w-[68%]">
            <div className="h-[420px] overflow-hidden rounded-[2rem] grayscale md:h-[520px]">
              {mapVisible ? (
                <iframe
                  title="Google Map - The Grooming Room Barbershop"
                  src="https://www.google.com/maps?q=The+Grooming+Room+Barbershop+Kellyville+NSW+2155&output=embed"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-[#ebe8e3] text-sm text-[var(--muted-foreground)]">
                  Loading map...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
