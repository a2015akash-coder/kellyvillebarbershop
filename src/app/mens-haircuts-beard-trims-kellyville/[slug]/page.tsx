import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getServiceBySlug, getAllServices } from "@/lib/service-data";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { PHONE_LINK, PHONE_NUMBER, DIRECTIONS_LINK } from "@/lib/constants";

export const dynamic = "force-dynamic";

/* ── Opening hours for the location section ── */
const HOURS = [
  { days: "Mon – Wed, Fri", time: "09:00 – 17:30" },
  { days: "Thursday", time: "09:00 – 21:00" },
  { days: "Saturday", time: "09:00 – 17:00" },
  { days: "Sunday", time: "09:00 – 16:00" },
];

const ADDRESS = {
  street: "90 Wrights Road",
  suburb: "Kellyville, NSW 2155",
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) return { title: "Service Not Found" };

  const title = service.metaTitle || `${service.title} | ${SITE_NAME}`;
  const description = service.metaDescription || service.excerpt;
  const url = `${SITE_URL}/mens-haircuts-beard-trims-kellyville/${service.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: service.coverImage
        ? [{ url: service.coverImage, width: 800, height: 500 }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: service.coverImage ? [service.coverImage] : [],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) notFound();

  let allServices: {
    slug: string;
    title: string;
    coverImage: string;
    excerpt: string;
    price?: string;
    duration?: string;
  }[] = [];
  try {
    allServices = await getAllServices();
  } catch {
    // ignore
  }

  const otherServices = allServices
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  // Services with pricing for the rates menu
  const rateServices = allServices.filter((s) => s.price);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.excerpt,
    image: service.coverImage || undefined,
    provider: {
      "@type": "BarberShop",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: { "@type": "Place", name: "Kellyville, NSW" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* ═══════════ 1. HERO — split layout ═══════════ */}
      <section className="bg-[#f8f9fa]">
        <div className="mx-auto max-w-screen-xl px-4 pb-20 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pb-28 lg:pt-16">
          {/* Breadcrumb */}
          <Link
            href="/mens-haircuts-beard-trims-kellyville"
            className="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-[#5a4136] transition hover:text-[#FF6B00]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            All Services
          </Link>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left — text */}
            <div>
              <span className="mb-5 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-[#FF6B00]">
                Master Craftsmanship
              </span>

              <h1
                className="font-semibold text-[#191c1d]"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                }}
              >
                {service.title}
              </h1>

              <p className="mt-6 max-w-lg text-base leading-[1.8] text-[#3a3a3a] sm:text-lg">
                {service.excerpt}
              </p>

              {/* Price + CTA */}
              <div className="mt-8 flex flex-wrap items-center gap-5">
                {service.price && (
                  <div>
                    <span className="font-semibold text-[#191c1d]" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                      {service.price}
                    </span>
                    {service.duration && (
                      <span className="ml-2 text-xs font-medium uppercase tracking-widest text-[#5a4136]">
                        {service.duration}
                      </span>
                    )}
                  </div>
                )}

                <a
                  href={PHONE_LINK}
                  className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-semibold text-white shadow-lg transition hover:shadow-xl"
                  style={{ background: "linear-gradient(135deg, #a04100 0%, #FF6B00 100%)" }}
                >
                  Call to Book
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right — image with floating badge */}
            <div className="relative">
              <div className="overflow-hidden rounded-2xl lg:rounded-3xl">
                <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]">
                  <Image
                    src={service.coverImage}
                    alt={service.coverImageAlt}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-white/90 px-5 py-3 shadow-[0_0_40px_rgba(0,0,0,0.04)] backdrop-blur sm:left-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF6B00]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#191c1d]">Experienced Barbers</p>
                  <p className="text-xs text-[#5a4136]">Kellyville&apos;s Trusted Shop</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 2. HIGHLIGHTS — 3 feature cards ═══════════ */}
      {service.highlights.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
            <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${service.highlights.length >= 3 ? "lg:grid-cols-3" : ""}`}>
              {service.highlights.map((h, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-[#f8f9fa] p-7 transition-shadow hover:shadow-[0_0_40px_rgba(0,0,0,0.04)] sm:p-8"
                >
                  {/* Icon placeholder — numbered circle */}
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-lg text-[#FF6B00] shadow-[0_0_30px_rgba(0,0,0,0.04)]">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      {i === 0 && <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></>}
                      {i === 1 && <><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></>}
                      {i === 2 && <><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></>}
                      {i > 2 && <><circle cx="12" cy="12" r="10" /><path d="M12 8v8" /><path d="M8 12h8" /></>}
                    </svg>
                  </div>

                  <h3 className="text-lg font-semibold text-[#191c1d]">
                    {h.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.7] text-[#5a4136]">
                    {h.text}
                  </p>
                  <div className="mt-5 h-[3px] w-10 rounded-full bg-[#FF6B00]" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ 3. SERVICES & RATES ═══════════ */}
      {rateServices.length > 0 && (
        <section className="bg-[#f8f9fa]">
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-[#FF6B00]">
                Menu
              </span>
              <h2
                className="font-semibold text-[#191c1d]"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)", lineHeight: 1.2 }}
              >
                Services &amp; Rates
              </h2>
            </div>

            <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-[0_0_40px_rgba(0,0,0,0.04)] sm:p-8 lg:rounded-3xl">
              <div className="space-y-0">
                {rateServices.map((s, i) => (
                  <div key={s.slug}>
                    {i > 0 && <div className="my-5 h-px bg-[#f3f4f5]" />}
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <Link
                          href={`/mens-haircuts-beard-trims-kellyville/${s.slug}`}
                          className="text-base font-semibold text-[#191c1d] transition hover:text-[#FF6B00]"
                        >
                          {s.title}
                        </Link>
                        {s.duration && (
                          <p className="mt-0.5 text-sm text-[#5a4136]">
                            {s.duration}
                          </p>
                        )}
                      </div>
                      <span className="shrink-0 text-lg font-semibold text-[#FF6B00]">
                        {s.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-xl bg-[#f8f9fa] px-5 py-3.5 text-center text-sm text-[#5a4136]">
                Walk-ins welcome. No appointment needed.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ 4. LOCATION & HOURS ═══════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left — info */}
            <div>
              <h2
                className="font-semibold text-[#191c1d]"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)", lineHeight: 1.2 }}
              >
                Visit The Grooming Room
              </h2>
              <p className="mt-4 max-w-md text-base leading-[1.8] text-[#3a3a3a]">
                Our studio is designed to be a comfortable, clean space for every
                gentleman. Walk in or call ahead — we&apos;re always happy to see you.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
                {/* Address */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#FF6B00]" />
                    <h3 className="text-sm font-semibold text-[#191c1d]">Address</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[#5a4136]">
                    {ADDRESS.street}
                    <br />
                    {ADDRESS.suburb}
                  </p>
                </div>

                {/* Hours */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#FF6B00]" />
                    <h3 className="text-sm font-semibold text-[#191c1d]">Studio Hours</h3>
                  </div>
                  <div className="mt-2 space-y-1">
                    {HOURS.map((h) => (
                      <div key={h.days} className="flex justify-between text-sm text-[#5a4136]">
                        <span>{h.days}</span>
                        <span>{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <a
                href={DIRECTIONS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-6 py-3 text-sm font-semibold text-[#191c1d] transition hover:bg-[#f8f9fa]"
              >
                Get Directions
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>

            {/* Right — map embed */}
            <div className="overflow-hidden rounded-2xl lg:rounded-3xl">
              <iframe
                title="The Grooming Room Barbershop location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.5!2d150.9554!3d-33.7184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12a0b0c0e0c0c1%3A0x0!2s90+Wrights+Rd%2C+Kellyville+NSW+2155!5e0!3m2!1sen!2sau!4v1700000000000"
                width="100%"
                height="360"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 5. OTHER SERVICES ═══════════ */}
      {otherServices.length > 0 && (
        <section className="bg-[#f8f9fa]">
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
            <div className="mb-12 text-center">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.15em] text-[#FF6B00]">
                More Services
              </span>
              <h2
                className="font-semibold text-[#191c1d]"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)", lineHeight: 1.2 }}
              >
                Explore Our Other Cuts
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/mens-haircuts-beard-trims-kellyville/${s.slug}`}
                  className="group overflow-hidden rounded-2xl bg-white transition-shadow hover:shadow-[0_0_40px_rgba(0,0,0,0.06)] lg:rounded-3xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={s.coverImage}
                      alt={s.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg font-semibold text-[#191c1d]">{s.title}</h3>
                    <div className="mt-2 h-[3px] w-8 rounded-full bg-[#FF6B00]" />
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#5a4136]">{s.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#FF6B00]">
                      View service
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════ 6. BOTTOM CTA ═══════════ */}
      <section className="bg-[#191c1d]">
        <div className="mx-auto max-w-screen-md px-4 py-20 text-center sm:px-6 sm:py-28">
          <h2
            className="font-semibold text-white"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.15, letterSpacing: "-0.01em" }}
          >
            Ready for your next cut?
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/60">
            Walk-ins are always welcome at The Grooming Room. Drop by our
            Kellyville shop or give us a call.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={PHONE_LINK}
              className="inline-flex items-center justify-center gap-2 rounded-full px-10 py-4 font-semibold text-white shadow-lg transition hover:shadow-xl"
              style={{ background: "linear-gradient(135deg, #a04100 0%, #FF6B00 100%)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Talk To Us
            </a>
            <a
              href={DIRECTIONS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-10 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
