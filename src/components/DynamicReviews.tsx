"use client";

import dynamic from "next/dynamic";

const ReviewsSection = dynamic(() => import("./ReviewsSection"), {
  ssr: false,
  loading: () => (
    <section className="py-20 bg-white">
      <div className="w-[80%] max-w-[1080px] mx-auto text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-32 mx-auto" />
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto" />
          <div className="flex gap-4 mt-8 justify-center">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 w-72 bg-gray-100 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </section>
  ),
});

export default function DynamicReviews() {
  return <ReviewsSection />;
}
