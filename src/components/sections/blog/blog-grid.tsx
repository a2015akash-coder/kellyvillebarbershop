"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog-data";
import BlogListHeader from "./blog-list-header";

const PAGE_SIZE = 15;

function optimizeImage(url: string) {
  if (!url || !url.includes("cloudinary")) return url;
  return url.replace("/upload/", "/upload/f_auto,q_auto,w_800/");
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogGrid({
  posts,
  categories,
}: {
  posts: BlogPost[];
  categories: string[];
}) {
  const [search, setSearch] = useState("");
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);

  const filteredPosts = useMemo(() => {
    const q = search.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q),
    );
  }, [posts, search]);

  const displayedPosts = filteredPosts.slice(0, displayCount);

  return (
    <>
      <BlogListHeader
        categories={categories}
        onSearch={(q) => {
          setSearch(q);
          setDisplayCount(PAGE_SIZE);
        }}
        onCategory={(cat) => {
          setSearch(cat);
          setDisplayCount(PAGE_SIZE);
        }}
      />

      {filteredPosts.length === 0 ? (
        <div className="rounded-2xl bg-gray-50 p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            No blog posts found
          </h2>
          <p className="mt-3 text-gray-600">
            Try a different search term or browse all posts.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="rounded-full border border-gray-300 bg-white px-5 py-2 text-sm hover:bg-gray-100"
            >
              Back to Home
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {displayedPosts.map((post, index) => (
              <Link
                href={`/blogs/${post.slug}`}
                key={post.slug}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {post.coverImage ? (
                    <img
                      src={optimizeImage(post.coverImage)}
                      alt={post.title}
                      loading={index < 6 ? "eager" : "lazy"}
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}

                  {post.category ? (
                    <span className="absolute left-4 top-4 rounded-full bg-orange-600 px-3 py-1 text-xs font-semibold text-white">
                      {post.category}
                    </span>
                  ) : null}
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-semibold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-orange-600">
                    {post.title}
                  </h2>

                  <p className="mt-3 text-sm text-gray-500">
                    {formatDate(post.publishedAt)}
                  </p>

                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {displayCount < filteredPosts.length ? (
            <div className="mt-14 text-center">
              <button
                onClick={() => setDisplayCount((prev) => prev + PAGE_SIZE)}
                className="rounded-full border border-gray-300 px-8 py-3 text-sm font-medium transition-colors hover:bg-gray-100"
                type="button"
              >
                Load More ({filteredPosts.length - displayCount} remaining)
              </button>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
