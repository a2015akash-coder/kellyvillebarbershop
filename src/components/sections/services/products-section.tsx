import Image from "next/image";

const PRODUCTS = [
  {
    title: "Deluxe Grooming Set",
    desc: "Wash, shave, and style products for regular grooming use.",
    img: "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto:good,e_sharpen:60,dpr_auto,w_600/v1767540191/rs_w_720_h_541_cg_true_oystvt.webp",
    alt: "American Crew grooming cream and styling products displayed on shelf",
    imgTitle: "Deluxe Grooming Set – American Crew Products",
  },
  {
    title: "Hair Styling Products",
    desc: "Hair styling wax, including Layrite Wax, for everyday hold and finish.",
    img: "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto:good,e_sharpen:60,dpr_auto,w_600/v1767540187/rs_w_720_h_541_cg_true_1_wdvier.webp",
    alt: "Layrite Deluxe cement clay hair styling product held in hand",
    imgTitle: "Layrite Hair Styling Products",
  },
  {
    title: "Hair & Body Products",
    desc: "Shampoos, conditioners, wax, and general grooming products.",
    img: "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto:good,e_sharpen:60,dpr_auto,w_600/v1767540183/rs_w_720_h_541_cg_true_m_doi2xa.webp",
    alt: "American Crew shampoo and body care products displayed in store",
    imgTitle: "Hair and Body Grooming Products",
  },
];

export default function ProductsSection() {
  return (
    <section className="bg-gray-50 section-spacing">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
            Products Available In-Store
          </h2>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            The following products are available at The Grooming Room Barber
            Shop.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <div
              key={product.title}
              className="overflow-hidden rounded-xl border border-gray-200"
            >
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image
                  src={product.img}
                  alt={product.alt}
                  title={product.imgTitle}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {product.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {product.desc}
                </p>
                <p className="mt-4 text-sm font-medium text-orange-600">
                  Available in store
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
