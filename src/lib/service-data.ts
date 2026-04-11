import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export interface ServiceHero {
  title?: string;
  subtitle?: string;
  description?: string;
  image: string;
  imageAlt: string;
}

export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface ServiceSeo {
  metaTitle: string;
  metaDescription: string;
}

export interface Service {
  title: string;
  slug: string;
  isActive: boolean;
  hero: ServiceHero;
  includes: string[];
  suitableFor: string[];
  process: ServiceProcessStep[];
  highlights?: string[];
  seo: ServiceSeo;
  duration?: string;
  isRecommended?: boolean;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function toTrimmedString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => toTrimmedString(item))
    .filter((item): item is string => Boolean(item));
}

function parseHighlights(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const parsed = value
    .map((item) => {
      if (typeof item === "string") return item.trim();

      const record = asRecord(item);
      if (!record) return "";

      const title = toTrimmedString(record.title);
      const text = toTrimmedString(record.text);

      if (title && text) return `${title}: ${text}`;
      return title || text || "";
    })
    .filter((item) => item.length > 0);

  return parsed.length > 0 ? parsed : undefined;
}

function parseProcess(value: unknown): ServiceProcessStep[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item, index) => {
      const record = asRecord(item);
      if (!record) return null;

      const title =
        toTrimmedString(record.title) ||
        `Step ${String(index + 1).padStart(2, "0")}`;
      const description = toTrimmedString(record.description) || "";

      if (!title && !description) return null;

      return { title, description };
    })
    .filter((item): item is ServiceProcessStep => Boolean(item));
}

function toTimestamp(value: unknown): Timestamp | null {
  return value instanceof Timestamp ? value : null;
}

function parseHero(data: Record<string, unknown>): ServiceHero {
  const hero = asRecord(data.hero);
  const title = toTrimmedString(hero?.title);
  const subtitle = toTrimmedString(hero?.subtitle);
  const description =
    toTrimmedString(hero?.description) || toTrimmedString(data.excerpt);
  const image =
    toTrimmedString(hero?.image) || toTrimmedString(data.coverImage) || "";
  const imageAlt =
    toTrimmedString(hero?.imageAlt) ||
    toTrimmedString(data.coverImageAlt) ||
    toTrimmedString(data.title) ||
    "Barber service at The Grooming Room";

  return {
    title,
    subtitle,
    description,
    image,
    imageAlt,
  };
}

function parseSeo(
  data: Record<string, unknown>,
  fallbackDescription?: string,
): ServiceSeo {
  const seo = asRecord(data.seo);

  return {
    metaTitle:
      toTrimmedString(seo?.metaTitle) ||
      toTrimmedString(data.metaTitle) ||
      toTrimmedString(data.title) ||
      "Service",
    metaDescription:
      toTrimmedString(seo?.metaDescription) ||
      toTrimmedString(data.metaDescription) ||
      fallbackDescription ||
      "Barber service at The Grooming Room in Kellyville.",
  };
}

function docToService(data: Record<string, unknown>): Service {
  const title = toTrimmedString(data.title) || "Service";
  const hero = parseHero({ ...data, title });
  const includes = toStringArray(data.includes);
  const suitableFor = toStringArray(data.suitableFor);
  const process = parseProcess(data.process);
  const highlights = parseHighlights(data.highlights);
  const heroDescription =
    hero.description || hero.subtitle || includes[0] || suitableFor[0];

  return {
    title,
    slug: toTrimmedString(data.slug) || "",
    isActive:
      typeof data.isActive === "boolean"
        ? data.isActive
        : data.status === "published",
    hero,
    includes,
    suitableFor,
    process,
    highlights,
    seo: parseSeo(data, heroDescription),
    duration: toTrimmedString(data.duration),
    isRecommended:
      typeof data.isRecommended === "boolean" ? data.isRecommended : undefined,
    createdAt: toTimestamp(data.createdAt),
    updatedAt: toTimestamp(data.updatedAt),
  };
}

function sortServices(a: Service, b: Service): number {
  if (Boolean(a.isRecommended) !== Boolean(b.isRecommended)) {
    return Number(Boolean(b.isRecommended)) - Number(Boolean(a.isRecommended));
  }

  const aTime = a.updatedAt?.toMillis() ?? a.createdAt?.toMillis() ?? 0;
  const bTime = b.updatedAt?.toMillis() ?? b.createdAt?.toMillis() ?? 0;

  if (aTime !== bTime) {
    return bTime - aTime;
  }

  return a.title.localeCompare(b.title);
}

async function getActiveServicesSnapshot() {
  try {
    const activeSnapshot = await getDocs(
      query(collection(db, "services"), where("isActive", "==", true)),
    );

    if (!activeSnapshot.empty) {
      return activeSnapshot;
    }
  } catch {
    // Fall through to the legacy query while the collection is being migrated.
  }

  return getDocs(
    query(collection(db, "services"), where("status", "==", "published")),
  );
}

export function getServiceDisplayTitle(service: Service): string {
  return service.hero.title || service.title;
}

export function getServiceSummary(service: Service): string {
  return (
    service.hero.description ||
    service.hero.subtitle ||
    service.includes[0] ||
    service.suitableFor[0] ||
    "Tailored barbering service at The Grooming Room in Kellyville."
  );
}

export function getServiceUpdatedAt(service: Service): Timestamp | null {
  return service.updatedAt || service.createdAt;
}

export async function getAllServices(): Promise<Service[]> {
  const snapshot = await getActiveServicesSnapshot();

  return snapshot.docs
    .map((doc) => docToService(doc.data()))
    .filter((service) => service.slug.length > 0)
    .sort(sortServices);
}

export async function getServiceBySlug(
  slug: string,
): Promise<Service | undefined> {
  try {
    const activeSnapshot = await getDocs(
      query(
        collection(db, "services"),
        where("slug", "==", slug),
        where("isActive", "==", true),
      ),
    );

    if (!activeSnapshot.empty) {
      return docToService(activeSnapshot.docs[0].data());
    }
  } catch {
    // Fall through to the legacy query while the collection is being migrated.
  }

  const legacySnapshot = await getDocs(
    query(
      collection(db, "services"),
      where("slug", "==", slug),
      where("status", "==", "published"),
    ),
  );

  if (legacySnapshot.empty) return undefined;

  return docToService(legacySnapshot.docs[0].data());
}
