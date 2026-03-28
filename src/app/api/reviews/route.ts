import { NextResponse } from "next/server";

const PLACE_ID = "ChIJu2u0LEyjEmsRHGa2PQTjBRs";
const API_KEY = process.env.GOOGLE_PLACES_API_KEY || "";

const FIELDS = [
  "displayName",
  "rating",
  "userRatingCount",
  "googleMapsUri",
  "reviews",
].join(",");

/**
 * GET /api/reviews
 *
 * Fetches reviews from the Google Places (New) API and returns a
 * normalised payload. The API key is never exposed to the client.
 *
 * Responses are cached for 1 hour via Next.js `fetch` revalidation
 * so we don't hit the API on every page view.
 */
export async function GET() {
  if (!API_KEY) {
    return NextResponse.json(
      { error: "Google Places API key is not configured" },
      { status: 500 },
    );
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=${FIELDS}&key=${API_KEY}`;

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // cache for 1 hour
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Google Places API error:", response.status, errorBody);
      return NextResponse.json(
        { error: "Failed to fetch reviews from Google" },
        { status: 502 },
      );
    }

    const data = await response.json();

    const reviews = Array.isArray(data.reviews)
      ? data.reviews.map(
          (review: {
            authorAttribution?: {
              displayName?: string;
              photoUri?: string;
              uri?: string;
            };
            rating?: number;
            text?: { text?: string };
            relativePublishTimeDescription?: string;
            publishTime?: string;
          }) => ({
            authorName: review.authorAttribution?.displayName || "Google User",
            authorPhoto: review.authorAttribution?.photoUri || "",
            authorUri: review.authorAttribution?.uri || "",
            rating: review.rating || 0,
            text: review.text?.text || "",
            relativePublishTimeDescription:
              review.relativePublishTimeDescription || "",
            publishTime: review.publishTime || "",
          }),
        )
      : [];

    return NextResponse.json({
      businessName: data.displayName?.text || "The Grooming Room Barbershop",
      rating: data.rating || 0,
      userRatingCount: data.userRatingCount || 0,
      googleMapsUri: data.googleMapsUri || "",
      reviews,
    });
  } catch (error) {
    console.error("Reviews API error:", error);
    return NextResponse.json(
      { error: "Failed to load Google reviews" },
      { status: 500 },
    );
  }
}
