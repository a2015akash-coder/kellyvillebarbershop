"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PHONE_LINK, PHONE_NUMBER } from "@/lib/constants";

const NAV_ITEMS = [
  { label: "Services", href: "/mens-haircuts-beard-trims-kellyville" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Promotions", href: "/promotions" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#fbf9f6]/82 shadow-[0_18px_40px_-34px_rgba(27,28,26,0.45)] backdrop-blur-xl"
          : "bg-white backdrop-blur-md"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only z-50 rounded-lg bg-white px-4 py-2 text-black focus:not-sr-only focus:absolute focus:left-3 focus:top-3"
      >
        Skip to content
      </a>

      <nav className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between gap-4 sm:h-20">
          <Link href="/" className="shrink-0">
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand-accent)]">
              The Grooming Room
            </div>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/blogs"
                  ? pathname.startsWith("/blogs")
                  : pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[0.74rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
                    isActive
                      ? "text-[var(--brand-accent)]"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={PHONE_LINK}
              className="hidden rounded-lg bg-[var(--brand-accent)] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--brand-accent-strong)] md:inline-flex"
            >
              {PHONE_NUMBER}
            </a>

            <button
              onClick={() => setOpen((value) => !value)}
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className="rounded-lg border border-[var(--border)] bg-white/90 p-2 text-[var(--foreground)] md:hidden"
              type="button"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <title>Menu</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {open ? (
          <div
            id="mobile-navigation"
            className="space-y-4 border-t border-[var(--border)] py-5 md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block text-sm font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={PHONE_LINK}
              className="inline-flex rounded-lg bg-[var(--brand-accent)] px-5 py-2.5 text-sm font-semibold text-white"
            >
              {PHONE_NUMBER}
            </a>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
