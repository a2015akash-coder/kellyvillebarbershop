import type { ContentBlock } from "@/lib/blog-data";
import { SITE_URL } from "@/lib/seo";

/** All domains that should be treated as internal for link SEO. */
const INTERNAL_DOMAINS = [
  SITE_URL,                                  // https://thegroomingroom.com.au
  "https://kellyvillebarber.com.au",
  "https://www.kellyvillebarber.com.au",
  "https://www.thegroomingroom.com.au",
];

/**
 * Process richtext HTML to enforce proper rel/target attributes on all links:
 * - Internal links (own domains, relative, hash): rel="follow"
 * - External links: rel="nofollow noopener noreferrer" target="_blank"
 *
 * Strips any existing rel/target attributes first to avoid duplicates.
 */
function processLinks(html: string): string {
  return html.replace(/<a\s[^>]*>/gi, (tag) => {
    const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
    if (!hrefMatch) return tag;

    const href = hrefMatch[1];

    // Strip existing rel and target attributes
    const cleaned = tag
      .replace(/\s*rel=["'][^"']*["']/gi, "")
      .replace(/\s*target=["'][^"']*["']/gi, "");

    const isInternal =
      href.startsWith("/") ||
      href.startsWith("#") ||
      INTERNAL_DOMAINS.some((d) => href.startsWith(d));

    if (isInternal) {
      return cleaned.replace(/>$/, ' rel="follow">');
    }

    return cleaned.replace(
      />$/,
      ' rel="nofollow noopener noreferrer" target="_blank">',
    );
  });
}

export default function BlogContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <article className="prose prose-gray mt-8 max-w-none prose-h2:mb-4 prose-h2:mt-12 prose-h2:font-semibold prose-h2:text-[#ff7a00] prose-a:font-medium prose-a:text-blue-600 prose-a:no-underline prose-a:transition-colors hover:prose-a:underline">
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          return <h2 key={i}>{block.text}</h2>;
        }

        if (block.type === "richtext" && block.html) {
          return (
            <div
              key={i}
              dangerouslySetInnerHTML={{ __html: processLinks(block.html) }}
            />
          );
        }

        if (block.type === "image" && block.src) {
          return (
            <figure key={i}>
              <img
                src={block.src}
                alt={block.alt || ""}
                loading="lazy"
                className="rounded-xl"
              />
            </figure>
          );
        }

        return null;
      })}
    </article>
  );
}
