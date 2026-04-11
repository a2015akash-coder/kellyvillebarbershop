"use client";

import { useEffect, useRef, useState } from "react";
import { Clock3, MapPin } from "lucide-react";
import { DIRECTIONS_LINK, PHONE_LINK } from "@/lib/constants";
import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SectionHeading from "@/components/ui/section-heading";

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
    <section className="bg-gray-50 py-12">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Location & Hours"
          title="Visit our Kellyville barbershop"
          className="mb-10 max-w-4xl"
        />

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
          <div ref={mapRef} className="h-full">
            <Card className="h-full overflow-hidden p-3">
              <div className="h-[360px] w-full overflow-hidden rounded-[24px] bg-gray-100">
                {mapVisible ? (
                  <iframe
                    title="Google Map - The Grooming Room Barbershop"
                    src="https://www.google.com/maps?q=The+Grooming+Room+Barbershop+Kellyville+NSW+2155&output=embed"
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-gray-500">
                    Loading map...
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 px-4 pb-2 pt-5 text-sm text-slate-700">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--muted)] text-slate-900">
                  <MapPin size={18} />
                </div>
                <span>90 Wrights Rd, Kellyville NSW 2155, Australia</span>
              </div>
            </Card>
          </div>

          <Card className="p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">
                  Opening Hours
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Walk-ins welcome during regular trading hours.
                </p>
              </div>

              <div
                className={badgeVariants({
                  variant: "success",
                  className: "tracking-[0.16em]",
                })}
              >
                This week
              </div>
            </div>

            <div className="mt-6 space-y-3 text-slate-800">
              {OPENING_HOURS.map(([day, time]) => (
                <div
                  key={day}
                  className="flex items-center justify-between rounded-2xl bg-[var(--muted)]/55 px-4 py-3 text-sm"
                >
                  <span className="font-medium">{day}</span>
                  <span>{time}</span>
                </div>
              ))}
            </div>

           
          </Card>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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