import Image from "next/image";
import Link from "next/link";
import { getAllServices, type Service } from "@/lib/service-data";

const LOGO_URL =
  "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_300/v1768612130/IMG_4966_lxnwpl.png";

const SKELETON_COUNT = 9;

function SkeletonCard({ featured = false }: { featured?: boolean }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-gray-100 bg-white sm:rounded-3xl ${
        featured ? "col-span-2 lg:col-span-1" : ""
      }`}
    >
      {/* Image placeholder with logo */}
      <div
        className={`relative flex w-full items-center justify-center bg-gray-50 ${
          featured ? "aspect-[16/9] sm:aspect-[4/3]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={LOGO_URL}
          alt="The Grooming Room Barbershop"
          width={120}
          height={30}
          className="opacity-20"
        />
      </div>

      {/* Text skeleton */}
      <div className="p-4 sm:p-6">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100 sm:h-5" />
        <div className="mt-2 h-[3px] w-8 rounded-full bg-orange-200 sm:w-10" />
        <div className="mt-3 hidden space-y-2 sm:block">
          <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ service, featured }: { service: Service; featured: boolean }) {
  const cardClass = `group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-xl sm:rounded-3xl ${
    featured ? "col-span-2 lg:col-span-1" : ""
  }`;

  const inner = (
    <>
      <div
        className={`relative w-full overflow-hidden bg-gray-100 ${
          featured ? "aspect-[16/9] sm:aspect-[4/3]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={service.coverImage}
          alt={service.coverImageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
      </div>

      <div className="p-4 sm:p-6">
        <h3 className="text-sm font-semibold text-gray-900 sm:text-lg">
          {service.title}
        </h3>
        <div className="mt-1.5 h-[3px] w-8 rounded-full bg-orange-500 sm:mt-2 sm:w-10" />

        {service.price && (
          <p className="mt-2 text-xs font-semibold text-orange-600 sm:mt-3 sm:text-sm">
            {service.price}
            {service.duration && (
              <span className="ml-1.5 font-normal text-gray-500 sm:ml-2">
                · {service.duration}
              </span>
            )}
          </p>
        )}

        <p className="mt-2 hidden text-sm leading-relaxed text-gray-600 sm:block sm:mt-3">
          {service.excerpt}
        </p>

        <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-orange-600 sm:mt-4 sm:text-sm">
          Learn more
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      </div>
    </>
  );

  return (
    <Link
      href={`/mens-haircuts-beard-trims-kellyville/${service.slug}`}
      className={cardClass}
    >
      {inner}
    </Link>
  );
}

export default async function OurService() {
  let services: Service[] = [];

  try {
    services = await getAllServices();
  } catch {
    // Firestore unavailable — will show skeleton
  }

  const isEmpty = services.length === 0;

  return (
    <section className="bg-white section-spacing">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-16 max-w-2xl">
          <h2
            className="bg-clip-text font-semibold leading-tight tracking-tight text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, #0f172a, #E6C35C)",
              fontSize: "clamp(2.3rem, 4.8vw, 3.3rem)",
            }}
          >
            Our Services
          </h2>
          <p className="mt-5 text-base text-gray-600 sm:text-lg">
            Your local barbershop around Hills. Bring a reference or let our
            barbers tailor a look that suits you.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-10">
          {isEmpty
            ? Array.from({ length: SKELETON_COUNT }, (_, i) => (
                <SkeletonCard key={i} featured={i === 0} />
              ))
            : services.map((service, idx) => (
                <ServiceCard
                  key={service.slug}
                  service={service}
                  featured={idx === 0}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
