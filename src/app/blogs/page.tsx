import type { Metadata } from "next";
import { getAllPosts, getCategories } from "@/lib/blog-data";
import BlogGrid from "@/components/sections/blog/blog-grid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | The Grooming Room Barbershop Kellyville",
  description:
    "Practical grooming advice, expert tips, and updates from The Grooming Room Barbershop in Kellyville.",
};

export default async function BlogListPage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getCategories(),
  ]);

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-screen-xl px-4">
        <BlogGrid posts={posts} categories={categories} />
      </div>
    </section>
  );
}
