const QUOTE_IMAGE_URL =
  "https://res.cloudinary.com/dvtbbuxon/image/upload/v1767705592/back-view-barber-trimming-hair_23-2148298297_ldas6f.jpg";

export default function QuoteCard() {
  return (
    <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage: `url('${QUOTE_IMAGE_URL}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.25) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-screen-xl px-4 py-8 sm:py-8">
        <blockquote className="max-w-3xl text-white">
          <p className="text-2xl font-semibold leading-tight sm:text-3xl">
            &ldquo;Invest in your hair. It&apos;s the crown you never take
            off.&rdquo;
          </p>
          <footer className="mt-6 text-sm font-medium text-white/80">
            — Grooming Room Barber
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
