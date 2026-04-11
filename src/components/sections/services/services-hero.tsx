"use client";

import { PHONE_LINK } from "@/lib/constants";

const HERO_IMAGE_URL =
  "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_2400,c_limit/v1767704060/interro_veoi1z.webp";

export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-[#f9fafb] pb-14 pt-16">
      {/* SEO IMAGE (indexable, not visible) */}
      <img
        src={HERO_IMAGE_URL}
        alt="Interior of The Grooming Room Barbershop in Kellyville showing barber chairs and waiting area"
        title="The Grooming Room Barbershop Interior – Kellyville"
        width={2400}
        height={1600}
        loading="eager"
        className="sr-only"
      />

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `url('${HERO_IMAGE_URL}')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left center",
        }}
      />

      {/* OVERLAY */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.92) 35%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0.25) 85%, rgba(255,255,255,0.15) 100%)",
        }}
      />

      {/* CONTENT */}
      <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <span className="mb-5 inline-block rounded-full bg-orange-50 px-6 py-2 text-base font-semibold text-orange-600">
          Men&apos;s Haircuts &amp; Beard Trims in Kellyville
        </span>

        <h1
          className="max-w-[22ch] bg-clip-text font-semibold leading-[1.15] tracking-tight text-transparent sm:leading-tight"
          style={{
            backgroundImage: "linear-gradient(90deg, #0f172a, #ff7a00)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          Precision Haircuts &amp; Expert Beard Barbers
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-700 sm:text-lg">
          Clean fades. Sharp lines. No rushed appointments. At The Grooming Room
          Barbershop, we provide men&apos;s haircuts, skin fades, taper fades,
          and hair colouring services in Kellyville and the Hills District.
        </p>

        {/* TRUST SIGNAL ROW */}
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-gray-700">
          {["Walk-ins Welcome", "Kellyville Local", "Experienced Barbers"].map(
            (label) => (
              <span key={label} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-orange-500" />
                {label}
              </span>
            ),
          )}
        </div>

        {/* CTA ROW */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href={PHONE_LINK}
            className="inline-flex items-center justify-center rounded-full bg-[#FF7A00] px-10 py-4 font-semibold text-white shadow-md transition hover:bg-[#FF6A00]"
          >
            Talk To Us
          </a>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=The+Grooming+Room+Barbershop+Kellyville+NSW+2155"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#FFF3E6] px-10 py-4 font-semibold text-[#ea6a00] transition hover:bg-[#FFE6CF]"
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
