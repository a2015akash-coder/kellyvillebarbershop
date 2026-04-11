import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { PHONE_NUMBER, PHONE_LINK } from "@/lib/constants";

const LOGO_URL =
  "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_300/v1768612130/IMG_4966_lxnwpl.png";

const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/kellyvillebarber/",
    label: "Instagram",
    Icon: FaInstagram,
  },
  {
    href: "https://www.facebook.com/barbershopkellyville/",
    label: "Facebook",
    Icon: FaFacebookF,
  },
  {
    href: "https://www.youtube.com/@groomingroombarber",
    label: "YouTube",
    Icon: FaYoutube,
  },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/mens-haircuts-beard-trims-kellyville" },
  { label: "Blog", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-gray-300">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        {/* TOP */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* BRAND */}
          <div>
            <Image
              src={LOGO_URL}
              alt="The Grooming Room Barbershop"
              width={176}
              height={44}
              className="h-10 w-auto object-contain"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
              Professional barber services delivering clean cuts, sharp details,
              and consistent results — trusted by local clients.
            </p>

            {/* SOCIAL ICONS */}
            <div className="mt-5 flex items-center gap-4">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-300 transition-colors hover:bg-orange-600 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* NAVIGATION */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
              Navigation
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {NAV_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
              Visit Us
            </h4>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              90 Wrights Rd, Kellyville NSW 2155, Australia
            </p>
            <p className="mt-3 text-sm text-gray-400">Walk-ins welcome</p>
            <a
              href={PHONE_LINK}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-orange-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-orange-700"
            >
              {PHONE_NUMBER}
            </a>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} The Grooming Room. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Designed for clarity. Built for performance.
          </p>
        </div>
      </div>
    </footer>
  );
}