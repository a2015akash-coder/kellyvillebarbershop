import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export interface ServiceHighlight {
  title: string;
  text: string;
}

export interface Service {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt: string;
  price?: string;
  duration?: string;
  order: number;
  metaTitle?: string;
  metaDescription?: string;
  highlights: ServiceHighlight[];
}

function toNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

function parseHighlights(data: unknown): ServiceHighlight[] {
  if (!Array.isArray(data)) return [];
  return data
    .filter(
      (h) =>
        h &&
        typeof h === "object" &&
        typeof (h as Record<string, unknown>).title === "string",
    )
    .map((h) => ({
      title: ((h as Record<string, string>).title || "").trim(),
      text: ((h as Record<string, string>).text || "").trim(),
    }))
    .filter((h) => h.title.length > 0);
}

function docToService(data: Record<string, unknown>): Service {
  return {
    slug: (data.slug as string) || "",
    title: (data.title as string) || "",
    excerpt: (data.excerpt as string) || "",
    coverImage: (data.coverImage as string) || "",
    coverImageAlt:
      (data.coverImageAlt as string) || (data.title as string) || "",
    price: (data.price as string) || undefined,
    duration: (data.duration as string) || undefined,
    order: toNumber(data.order),
    metaTitle: (data.metaTitle as string) || undefined,
    metaDescription: (data.metaDescription as string) || undefined,
    highlights: parseHighlights(data.highlights),
  };
}

export async function getAllServices(): Promise<Service[]> {
  const q = query(
    collection(db, "services"),
    where("status", "==", "published"),
  );

  const snapshot = await getDocs(q);
  return snapshot.docs
    .map((doc) => docToService(doc.data()))
    .sort((a, b) => a.order - b.order);
}

export async function getServiceBySlug(
  slug: string,
): Promise<Service | undefined> {
  const q = query(
    collection(db, "services"),
    where("slug", "==", slug),
    where("status", "==", "published"),
  );

  const snapshot = await getDocs(q);
  if (snapshot.empty) return undefined;

  return docToService(snapshot.docs[0].data());
}
