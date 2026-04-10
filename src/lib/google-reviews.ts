import { unstable_cache } from "next/cache";

const PLACE_ID = "ChIJQxmF18ihEmsRwMGUKXmW_no";
const API_KEY = process.env.GOOGLE_PLACES_API_KEY || "";

const FIELDS = [
  "displayName",
  "rating",
  "userRatingCount",
  "googleMapsUri",
  "reviews",
].join(",");

const GOOGLE_REVIEWS_TIMEOUT_MS = 5000;

export const GOOGLE_REVIEWS_REVALIDATE_SECONDS = 60 * 60 * 6;
export const GOOGLE_REVIEWS_STALE_SECONDS = 60 * 60 * 24;

export interface GoogleReview {
  authorName: string;
  authorPhoto: string;
  authorUri: string;
  rating: number;
  text: string;
  relativePublishTimeDescription: string;
  publishTime: string;
}

export interface GoogleReviewsSummary {
  businessName: string;
  rating: number;
  userRatingCount: number;
  googleMapsUri: string;
}

export interface GoogleReviewsPayload {
  reviews: GoogleReview[];
  summary: GoogleReviewsSummary;
}

interface GooglePlaceReview {
  authorAttribution?: {
    displayName?: string;
    photoUri?: string;
    uri?: string;
  };
  rating?: number;
  text?: { text?: string };
  relativePublishTimeDescription?: string;
  publishTime?: string;
}

interface GooglePlaceResponse {
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: GooglePlaceReview[];
}

function normalizeReview(review: GooglePlaceReview): GoogleReview {
  return {
    authorName: review.authorAttribution?.displayName || "Google User",
    authorPhoto: review.authorAttribution?.photoUri || "",
    authorUri: review.authorAttribution?.uri || "",
    rating: Number(review.rating || 0),
    text: review.text?.text || "",
    relativePublishTimeDescription: review.relativePublishTimeDescription || "",
    publishTime: review.publishTime || "",
  };
}

async function fetchGoogleReviews(): Promise<GoogleReviewsPayload> {
  if (!API_KEY) {
    throw new Error("Google Places API key is not configured");
  }

  const url = `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=${FIELDS}&key=${API_KEY}`;

  const response = await fetch(url, {
    cache: "no-store",
    signal: AbortSignal.timeout(GOOGLE_REVIEWS_TIMEOUT_MS),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Google Places API error:", response.status, errorBody);
    throw new Error("Failed to fetch reviews from Google");
  }

  const data = (await response.json()) as GooglePlaceResponse;

  return {
    summary: {
      businessName: data.displayName?.text || "The Grooming Room Barbershop",
      rating: Number(data.rating || 0),
      userRatingCount: Number(data.userRatingCount || 0),
      googleMapsUri: data.googleMapsUri || "",
    },
    reviews: Array.isArray(data.reviews)
      ? data.reviews.map(normalizeReview)
      : [],
  };
}

export const getGoogleReviews = unstable_cache(
  fetchGoogleReviews,
  ["google-reviews", PLACE_ID, FIELDS],
  {
    revalidate: GOOGLE_REVIEWS_REVALIDATE_SECONDS,
    tags: ["google-reviews"],
  },
);
