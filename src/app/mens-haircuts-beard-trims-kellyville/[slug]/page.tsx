import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  MapPin,
  Phone,
  Scissors,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DIRECTIONS_LINK, PHONE_LINK, PHONE_NUMBER } from "@/lib/constants";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import {
  getAllServices,
  getServiceBySlug,
  getServiceDisplayTitle,
  getServiceSummary,
} from "@/lib/service-data";

export const dynamic = "force-dynamic";

const HOURS = [
  { days: "Mon - Wed, Fri", time: "09:00 - 17:30" },
  { days: "Thursday", time: "09:00 - 21:00" },
  { days: "Saturday", time: "09:00 - 17:00" },
  { days: "Sunday", time: "09:00 - 16:00" },
];

const ADDRESS = {
  street: "90 Wrights Road",
  suburb: "Kellyville, NSW 2155",
};

const DEFAULT_HIGHLIGHTS = [
  "Every service is shaped around your hair texture, growth pattern, and the finish you want to maintain between visits.",
  "Expect clean detailing, deliberate consultation, and a pace that keeps the result sharp without rushing the chair time.",
  "Walk-ins are welcome, but the experience still feels considered from the first conversation to the final mirror check.",
];

function toStableTextEntries(items: string[]) {
  const counts = new Map<string, number>();

  return items.map((text) => {
    const trimmed = text.trim();
    const base =
      trimmed
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "item";
    const occurrence = (counts.get(base) ?? 0) + 1;

    counts.set(base, occurrence);

    return {
      key: `${base}-${occurrence}`,
      text,
    };
  });
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) return { title: "Service Not Found" };

  const title =
    service.seo.metaTitle ||
    `${getServiceDisplayTitle(service)} | ${SITE_NAME}`;
  const description = service.seo.metaDescription || getServiceSummary(service);
  const url = `${SITE_URL}/mens-haircuts-beard-trims-kellyville/${service.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: service.hero.image
        ? [
            {
              url: service.hero.image,
              alt: service.hero.imageAlt,
              width: 1400,
              height: 1800,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: service.hero.image ? [service.hero.image] : [],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) notFound();

  const allServices = await getAllServices().catch(() => []);
  const otherServices = allServices
    .filter((item) => item.slug !== service.slug)
    .slice(0, 3);

  const heroTitle = getServiceDisplayTitle(service);
  const intro = getServiceSummary(service);
  const highlightNotes =
    service.highlights && service.highlights.length > 0
      ? service.highlights
      : DEFAULT_HIGHLIGHTS;
  const highlightEntries = toStableTextEntries(highlightNotes);
  const serviceUrl = `${SITE_URL}/mens-haircuts-beard-trims-kellyville/${service.slug}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: heroTitle,
    serviceType: service.title,
    description: service.seo.metaDescription || intro,
    image: service.hero.image || undefined,
    url: serviceUrl,
    provider: {
      "@type": "BarberShop",
      name: SITE_NAME,
      url: SITE_URL,
      telephone: PHONE_NUMBER,
      address: {
        "@type": "PostalAddress",
        streetAddress: ADDRESS.street,
        addressLocality: "Kellyville",
        addressRegion: "NSW",
        postalCode: "2155",
        addressCountry: "AU",
      },
    },
    areaServed: {
      "@type": "Place",
      name: "Kellyville, NSW",
    },
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(serviceJsonLd)}
      </script>

      <section className="bg-white text-[#181513]">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
            <div className="max-w-xl">
              <Link
                href="/mens-haircuts-beard-trims-kellyville"
                className="inline-flex w-fit items-center gap-2 text-sm text-[#5c5147] transition hover:text-[#181513]"
              >
                <span className="h-px w-8 bg-[var(--brand-accent)]" />
                All services
              </Link>

              <div className="mt-10 flex flex-wrap items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#9d5a19]">
                <span>Kellyville service</span>
                {service.isRecommended && (
                  <span className="rounded-full border border-[#d6c4b2] bg-white px-3 py-1 text-[0.68rem] text-[#7b4510]">
                    Recommended
                  </span>
                )}
                {service.duration && (
                  <span className="rounded-full border border-[#d6c4b2] bg-white px-3 py-1 text-[0.68rem] text-[#43392f]">
                    {service.duration}
                  </span>
                )}
              </div>

              <h1
                className="mt-5 max-w-lg font-semibold tracking-[-0.045em] text-[#181513]"
                style={{
                  fontSize: "clamp(2.7rem, 6vw, 5rem)",
                  lineHeight: 0.95,
                }}
              >
                {heroTitle}
              </h1>

              {service.hero.subtitle && (
                <p className="mt-5 max-w-md text-lg text-[#7b4510] sm:text-xl">
                  {service.hero.subtitle}
                </p>
              )}

              <p className="mt-6 max-w-lg text-base leading-8 text-[#5c5147] sm:text-lg">
                {intro}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href={PHONE_LINK}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-accent)] px-7 py-3.5 font-semibold text-[#1b140d] transition hover:bg-[#ff9340]"
                >
                  <Phone className="h-4 w-4" />
                  Call to book
                </a>
                <a
                  href={DIRECTIONS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d6c4b2] bg-white px-7 py-3.5 font-semibold text-[#181513] transition hover:bg-[#f7f2eb]"
                >
                  <MapPin className="h-4 w-4" />
                  Get directions
                </a>
              </div>

              <div className="mt-10 grid gap-5 border-t border-[#ddd3c8] pt-6 text-sm text-[#5c5147] sm:grid-cols-3">
                <div className="min-w-0">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#9d5a19]">
                    Studio
                  </p>
                  <p className="mt-2 text-base text-[#181513]">
                    The Grooming Room
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#9d5a19]">
                    Booking
                  </p>
                  <p className="mt-2 text-base text-[#181513]">
                    Walk-ins welcome
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#9d5a19]">
                    Contact
                  </p>
                  <p className="mt-2 text-base text-[#181513]">
                    {PHONE_NUMBER}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 lg:pt-2">
              <div className="overflow-hidden rounded-[2rem] border border-[#ddd3c8] bg-white p-3 shadow-[0_30px_80px_rgba(37,27,15,0.08)] sm:p-4">
                <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem] bg-[#ede4d7]">
                  {service.hero.image ? (
                    <Image
                      src={service.hero.image}
                      alt={service.hero.imageAlt}
                      fill
                      priority
                      className="object-cover object-center"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,#ddcfbd_0%,#f4ece3_100%)]" />
                  )}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-[#ddd3c8] bg-white px-6 py-5 text-[#43392f] shadow-[0_20px_50px_rgba(37,27,15,0.05)]">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#9d5a19]">
                  In the chair
                </p>
                <p className="mt-3 text-base leading-7 sm:text-lg">
                  {service.hero.description || service.hero.subtitle || intro}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {(service.includes.length > 0 || service.suitableFor.length > 0) && (
        <section className="bg-[#f4efe7] text-[#181513]">
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="grid gap-14 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-20">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9d5a19]">
                  Service essentials
                </p>
                <h2
                  className="mt-4 max-w-md font-semibold tracking-[-0.03em]"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3.6rem)",
                    lineHeight: 0.98,
                  }}
                >
                  A clear read on what this service covers.
                </h2>
                <p className="mt-6 max-w-md text-base leading-8 text-[#5c5147] sm:text-lg">
                  The detail matters here: what is included, who tends to get
                  the best result, and how the appointment fits into your
                  routine.
                </p>
                {service.duration && (
                  <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-black/10 px-4 py-2 text-sm text-[#43392f]">
                    <Clock3 className="h-4 w-4 text-[#9d5a19]" />
                    Approx. {service.duration}
                  </div>
                )}
              </div>

              <div className="grid gap-10 md:grid-cols-2">
                {service.includes.length > 0 && (
                  <div className="border-l border-black/10 pl-6">
                    <div className="flex items-center gap-3 text-[#9d5a19]">
                      <Scissors className="h-4 w-4" />
                      <p className="text-sm font-semibold uppercase tracking-[0.22em]">
                        What's included
                      </p>
                    </div>
                    <ul className="mt-7 space-y-5">
                      {service.includes.map((item) => (
                        <li key={item} className="flex gap-3 text-[#342d28]">
                          <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#9d5a19]" />
                          <span className="text-base leading-7">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.suitableFor.length > 0 && (
                  <div className="border-l border-black/10 pl-6">
                    <div className="flex items-center gap-3 text-[#9d5a19]">
                      <Sparkles className="h-4 w-4" />
                      <p className="text-sm font-semibold uppercase tracking-[0.22em]">
                        Best suited for
                      </p>
                    </div>
                    <ul className="mt-7 space-y-5">
                      {service.suitableFor.map((item) => (
                        <li key={item} className="flex gap-3 text-[#342d28]">
                          <span className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full bg-[#9d5a19]" />
                          <span className="text-base leading-7">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {service.process.length > 0 && (
        <section className="bg-[#fbf8f3] text-[#181513]">
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
              <div className="lg:pt-4">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9d5a19]">
                  How it unfolds
                </p>
                <h2
                  className="mt-4 max-w-md font-semibold tracking-[-0.03em] text-[#181513]"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3.6rem)",
                    lineHeight: 0.98,
                  }}
                >
                  Each appointment moves with a clean, deliberate rhythm.
                </h2>
                <p className="mt-6 max-w-md text-base leading-8 text-[#5c5147] sm:text-lg">
                  From the first look in the mirror to the final detail, this is
                  the service flow you can expect in our Kellyville studio.
                </p>
              </div>

              <div className="border-t border-black/10">
                {service.process.map((step, index) => (
                  <div
                    key={`${step.title}-${index}`}
                    className="grid gap-4 border-b border-black/10 py-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-8"
                  >
                    <span
                      className="font-semibold tracking-[-0.05em] text-[#c47b2f]"
                      style={{
                        fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
                        lineHeight: 0.9,
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="max-w-2xl">
                      <h3 className="text-2xl font-semibold text-[#181513]">
                        {step.title}
                      </h3>
                      {step.description && (
                        <p className="mt-4 text-base leading-8 text-[#5c5147] sm:text-lg">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-white text-[#181513]">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9d5a19]">
                Why locals return
              </p>
              <h2
                className="mt-4 max-w-xl font-semibold tracking-[-0.03em]"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1 }}
              >
                The service reads premium because the details stay consistent.
              </h2>

              <div className="mt-10 border-t border-black/10">
                {highlightEntries.map((item, index) => (
                  <div
                    key={item.key}
                    className="grid gap-3 border-b border-black/10 py-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-6"
                  >
                    <span className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9d5a19]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="max-w-2xl text-base leading-8 text-[#4f463e] sm:text-lg">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="rounded-[2rem] bg-[#1a1917] p-7 text-white sm:p-9">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f0b98f]">
                  Visit the studio
                </p>
                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
                  Walk in, call ahead, or drop by after work.
                </h3>
                <p className="mt-5 max-w-md text-base leading-8 text-white/68">
                  Our Kellyville shop is set up for regular appointments, sharp
                  finishes, and easy repeat visits throughout the week.
                </p>

                <div className="mt-8 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[#f0b98f]">
                      <MapPin className="h-4 w-4" />
                      <p className="text-sm font-semibold uppercase tracking-[0.22em]">
                        Address
                      </p>
                    </div>
                    <p className="mt-3 text-base leading-7 text-white/78">
                      {ADDRESS.street}
                      <br />
                      {ADDRESS.suburb}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[#f0b98f]">
                      <Phone className="h-4 w-4" />
                      <p className="text-sm font-semibold uppercase tracking-[0.22em]">
                        Contact
                      </p>
                    </div>
                    <p className="mt-3 text-base leading-7 text-white/78">
                      {PHONE_NUMBER}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={PHONE_LINK}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-accent)] px-6 py-3.5 font-semibold text-[#1b140d] transition hover:bg-[#ff9340]"
                  >
                    <Phone className="h-4 w-4" />
                    Speak with the shop
                  </a>
                  <a
                    href={DIRECTIONS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                    Open directions
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-[2rem] border border-black/10">
            <div className="grid gap-0 lg:grid-cols-[minmax(18rem,0.48fr)_minmax(0,1.52fr)]">
              <div className="bg-[#f4efe7] p-6 sm:p-8 lg:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9d5a19]">
                  Hours
                </p>
                <div className="mt-6 space-y-3">
                  {HOURS.map((item) => (
                    <div
                      key={item.days}
                      className="flex items-center justify-between gap-4 border-b border-black/8 pb-3 text-sm text-[#43392f] last:border-b-0 last:pb-0"
                    >
                      <span>{item.days}</span>
                      <span className="font-semibold text-[#181513]">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[22rem] bg-[#ede4d7] lg:min-h-[26rem]">
                <iframe
                  title="The Grooming Room Barbershop location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.5!2d150.9554!3d-33.7184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12a0b0c0e0c0c1%3A0x0!2s90+Wrights+Rd%2C+Kellyville+NSW+2155!5e0!3m2!1sen!2sau!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {otherServices.length > 0 && (
        <section className="bg-[#efe5d8] text-[#181513]">
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9d5a19]">
                  More from the studio
                </p>
                <h2
                  className="mt-4 max-w-2xl font-semibold tracking-[-0.03em]"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3.4rem)",
                    lineHeight: 1,
                  }}
                >
                  Explore a few more services that pair naturally with this
                  visit.
                </h2>
              </div>

              <Link
                href="/mens-haircuts-beard-trims-kellyville"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#7b4510] transition hover:text-[#9d5a19]"
              >
                See every service
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-3">
              {otherServices.map((item) => (
                <Link
                  key={item.slug}
                  href={`/mens-haircuts-beard-trims-kellyville/${item.slug}`}
                  className="group block border-t border-black/10 pt-5"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] bg-black/6">
                    {item.hero.image ? (
                      <Image
                        src={item.hero.image}
                        alt={item.hero.imageAlt}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,#d7c2ad_0%,#f4ebe1_100%)]" />
                    )}
                  </div>

                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-2xl font-semibold tracking-[-0.02em] text-[#181513]">
                        {getServiceDisplayTitle(item)}
                      </h3>
                      <p className="mt-3 max-w-sm text-base leading-7 text-[#5c5147]">
                        {getServiceSummary(item)}
                      </p>
                    </div>
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[#9d5a19] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
