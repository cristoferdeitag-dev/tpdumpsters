import Image from 'next/image';
import Link from 'next/link';
import { FiCheckCircle, FiPhone, FiChevronRight } from 'react-icons/fi';
import { InlineCTA } from '../[slug]/page';

function SectionImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden my-8 shadow-lg">
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}

export default function DumpsterRentalCost() {
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-[var(--font-oswald)] prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-tp-red prose-a:no-underline hover:prose-a:underline">
      <p className="text-xl text-gray-600 leading-relaxed !mt-0">
        Understanding <strong>dumpster rental cost</strong> can feel overwhelming — prices vary depending on where you
        live, the size you need, what you&apos;re throwing away, and how long you need the container. Whether you&apos;re
        tackling a home renovation, cleaning out a garage, or managing a construction job site, knowing what drives pricing
        helps you budget smart and avoid surprise charges.
      </p>

      <p>
        In this comprehensive guide, we break down every factor that affects dumpster rental pricing in the Bay Area and
        across California. At <strong>TP Dumpsters</strong>, we believe in <strong>transparent pricing</strong> with no
        hidden fees — and we want you to feel confident about what you&apos;re paying for before you book.
      </p>

      <h2>What Factors Affect Dumpster Rental Cost?</h2>

      <SectionImage
        src="/images/dumpsters/dumpsters-side-by-side.jpg"
        alt="Different dumpster sizes available for rental in the Bay Area"
      />

      <p>
        No two dumpster rentals are exactly alike, and the total cost depends on several variables. Understanding these
        factors upfront helps you compare quotes and choose the right service for your project. Here are the main cost
        drivers:
      </p>

      <h3>1. Dumpster Size</h3>

      <p>
        Size is the single biggest factor in dumpster rental pricing. Most companies offer 10-yard, 20-yard, and 30-yard
        roll-off containers. Naturally, larger dumpsters cost more — but renting one that&apos;s too small can actually be
        more expensive if you need a second haul. That&apos;s why getting the right size matters so much.
      </p>

      <ul>
        <li><strong>10-yard dumpster</strong> — Ideal for small cleanouts, single-room projects, or minor landscaping. Dimensions: approximately 12&apos; × 8&apos; × 2.5&apos;.</li>
        <li><strong>20-yard dumpster</strong> — The most popular choice. Great for medium renovations, roofing, and multi-room cleanups. Dimensions: approximately 16&apos; × 8&apos; × 4&apos;.</li>
        <li><strong>30-yard dumpster</strong> — Best for large construction projects, whole-house cleanouts, or commercial jobs. Dimensions: approximately 16&apos; × 8&apos; × 6&apos;.</li>
      </ul>

      <p>
        Not sure which size you need? Check out our guide on{' '}
        <Link href="/blog/what-size-dumpster-do-i-need">what size dumpster to choose</Link> for detailed comparisons
        with real project examples.
      </p>

      <h3>2. Type of Material</h3>

      <p>
        What you&apos;re putting in the dumpster directly affects the price. Different materials have different disposal
        costs at the landfill or recycling facility. Here&apos;s a general breakdown:
      </p>

      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        {[
          { title: 'General Household Debris', desc: 'Furniture, appliances, clothing, and miscellaneous items. Typically the most affordable disposal category.' },
          { title: 'Construction & Demo Debris', desc: 'Concrete, drywall, lumber, roofing materials. May cost more due to weight and specialized disposal requirements.' },
          { title: 'Yard Waste & Green Debris', desc: 'Branches, leaves, grass clippings, dirt. Often recycled — some haulers offer lower rates for clean green waste.' },
          { title: 'Heavy Materials', desc: 'Dirt, gravel, brick, concrete. Extremely heavy per cubic yard — weight limits matter most with these materials.' },
        ].map((item) => (
          <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <FiCheckCircle className="text-tp-red mt-0.5 shrink-0 w-5 h-5" />
              <div>
                <p className="font-bold text-gray-900">{item.title}</p>
                <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3>3. Rental Duration</h3>

      <p>
        Most dumpster rental companies include a standard rental period — typically 3 to 7 days — in their base price.
        Need the dumpster longer? You&apos;ll likely pay a daily extension fee. Some companies offer flexible rental
        windows for larger projects. At <strong>TP Dumpsters</strong>, we work with your timeline and offer competitive
        daily rates if you need extra time.
      </p>

      <h3>4. Location &amp; Delivery Distance</h3>

      <p>
        Where you&apos;re located relative to the hauler&apos;s yard and the nearest disposal facility affects the cost.
        Urban areas like <Link href="/oakland">Oakland</Link>, <Link href="/concord">Concord</Link>, and{' '}
        <Link href="/richmond">Richmond</Link> are typically within standard delivery zones, while more remote locations
        may incur fuel surcharges or trip fees.
      </p>

      <h3>5. Landfill &amp; Disposal Fees</h3>

      <p>
        Landfill tipping fees vary by county and by the type of waste being disposed. In California, these fees can be
        higher than the national average due to stricter environmental regulations and limited landfill capacity. This is
        a cost that gets passed through to renters, though reputable companies like TP Dumpsters include disposal in their
        quoted price so there are no surprises at the end.
      </p>

      {/* CTA handled by page wrapper */}

      <h2>Hidden Fees to Watch Out For</h2>

      <SectionImage
        src="/images/gallery/09.jpg"
        alt="Roll-off dumpster being delivered to residential driveway"
      />

      <p>
        Not all dumpster rental quotes are created equal. Some companies advertise low base prices but tack on fees after
        the fact. Here are the most common hidden charges to ask about before you book:
      </p>

      <ul>
        <li><strong>Overage/overweight fees</strong> — Exceeding the included weight limit can cost anywhere from $40–$100+ per additional ton. Always ask what the weight limit is and what happens if you go over.</li>
        <li><strong>Fuel/delivery surcharges</strong> — Some companies charge separately for fuel or delivery beyond a certain radius.</li>
        <li><strong>Environmental/admin fees</strong> — Small line-item charges that add up. Look for all-inclusive pricing.</li>
        <li><strong>Prohibited item fees</strong> — Accidentally toss in a mattress, tire, or appliance with refrigerant? That can trigger extra disposal charges. Know <Link href="/blog/what-can-go-in-a-dumpster">what can and can&apos;t go in a dumpster</Link> before loading.</li>
        <li><strong>Dry run/trip charges</strong> — If the driver arrives and can&apos;t place the dumpster due to blocked access, you may be charged for the trip.</li>
        <li><strong>Extension fees</strong> — Keeping the dumpster past the included rental period without arranging an extension in advance.</li>
      </ul>

      <div className="bg-red-50 border-l-4 border-tp-red p-5 rounded-r-xl my-8 not-prose">
        <p className="font-bold text-gray-900 mb-2">💡 Pro Tip</p>
        <p className="text-gray-700">
          Always request an all-inclusive quote that covers delivery, pickup, disposal, and the rental period. At TP Dumpsters,
          our quotes include everything upfront — no hidden fees, no surprise charges. What we quote is what you pay.
        </p>
      </div>

      <h2>How to Save Money on Your Dumpster Rental</h2>

      <p>
        Even though prices vary, there are smart ways to keep your dumpster rental cost down without cutting corners:
      </p>

      <ul>
        <li><strong>Choose the right size the first time</strong> — Going too small means paying for a second haul. Going too big means paying for space you don&apos;t use. Use our{' '}
          <Link href="/blog/what-size-dumpster-do-i-need">sizing guide</Link> to nail it.</li>
        <li><strong>Sort your materials</strong> — Separating recyclables (metal, concrete, wood) from general trash can lower disposal costs and may qualify you for recycling discounts.</li>
        <li><strong>Stay within the weight limit</strong> — Heavy materials like dirt and concrete fill up weight allowances fast. If your project involves heavy debris, ask about weight-specific pricing.</li>
        <li><strong>Book during off-peak times</strong> — Demand for dumpsters peaks in spring and summer. If your project is flexible, booking in fall or winter may give you better availability and pricing.</li>
        <li><strong>Avoid prohibited items</strong> — Hazardous materials, electronics, and certain appliances can trigger additional charges or require special handling.</li>
        <li><strong>Plan your timeline</strong> — Have your materials ready to load when the dumpster arrives. A shorter rental window means lower costs.</li>
      </ul>

      <h2>Dumpster Rental Cost in the Bay Area</h2>

      <SectionImage
        src="/images/dumpsters/delivery-residential.jpg"
        alt="TP Dumpsters delivery in Bay Area residential neighborhood"
      />

      <p>
        Bay Area dumpster rental costs tend to be slightly higher than the national average, driven by California&apos;s
        higher landfill tipping fees, fuel costs, and environmental regulations. However, the market is competitive, and
        working with a local company like <strong>TP Dumpsters</strong> can actually save you money compared to national
        chains.
      </p>

      <p>
        Here&apos;s why going local matters:
      </p>

      <ul>
        <li><strong>Lower delivery costs</strong> — We&apos;re based in the Bay Area, so there&apos;s no long-distance surcharge for cities like <Link href="/oakland">Oakland</Link>, <Link href="/concord">Concord</Link>, <Link href="/richmond">Richmond</Link>, <Link href="/hayward">Hayward</Link>, or <Link href="/walnut-creek">Walnut Creek</Link>.</li>
        <li><strong>Relationships with local facilities</strong> — We work with recycling centers and transfer stations across the region to get the best disposal rates.</li>
        <li><strong>Personalized service</strong> — Our bilingual team (English &amp; Spanish) provides real customer support, not a national call center.</li>
        <li><strong>Same-day delivery</strong> — Available for most Bay Area locations when you book by mid-morning.</li>
      </ul>

      <h2>Why TP Dumpsters Offers Transparent Pricing</h2>

      <p>
        At <strong>TP Dumpsters</strong>, we&apos;ve built our reputation on honest, straightforward pricing. We know that
        surprise fees are one of the biggest frustrations in this industry — so we do things differently.
      </p>

      <p>
        When you request a quote from us, you get a single price that includes:
      </p>

      <ul>
        <li>Delivery and pickup</li>
        <li>The full rental period</li>
        <li>Disposal fees (within the included weight limit)</li>
        <li>No fuel surcharges, no admin fees, no hidden line items</li>
      </ul>

      <p>
        If your project needs change — you need a longer rental, a different size, or a second container — we&apos;ll let
        you know the cost upfront before anything changes. That&apos;s the TP Dumpsters difference.
      </p>

      <h2>Get Your Free Quote Today</h2>

      <p>
        Ready to find out exactly what your project will cost? <Link href="/booking">Book online</Link> for an instant
        quote, or call us at <a href="tel:+15106502083"><strong>(510) 650-2083</strong></a> to talk with our team. We
        serve the entire Bay Area including <Link href="/oakland">Oakland</Link>,{' '}
        <Link href="/concord">Concord</Link>, <Link href="/richmond">Richmond</Link>,{' '}
        <Link href="/hayward">Hayward</Link>, <Link href="/san-leandro">San Leandro</Link>,{' '}
        <Link href="/walnut-creek">Walnut Creek</Link>, and surrounding communities.
      </p>

      <div className="bg-gray-900 text-white rounded-2xl p-6 md:p-8 my-10 not-prose">
        <div className="text-center">
          <p className="font-[var(--font-oswald)] text-2xl md:text-3xl font-bold mb-2">
            Get Your Dumpster Rental Quote
          </p>
          <p className="text-gray-300 mb-5 max-w-lg mx-auto">
            Transparent pricing. No hidden fees. Same-day delivery available across the Bay Area.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+15106502083"
              className="inline-flex items-center justify-center gap-2 bg-tp-red text-white font-bold px-6 py-3.5 rounded-full hover:bg-tp-red-dark transition-all text-lg"
            >
              <FiPhone className="w-5 h-5" /> (510) 650-2083
            </a>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-bold px-6 py-3.5 rounded-full hover:bg-gray-100 transition-all text-lg"
            >
              Book Online <FiChevronRight className="w-[18px] h-[18px]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
