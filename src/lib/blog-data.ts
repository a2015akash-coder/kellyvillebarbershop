import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";

export interface ContentBlock {
  type: "heading" | "richtext" | "image";
  text?: string;
  html?: string;
  src?: string;
  alt?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  publishedAt: string;
  metaTitle?: string;
  metaDescription?: string;
  content: ContentBlock[];
}

/**
 * Convert a Firestore timestamp (or seconds-based object) to an ISO date string.
 */
function toDateString(value: unknown): string {
  if (!value) return "";

  if (typeof value === "string") return value;

  // Firestore Timestamp with toDate()
  if (typeof (value as { toDate?: () => Date }).toDate === "function") {
    return (value as { toDate: () => Date }).toDate().toISOString();
  }

  // Plain object with seconds (serialised Firestore Timestamp)
  if (typeof (value as { seconds?: number }).seconds === "number") {
    return new Date(
      (value as { seconds: number }).seconds * 1000,
    ).toISOString();
  }

  return "";
}

/**
 * Map a Firestore document to our BlogPost shape.
 */
function docToPost(data: Record<string, unknown>): BlogPost {
  return {
    slug: (data.slug as string) || "",
    title: (data.title as string) || "",
    excerpt: (data.excerpt as string) || "",
    category: (data.category as string) || "",
    coverImage: (data.coverImage as string) || "",
    publishedAt: toDateString(data.publishedAt),
    metaTitle: (data.metaTitle as string) || undefined,
    metaDescription: (data.metaDescription as string) || undefined,
    content: Array.isArray(data.content)
      ? (data.content as ContentBlock[])
      : [],
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const blogsQuery = query(
    collection(db, "blogs"),
    where("status", "==", "published"),
    orderBy("publishedAt", "desc"),
  );

  const snapshot = await getDocs(blogsQuery);

  return snapshot.docs.map((doc) => docToPost(doc.data()));
}

export async function getPostBySlug(
  slug: string,
): Promise<BlogPost | undefined> {
  const blogsQuery = query(
    collection(db, "blogs"),
    where("slug", "==", slug),
    where("status", "==", "published"),
  );

  const snapshot = await getDocs(blogsQuery);

  if (snapshot.empty) return undefined;

  return docToPost(snapshot.docs[0].data());
}

export async function getRecentPosts(count = 3): Promise<BlogPost[]> {
  const blogsQuery = query(
    collection(db, "blogs"),
    where("status", "==", "published"),
    orderBy("publishedAt", "desc"),
    limit(count),
  );

  const snapshot = await getDocs(blogsQuery);
  return snapshot.docs.map((doc) => docToPost(doc.data()));
}

export async function getCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const cats = new Set(posts.map((p) => p.category).filter(Boolean));
  return Array.from(cats).sort();
}
