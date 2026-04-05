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

export default function WhatSizeDumpster() {
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-[var(--font-oswald)] prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-tp-red prose-a:no-underline hover:prose-a:underline">
      <p className="text-xl text-gray-600 leading-relaxed !mt-0">
        &quot;<strong>What size dumpster do I need?</strong>&quot; is the most common question we hear at TP Dumpsters —
        and for good reason. Choosing the right size saves you money, prevents project delays, and eliminates the
        hassle of ordering a second container or paying for space you don&apos;t use.
      </p>

      <p>
        In this guide, we break down our three dumpster sizes with exact dimensions, real project examples, and weight
        considerations to help you make the right choice. And if you&apos;re still unsure after reading, our bilingual
        team is just a phone call away at <a href="tel:+15106502083"><strong>(510) 650-2083</strong></a>.
      </p>

      <h2>Dumpster Sizes at a Glance</h2>

      <SectionImage
        src="/images/dumpsters/dumpster-dirt-sunny.jpg"
        alt="Different dumpster sizes available from TP Dumpsters in the Bay Area"
      />

      <p>
        TP Dumpsters offers three roll-off dumpster sizes designed to handle everything from a garage cleanout to a
        full construction project. Here&apos;s how they compare:
      </p>

      <div className="not-prose my-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              size: '10 Yard',
              dims: '12\' long × 8\' wide × 2.5\' tall',
              volume: '10 cubic yards',
              trucks: '~3 pickup truck loads',
              color: 'from-yellow-500 to-amber-600',
            },
            {
              size: '20 Yard',
              dims: '16\' long × 8\' wide × 4\' tall',
              volume: '20 cubic yards',
              trucks: '~6 pickup truck loads',
              color: 'from-tp-red to-red-700',
            },
            {
              size: '30 Yard',
              dims: '16\' long × 8\' wide × 6\' tall',
              volume: '30 cubic yards',
              trucks: '~9 pickup truck loads',
              color: 'from-gray-800 to-gray-900',
            },
          ].map((item) => (
            <div key={item.size} className={`bg-gradient-to-br ${item.color} text-white rounded-2xl p-6 text-center shadow-lg`}>
              <p className="font-[var(--font-oswald)] text-4xl font-bold">{item.size}</p>
              <p className="text-white/80 text-sm mt-2">{item.dims}</p>
              <div className="border-t border-white/20 mt-4 pt-4">
                <p className="font-bold">{item.volume}</p>
                <p className="text-white/70 text-sm mt-1">{item.trucks}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2>10-Yard Dumpster: The Compact Workhorse</h2>

      <p>
        <strong>Dimensions:</strong> 12 feet long × 8 feet wide × 2.5 feet tall
      </p>

      <p>
        The 10-yard dumpster is our smallest option, but don&apos;t underestimate it. At 2.5 feet tall, it sits low to
        the ground, making it easy to load without a ramp — just toss materials right over the side. Its compact footprint
        fits in most driveways, including tight single-car driveways common in older Bay Area neighborhoods.
      </p>

      <h3>Best Projects for a 10-Yard Dumpster</h3>

      <ul>
        <li><strong>Garage or attic cleanout</strong> — Years of accumulated stuff from one or two rooms</li>
        <li><strong>Single bathroom renovation</strong> — Old vanity, toilet, tile, drywall, and flooring debris</li>
        <li><strong>Small landscaping projects</strong> — Removing a small section of bushes, old mulch, or a garden bed</li>
        <li><strong>Estate cleanouts (small homes)</strong> — Clearing out a one-bedroom apartment or studio</li>
        <li><strong>Minor deck or fence removal</strong> — Tearing out a small deck or section of fencing</li>
        <li><strong>Concrete or dirt removal</strong> — Small quantities (remember: heavy materials hit weight limits fast)</li>
      </ul>

      <div className="bg-red-50 border-l-4 border-tp-red p-5 rounded-r-xl my-8 not-prose">
        <p className="font-bold text-gray-900 mb-2">⚖️ Weight Tip</p>
        <p className="text-gray-700">
          A 10-yard dumpster filled with concrete or dirt will be extremely heavy — often exceeding the standard weight
          allowance. If you&apos;re disposing of heavy materials, let us know upfront so we can advise on weight limits
          and pricing. Sometimes a smaller, partially-filled container is more cost-effective for heavy debris.
        </p>
      </div>

      <h2>20-Yard Dumpster: The Most Popular Choice</h2>

      <SectionImage
        src="/images/sizes/20-yard.png"
        alt="20-yard dumpster — the most popular size for residential projects"
      />

      <p>
        <strong>Dimensions:</strong> 16 feet long × 8 feet wide × 4 feet tall
      </p>

      <p>
        The 20-yard dumpster is our best seller — and for good reason. It&apos;s the perfect balance of capacity and
        footprint. At 4 feet tall, it can handle substantial volumes of debris while still being manageable to load.
        It fits in standard two-car driveways and doesn&apos;t look overwhelming on a residential property.
      </p>

      <h3>Best Projects for a 20-Yard Dumpster</h3>

      <ul>
        <li><strong>Kitchen remodel</strong> — Cabinets, countertops, flooring, appliances, and drywall</li>
        <li><strong>Roof replacement</strong> — A single-layer tear-off for an average-sized home (up to ~25 squares)</li>
        <li><strong>Multi-room renovation</strong> — Gut-and-replace of 2-3 rooms worth of materials</li>
        <li><strong>Large landscaping projects</strong> — Full backyard overhaul, tree removal, fence replacement</li>
        <li><strong>Whole-house cleanout</strong> — Moving, downsizing, or estate cleanout for a 2-3 bedroom home</li>
        <li><strong>Medium construction projects</strong> — Framing waste, drywall scraps, and finishing debris for additions or remodels</li>
      </ul>

      <p>
        If you&apos;re doing a <Link href="/blog/home-renovation-dumpster">home renovation</Link> and aren&apos;t sure
        about the size, the 20-yard is almost always the safe bet. The cost difference from a 10-yard is modest, but
        the extra capacity can save you from needing a second haul.
      </p>

      {/* CTA handled by page wrapper */}

      <h2>30-Yard Dumpster: Maximum Capacity</h2>

      <SectionImage
        src="/images/sizes/30-yard.png"
        alt="30-yard dumpster for large construction and commercial projects"
      />

      <p>
        <strong>Dimensions:</strong> 16 feet long × 8 feet wide × 6 feet tall
      </p>

      <p>
        The 30-yard is our largest container — a serious piece of equipment designed for serious projects. At 6 feet tall,
        it can handle massive volumes of lightweight to medium-weight debris. It has the same footprint as the 20-yard
        (16&apos; × 8&apos;) but with 50% more height, making it the go-to choice for contractors and large-scale projects.
      </p>

      <h3>Best Projects for a 30-Yard Dumpster</h3>

      <ul>
        <li><strong>Full demolition</strong> — Tearing down garages, sheds, interior walls, or small structures</li>
        <li><strong>New construction waste</strong> — Framing scraps, packaging, drywall offcuts from a new build</li>
        <li><strong>Whole-house cleanout (large homes)</strong> — 4+ bedroom homes or homes with basements/attics full of items</li>
        <li><strong>Commercial projects</strong> — Office buildouts, retail renovations, warehouse cleanups</li>
        <li><strong>Major roofing jobs</strong> — Multi-layer tear-offs or large commercial roofs</li>
        <li><strong>Storm damage cleanup</strong> — Large-scale debris from severe weather events</li>
      </ul>

      <p>
        For more on planning demolition waste, see our <Link href="/blog/demolition-debris-removal">demolition debris
        removal guide</Link>.
      </p>

      <h2>Size Guide by Project Type</h2>

      <p>
        Still not sure? Here&apos;s a quick reference matching common projects to recommended dumpster sizes:
      </p>

      <div className="not-prose overflow-x-auto my-8">
        <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="text-left px-5 py-3 font-[var(--font-oswald)] font-bold">Project</th>
              <th className="text-center px-5 py-3 font-[var(--font-oswald)] font-bold">Recommended Size</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              ['Garage cleanout', '10 Yard'],
              ['Single bathroom remodel', '10 Yard'],
              ['Small landscaping / yard cleanup', '10 Yard'],
              ['Kitchen remodel', '20 Yard'],
              ['Roof replacement (single layer)', '20 Yard'],
              ['Multi-room renovation', '20 Yard'],
              ['Whole-house cleanout (2-3 bed)', '20 Yard'],
              ['Full interior demolition', '30 Yard'],
              ['New construction waste', '30 Yard'],
              ['Whole-house cleanout (4+ bed)', '30 Yard'],
              ['Commercial renovation', '30 Yard'],
            ].map(([project, size], i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-5 py-3 text-gray-700">{project}</td>
                <td className="px-5 py-3 text-center font-bold text-tp-red">{size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Understanding Weight Limits</h2>

      <p>
        Every dumpster has both a <strong>volume limit</strong> (how much space it holds) and a <strong>weight limit</strong>{' '}
        (how heavy the contents can be). This distinction matters because some materials are much heavier than others:
      </p>

      <ul>
        <li><strong>Lightweight materials</strong> — Household junk, cardboard, wood, insulation, plastic → you&apos;ll fill the volume long before hitting the weight limit</li>
        <li><strong>Medium-weight materials</strong> — Drywall, roofing shingles, mixed construction debris → balance of volume and weight</li>
        <li><strong>Heavy materials</strong> — Concrete, brick, dirt, gravel, tile → you&apos;ll hit the weight limit with the dumpster only partially full</li>
      </ul>

      <div className="bg-red-50 border-l-4 border-tp-red p-5 rounded-r-xl my-8 not-prose">
        <p className="font-bold text-gray-900 mb-2">💡 Pro Tip</p>
        <p className="text-gray-700">
          If your project involves a mix of heavy and light materials, load the heavy stuff (concrete, dirt) first and
          fill the remaining space with lighter debris. And always tell your hauler about heavy materials upfront —
          it affects pricing and the truck&apos;s ability to safely transport the load.
        </p>
      </div>

      <h2>When in Doubt, Size Up</h2>

      <p>
        Here&apos;s the rule of thumb we share with every customer: <strong>when in doubt, go one size up</strong>. The
        price difference between sizes is relatively small compared to the cost and hassle of:
      </p>

      <ul>
        <li>Ordering a second dumpster because the first one filled up</li>
        <li>Paying overage fees for an overfilled container</li>
        <li>Dealing with excess debris piled next to a full dumpster</li>
        <li>Project delays while waiting for a swap or second delivery</li>
      </ul>

      <p>
        We&apos;d rather you have a little extra room than not enough. And with TP Dumpsters&apos; transparent pricing,
        you&apos;ll know exactly what each size costs before you commit.
      </p>

      <h2>Get the Right Dumpster from TP Dumpsters</h2>

      <p>
        Serving the entire Bay Area — including <Link href="/oakland">Oakland</Link>,{' '}
        <Link href="/concord">Concord</Link>, <Link href="/richmond">Richmond</Link>,{' '}
        <Link href="/hayward">Hayward</Link>, <Link href="/walnut-creek">Walnut Creek</Link>,{' '}
        <Link href="/san-leandro">San Leandro</Link>, and surrounding communities — <strong>TP Dumpsters</strong>{' '}
        makes it easy to get the right size at the right price.
      </p>

      <ul>
        <li><strong>Same-day delivery</strong> — Available across most Bay Area locations</li>
        <li><strong>Transparent, all-inclusive pricing</strong> — No hidden fees or surprise charges</li>
        <li><strong>Bilingual support</strong> — English and Spanish, always</li>
        <li><strong>Free sizing advice</strong> — Not sure? Call us and we&apos;ll recommend the best size for your project</li>
      </ul>

      <div className="bg-gray-900 text-white rounded-2xl p-6 md:p-8 my-10 not-prose">
        <div className="text-center">
          <p className="font-[var(--font-oswald)] text-2xl md:text-3xl font-bold mb-2">
            Not Sure Which Size? We&apos;ll Help.
          </p>
          <p className="text-gray-300 mb-5 max-w-lg mx-auto">
            Call us for free sizing advice or book online — choose your dumpster, pick a date, and we handle the rest.
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
