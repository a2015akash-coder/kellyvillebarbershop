import { CarFront, Scissors, Sparkles } from "lucide-react";
import Image from "next/image";

export default function WhyLocalsChooseUs() {
  return (
    <section className="bg-[var(--background)] py-24 sm:py-32">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2 md:gap-6">
          <div className="rounded-[2rem] bg-[var(--brand-accent)] p-8 text-white md:col-span-2 md:row-span-2 md:p-12">
            <Scissors size={40} />
            <h3 className="mt-8 max-w-sm text-4xl font-extrabold tracking-[-0.03em]">
              Masters of the Craft
            </h3>
            <p className="mt-5 max-w-md text-base leading-8 text-white/80">
              Clean fades, sharp lines, classic cuts, beard work, and a steady
              hand that keeps the final result polished.
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#f3f4f6] p-8">
            <CarFront size={28} className="text-[var(--brand-accent)]" />
            <h4 className="mt-5 text-xl font-bold tracking-[-0.02em] text-[var(--foreground)]">
              Easy access
            </h4>
            <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
              Kellyville Village location with free parking close by.
            </p>
          </div>

          <div className="rounded-[2rem] bg-[var(--brand-accent-strong)] p-8 text-white">
            <Sparkles size={28} />
            <h4 className="mt-5 text-xl font-bold tracking-[-0.02em]">
              Family friendly
            </h4>
            <p className="mt-3 text-sm leading-7 text-white/80">
              A relaxed local shop for men, seniors, and kids.
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#e5e7eb] p-8 md:col-span-2">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="hidden h-28 w-28 overflow-hidden rounded-full sm:block">
                <Image
                  src="https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_600/v1768167196/WhatsApp_Image_2026-01-11_at_17.25.04_tmugsj.jpg"
                  alt="The Grooming Room Barbershop in Kellyville"
                  title="The Grooming Room Barbershop - Kellyville"
                  width={112}
                  height={112}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-xl font-bold tracking-[-0.02em] text-[var(--foreground)]">
                  Trusted by Kellyville locals
                </h4>
                <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
                  Known for consistent barbering, clear communication, and a
                  tidy finish that keeps regulars coming back.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
