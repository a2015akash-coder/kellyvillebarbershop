"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface Review {
  authorName: string;
  authorPhoto: string;
  authorUri: string;
  rating: number;
  text: string;
  relativePublishTimeDescription: string;
  publishTime: string;
}

export interface Summary {
  businessName: string;
  rating: number;
  userRatingCount: number;
  googleMapsUri: string;
}

interface ReviewsPayload {
  reviews: Review[];
  summary: Summary;
}

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

async function loadReviews() {
  if (reviewsCache) return reviewsCache;

  reviewsRequest ??= fetch("/api/reviews")
    .then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to load Google reviews");
      }

      const payload: ReviewsPayload = {
        summary: {
          businessName: data.businessName || "",
          rating: Number(data.rating || 0),
          userRatingCount: Number(data.userRatingCount || 0),
          googleMapsUri: data.googleMapsUri || "",
        },
        reviews: Array.isArray(data.reviews)
          ? data.reviews.map(normalizeReview)
          : [],
      };

      reviewsCache = payload;
      return payload;
    })
    .catch((error) => {
      reviewsRequest = null;
      throw error;
    });

  return reviewsRequest;
}

export function ReviewsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ReviewsState>(() => ({
    reviews: reviewsCache?.reviews || [],
    summary: reviewsCache?.summary || EMPTY_SUMMARY,
    loading: !reviewsCache,
    error: "",
  }));

  useEffect(() => {
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
  }, []);

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
