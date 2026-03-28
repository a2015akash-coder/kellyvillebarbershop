import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getRecentPosts } from "@/lib/blog-data";
import { buttonVariants } from "@/components/ui/button";
import { badgeVariants } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SectionHeading from "@/components/ui/section-heading";

function optimizeImage(url: string) {
  if (!url || !url.includes("cloudinary")) return url;
  return url.replace("/upload/", "/upload/f_auto,q_auto,w_800/");
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPreview() {
  let blogs: Awaited<ReturnType<typeof getRecentPosts>> = [];
  let error = "";

  try {
    blogs = await getRecentPosts(3);
  } catch {
    error = "Failed to load blog posts.";
    blogs = [];
  }

  return (
    <section className="bg-slate-50/60 py-16 sm:py-20">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Blog"
            title="Latest from the blog"
            description="Helpful grooming updates, practical advice, and shop news from The Grooming Room."
            className="max-w-3xl"
          />

          <Link
            href="/blogs"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            View all articles
          </Link>
        </div>

        {error ? (
          <Card className="rounded-2xl border border-slate-200/80 p-8 text-center shadow-sm">
            <CardHeader className="p-0">
              <CardTitle>Blog preview unavailable</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-3">
              <p className="text-sm text-slate-600">{error}</p>
            </CardContent>
            <CardFooter className="justify-center p-0 pt-6">
              <Link
                href="/blogs"
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                Browse blog
              </Link>
            </CardFooter>
          </Card>
        ) : blogs.length === 0 ? (
          <Card className="rounded-2xl border border-slate-200/80 p-8 text-center shadow-sm">
            <CardHeader className="p-0">
              <CardTitle>No blog posts yet</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-3">
              <p className="text-sm text-slate-600">
                Fresh updates and practical insights are coming soon.
              </p>
            </CardContent>
            <CardFooter className="justify-center p-0 pt-6">
              <Link
                href="/blogs"
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                Visit blog
              </Link>
            </CardFooter>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {blogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blogs/${blog.slug}`}
                className="group h-full"
              >
                <Card className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    {blog.coverImage ? (
                      <img
                        src={optimizeImage(blog.coverImage)}
                        alt={blog.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-6 text-center text-sm text-slate-500">
                        No cover image
                      </div>
                    )}

                    {blog.category ? (
                      <div className="absolute left-4 top-4">
                        <span
                          className={badgeVariants({ variant: "secondary" })}
                        >
                          {blog.category}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <CardHeader className="pb-3">
                    {blog.publishedAt ? (
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        {formatDate(blog.publishedAt)}
                      </p>
                    ) : null}
                    <CardTitle className="line-clamp-2 text-xl leading-snug text-slate-900">
                      {blog.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <p className="line-clamp-3 text-sm leading-6 text-slate-600">
                      {blog.excerpt}
                    </p>
                  </CardContent>

                  <CardFooter className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-medium text-slate-700">
                    <span>Read article</span>
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
