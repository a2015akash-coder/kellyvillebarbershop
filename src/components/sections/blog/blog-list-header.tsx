"use client";

import { useState, useRef } from "react";

const DEBOUNCE_DELAY = 300;

export default function BlogListHeader({
  categories,
  onSearch,
  onCategory,
}: {
  categories: string[];
  onSearch: (query: string) => void;
  onCategory: (category: string) => void;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  return (
    <>
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <span className="mb-6 inline-block rounded-full bg-gray-200 px-6 py-1 text-large font-bold text-gray-700">
          Blogs
        </span>
        <div className="mx-auto  flex max-w-xl flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Search by title, category, or keyword"
            onChange={(e) => {
              const value = e.target.value;
              if (debounceRef.current) clearTimeout(debounceRef.current);
              debounceRef.current = setTimeout(() => {
                onSearch(value);
              }, DEBOUNCE_DELAY);
            }}
            className="w-full rounded-full border border-gray-300 px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
          />

          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-full border border-gray-300 px-5 py-3 text-sm font-medium hover:bg-gray-100"
            type="button"
          >
            Categories
          </button>
        </div>
      </div>

      {/* SIDEBAR OVERLAY */}
      {sidebarOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={() => {}}
          role="presentation"
        />
      ) : null}

      {/* SIDEBAR */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-[300px] transform bg-white p-6 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Categories</h3>
          <button onClick={() => setSidebarOpen(false)} type="button">
            ✕
          </button>
        </div>

        <ul className="space-y-4">
          <li>
            <button
              onClick={() => {
                onCategory("");
                setSidebarOpen(false);
              }}
              className="cursor-pointer hover:text-orange-600"
              type="button"
            >
              All Posts
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => {
                  onCategory(cat);
                  setSidebarOpen(false);
                }}
                className="cursor-pointer hover:text-orange-600"
                type="button"
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
