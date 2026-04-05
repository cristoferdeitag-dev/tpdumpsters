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

export default function HomeRenovationDumpster() {
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-[var(--font-oswald)] prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-tp-red prose-a:no-underline hover:prose-a:underline">
      <p className="text-xl text-gray-600 leading-relaxed !mt-0">
        Home renovations are one of the most rewarding investments you can make — but they also generate a surprising
        amount of waste. From ripping out old cabinets and tile to replacing flooring and fixtures, a{' '}
        <strong>home renovation dumpster</strong> is essential for keeping your project organized, your property clean,
        and your sanity intact.
      </p>

      <p>
        Whether you&apos;re planning a kitchen remodel, bathroom renovation, or a multi-room overhaul, this guide
        covers everything you need to know about dumpster planning for home renovation projects. At{' '}
        <strong>TP Dumpsters</strong>, we&apos;ve helped thousands of Bay Area homeowners and contractors manage
        renovation waste — and we&apos;re here to make it easy for you, too.
      </p>

      <h2>Why You Need a Dumpster for Home Renovations</h2>

      <SectionImage
        src="/images/gallery/residential-02.jpg"
        alt="Residential dumpster rental for home renovation project"
      />

      <p>
        Many homeowners underestimate how much debris a renovation creates. A single kitchen remodel can generate
        2,000+ pounds of waste — cabinets, countertops, flooring, drywall, tile, plumbing fixtures, and more. Without
        a dedicated dumpster, you&apos;re stuck making dozens of trips to the dump or piling debris in your yard.
      </p>

      <p>Here&apos;s why a roll-off dumpster makes renovation life so much easier:</p>

      <ul>
        <li><strong>One central place for all debris</strong> — No scattered piles around your property</li>
        <li><strong>Load as you go</strong> — Demo something? Walk it right out to the dumpster. No accumulation.</li>
        <li><strong>Save time</strong> — Skip the multiple dump runs. That&apos;s hours (and gas money) you won&apos;t get back.</li>
        <li><strong>Safer work area</strong> — Debris on floors creates trip hazards and slows down work. A dumpster keeps the job site clean.</li>
        <li><strong>Contractor-ready</strong> — Most contractors expect a dumpster on-site. Having one ready shows you&apos;re prepared.</li>
      </ul>

      <h2>Renovation Projects &amp; Recommended Dumpster Sizes</h2>

      <p>
        Different renovation projects generate different amounts of waste. Here&apos;s a room-by-room guide to help
        you choose the right dumpster size:
      </p>

      <h3>Kitchen Remodel</h3>

      <div className="not-prose bg-white border border-gray-200 rounded-xl p-5 shadow-sm my-6">
        <div className="flex items-start gap-3">
          <FiCheckCircle className="text-tp-red mt-0.5 shrink-0 w-5 h-5" />
          <div>
            <p className="font-bold text-gray-900">Recommended: 20-Yard Dumpster</p>
            <p className="text-gray-600 text-sm mt-1">
              A kitchen remodel typically generates cabinets, countertops, flooring, drywall, appliances, tile backsplash,
              and packaging from new materials. A 20-yard (16&apos; × 8&apos; × 4&apos;) handles all of this with room to spare.
            </p>
          </div>
        </div>
      </div>

      <p>Kitchen renovation debris typically includes:</p>
      <ul>
        <li>Upper and lower cabinets (bulky but relatively lightweight)</li>
        <li>Countertops (granite and quartz are heavy — factor into weight limits)</li>
        <li>Flooring — tile, hardwood, or vinyl</li>
        <li>Drywall from wall modifications or soffit removal</li>
        <li>Old appliances (ensure refrigerant has been properly removed from refrigerators)</li>
        <li>Plumbing fixtures — sinks, faucets, garbage disposals</li>
        <li>Packaging and shipping materials from new installations</li>
      </ul>

      <h3>Bathroom Renovation</h3>

      <div className="not-prose bg-white border border-gray-200 rounded-xl p-5 shadow-sm my-6">
        <div className="flex items-start gap-3">
          <FiCheckCircle className="text-tp-red mt-0.5 shrink-0 w-5 h-5" />
          <div>
            <p className="font-bold text-gray-900">Recommended: 10-Yard Dumpster</p>
            <p className="text-gray-600 text-sm mt-1">
              A single bathroom generates less debris than a kitchen — a 10-yard (12&apos; × 8&apos; × 2.5&apos;) is
              usually sufficient. Doing two or more bathrooms? Size up to a 20-yard.
            </p>
          </div>
        </div>
      </div>

      <p>Typical bathroom demo waste:</p>
      <ul>
        <li>Vanity and mirror</li>
        <li>Bathtub or shower surround (cast iron tubs are extremely heavy)</li>
        <li>Toilet</li>
        <li>Floor and wall tile</li>
        <li>Drywall and cement board</li>
        <li>Old plumbing fixtures</li>
      </ul>

      <h3>Multi-Room or Whole-House Renovation</h3>

      <div className="not-prose bg-white border border-gray-200 rounded-xl p-5 shadow-sm my-6">
        <div className="flex items-start gap-3">
          <FiCheckCircle className="text-tp-red mt-0.5 shrink-0 w-5 h-5" />
          <div>
            <p className="font-bold text-gray-900">Recommended: 20 or 30-Yard Dumpster</p>
            <p className="text-gray-600 text-sm mt-1">
              Multiple rooms mean multiple loads of debris. A 20-yard handles 2-3 room renovations; for whole-house
              projects or gut renovations, go with a 30-yard (16&apos; × 8&apos; × 6&apos;) or plan for a mid-project swap.
            </p>
          </div>
        </div>
      </div>

      {/* CTA handled by page wrapper */}

      <h2>Timing Your Dumpster Rental</h2>

      <SectionImage
        src="/images/gallery/delivery-01.jpg"
        alt="Dumpster being delivered to residential property for renovation"
      />

      <p>
        Getting the timing right on your dumpster rental saves money and keeps your project running smoothly.
        Here&apos;s how to think about scheduling:
      </p>

      <h3>When to Have the Dumpster Delivered</h3>

      <ul>
        <li><strong>Day of demo</strong> — Ideally, the dumpster arrives the morning of your first demo day so you can load debris immediately</li>
        <li><strong>Day before demo</strong> — If you want it positioned and ready before the crew shows up, schedule delivery the day before</li>
        <li><strong>NOT too early</strong> — Don&apos;t order a dumpster a week before you need it. You&apos;re paying for the rental period whether you&apos;re filling it or not.</li>
      </ul>

      <h3>How Long to Rent</h3>

      <ul>
        <li><strong>Weekend DIY project</strong> — 3-day rental is typically enough for a single-room project</li>
        <li><strong>Kitchen or bath remodel</strong> — 5-7 days covers the demo phase and initial construction waste</li>
        <li><strong>Multi-room renovation</strong> — 7-14 days, or consider scheduling a mid-project swap</li>
        <li><strong>Whole-house gut</strong> — Plan for ongoing service with regular pickups and replacements</li>
      </ul>

      <div className="bg-red-50 border-l-4 border-tp-red p-5 rounded-r-xl my-8 not-prose">
        <p className="font-bold text-gray-900 mb-2">💡 Pro Tip</p>
        <p className="text-gray-700">
          If your renovation is happening in phases (demo first, then construction), you may only need the dumpster
          during the demo phase. Construction generates much less waste — packaging, offcuts, and minor scraps.
          Time your rental for the high-waste demo period to maximize value.
        </p>
      </div>

      <h2>Keeping Your Work Area Clean During Renovations</h2>

      <p>
        A clean renovation site isn&apos;t just about aesthetics — it&apos;s about safety, efficiency, and maintaining
        good relationships with your neighbors. Here are our best tips:
      </p>

      <h3>Daily Cleanup Routine</h3>

      <ul>
        <li><strong>End-of-day sweep</strong> — Take 15-20 minutes at the end of each work day to move debris to the dumpster</li>
        <li><strong>Protect living areas</strong> — If you&apos;re living in the home during renovation, use plastic sheeting and zip barriers to contain dust</li>
        <li><strong>Clear walkways</strong> — Keep paths from the work area to the dumpster clear and safe</li>
        <li><strong>Contain small debris</strong> — Use trash cans or buckets inside the work area for nails, screws, and small pieces, then dump them into the roll-off</li>
      </ul>

      <h3>Neighbor Considerations</h3>

      <ul>
        <li>Give neighbors a heads-up about the project timeline and dumpster placement</li>
        <li>Ensure the dumpster doesn&apos;t block shared driveways or sidewalks</li>
        <li>Keep noise within your city&apos;s allowed construction hours (typically 7 AM–7 PM weekdays in most Bay Area cities)</li>
        <li>Don&apos;t let debris blow off the dumpster — keep it below the rim</li>
      </ul>

      <h2>Working with Contractors</h2>

      <SectionImage
        src="/images/dumpsters/tp-truck-yard.jpg"
        alt="TP Dumpsters truck ready for delivery to renovation sites"
      />

      <p>
        If you&apos;re hiring a contractor for your renovation, here&apos;s how to coordinate the dumpster situation:
      </p>

      <h3>Who Provides the Dumpster?</h3>

      <p>
        This varies by contractor and project:
      </p>

      <ul>
        <li><strong>Contractor provides it</strong> — Many GCs include waste management in their bid. They may have a preferred hauler or use their own containers. The cost is built into the project price.</li>
        <li><strong>Homeowner provides it</strong> — Some homeowners prefer to rent their own dumpster, especially for smaller projects or when they want to control costs. This is common for DIY renovations with hired labor for specific tasks.</li>
        <li><strong>Split approach</strong> — The contractor handles construction waste, while the homeowner gets a dumpster for pre-renovation cleanout and personal items.</li>
      </ul>

      <h3>Coordinating Logistics</h3>

      <ul>
        <li>Agree on dumpster placement before it arrives — the contractor needs it accessible from the work area</li>
        <li>Discuss who&apos;s responsible for keeping the dumpster organized and not overloaded</li>
        <li>Coordinate pickup/swap timing with the project schedule</li>
        <li>Ensure the contractor knows what can&apos;t go in the dumpster (refer them to our <Link href="/blog/what-can-go-in-a-dumpster">accepted items guide</Link>)</li>
      </ul>

      <h2>Renovation Dumpster Dos and Don&apos;ts</h2>

      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <p className="font-[var(--font-oswald)] text-lg font-bold text-green-800 mb-3">✅ DO</p>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>• Break down bulky items (cabinets, furniture) to save space</li>
            <li>• Load heavy items first, lighter items on top</li>
            <li>• Distribute weight evenly across the dumpster</li>
            <li>• Keep debris below the rim line</li>
            <li>• Separate recyclable metals — you might earn money back</li>
            <li>• Plan your rental around the demo phase</li>
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <p className="font-[var(--font-oswald)] text-lg font-bold text-red-800 mb-3">❌ DON&apos;T</p>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>• Throw in hazardous materials (paint, solvents, batteries)</li>
            <li>• Overfill past the rim — we can&apos;t haul an overloaded container</li>
            <li>• Block the dumpster with vehicles or materials</li>
            <li>• Let neighbors fill your dumpster with their junk</li>
            <li>• Wait until demo day to order — book in advance</li>
            <li>• Forget to protect your driveway (use plywood under the dumpster)</li>
          </ul>
        </div>
      </div>

      <h2>TP Dumpsters: Your Renovation Partner</h2>

      <p>
        At <strong>TP Dumpsters</strong>, we specialize in making home renovations smoother for Bay Area homeowners
        and contractors. Whether it&apos;s a weekend bathroom refresh in <Link href="/richmond">Richmond</Link> or
        a whole-house gut in <Link href="/walnut-creek">Walnut Creek</Link>, we&apos;ve got the right dumpster
        at the right price.
      </p>

      <ul>
        <li><strong>Same-day delivery</strong> — Because renovation timelines don&apos;t always go as planned</li>
        <li><strong>Transparent pricing</strong> — One quote covers everything. No hidden fees, ever.</li>
        <li><strong>Bilingual support</strong> — Fluent English and Spanish customer service</li>
        <li><strong>Easy online booking</strong> — <Link href="/booking">Book in 2 minutes</Link> from your phone</li>
        <li><strong>Bay Area coverage</strong> — <Link href="/oakland">Oakland</Link>, <Link href="/concord">Concord</Link>, <Link href="/richmond">Richmond</Link>, <Link href="/hayward">Hayward</Link>, <Link href="/san-leandro">San Leandro</Link>, and more</li>
      </ul>

      <div className="bg-gray-900 text-white rounded-2xl p-6 md:p-8 my-10 not-prose">
        <div className="text-center">
          <p className="font-[var(--font-oswald)] text-2xl md:text-3xl font-bold mb-2">
            Renovation Starting Soon?
          </p>
          <p className="text-gray-300 mb-5 max-w-lg mx-auto">
            Book your dumpster now so it&apos;s ready on demo day. Same-day delivery available across the Bay Area.
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
              Book Your Dumpster <FiChevronRight className="w-[18px] h-[18px]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
