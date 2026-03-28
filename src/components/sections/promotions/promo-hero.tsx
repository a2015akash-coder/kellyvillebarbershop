export default function PromoHero() {
  return (
    <section className="bg-white py-6 lg:py-8">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT – CONTENT */}
          <div className="flex">
            <div className="flex w-full flex-col gap-6 rounded-3xl bg-white/70 p-7 backdrop-blur-sm lg:p-8">
              <span className="inline-flex w-fit items-center rounded-full bg-orange-100 px-4 py-1.5 text-sm font-medium text-orange-700">
                Monthly Lucky Draw – The Grooming Room Barbershop
              </span>

              <h1 className="max-w-lg text-[1.75rem] font-semibold leading-tight tracking-tight text-slate-900 sm:text-3xl">
                Get a chance to win when you get a{" "}
                <span className="text-[#FF7A00]">
                  Haircut, Beard trim or Colouring in Kellyville
                </span>
              </h1>

              <div className="flex flex-col gap-3 text-[0.95rem] leading-relaxed text-slate-600">
                <p>
                  Looking for a{" "}
                  <span className="font-semibold">
                    men&apos;s haircut and beard trim near you
                  </span>{" "}
                  and a chance to win cash prizes?
                </p>
                <p>
                  At{" "}
                  <span className="font-semibold">
                    The Grooming Room Barbershop
                  </span>
                  , every visit gives you more than a fresh look — it gives you a
                  chance to win in our{" "}
                  <span className="font-semibold">Monthly Legends Draw</span>.
                </p>
                <p>
                  Whether you&apos;re booking{" "}
                  <span className="font-semibold">
                    professional fades, a haircut, colouring and beard trim
                  </span>
                  , or a full grooming session, every eligible service puts you
                  into the draw automatically.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT – IMAGE CARD */}
          <div className="flex">
            <div className="relative flex w-full items-center justify-center rounded-3xl bg-gradient-to-br from-orange-100/60 via-orange-50/40 to-transparent p-5 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
              <div className="absolute inset-0 rounded-3xl ring-1 ring-orange-200/40" />
              <div className="relative w-full max-w-[420px]">
                <img
                  src="https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_800,c_fit/v1770232473/36b6e3fb-19a1-44aa-9197-8bb4c3805bd9.png"
                  srcSet="
                    https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_400,c_fit/v1770232473/36b6e3fb-19a1-44aa-9197-8bb4c3805bd9.png 400w,
                    https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_600,c_fit/v1770232473/36b6e3fb-19a1-44aa-9197-8bb4c3805bd9.png 600w,
                    https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_800,c_fit/v1770232473/36b6e3fb-19a1-44aa-9197-8bb4c3805bd9.png 800w
                  "
                  sizes="(max-width: 768px) 90vw, 420px"
                  alt="Monthly Lucky Draw flyer from The Grooming Room Barbershop in Kellyville featuring a $1,000 giveaway."
                  title="$1,000 Monthly Lucky Draw at The Grooming Room Barbershop Kellyville"
                  className="h-auto w-full rounded-2xl object-contain shadow-xl"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
