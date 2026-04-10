import { NextResponse } from "next/server";
import {
  GOOGLE_REVIEWS_REVALIDATE_SECONDS,
  GOOGLE_REVIEWS_STALE_SECONDS,
  getGoogleReviews,
} from "@/lib/google-reviews";

const CACHE_CONTROL = [
  "public",
  `s-maxage=${GOOGLE_REVIEWS_REVALIDATE_SECONDS}`,
  `stale-while-revalidate=${GOOGLE_REVIEWS_STALE_SECONDS}`,
].join(", ");

/**
 * GET /api/reviews
 *
 * Returns cached Google review data without exposing the Places API key.
 * The homepage reads this data on the server, so this route is only a
 * fallback JSON endpoint rather than part of the normal initial page load.
 */
export async function GET() {
  try {
    const payload = await getGoogleReviews();

    return NextResponse.json(
      {
        ...payload.summary,
        reviews: payload.reviews,
        summary: payload.summary,
      },
      {
        headers: {
          "Cache-Control": CACHE_CONTROL,
          "CDN-Cache-Control": CACHE_CONTROL,
          "Vercel-CDN-Cache-Control": CACHE_CONTROL,
        },
      },
    );
  } catch (error) {
    console.error("Reviews API error:", error);

    return NextResponse.json(
      { error: "Failed to load Google reviews" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
}
