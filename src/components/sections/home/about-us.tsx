import Image from "next/image";

export default function AboutUs() {
  return (
    <section className="bg-[#efeeeb] py-24 sm:py-32">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 md:flex-row md:gap-20">
          <div className="w-full md:w-1/2">
            <Image
              src="https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_1000/v1767623965/IMG_2628_wzzrmi.jpg"
              alt="Inside The Grooming Room Barbershop in Kellyville"
              title="Inside The Grooming Room Barbershop - Kellyville"
              width={1000}
              height={1200}
              className="h-[34rem] w-full rounded-[2rem] object-cover shadow-[0_34px_90px_-52px_rgba(27,28,26,0.6)]"
            />
          </div>

          <div className="w-full md:w-1/2">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-accent)]">
              Our Story
            </div>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.03em] text-[var(--foreground)] sm:text-5xl">
              Crafted with care.
            </h2>

            <p className="mt-8 text-lg leading-8 text-[var(--muted-foreground)]">
              The Grooming Room was built for locals who want a cleaner, calmer,
              more considered barbering experience.
            </p>

            <p className="mt-6 text-base leading-8 text-[var(--muted-foreground)]">
              We focus on straightforward service, quality finishing, and cuts
              that hold up beyond the first day. The space is warm, the approach
              is practical, and the goal is simple: help you leave looking sharp
              without the fuss.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
