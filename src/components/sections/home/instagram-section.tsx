import Image from "next/image";

const POSTS = [
  {
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_600/v1767623830/IMG_5409_ekbe6v.jpg",
    alt: "Men's fade haircut at The Grooming Room Barbershop",
    title: "Men's fade haircut - Kellyville barber",
  },
  {
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_600/v1767727364/Screenshot_2026-01-07_005210_pv3px4.png",
    alt: "Kids haircut with design at The Grooming Room Barbershop",
    title: "Kids haircut with design - Kellyville barber",
  },
  {
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_600/v1767623811/d75d709523594830b53c9e370e44421a_bqfp1k.png",
    alt: "Classic men's haircut at The Grooming Room Barbershop",
    title: "Classic men's haircut - Kellyville barber",
  },
  {
    image:
      "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_600/v1767623965/IMG_2628_wzzrmi.jpg",
    alt: "The Grooming Room Barbershop entrance and interior",
    title: "The Grooming Room entrance - Kellyville barber",
  },
];

export default function InstagramSection() {
  return (
    <section className="bg-[var(--background)] py-24 sm:py-32" id="gallery">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-center justify-between gap-6">
          <h2 className="text-4xl font-extrabold tracking-[-0.03em] text-[var(--foreground)] sm:text-5xl">
            The Gallery
          </h2>
          <a
            href="https://www.instagram.com/kellyvillebarber/"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand-accent)]"
          >
            Follow @kellyvillebarber
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {POSTS.map((post) => (
            <div
              key={post.title}
              className="overflow-hidden rounded-[1.8rem] bg-[#ece8e3]"
            >
              <Image
                src={post.image}
                alt={post.alt}
                title={post.title}
                width={600}
                height={600}
                className="aspect-square w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
