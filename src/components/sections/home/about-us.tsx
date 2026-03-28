import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SectionHeading from "@/components/ui/section-heading";

export default function AboutUs() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute -inset-4 hidden rounded-3xl bg-[var(--muted)] lg:block" />
            <div className="relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-white/80 p-3 shadow-[0_24px_70px_-36px_rgba(15,23,42,0.45)]">
              <Image
                src="https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_900/v1767623965/IMG_2628_wzzrmi.jpg"
                alt="Interior view of The Grooming Room Barbershop in Kellyville"
                title="Inside The Grooming Room Barbershop - Kellyville"
                className="h-[320px] w-full rounded-[22px] object-cover"
                width={900}
                height={320}
              />
            </div>
          </div>

          <Card className="p-8 lg:p-10">
            <SectionHeading
              eyebrow="About Us"
              title="Straightforward barbering in Kellyville"
              titleClassName="text-[clamp(2rem,4vw,2.8rem)]"
            />

            <p className="mt-4 text-base leading-7 text-slate-600">
              We offer men&apos;s haircuts, colouring, beard trims, and grooming
              services for everyday wear.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Our barbers focus on clean cuts, tidy finishes, and consistent
              results.
            </p>

            <div className="mt-7">
              <Link
                href="/contact"
                className={buttonVariants({ variant: "accent", size: "lg" })}
              >
                Get in Touch
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
