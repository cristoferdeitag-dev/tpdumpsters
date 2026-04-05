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

export default function HowToRentADumpster() {
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-[var(--font-oswald)] prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-tp-red prose-a:no-underline hover:prose-a:underline">
      <p className="text-xl text-gray-600 leading-relaxed !mt-0">
        Renting a dumpster for the first time can feel confusing — how big should it be? Where does it go? What can you
        put in it? The good news is that <strong>renting a dumpster</strong> is actually one of the simplest parts of any
        cleanup, renovation, or construction project when you know what to expect.
      </p>

      <p>
        This step-by-step guide walks you through the entire process, from choosing the right size to what happens on
        delivery day. And with <strong>TP Dumpsters</strong>, you can even{' '}
        <Link href="/booking">book online in minutes</Link> — no phone calls required (though we love hearing from you).
      </p>

      <h2>Step 1: Determine Your Project Scope</h2>

      <SectionImage
        src="/images/dumpsters/construction-site.jpg"
        alt="Construction project site ready for dumpster delivery"
      />

      <p>
        Before choosing a dumpster, take a minute to think about what you&apos;re actually getting rid of. This helps
        you pick the right size and gives your rental company the information they need to quote accurately.
      </p>

      <p>Ask yourself:</p>

      <ul>
        <li><strong>What type of project?</strong> — Garage cleanout, kitchen remodel, landscaping, roof replacement, full demolition?</li>
        <li><strong>What materials are involved?</strong> — Household junk, construction debris, yard waste, heavy materials like concrete?</li>
        <li><strong>How much debris will there be?</strong> — A single room generates far less than a whole-house cleanout</li>
        <li><strong>How long will your project take?</strong> — A weekend cleanup vs. a multi-week renovation affects your rental period</li>
      </ul>

      <p>
        This information helps determine which dumpster size you need and what type of disposal is required. If you&apos;re
        unsure, <strong>TP Dumpsters</strong> offers free phone consultations — our team can help you figure it out in
        a 2-minute conversation.
      </p>

      <h2>Step 2: Choose the Right Dumpster Size</h2>

      <p>
        Dumpster sizes are measured in cubic yards. Most residential and light commercial projects use one of three sizes:
      </p>

      <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        {[
          {
            size: '10 Yard',
            dims: '12\' × 8\' × 2.5\'',
            best: 'Small cleanouts, single-room projects, minor landscaping',
            equiv: 'About 3 pickup truck loads',
          },
          {
            size: '20 Yard',
            dims: '16\' × 8\' × 4\'',
            best: 'Medium renovations, roofing, multi-room cleanups',
            equiv: 'About 6 pickup truck loads',
          },
          {
            size: '30 Yard',
            dims: '16\' × 8\' × 6\'',
            best: 'Large construction, whole-house cleanouts, commercial jobs',
            equiv: 'About 9 pickup truck loads',
          },
        ].map((item) => (
          <div key={item.size} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-center">
            <p className="font-[var(--font-oswald)] text-2xl font-bold text-tp-red">{item.size}</p>
            <p className="text-gray-500 text-sm mt-1">{item.dims}</p>
            <p className="text-gray-700 font-medium mt-3">{item.best}</p>
            <p className="text-gray-500 text-sm mt-2 italic">{item.equiv}</p>
          </div>
        ))}
      </div>

      <p>
        The <strong>20-yard dumpster</strong> is our most popular size — it handles the majority of residential projects
        without being oversized. For a more detailed comparison with real project examples, check out our guide:{' '}
        <Link href="/blog/what-size-dumpster-do-i-need">What Size Dumpster Do I Need?</Link>
      </p>

      <div className="bg-red-50 border-l-4 border-tp-red p-5 rounded-r-xl my-8 not-prose">
        <p className="font-bold text-gray-900 mb-2">💡 Pro Tip</p>
        <p className="text-gray-700">
          When in doubt, go one size up. The cost difference between a 10-yard and 20-yard dumpster is relatively small
          compared to the cost of ordering a second container if you run out of space.
        </p>
      </div>

      <h2>Step 3: Book Your Dumpster</h2>

      <p>
        Once you know the size you need, booking is easy. With <strong>TP Dumpsters</strong>, you have two options:
      </p>

      <ul>
        <li><strong>Book online</strong> — Visit our <Link href="/booking">booking page</Link>, select your dumpster size, choose your delivery date, and confirm. It takes about 2 minutes.</li>
        <li><strong>Call us</strong> — Reach our bilingual team at <a href="tel:+15106502083"><strong>(510) 650-2083</strong></a>. We&apos;ll walk you through the process and answer any questions.</li>
      </ul>

      <p>When booking, have this information ready:</p>

      <ul>
        <li>Your delivery address</li>
        <li>Preferred delivery date and time window</li>
        <li>Type of material you&apos;ll be disposing of</li>
        <li>Where you want the dumpster placed (driveway, street, yard)</li>
        <li>Any access restrictions (narrow streets, low-hanging wires, gates)</li>
      </ul>

      {/* CTA handled by page wrapper */}

      <h2>Step 4: Prepare the Placement Area</h2>

      <SectionImage
        src="/images/dumpsters/delivery-suburban.jpg"
        alt="Dumpster delivered to suburban driveway for home project"
      />

      <p>
        Before your dumpster arrives, you need to make sure there&apos;s a clear, accessible spot for it. Here&apos;s
        how to prepare:
      </p>

      <h3>Driveway Placement (Most Common)</h3>

      <ul>
        <li>Clear the area of vehicles, bikes, trash cans, and any obstructions</li>
        <li>Make sure there&apos;s at least 60 feet of straight clearance for the truck to back in</li>
        <li>Check for low-hanging tree branches or power lines above the placement area</li>
        <li>If you have a steep driveway, let your rental company know in advance</li>
        <li>Consider placing plywood under the dumpster to protect your driveway surface from scratches</li>
      </ul>

      <h3>Street Placement</h3>

      <ul>
        <li>Some cities require a permit for street-placed dumpsters — check with your local government</li>
        <li>In <Link href="/oakland">Oakland</Link>, you&apos;ll need an encroachment permit for public right-of-way</li>
        <li>Make sure the dumpster won&apos;t block traffic, fire hydrants, or sight lines at intersections</li>
        <li>Some HOAs have restrictions on street-placed containers — verify your community rules</li>
      </ul>

      <h3>Yard or Lot Placement</h3>

      <ul>
        <li>Ensure the ground is firm and relatively level — soft or muddy ground can be problematic</li>
        <li>Clear a path wide enough for the delivery truck (at least 10 feet wide)</li>
        <li>Remove any obstacles like fences, gates, or garden structures that block access</li>
      </ul>

      <h2>Step 5: Delivery Day — What to Expect</h2>

      <p>
        On delivery day, here&apos;s what happens:
      </p>

      <ul>
        <li><strong>The truck arrives</strong> — Our driver will call or text when they&apos;re on the way. You don&apos;t necessarily need to be home, but it helps.</li>
        <li><strong>Placement takes 5-10 minutes</strong> — The roll-off truck backs in and hydraulically lowers the dumpster into place. It&apos;s a quick process.</li>
        <li><strong>Driver confirms placement</strong> — They&apos;ll make sure the dumpster is level, accessible, and positioned where you want it.</li>
        <li><strong>You start loading</strong> — The dumpster is yours for the rental period. Load at your own pace.</li>
      </ul>

      <div className="bg-red-50 border-l-4 border-tp-red p-5 rounded-r-xl my-8 not-prose">
        <p className="font-bold text-gray-900 mb-2">🚚 Same-Day Delivery Available</p>
        <p className="text-gray-700">
          TP Dumpsters offers same-day delivery across most Bay Area locations when you book by mid-morning.
          Last-minute project? We&apos;ve got you covered.
        </p>
      </div>

      <h2>Step 6: Load Your Dumpster</h2>

      <SectionImage
        src="/images/gallery/12.png"
        alt="Properly loaded roll-off dumpster with debris"
      />

      <p>
        Loading a dumpster seems straightforward, but a little strategy goes a long way. Here are our best tips:
      </p>

      <ul>
        <li><strong>Load heavy items first</strong> — Put heavy debris (concrete, lumber, appliances) on the bottom for stability</li>
        <li><strong>Break things down</strong> — Disassemble furniture, cut long boards, and flatten boxes to maximize space</li>
        <li><strong>Distribute weight evenly</strong> — Don&apos;t pile everything on one side. Even distribution makes transport safer</li>
        <li><strong>Don&apos;t overfill</strong> — Keep materials below the top edge of the dumpster. Overloaded containers can&apos;t be safely transported and may incur additional charges</li>
        <li><strong>Know what&apos;s prohibited</strong> — Hazardous materials, batteries, paint, and certain appliances can&apos;t go in a standard dumpster. See our guide on <Link href="/blog/what-can-go-in-a-dumpster">what can and can&apos;t go in a dumpster</Link></li>
      </ul>

      <h2>Step 7: Schedule Pickup</h2>

      <p>
        When you&apos;re done loading — or when your rental period ends — it&apos;s time for pickup. Simply call us
        at <a href="tel:+15106502083"><strong>(510) 650-2083</strong></a> or let us know online when you&apos;re ready.
        Our driver will come out, hook up the container, and haul it to the appropriate disposal or recycling facility.
      </p>

      <p>
        Need the dumpster picked up early? No problem — we won&apos;t charge you for unused days. Need more time?
        Just let us know and we&apos;ll extend your rental at a fair daily rate.
      </p>

      <h2>Common Mistakes to Avoid</h2>

      <p>
        After thousands of dumpster deliveries across the Bay Area, here are the most common mistakes we see — and
        how to avoid them:
      </p>

      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        {[
          { title: 'Renting Too Small', desc: 'Underestimating the volume of your debris is the #1 mistake. When in doubt, size up.' },
          { title: 'Blocking the Dumpster', desc: 'Parking cars or stacking materials in front of the dumpster makes loading and pickup difficult.' },
          { title: 'Overloading', desc: 'Filling above the rim means we can\'t transport it. You\'ll need to remove excess before pickup.' },
          { title: 'Mixing Prohibited Items', desc: 'Hazmat, tires, and electronics mixed in with regular debris cause delays and fees.' },
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

      <h2>Why Rent from TP Dumpsters?</h2>

      <p>
        There are plenty of dumpster rental companies in the Bay Area — here&apos;s why customers across{' '}
        <Link href="/oakland">Oakland</Link>, <Link href="/concord">Concord</Link>,{' '}
        <Link href="/richmond">Richmond</Link>, <Link href="/hayward">Hayward</Link>, and{' '}
        <Link href="/walnut-creek">Walnut Creek</Link> choose <strong>TP Dumpsters</strong>:
      </p>

      <ul>
        <li><strong>Easy online booking</strong> — <Link href="/booking">Book in minutes</Link> from your phone or computer</li>
        <li><strong>Same-day delivery</strong> — Available across most of the Bay Area</li>
        <li><strong>Transparent pricing</strong> — One all-inclusive quote. No hidden fees, ever.</li>
        <li><strong>Bilingual support</strong> — Fluent English and Spanish customer service</li>
        <li><strong>Flexible scheduling</strong> — Rent for a day, a week, or longer</li>
        <li><strong>Responsible disposal</strong> — We recycle and divert materials whenever possible</li>
      </ul>

      <div className="bg-gray-900 text-white rounded-2xl p-6 md:p-8 my-10 not-prose">
        <div className="text-center">
          <p className="font-[var(--font-oswald)] text-2xl md:text-3xl font-bold mb-2">
            Ready to Rent Your Dumpster?
          </p>
          <p className="text-gray-300 mb-5 max-w-lg mx-auto">
            Book online in 2 minutes or call us for a free quote. Same-day delivery available across the Bay Area.
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
              Book Online Now <FiChevronRight className="w-[18px] h-[18px]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
