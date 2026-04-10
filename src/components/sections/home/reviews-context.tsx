"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  GoogleReview,
  GoogleReviewsPayload,
  GoogleReviewsSummary,
} from "@/lib/google-reviews";

export type Review = GoogleReview;
export type Summary = GoogleReviewsSummary;
export type ReviewsPayload = GoogleReviewsPayload;

interface ReviewsState extends ReviewsPayload {
  loading: boolean;
  error: string;
}

const EMPTY_SUMMARY: Summary = {
  businessName: "",
  rating: 0,
  userRatingCount: 0,
  googleMapsUri: "",
};

let reviewsCache: ReviewsPayload | null = null;
let reviewsRequest: Promise<ReviewsPayload> | null = null;

const ReviewsContext = createContext<ReviewsState | undefined>(undefined);

function normalizeReview(review: Partial<Review>): Review {
  return {
    authorName: review.authorName || "Google User",
    authorPhoto: review.authorPhoto || "",
    authorUri: review.authorUri || "",
    rating: Number(review.rating || 0),
    text: review.text || "",
    relativePublishTimeDescription: review.relativePublishTimeDescription || "",
    publishTime: review.publishTime || "",
  };
}

function normalizePayload(data: Partial<ReviewsPayload> & Partial<Summary>) {
  const summary = data.summary || data;

  return {
    summary: {
      businessName: summary.businessName || "",
      rating: Number(summary.rating || 0),
      userRatingCount: Number(summary.userRatingCount || 0),
      googleMapsUri: summary.googleMapsUri || "",
    },
    reviews: Array.isArray(data.reviews)
      ? data.reviews.map(normalizeReview)
      : [],
  };
}

async function loadReviews() {
  if (reviewsCache) return reviewsCache;

  reviewsRequest ??= fetch("/api/reviews")
    .then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to load Google reviews");
      }

      const payload = normalizePayload(data);

      reviewsCache = payload;
      return payload;
    })
    .catch((error) => {
      reviewsRequest = null;
      throw error;
    });

  return reviewsRequest;
}

export function ReviewsProvider({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData?: ReviewsPayload | null;
}) {
  const hasServerData = initialData !== undefined;
  const initialPayload = initialData || reviewsCache;

  const [state, setState] = useState<ReviewsState>(() => ({
    reviews: initialPayload?.reviews || [],
    summary: initialPayload?.summary || EMPTY_SUMMARY,
    loading: !initialPayload && !hasServerData,
    error: "",
  }));

  useEffect(() => {
    if (hasServerData) {
      if (initialData) {
        reviewsCache = initialData;
      }

      return;
    }

    let ignore = false;

    loadReviews()
      .then((payload) => {
        if (!ignore) {
          setState({ ...payload, loading: false, error: "" });
        }
      })
      .catch((error) => {
        if (!ignore) {
          setState((current) => ({
            ...current,
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to load Google reviews",
          }));
        }
      });

    return () => {
      ignore = true;
    };
  }, [hasServerData, initialData]);

  const value = useMemo(() => state, [state]);

  return (
    <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewsContext);

  if (!context) {
    throw new Error("useReviews must be used within ReviewsProvider");
  }

  return context;
}
