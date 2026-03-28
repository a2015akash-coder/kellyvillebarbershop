import type { Metadata } from "next";
import ContactInfo from "@/components/sections/contact/contact-info";
import ContactMap from "@/components/sections/contact/contact-map";

export const metadata: Metadata = {
  title: "Contact Us | The Grooming Room Barbershop Kellyville",
  description:
    "Get in touch with The Grooming Room Barbershop in Kellyville. Walk-ins welcome at 90 Wrights Rd, Kellyville NSW 2155. Call us or send a message.",
};

export default function ContactPage() {
  return (
    <>
      <ContactInfo />
      <ContactMap />
    </>
  );
}
