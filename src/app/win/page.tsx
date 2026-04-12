import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Enter the Monthly Lucky Draw | The Grooming Room Barbershop Kellyville",
  description:
    "Enter the Monthly Lucky Draw at The Grooming Room Barbershop in Kellyville. Multiple winners every month — fill in the form for your chance to win.",
};

export default function WinPage() {
  return (
    <section className="flex min-h-screen items-start bg-[#ff7a00] pt-6 sm:pt-10 lg:items-center lg:pt-0">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* RIGHT (MOBILE FIRST): FORM */}
          <div className="order-1 w-full lg:order-2">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
              <div className="border-b border-gray-200 px-5 py-4">
                <h3 className="text-base font-semibold text-gray-900">
                  Enter the Monthly Lucky Draw
                </h3>
                <p className="mt-1 text-xs text-gray-600">
                  Secure entry &bull; Powered by Google Forms
                </p>
              </div>

              <div className="relative h-[520px] w-full sm:h-[560px]">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSd1c3H80EL86usVkKmOCxFRyt0Xxw9vcvmfsChgjvbhVZXzyg/viewform?usp=sharing&ouid=109555669226479084952"
                  title="Monthly Lucky Draw Entry"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full border-0"
                  allow="payment"
                />
              </div>
            </div>

            <p className="mt-3 text-center text-xs text-white/80">
              Your details are secure and never shared.
            </p>
          </div>

          {/* LEFT: CONTENT */}
          <div className="order-2 max-w-xl text-white lg:order-1">
            <div className="mb-6 max-w-md">
              <Image
                src="https://res.cloudinary.com/dvtbbuxon/image/upload/v1768606203/WhatsApp_Image_2026-01-17_at_04.59.15_t75n4b.jpg"
                alt="Monthly Lucky Draw Poster"
                width={600}
                height={600}
                sizes="(max-width: 1023px) 100vw, 600px"
                className="h-auto w-full rounded-xl object-contain shadow-lg"
              />
            </div>

            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
              Multiple winners every month
            </span>

            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Monthly Lucky Draw
            </h2>

            <p className="mt-3 max-w-lg text-sm text-white/90 sm:text-base">
              Enter now for your chance to win exclusive grooming rewards and
              free gifts. Takes less than a minute.
            </p>

            <div className="mt-4">
              <Link
                href="/terms-and-conditions"
                className="text-sm text-white/80 underline underline-offset-4 transition hover:text-white"
              >
                Terms &amp; Conditions apply
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
