import type { ContentBlock } from "@/lib/blog-data";
import { SITE_URL } from "@/lib/seo";

/**
 * Process richtext HTML to add proper rel attributes to links:
 * - Internal links (same domain): rel="follow"
 * - External links: rel="nofollow noopener noreferrer" target="_blank"
 */
function processLinks(html: string): string {
  return html.replace(
    /<a\s+([^>]*?)href=["']([^"']+)["']([^>]*?)>/gi,
    (_match, before: string, href: string, after: string) => {
      const isInternal =
        href.startsWith("/") ||
        href.startsWith("#") ||
        href.startsWith(SITE_URL);

      if (isInternal) {
        return `<a ${before}href="${href}"${after} rel="follow">`;
      }

      return `<a ${before}href="${href}"${after} rel="nofollow noopener noreferrer" target="_blank">`;
    },
  );
}

export default function BlogContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <article className="prose prose-gray mt-8 max-w-none prose-h2:mb-4 prose-h2:mt-12 prose-h2:font-semibold prose-h2:text-[#F4511E] prose-a:font-medium prose-a:text-blue-600 prose-a:no-underline prose-a:transition-colors hover:prose-a:underline">
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
