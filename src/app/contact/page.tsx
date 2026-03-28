import type { Metadata } from "next";
import ContactInfo from "@/components/sections/contact/contact-info";
import ContactMap from "@/components/sections/contact/contact-map";

export const metadata: Metadata = {
  title: "Contact The Grooming Room Barbershop | Kellyville",
  description:
    "Contact The Grooming Room Barbershop in Kellyville. Call, get directions, or visit us for professional men's haircuts, fades, and beard trims. Walk-ins welcome.",
  alternates: {
    canonical: "https://thegroomingroom.com.au/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactInfo />
      <ContactMap />
    </>
  );
}
