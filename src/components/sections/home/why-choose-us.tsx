import Image from "next/image";

const STEPS = [
  {
    number: "01",
    title: "The Welcome",
    text: "Walk in, settle in, and take a moment before the cut. The pace is relaxed, the conversation is easy, and the focus stays on a tidy result.",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_1200/v1767623965/IMG_2628_wzzrmi.jpg",
    alt: "Inside The Grooming Room Barbershop in Kellyville",
    imageTitle: "The Grooming Room interior - Kellyville",
  },
  {
    number: "02",
    title: "The Consultation",
    text: "Every service starts with a practical chat about shape, length, maintenance, and what works for your day-to-day routine.",
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_1200/v1767533885/IMG_7763_mjbc36.jpg",
    alt: "Barber consultation and haircut service in Kellyville",
    imageTitle: "Barber consultation and haircut service - Kellyville",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#f5f3f0] py-24 sm:py-32">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-accent)]">
            The Experience
          </div>
          <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.03em] text-[var(--foreground)] sm:text-5xl">
            What To Expect
          </h2>
        </div>

        <div className="mt-20 space-y-20 sm:space-y-28">
          {STEPS.map((step, index) => (
            <div
              key={step.number}
              className={`flex flex-col gap-10 md:items-center md:gap-16 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="relative w-full md:w-1/2">
                <div
                  className={`pointer-events-none absolute -top-10 text-[7rem] font-extrabold leading-none text-[rgba(27,28,26,0.05)] sm:text-[9rem] ${
                    index % 2 === 0 ? "left-0" : "right-0"
                  }`}
                >
                  {step.number}
                </div>
                <h3 className="relative text-3xl font-bold tracking-[-0.02em] text-[var(--foreground)] sm:text-4xl">
                  {step.title}
                </h3>
                <p className="relative mt-6 max-w-xl text-base leading-8 text-[var(--muted-foreground)]">
                  {step.text}
                </p>
              </div>

              <div className="w-full md:w-1/2">
                <div
                  className={`overflow-hidden rounded-[2rem] shadow-[0_30px_90px_-52px_rgba(27,28,26,0.6)] ${
                    index % 2 === 0 ? "" : "md:rotate-[2deg]"
                  }`}
                >
                  <div className="relative aspect-video">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      title={step.imageTitle}
                      className="object-cover"
                      fill
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
