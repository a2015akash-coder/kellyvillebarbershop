import Link from "next/link";
import { PHONE_LINK, PHONE_NUMBER } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Services", href: "/mens-haircuts-beard-trims-kellyville" },
  { label: "Blog", href: "/blogs" },
  { label: "Contact", href: "/contact" },
  { label: "Promotions", href: "/monthly-draw-kellyville-barber" },
];

export default function Footer() {
  return (
    <footer className="bg-white text-[var(--foreground)]">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand-accent)]">
              The Grooming Room
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[var(--muted-foreground)]">
              Elevated barbering for Kellyville with thoughtful service, clean
              finishing, and a relaxed local atmosphere.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
              Explore
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-[var(--brand-accent)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
              Visit
            </h4>
            <div className="mt-5 space-y-3 text-sm text-[var(--muted-foreground)]">
              <p>90 Wrights Rd, Kellyville NSW 2155, Australia</p>
              <p>Walk-ins welcome during regular trading hours.</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
              Contact
            </h4>
            <a
              href={PHONE_LINK}
              className="mt-5 inline-flex rounded-lg bg-[var(--brand-accent)] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--brand-accent-strong)]"
            >
              {PHONE_NUMBER}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[rgba(136,115,105,0.18)] pt-6 text-xs text-[var(--muted-foreground)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} The Grooming Room. All rights reserved.
          </p>
          <p>Kellyville, NSW</p>
        </div>
      </div>
    </footer>
  );
}
