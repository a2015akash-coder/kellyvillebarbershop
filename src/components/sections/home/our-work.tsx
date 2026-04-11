import Image from "next/image";
import Link from "next/link";
import { badgeVariants } from "@/components/ui/badge";

const SERVICES = [
  {
    title: "Men's Haircut",
    label: "Precision cut",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/c_fill,g_auto:faces,w_800,h_1000,f_auto,q_auto/v1767534115/IMG_5409_shfn4c.jpg",
    alt: "Men's haircut service at The Grooming Room Barbershop",
    imageTitle: "Precision haircut service - Kellyville barber",
    text: "Full consultation, clean shape, wash, and style for everyday wear.",
  },
  {
    title: "Beard Trims & Beard Shaping",
    label: "Beard work",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/c_fill,g_auto:faces,w_800,h_1000,f_auto,q_auto/v1768167106/WhatsApp_Image_2026-01-11_at_17.25.03_2_f88hyp.jpg",
    alt: "Beard trimming service at The Grooming Room Barbershop",
    imageTitle: "Beard trim and shape service - Kellyville barber",
    text: "Detailed trimming, line work, and tidy finishing for a sharper profile.",
  },
  {
    title: "Grey Hair Coloring Services",
    label: "Grey blending",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/c_fill,g_auto:faces,w_800,h_1000,f_auto,q_auto/v1768167322/WhatsApp_Image_2026-01-11_at_17.25.03_vi332u.jpg",
    alt: "Grey hair coloring service at The Grooming Room Barbershop",
    imageTitle: "Grey hair coloring service - Kellyville barber",
    text: "Subtle colour work and maintenance for a more polished finish.",
  },
];

export default function OurWork() {
  return (
    <section className="bg-[var(--background)] py-24 sm:py-32" id="services">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-accent)]">
              The Menu
            </div>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.03em] text-[var(--foreground)] sm:text-5xl">
              Crafted Services
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-[var(--muted-foreground)] sm:text-base">
            We provide consistent barbering services so you leave well-groomed and comfortable. Our barbers take the time to get the cut right.


          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {SERVICES.map((service, index) => (
            <Link
              key={service.title}
              href="/mens-haircuts-beard-trims-kellyville"
              className={`group ${index === 1 ? "md:translate-y-10" : ""}`}
            >
              <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#e5e7eb]">
                <Image
                  src={service.image}
                  alt={service.alt}
                  title={service.imageTitle}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  fill
                />
              </div>

              <div className="flex items-start justify-between gap-5">
                <div>
                  <span
                    className={badgeVariants({
                      variant: "secondary",
                      className:
                        "mb-3 bg-[#f5f5f5] text-[var(--brand-accent)] shadow-none",
                    })}
                  >
                    {service.label}
                  </span>
                  <h3 className="text-2xl font-bold tracking-[-0.02em] text-[var(--foreground)]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                    {service.text}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
