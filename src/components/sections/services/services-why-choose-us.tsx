import Image from "next/image";
import { PHONE_LINK, DIRECTIONS_LINK } from "@/lib/constants";

const BULLETS = [
  {
    title: "Experienced Barbers",
    text: "Our barbers are trained in men's haircuts, skin fades, beard trims, and colouring services, delivering consistent results across all services.",
  },
  {
    title: "Customer-Focused Service",
    text: "We take the time to understand what you're after so your haircut or grooming service suits your routine and preferences.",
  },
  {
    title: "Attention to Detail",
    text: "From clean fades to tidy finishes, we focus on accuracy, balance, and proper execution with every service.",
  },
  {
    title: "Comfortable Environment",
    text: "Our barbershop provides a clean, relaxed space where clients can feel comfortable during their visit.",
  },
  {
    title: "Clear Service Expectations",
    text: "Services are discussed before starting, so you know what to expect and can ask questions if needed.",
  },
  {
    title: "Convenient Kellyville Location",
    text: "Located in Kellyville and serving the Hills District, with walk-ins welcome during opening hours.",
  },
];

export default function ServicesWhyChooseUs() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2">
          {/* LEFT CARD */}
          <div className="flex flex-col rounded-3xl border border-gray-200 bg-white p-8">
            <h2
              className="bg-clip-text font-semibold leading-tight tracking-tight text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #0f172a, #E6C35C)",
                fontSize: "clamp(1.9rem, 3.5vw, 2.4rem)",
              }}
            >
              Why Choose The Grooming Room Barbershop?
            </h2>

            <div className="mt-8 overflow-hidden rounded-2xl bg-gray-100">
              <div className="relative aspect-video">
                <Image
                  src="https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_1200,c_limit/v1767729569/Gemini_Generated_Image_5citxn5citxn5cit_wmnse9.png"
                  alt="Inside the barbershop"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* CTA — DESKTOP ONLY */}
            <div className="mt-auto hidden flex-row gap-4 pt-8 lg:flex">
              <a
                href={PHONE_LINK}
                className="inline-flex items-center justify-center rounded-full bg-[#FF7A00] px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-[#FF6A00]"
              >
                Call to Book
              </a>
              <a
                href={DIRECTIONS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 px-8 py-3 font-semibold text-gray-900 transition hover:bg-gray-50"
              >
                Get Directions
              </a>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="flex flex-col justify-center rounded-3xl border border-gray-200 bg-white p-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {BULLETS.map((item) => (
                <div key={item.title}>
                  <h3 className="text-base font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <div className="mt-2 h-[3px] w-8 rounded-full bg-orange-500" />
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA — MOBILE ONLY */}
          <div className="flex flex-col gap-4 lg:hidden">
            <a
              href={PHONE_LINK}
              className="inline-flex items-center justify-center rounded-full bg-[#FF7A00] px-8 py-3 font-semibold text-white shadow-sm transition hover:bg-[#FF6A00]"
            >
              Call to Book
            </a>
            <a
              href={DIRECTIONS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-gray-300 px-8 py-3 font-semibold text-gray-900 transition hover:bg-gray-50"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
