/** Shared SEO constants used across metadata and JSON-LD. */

export const SITE_URL = "https://thegroomingroom.com.au";
export const SITE_NAME = "The Grooming Room Barbershop";
export const DEFAULT_OG_IMAGE =
  "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_1200/v1767704060/interro_veoi1z.webp";

export const BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BarberShop",
  name: SITE_NAME,
  image: DEFAULT_OG_IMAGE,
  url: SITE_URL,
  telephone: "+61288832944",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "90 Wrights Road",
    addressLocality: "Kellyville",
    addressRegion: "NSW",
    postalCode: "2155",
    addressCountry: "AU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -33.7184,
    longitude: 150.9554,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Friday"],
      opens: "09:00",
      closes: "17:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Thursday",
      opens: "09:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "09:00",
      closes: "16:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.4",
    reviewCount: "200",
  },
  sameAs: [
    "https://www.instagram.com/kellyvillebarber/",
    "https://www.facebook.com/barbershopkellyville/",
    "https://www.youtube.com/@groomingroombarber",
  ],
};
