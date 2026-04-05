"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaStar, FaStarHalfStroke, FaRegStar } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import type { ReviewsResponse, ReviewData } from "@/app/api/reviews/route";

function StarRating({ rating }: { rating: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="text-tp-star text-base" />);
    } else if (rating >= i - 0.5) {
      stars.push(
        <FaStarHalfStroke key={i} className="text-tp-star text-base" />
      );
    } else {
      stars.push(<FaRegStar key={i} className="text-tp-star text-base" />);
    }
  }
  return <>{stars}</>;
}

function ReviewCard({ review }: { review: ReviewData }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > 150;
  const displayText =
    isLong && !expanded ? review.text.slice(0, 150) + "..." : review.text;

  return (
    <div className="bg-white rounded-xl px-[30px] py-6 text-center shadow-[0_2px_15px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_4px_25px_rgba(0,0,0,0.1)] h-full flex flex-col">
      <div className="relative inline-block mb-3 mx-auto">
        <Image
          src={review.avatar}
          alt={review.name}
          width={64}
          height={64}
          className="w-16 h-16 rounded-full object-cover"
          unoptimized
        />
        <Image
          src="/images/reviews/google-icon.svg"
          alt="Google"
          width={24}
          height={24}
          className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full p-0.5"
          unoptimized
        />
      </div>
      <h4 className="font-[var(--font-poppins)] text-base font-semibold text-[#333] mb-0.5">
        {review.name}
      </h4>
      <span className="text-xs text-[#999] block mb-2.5">{review.date}</span>
      <div className="flex items-center justify-center gap-[3px] mb-4">
        <StarRating rating={review.rating} />
        <Image
          src="/images/reviews/google-icon.svg"
          alt="verified"
          width={18}
          height={18}
          className="w-[18px] h-[18px] ml-1.5"
          unoptimized
        />
      </div>
      {review.text && (
        <p className="text-[13px] text-[#555] leading-relaxed mb-2.5 flex-1">
          {displayText}
        </p>
      )}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[#999] text-xs underline cursor-pointer"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
}

export default function ReviewsSection() {
  const [data, setData] = useState<ReviewsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((json: ReviewsResponse) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="reviews" className="py-15 bg-[#f9f9f9]">
        <div className="w-[90%] max-w-[1200px] mx-auto">
          <div className="flex justify-center gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl px-[30px] py-6 w-[350px] h-[280px] shadow-[0_2px_15px_rgba(0,0,0,0.06)] animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!data || data.reviews.length === 0) return null;

  return (
    <section id="reviews" className="py-15 bg-[#f9f9f9]">
      <div className="w-[90%] max-w-[1200px] mx-auto">
        {/* Section heading */}
        <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2 text-center">
          TESTIMONIALS
        </h4>
        <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-4 text-center">
          What our clients say
        </h2>

        {/* Overall rating */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="flex items-center gap-[3px]">
            <StarRating rating={data.overallRating} />
          </div>
          <span className="text-sm text-[#666]">
            {data.overallRating.toFixed(1)} / 5 ({data.totalReviews} reviews)
          </span>
        </div>

        {/* Swiper carousel */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="reviews-swiper pb-12"
        >
          {data.reviews.map((review, idx) => (
            <SwiperSlide key={review.name + idx} className="h-auto">
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Swiper pagination custom styles */}
      <style jsx global>{`
        .reviews-swiper .swiper-slide {
          height: auto;
        }
        .reviews-swiper .swiper-pagination-bullet {
          background: #ccc;
          opacity: 1;
          width: 10px;
          height: 10px;
        }
        .reviews-swiper .swiper-pagination-bullet-active {
          background: #c8362e;
        }
      `}</style>
    </section>
  );
}
