'use client';

import { use } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import Image from 'next/image';
import Link from 'next/link';
import { FiPhone, FiArrowLeft, FiClock, FiCalendar, FiChevronRight, FiStar, FiShield, FiCheckCircle } from 'react-icons/fi';
import { blogPosts } from '@/data/blog-posts';

/* ───── blog content registry ───── */
import DumpsterRentalCost from '../_articles/dumpster-rental-cost';
import YardWasteDisposal from '../_articles/yard-waste-disposal';
import HowToRentADumpster from '../_articles/how-to-rent-a-dumpster';
import ConstructionDebrisDisposal from '../_articles/construction-debris-disposal';
import WhatSizeDumpster from '../_articles/what-size-dumpster-do-i-need';
import DemolitionDebrisRemoval from '../_articles/demolition-debris-removal';
import HomeRenovationDumpster from '../_articles/home-renovation-dumpster';
import WhatCanGoInDumpster from '../_articles/what-can-go-in-a-dumpster';

const articleComponents: Record<string, React.ComponentType> = {
  'dumpster-rental-cost': DumpsterRentalCost,
  'yard-waste-disposal': YardWasteDisposal,
  'how-to-rent-a-dumpster': HowToRentADumpster,
  'construction-debris-disposal': ConstructionDebrisDisposal,
  'what-size-dumpster-do-i-need': WhatSizeDumpster,
  'demolition-debris-removal': DemolitionDebrisRemoval,
  'home-renovation-dumpster': HomeRenovationDumpster,
  'what-can-go-in-a-dumpster': WhatCanGoInDumpster,
};

/* ───── CTA component (only ONE style, well-spaced) ───── */
function InlineCTA({ variant = 'primary' }: { variant?: 'primary' | 'secondary' }) {
  if (variant === 'secondary') {
    return (
      <div className="my-14 bg-gray-50 border border-gray-200 rounded-2xl p-8 md:p-10 text-center">
        <p className="text-xl font-bold text-gray-800 mb-3">
          Need a dumpster for your project?
        </p>
        <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
          TP Dumpsters offers same-day delivery across the Bay Area with transparent pricing and bilingual support.
        </p>
        <a
          href="tel:+15106502083"
          className="inline-flex items-center justify-center gap-2 bg-tp-red text-white font-bold px-8 py-3.5 rounded-full hover:bg-tp-red-dark transition-all text-lg"
        >
          <FiPhone className="w-5 h-5" /> (510) 650-2083
        </a>
      </div>
    );
  }

  return (
    <div className="my-14 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-10 text-center text-white">
      <h3 className="font-[var(--font-oswald)] text-2xl md:text-3xl font-bold mb-3">
        Ready to Book Your Dumpster?
      </h3>
      <p className="text-white/80 mb-6 max-w-lg mx-auto leading-relaxed">
        Same-day delivery available across the Bay Area. Transparent pricing, no hidden fees.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="tel:+15106502083"
          className="inline-flex items-center justify-center gap-2 bg-tp-red text-white font-bold px-8 py-3.5 rounded-full hover:bg-tp-red-dark transition-all text-lg"
        >
          <FiPhone className="w-5 h-5" /> Call Now
        </a>
        <Link
          href="/booking"
          className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-bold px-8 py-3.5 rounded-full hover:bg-gray-100 transition-all text-lg"
        >
          Book Online <FiChevronRight className="w-5 h-5" />
        </Link>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-white/60">
        <span className="flex items-center gap-1.5"><FiStar className="w-4 h-4" /> 5.0 Rating</span>
        <span className="flex items-center gap-1.5"><FiShield className="w-4 h-4" /> Transparent Pricing</span>
        <span className="flex items-center gap-1.5"><FiCheckCircle className="w-4 h-4" /> Same-Day Delivery</span>
      </div>
    </div>
  );
}

function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const related = blogPosts.filter((p) => p.slug !== currentSlug).slice(0, 3);
  return (
    <div className="mt-20 border-t border-gray-200 pt-14">
      <h2 className="font-[var(--font-oswald)] text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
        More Articles You Might Like
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
          >
            <div className="relative h-52 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-tp-red text-white text-xs font-bold px-3 py-1 rounded-full">
                {post.category}
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-[var(--font-oswald)] text-lg font-bold text-gray-900 group-hover:text-tp-red transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 mt-3">{post.readTime}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ───── main page ───── */
export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return null;

  const ArticleContent = articleComponents[slug];

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative min-h-[45vh] md:min-h-[55vh] flex items-end pt-[100px]">
        <div className="absolute inset-0 z-0">
          <Image src={post.image} alt={post.title} fill className="object-cover object-center" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-[1]" />
        <div className="relative z-[2] w-full max-w-[800px] mx-auto px-6 pb-10 md:pb-14">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors mb-5"
          >
            <FiArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="inline-block bg-tp-red text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            {post.category}
          </div>
          <h1 className="font-[var(--font-oswald)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-5">
            {post.title}
          </h1>
          <div className="flex items-center gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5">
              <FiCalendar className="w-4 h-4" /> {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <FiClock className="w-4 h-4" /> {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="max-w-[800px] mx-auto px-6 py-14 md:py-20">
        <div className="prose prose-lg max-w-none
          prose-headings:font-[var(--font-oswald)] prose-headings:text-gray-900 prose-headings:font-bold
          prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-5
          prose-p:text-gray-700 prose-p:leading-[1.8] prose-p:text-base prose-p:md:text-lg prose-p:mb-5
          prose-li:text-gray-700 prose-li:text-base prose-li:md:text-lg prose-li:leading-[1.8]
          prose-strong:text-gray-900
          prose-a:text-tp-red prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-2xl prose-img:shadow-lg
        ">
          {ArticleContent ? (
            <ArticleContent />
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500 mb-6">This article is coming soon!</p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-tp-red text-white font-bold px-6 py-3 rounded-full hover:bg-tp-red-dark transition-all"
              >
                <FiArrowLeft className="w-5 h-5" /> Back to Blog
              </Link>
            </div>
          )}
        </div>

        {ArticleContent && (
          <RelatedPosts currentSlug={slug} />
        )}
      </article>

      <FloatingButtons />
      <Footer />
    </>
  );
}

export { InlineCTA };
