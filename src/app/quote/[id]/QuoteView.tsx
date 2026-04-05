"use client";

import { useEffect, useState } from "react";
import { FaCalendarDays, FaPhone, FaEnvelope, FaPrint } from "react-icons/fa6";

interface Quote {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  billing_address: string;
  service_type: string;
  size: string;
  dimensions: string;
  weight_limit: string;
  rental_days: number;
  base_price: number;
  discount_pct: number;
  discount_amount: number;
  total_price: number;
  notes: string;
  status: string;
  valid_until: string;
  created_at: string;
}

export default function QuoteView({ quoteId }: { quoteId: string }) {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/quote?id=${quoteId}`)
      .then((r) => {
        if (!r.ok) throw new Error("Quote not found");
        return r.json();
      })
      .then(setQuote)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [quoteId]);

  if (loading)
    return (
      <div className="text-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-tp-red border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-[#888] font-[var(--font-poppins)]">Loading quote...</p>
      </div>
    );

  if (error || !quote)
    return (
      <div className="text-center py-20">
        <p className="text-2xl mb-2">😕</p>
        <h2 className="font-[var(--font-oswald)] text-2xl font-bold text-[#333] mb-2">Quote Not Found</h2>
        <p className="text-[#888] font-[var(--font-poppins)]">
          This quote may have expired or the link is incorrect.
        </p>
        <a href="/booking" className="mt-6 inline-block bg-tp-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-tp-red-dark transition-colors font-[var(--font-poppins)]">
          Book Online Instead →
        </a>
      </div>
    );

  const isExpired = new Date(quote.valid_until) < new Date();
  const createdDate = new Date(quote.created_at).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
  const validDate = new Date(quote.valid_until).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  // Extract yard number for specs
  const yardNum = quote.size.replace(/[^0-9]/g, "");

  return (
    <div className="print:p-0">
      {/* Status bar */}
      {isExpired ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-center">
          <p className="text-sm text-red-700 font-[var(--font-poppins)] font-semibold">
            ⚠️ This quote expired on {validDate}. Please contact us for updated pricing.
          </p>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-center print:hidden">
          <p className="text-sm text-green-700 font-[var(--font-poppins)]">
            ✅ This quote is valid until <strong>{validDate}</strong>
          </p>
        </div>
      )}

      {/* Quote card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#1a1a1a] px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="font-[var(--font-oswald)] text-2xl font-bold text-white tracking-wider">
              TP DUMPSTERS
            </h1>
            <p className="text-xs text-white/50 mt-0.5">Bay Area Dumpster Rental Services</p>
          </div>
          <div className="text-right text-[11px] text-white/60 leading-relaxed">
            <p>3201 Ramona St, Pinole, CA 94564</p>
            <p>(510) 650-2083 &nbsp;|&nbsp; contact@tpdumpsters.com</p>
            <p>tpdumpsters.com</p>
          </div>
        </div>
        <div className="h-1 bg-tp-red" />

        {/* Quote title */}
        <div className="px-8 pt-6 pb-4 flex justify-between items-baseline border-b border-gray-100">
          <h2 className="font-[var(--font-oswald)] text-xl font-bold text-[#1a1a1a] uppercase tracking-wide">
            Quote
          </h2>
          <p className="text-xs text-[#999] font-[var(--font-poppins)]">
            {quote.id} &nbsp;|&nbsp; {createdDate}
          </p>
        </div>

        {/* Info grid */}
        <div className="px-8 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#f8f8f8] rounded-lg p-4">
            <h4 className="text-[9px] uppercase tracking-widest text-[#999] font-semibold mb-2 font-[var(--font-poppins)]">
              Customer
            </h4>
            <p className="text-sm font-bold text-[#333] font-[var(--font-poppins)]">{quote.customer_name}</p>
            {quote.customer_email && (
              <p className="text-xs text-[#666] mt-1">{quote.customer_email}</p>
            )}
            {quote.customer_phone && (
              <p className="text-xs text-[#666] mt-0.5">{quote.customer_phone}</p>
            )}
          </div>
          <div className="bg-[#f8f8f8] rounded-lg p-4">
            <h4 className="text-[9px] uppercase tracking-widest text-[#999] font-semibold mb-2 font-[var(--font-poppins)]">
              Delivery Address
            </h4>
            <p className="text-xs text-[#333] font-[var(--font-poppins)] leading-relaxed">
              {quote.delivery_address}
            </p>
          </div>
          {quote.billing_address && (
            <div className="bg-[#f8f8f8] rounded-lg p-4">
              <h4 className="text-[9px] uppercase tracking-widest text-[#999] font-semibold mb-2 font-[var(--font-poppins)]">
                Billing Address
              </h4>
              <p className="text-xs text-[#333] font-[var(--font-poppins)] leading-relaxed">
                {quote.billing_address}
              </p>
            </div>
          )}
        </div>

        {/* Service table */}
        <div className="px-8 pb-4">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1a1a1a] text-white text-[9px] uppercase tracking-widest">
                <th className="py-3 px-4 text-left font-semibold">Service</th>
                <th className="py-3 px-4 text-left font-semibold">Size</th>
                <th className="py-3 px-4 text-left font-semibold">Rental</th>
                <th className="py-3 px-4 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-4 px-4">
                  <p className="text-sm font-semibold text-[#333] font-[var(--font-poppins)]">
                    {quote.service_type}
                  </p>
                  <p className="text-[10px] text-[#999] mt-0.5">Delivery, pickup & disposal included</p>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm text-[#333] font-[var(--font-poppins)]">{quote.size}</p>
                  <p className="text-[10px] text-[#999] mt-0.5">{quote.dimensions}</p>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm text-[#333] font-[var(--font-poppins)]">{quote.rental_days} days</p>
                  <p className="text-[10px] text-[#999] mt-0.5">{quote.weight_limit} included</p>
                </td>
                <td className="py-4 px-4 text-right">
                  <p className="text-sm font-semibold text-[#333] font-[var(--font-poppins)]">
                    ${Number(quote.base_price).toFixed(2)}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="px-8 pb-5 flex justify-end">
          <div className="w-64">
            <div className="flex justify-between py-1.5 text-sm font-[var(--font-poppins)]">
              <span className="text-[#666]">Subtotal</span>
              <span className="text-[#333]">${Number(quote.base_price).toFixed(2)}</span>
            </div>
            {quote.discount_amount > 0 && (
              <div className="flex justify-between py-1.5 text-sm font-[var(--font-poppins)] text-green-600">
                <span>💰 Online discount ({quote.discount_pct}%)</span>
                <span>-${Number(quote.discount_amount).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between py-3 mt-2 border-t-2 border-[#1a1a1a]">
              <span className="font-bold text-lg text-[#333] font-[var(--font-poppins)]">Total</span>
              <span className="font-[var(--font-oswald)] text-2xl font-bold text-tp-red">
                ${Number(quote.total_price).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Dumpster specs */}
        <div className="px-8 pb-5">
          <h4 className="text-[9px] uppercase tracking-widest text-[#999] font-semibold mb-3 font-[var(--font-poppins)]">
            Dumpster Specifications
          </h4>
          <div className="grid grid-cols-4 gap-3">
            {[
              { val: yardNum, label: "Cubic Yards" },
              { val: quote.dimensions.replace(/'/g, "'"), label: "Dimensions" },
              { val: quote.weight_limit, label: "Weight" },
              { val: `${quote.rental_days} Days`, label: "Rental Period" },
            ].map((spec) => (
              <div key={spec.label} className="bg-[#f8f8f8] rounded-lg p-3 text-center">
                <p className="font-[var(--font-oswald)] text-lg font-bold text-tp-red">{spec.val}</p>
                <p className="text-[8px] uppercase tracking-wider text-[#999] mt-0.5">{spec.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Online booking badge */}
        {!isExpired && (
          <div className="px-8 pb-5 print:hidden">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-sm text-green-800 font-[var(--font-poppins)]">
                💰 <strong>Save 5%</strong> when you book online — discount applied automatically!
              </p>
              <a
                href="/booking"
                className="inline-flex items-center gap-2 bg-tp-red text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-tp-red-dark transition-colors font-[var(--font-poppins)] whitespace-nowrap"
              >
                <FaCalendarDays /> Book Online
              </a>
            </div>
          </div>
        )}

        {/* Terms */}
        <div className="px-8 pb-5">
          <h4 className="text-[9px] uppercase tracking-widest text-[#999] font-semibold mb-2 font-[var(--font-poppins)]">
            Terms & Conditions
          </h4>
          <ul className="space-y-1">
            {[
              "Extra days: $49/day beyond the included rental period",
              "Extra weight: $125/ton (prorated) beyond included tonnage",
              "Cancellation: 24-hour notice required. $150 cancellation fee applies",
              "Mattresses, appliances & tires: $20–$60 each (special disposal required)",
              "Payment: Credit card (online) or Zelle (TP PAVERS SERVICE INC — 510 253 62 30)",
              "A team member will contact you to confirm delivery details",
            ].map((term) => (
              <li key={term} className="text-[10px] text-[#666] font-[var(--font-poppins)] flex items-start gap-1.5">
                <span className="text-tp-red mt-0.5">•</span>
                {term}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="bg-[#1a1a1a] px-8 py-4 flex justify-between items-center">
          <p className="text-[10px] text-white/40">
            TP Dumpsters — Bay Area&apos;s trusted dumpster rental service &nbsp;|&nbsp; Licensed &amp; Insured
          </p>
          <p className="text-xs text-tp-red font-bold">tpdumpsters.com</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6 print:hidden">
        <button
          onClick={() => window.print()}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#333] transition-colors font-[var(--font-poppins)]"
        >
          <FaPrint /> Print / Save as PDF
        </button>
        <a
          href="tel:+15106502083"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-white border-2 border-[#1a1a1a] text-[#1a1a1a] px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors font-[var(--font-poppins)]"
        >
          <FaPhone /> Call (510) 650-2083
        </a>
        <a
          href="mailto:contact@tpdumpsters.com"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-white border-2 border-[#1a1a1a] text-[#1a1a1a] px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors font-[var(--font-poppins)]"
        >
          <FaEnvelope /> Email Us
        </a>
      </div>

      {quote.notes && (
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-xs text-amber-800 font-[var(--font-poppins)]">
            📝 <strong>Notes:</strong> {quote.notes}
          </p>
        </div>
      )}
    </div>
  );
}
