"use client";

import Image from "next/image";
import Link, { useLinkStatus } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PHONE_LINK, PHONE_NUMBER } from "@/lib/constants";
import { cn } from "@/lib/utils";

const LOGO_URL =
  "https://res.cloudinary.com/dvtbbuxon/image/upload/f_auto,q_auto,w_300/v1768612130/IMG_4966_lxnwpl.png";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/Services" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
  { label: "Promotions", href: "/monthly-draw-kellyville-barber" },
];

function DesktopPendingHint() {
  const { pending } = useLinkStatus();

  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 -bottom-2 h-[2px] overflow-hidden rounded-full opacity-0 transition-opacity duration-150",
        pending && "opacity-100",
      )}
    >
      <span className={cn("nav-link-pending", pending && "is-pending")} />
    </span>
  );
}

function MobilePendingHint() {
  const { pending } = useLinkStatus();

  return (
    <span
      aria-hidden
      className={cn("nav-link-dot shrink-0", pending && "is-pending")}
    />
  );
}

function NavLinkItem({
  href,
  label,
  isActive,
  mobile = false,
  onNavigate,
}: {
  href: string;
  label: string;
  isActive: boolean;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const router = useRouter();

  const warmRoute = () => {
    void router.prefetch(href);
  };

  if (mobile) {
    return (
      <Link
        href={href}
        onClick={onNavigate}
        onMouseEnter={warmRoute}
        onFocus={warmRoute}
        onTouchStart={warmRoute}
        className={cn(
          "flex items-center justify-between gap-3 transition hover:text-white",
          isActive ? "text-white" : "text-gray-200",
        )}
        aria-current={isActive ? "page" : undefined}
      >
        <span>{label}</span>
        <MobilePendingHint />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onMouseEnter={warmRoute}
      onFocus={warmRoute}
      onTouchStart={warmRoute}
      className={cn(
        "relative transition-colors hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300",
        isActive
          ? "text-white after:w-full"
          : "text-gray-200 after:w-0 hover:after:w-full",
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
      <DesktopPendingHint />
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const warmRoutes = () => {
      NAV_ITEMS.filter((item) => item.href !== pathname).forEach((item) => {
        void router.prefetch(item.href);
      });
    };

    const requestIdle = window.requestIdleCallback;

    if (requestIdle) {
      const idleId = requestIdle(() => warmRoutes());
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(warmRoutes, 250);
    return () => window.clearTimeout(timeoutId);
  }, [pathname, router]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/90 backdrop-blur-md"
          : "bg-black"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-white px-4 py-2 text-black focus:not-sr-only focus:absolute focus:left-3 focus:top-3"
      >
        Skip to content
      </a>

      <nav className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-23 w-full items-center">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src={LOGO_URL}
              alt="The Grooming Room Barbershop"
              width={176}
              height={44}
              priority
              className="h-20 w-auto object-contain md:h-24"
            />
          </Link>

          {/* Desktop navigation */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 md:flex">
            <ul className="flex items-center gap-12 text-[15px] font-medium text-gray-200">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.label}>
                    <NavLinkItem
                      href={item.href}
                      label={item.label}
                      isActive={isActive}
                    />
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right side actions */}
          <div className="ml-auto flex items-center gap-4">
            {/* Desktop CTA */}
            <a
              href={PHONE_LINK}
              className="hidden items-center justify-center rounded-full bg-[#FF7A00] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#FF6A00] md:inline-flex"
            >
              {PHONE_NUMBER}
            </a>

            {/* Mobile CTA */}
            <a
              href={PHONE_LINK}
              className="rounded-full bg-[#FF7A00] px-5 py-2.5 text-sm font-semibold text-white md:hidden"
            >
              {PHONE_NUMBER}
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              className="rounded-lg p-2.5 text-gray-200 transition hover:bg-white/10 md:hidden"
              type="button"
            >
              <svg
                className="h-6 w-6"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
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

        {/* Mobile menu */}
        {open ? (
          <div
            id="mobile-navigation"
            className="border-t border-white/10 py-6 md:hidden"
          >
            <ul className="flex flex-col gap-5 text-[15px] font-medium text-gray-200">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.label}>
                    <NavLinkItem
                      href={item.href}
                      label={item.label}
                      isActive={isActive}
                      mobile
                      onNavigate={() => setOpen(false)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
