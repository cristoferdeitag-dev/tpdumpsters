"use client";

import dynamic from "next/dynamic";

const GallerySection = dynamic(() => import("./GallerySection"), {
  ssr: false,
  loading: () => (
    <section className="py-20 bg-white">
      <div className="w-[80%] max-w-[1080px] mx-auto text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-32 mx-auto" />
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto" />
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-40 bg-gray-100 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </section>
  ),
});

export default function DynamicGallery() {
  return <GallerySection />;
}
