"use client";

import { ExternalLink, Star } from "lucide-react";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { type Review, useReviews } from "./reviews-context";

const FALLBACKS = [
  {
    authorName: "Local Client",
    text: "Clean fades and a professional finish every visit.",
    rating: 5,
  },
  {
    authorName: "Regular Client",
    text: "Friendly service, no fuss, and a consistently tidy result.",
    rating: 5,
  },
];
const STAR_KEYS = [
  "review-star-1",
  "review-star-2",
  "review-star-3",
  "review-star-4",
  "review-star-5",
];

function renderReview(
  review: Review | (typeof FALLBACKS)[number],
  index: number,
) {
  const rating = Math.max(0, Math.min(5, Math.round(review.rating)));
  const initials =
    review.authorName
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "GC";

  return (
    <Card
      key={`${review.authorName}-${review.text}-${index}`}
      className={`w-full rounded-[2rem] border-[rgba(136,115,105,0.12)] bg-white p-8 shadow-[0_24px_70px_-46px_rgba(27,28,26,0.55)] ${
        index % 2 === 1 ? "md:translate-y-8" : ""
      }`}
    >
      <div className="flex gap-1 text-[var(--brand-accent)]">
        {STAR_KEYS.map((key, i) => (
          <Star
            key={`${review.authorName}-${key}`}
            size={16}
            className={i < rating ? "fill-current" : ""}
          />
        ))}
      </div>

      <p className="mt-6 text-lg italic leading-8 text-[var(--foreground)]">
        &ldquo;{review.text}&rdquo;
      </p>

      <div className="mt-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(148,69,23,0.12)] font-semibold text-[var(--brand-accent)]">
          {initials}
        </div>
        <div>
          <div className="font-semibold text-[var(--foreground)]">
            {review.authorName}
          </div>
          <div className="text-xs uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
            Google review
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function Testimonials() {
  const { loading, reviews, summary } = useReviews();
  const displayReviews =
    reviews.filter((review) => review.text.trim()).slice(0, 2).length > 0
      ? reviews.filter((review) => review.text.trim()).slice(0, 2)
      : FALLBACKS;

  return (
    <section
      className="overflow-hidden bg-[#f5f3f0] py-24 sm:py-32"
      id="reviews"
    >
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-accent)]">
            Google Reviews
          </div>
          <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.03em] text-[var(--foreground)] sm:text-5xl">
            What Kellyville Says
          </h2>

          {!loading && summary.googleMapsUri ? (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-[var(--muted-foreground)]">
              <div>{summary.rating.toFixed(1)} rating</div>
              <div>{summary.userRatingCount} Google reviews</div>
              <a
                href={summary.googleMapsUri}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({
                  variant: "secondary",
                  size: "sm",
                  className: "px-4 normal-case tracking-normal",
                })}
              >
                View on Google <ExternalLink size={14} />
              </a>
            </div>
          ) : null}
        </div>

        <div className="-mx-4 mt-16 overflow-x-auto px-4 md:mx-0 md:overflow-visible md:px-0">
          <div className="grid auto-cols-[minmax(20rem,1fr)] grid-flow-col gap-5 md:grid-flow-row md:grid-cols-2 md:gap-8">
            {displayReviews.map((review, index) => renderReview(review, index))}
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <div className="rounded-full bg-white px-5 py-3 shadow-sm">
            <Image
              src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
              alt="Google"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
