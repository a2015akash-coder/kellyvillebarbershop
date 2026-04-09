import Link from "next/link";
import { getRecentPosts } from "@/lib/blog-data";

function optimizeImage(url: string) {
  if (!url || !url.includes("cloudinary")) return url;
  return url.replace("/upload/", "/upload/f_auto,q_auto,w_900/");
}

export default async function BlogPreview() {
  let blogs: Awaited<ReturnType<typeof getRecentPosts>> = [];

  try {
    blogs = await getRecentPosts(3);
  } catch {
    blogs = [];
  }

  return (
    <section className="bg-[var(--background)] py-24 sm:py-32" id="journal">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-accent)]">
            The Journal
          </div>
          <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.03em] text-[var(--foreground)] sm:text-5xl">
            Grooming Wisdom
          </h2>
        </div>

        {blogs.length === 0 ? (
          <div className="text-sm leading-7 text-[var(--muted-foreground)]">
            Fresh updates and practical insights are coming soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
            {blogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blogs/${blog.slug}`}
                className="group"
              >
                <div className="aspect-video overflow-hidden rounded-[2rem] bg-[#ece8e3]">
                  {blog.coverImage ? (
                    // biome-ignore lint/performance/noImgElement: Blog covers are CMS-driven and not guaranteed to match next/image remote patterns.
                    <img
                      src={optimizeImage(blog.coverImage)}
                      alt={blog.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-[var(--muted-foreground)]">
                      No cover image
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-accent)]">
                    {blog.category || "Journal"}
                  </div>
                  <h3 className="mt-3 text-2xl font-bold tracking-[-0.02em] text-[var(--foreground)] transition-colors group-hover:text-[var(--brand-accent)]">
                    {blog.title}
                  </h3>
                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--muted-foreground)]">
                    {blog.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
