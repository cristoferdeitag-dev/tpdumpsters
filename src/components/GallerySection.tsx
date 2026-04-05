"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { FaXmark, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const galleryImages = [
  /* ⭐ Best photos: trucks, loaded dumpsters, action shots, high quality */
  { src: "/images/dumpsters/worker-action.jpg", alt: "TP Dumpsters worker loading dumpster at job site" },
  { src: "/images/dumpsters/delivery-residential.jpg", alt: "TP Dumpsters residential dumpster delivery" },
  { src: "/images/dumpsters/tp-truck-yard.jpg", alt: "TP Dumpsters truck and equipment at yard" },
  { src: "/images/dumpsters/construction-site.jpg", alt: "TP Dumpsters dumpster at construction site" },
  { src: "/images/dumpsters/dumpster-dirt-sunny.jpg", alt: "Loaded dumpster with dirt on sunny day" },
  { src: "/images/dumpsters/delivery-suburban.jpg", alt: "TP Dumpsters suburban delivery service" },
  { src: "/images/dumpsters/commercial-tarped.jpg", alt: "Commercial dumpster covered and ready for pickup" },
  { src: "/images/gallery/01.jpg", alt: "Loaded dumpster at residential driveway" },
  { src: "/images/gallery/03.jpg", alt: "Bobcat and dumpster at active job site" },
  { src: "/images/gallery/05.jpg", alt: "Dumpster loaded with concrete and debris" },
  { src: "/images/gallery/09.jpg", alt: "TP Dumpsters residential delivery in progress" },
  { src: "/images/gallery/13.jpg", alt: "Loaded dumpster at residential property" },
  { src: "/images/gallery/14.jpg", alt: "Worker at commercial dumpster job site" },
  { src: "/images/gallery/17.jpg", alt: "Dumpster delivery to residential neighborhood" },
  { src: "/images/gallery/19.jpg", alt: "Dumpster placement at residential home" },
  { src: "/images/gallery/21.jpg", alt: "Dumpster loaded with yard waste and sod" },
  { src: "/images/gallery/25.jpg", alt: "TP Dumpsters branded truck with dumpster" },
  { src: "/images/gallery/26.jpg", alt: "Dumpster delivery in upscale neighborhood" },
];

export default function GallerySection() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = galleryImages.length;

  const goTo = useCallback(
    (index: number) => setCurrent(((index % total) + total) % total),
    [total]
  );
  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Autoplay
  useEffect(() => {
    if (isHovered) return;
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 4000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, total]);

  // Keyboard nav for carousel
  useEffect(() => {
    if (lightboxIndex !== null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [next, prev, lightboxIndex]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    setTouchStart(null);
  };

  // Lightbox
  const openLightbox = () => setLightboxIndex(current);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const lbPrev = useCallback(
    () => setLightboxIndex((p) => (p !== null && p > 0 ? p - 1 : p)),
    []
  );
  const lbNext = useCallback(
    () =>
      setLightboxIndex((p) =>
        p !== null && p < total - 1 ? p + 1 : p
      ),
    [total]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lbPrev();
      if (e.key === "ArrowRight") lbNext();
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [lightboxIndex, closeLightbox, lbPrev, lbNext]);

  return (
    <>
      <section id="gallery" className="py-20 pb-15 bg-white">
        <div className="w-[95%] max-w-[1200px] mx-auto">
          <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2 text-center">
            GALLERY
          </h4>
          <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-10 text-center">
            Recent Services
          </h2>

          {/* Carousel */}
          <div
            className="relative w-full max-w-[600px] mx-auto overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={openLightbox}
          >
            <div className="relative w-full aspect-[3/4]">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    i === current ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    loading={i < 3 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, 1200px"
                  />
                </div>
              ))}

              {/* Gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent z-20 pointer-events-none" />

              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/50 text-white/90 px-4 py-1.5 rounded-full text-xs md:text-sm font-[var(--font-poppins)] font-medium tracking-wide pointer-events-none">
                {current + 1} / {total}
              </div>
            </div>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
              className="absolute top-1/2 left-3 md:left-5 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-black/40 hover:bg-tp-red text-white border-none rounded-full cursor-pointer text-lg md:text-xl flex justify-center items-center transition-all duration-300 backdrop-blur-sm"
            >
              <FaChevronLeft />
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
              className="absolute top-1/2 right-3 md:right-5 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-black/40 hover:bg-tp-red text-white border-none rounded-full cursor-pointer text-lg md:text-xl flex justify-center items-center transition-all duration-300 backdrop-blur-sm"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center items-center gap-1.5 mt-6 flex-wrap">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full border-none cursor-pointer transition-all duration-300 ${
                  i === current
                    ? "bg-tp-red scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-[fadeIn_0.2s_ease-out]"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-3 right-3 md:top-5 md:right-5 text-white/80 hover:text-white text-xl md:text-2xl transition-colors z-10 w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <FaXmark />
          </button>

          <button
            className={`absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full text-lg md:text-xl transition-all ${
              lightboxIndex === 0
                ? "bg-white/10 text-white/30 cursor-default"
                : "bg-black/40 text-white/80 hover:bg-black/60 hover:text-white cursor-pointer"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              lbPrev();
            }}
            disabled={lightboxIndex === 0}
            aria-label="Previous"
          >
            <FaChevronLeft />
          </button>

          <button
            className={`absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full text-lg md:text-xl transition-all ${
              lightboxIndex === total - 1
                ? "bg-white/10 text-white/30 cursor-default"
                : "bg-black/40 text-white/80 hover:bg-black/60 hover:text-white cursor-pointer"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              lbNext();
            }}
            disabled={lightboxIndex === total - 1}
            aria-label="Next"
          >
            <FaChevronRight />
          </button>

          <div
            className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-10 bg-black/50 text-white/90 px-4 py-1.5 rounded-full text-xs md:text-sm font-[var(--font-poppins)] font-medium tracking-wide"
            onClick={(e) => e.stopPropagation()}
          >
            {lightboxIndex + 1} / {total}
          </div>

          <div
            className="relative w-full h-[75vh] md:h-[82vh] max-w-4xl mx-14 md:mx-20"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 90vw, (max-width: 1024px) 80vw, 900px"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
