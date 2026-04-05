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

export default function YardWasteDisposal() {
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-[var(--font-oswald)] prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-tp-red prose-a:no-underline hover:prose-a:underline">
      <p className="text-xl text-gray-600 leading-relaxed !mt-0">
        Whether you&apos;re trimming overgrown trees, clearing a backyard, or doing a full landscaping overhaul,{' '}
        <strong>yard waste disposal</strong> is one of those tasks that can quickly get out of hand. A few bags of leaves
        turn into mountains of branches, grass clippings, and debris — and suddenly your green waste bin isn&apos;t
        cutting it anymore.
      </p>

      <p>
        In California, yard waste disposal comes with specific rules and regulations that every homeowner should know.
        This guide covers everything from state requirements to the best disposal options, including how{' '}
        <strong>TP Dumpsters</strong> can make your yard cleanup fast, affordable, and hassle-free.
      </p>

      <h2>What Counts as Yard Waste?</h2>

      <SectionImage
        src="/images/dumpsters/yard-waste-driveway.jpg"
        alt="Yard waste and green debris in dumpster rental on residential driveway"
      />

      <p>
        Yard waste — also called green waste or organic waste — includes any plant-based material generated from
        maintaining your lawn, garden, or landscape. Common types include:
      </p>

      <ul>
        <li><strong>Grass clippings</strong> — From regular mowing and lawn maintenance</li>
        <li><strong>Leaves and small branches</strong> — Seasonal cleanup and tree trimming</li>
        <li><strong>Shrub and hedge trimmings</strong> — Pruning and shaping overgrown plants</li>
        <li><strong>Tree limbs and trunks</strong> — Storm damage, tree removal, or landscaping changes</li>
        <li><strong>Weeds and dead plants</strong> — Garden bed maintenance and clearing</li>
        <li><strong>Flowers and organic garden debris</strong> — End-of-season cleanups</li>
        <li><strong>Soil and dirt</strong> — From regrading, garden projects, or excavation (note: soil is heavy and may have weight limit implications)</li>
      </ul>

      <p>
        It&apos;s important to know that <strong>treated or painted wood</strong>, <strong>stumps with root balls
        still attached</strong>, and <strong>soil contaminated with chemicals</strong> are generally not accepted as
        standard yard waste and may require special disposal.
      </p>

      <h2>California Yard Waste Rules: What You Need to Know</h2>

      <p>
        California has some of the strictest organic waste regulations in the country, and they&apos;ve gotten even more
        significant in recent years. Here&apos;s what Bay Area homeowners need to understand:
      </p>

      <h3>SB 1383: California&apos;s Organic Waste Law</h3>

      <p>
        Senate Bill 1383, which went into full effect in 2022, requires all California residents and businesses to
        separate organic waste — including yard waste — from regular trash. The goal is to reduce methane emissions from
        landfills by diverting 75% of organic waste by 2025. This means:
      </p>

      <ul>
        <li>You <strong>must</strong> use your green waste bin for yard debris — it can&apos;t go in the regular trash</li>
        <li>Cities and counties are required to provide organic waste collection services</li>
        <li>Contaminating your green bin with non-organic materials (plastic bags, treated wood) can result in service refusal or fines</li>
        <li>Large amounts of yard waste that don&apos;t fit in curbside bins need alternative disposal methods</li>
      </ul>

      <div className="bg-red-50 border-l-4 border-tp-red p-5 rounded-r-xl my-8 not-prose">
        <p className="font-bold text-gray-900 mb-2">🌿 Good to Know</p>
        <p className="text-gray-700">
          California&apos;s green waste regulations are designed to turn yard debris into compost and mulch rather
          than letting it decompose in landfills and produce greenhouse gases. When you use a dumpster for yard waste,
          reputable haulers like TP Dumpsters sort and divert recyclable green waste to composting facilities.
        </p>
      </div>

      <h3>Local Bay Area Rules</h3>

      <p>
        Each city and county in the Bay Area has slightly different rules for yard waste collection. In{' '}
        <Link href="/oakland">Oakland</Link>, residents get biweekly green waste pickup. In{' '}
        <Link href="/concord">Concord</Link> and most Contra Costa County cities, weekly green bin service is included.
        But regardless of where you are, the curbside green bin has a limit — usually 96 gallons per pickup.
      </p>

      <p>
        For large projects — tree removal, major landscaping, storm cleanup — a single green bin simply isn&apos;t
        enough. That&apos;s where a yard waste dumpster rental becomes the practical solution.
      </p>

      <h2>Yard Waste Disposal Options Compared</h2>

      <SectionImage
        src="/images/gallery/10.jpg"
        alt="Large-scale yard waste cleanup using roll-off dumpster"
      />

      <p>
        When you have more yard waste than your curbside bin can handle, you&apos;ve got several options. Here&apos;s
        how they compare:
      </p>

      <h3>Option 1: Curbside Green Waste Bin</h3>

      <ul>
        <li><strong>Best for:</strong> Regular weekly maintenance — mowing, light pruning, seasonal leaf cleanup</li>
        <li><strong>Capacity:</strong> 96 gallons (about 3-4 bags)</li>
        <li><strong>Cost:</strong> Included in your waste service fee</li>
        <li><strong>Limitations:</strong> Not enough for large projects; items must fit in the bin with the lid closed</li>
      </ul>

      <h3>Option 2: Municipal Drop-Off / Transfer Station</h3>

      <ul>
        <li><strong>Best for:</strong> Medium amounts that don&apos;t warrant a dumpster rental</li>
        <li><strong>Capacity:</strong> Depends on your vehicle — truck bed, trailer, etc.</li>
        <li><strong>Cost:</strong> Typically charged by weight or per load (varies by facility)</li>
        <li><strong>Limitations:</strong> Requires hauling it yourself, may have limited hours, can involve long wait times</li>
      </ul>

      <h3>Option 3: Dumpster Rental (Best for Large Projects)</h3>

      <ul>
        <li><strong>Best for:</strong> Tree removal, full landscaping overhauls, storm damage, large property cleanups</li>
        <li><strong>Capacity:</strong> 10 to 30 cubic yards depending on the dumpster size</li>
        <li><strong>Cost:</strong> All-inclusive pricing covering delivery, rental period, and disposal</li>
        <li><strong>Advantages:</strong> Dropped off at your property, fill at your own pace, we handle the hauling and disposal</li>
      </ul>

      {/* CTA handled by page wrapper */}

      <h2>When You Need a Dumpster for Yard Waste</h2>

      <p>
        A dumpster rental makes the most sense for yard waste projects that generate more than a few bags of debris.
        Here are common scenarios where our customers find a roll-off dumpster essential:
      </p>

      <ul>
        <li><strong>Tree removal or major pruning</strong> — A single large tree can generate 5-10 cubic yards of branches and debris</li>
        <li><strong>Landscaping overhaul</strong> — Ripping out old landscaping to start fresh (bushes, plants, old mulch, small trees)</li>
        <li><strong>Storm damage cleanup</strong> — Fallen branches, debris, and damaged vegetation after Bay Area storms</li>
        <li><strong>Seasonal deep clean</strong> — Annual fall cleanup on larger properties with multiple trees</li>
        <li><strong>Property clearing</strong> — Preparing land for construction, new landscaping, or sale</li>
        <li><strong>Garden renovation</strong> — Removing old raised beds, garden structures, and accumulated organic material</li>
      </ul>

      <p>
        For most residential yard waste projects, a <strong>10-yard dumpster</strong> (12&apos; × 8&apos; × 2.5&apos;) is
        sufficient. For larger jobs like full property clearing or tree removal, a{' '}
        <strong>20-yard dumpster</strong> (16&apos; × 8&apos; × 4&apos;) gives you plenty of room. Check our{' '}
        <Link href="/blog/what-size-dumpster-do-i-need">sizing guide</Link> for detailed recommendations.
      </p>

      <h2>Green Waste Recycling: What Happens to Your Yard Waste</h2>

      <SectionImage
        src="/images/gallery/11.jpg"
        alt="Green waste being processed for composting and recycling"
      />

      <p>
        One of the benefits of proper yard waste disposal is that most of it doesn&apos;t end up in a landfill. In
        California, green waste is diverted to composting and mulching facilities where it&apos;s transformed into
        useful products:
      </p>

      <ul>
        <li><strong>Compost</strong> — Decomposed green waste becomes nutrient-rich soil amendment used by farmers, landscapers, and gardeners</li>
        <li><strong>Mulch</strong> — Chipped wood and branches become ground cover that helps retain moisture and prevent weeds</li>
        <li><strong>Biomass energy</strong> — Some facilities convert woody green waste into renewable energy</li>
      </ul>

      <p>
        When you rent from <strong>TP Dumpsters</strong>, your yard waste is taken to appropriate facilities where it&apos;s
        sorted and diverted for recycling. We&apos;re committed to responsible waste management and comply with all
        California environmental regulations.
      </p>

      <h2>Tips for Efficient Yard Waste Disposal</h2>

      <p>
        Whether you&apos;re using a dumpster, hauling to a transfer station, or working with curbside service, these
        tips will help you manage yard waste more efficiently:
      </p>

      <ul>
        <li><strong>Break down branches</strong> — Cut large branches into 4-foot lengths or smaller for easier loading and better space utilization</li>
        <li><strong>Don&apos;t bag it</strong> — When using a dumpster, throw green waste in loose (no plastic bags). This makes disposal and recycling easier</li>
        <li><strong>Separate soil from vegetation</strong> — Soil is much heavier than plant material. If you&apos;re dealing with both, let your hauler know so they can advise on weight limits</li>
        <li><strong>Watch for prohibited items</strong> — Don&apos;t mix in treated lumber, painted wood, or any non-organic materials with your green waste</li>
        <li><strong>Consider composting</strong> — For small amounts of grass and leaves, a backyard compost bin reduces what you need to haul away</li>
        <li><strong>Time your rental</strong> — Order your dumpster to arrive the morning of your project so you can load as you work</li>
      </ul>

      <h2>TP Dumpsters: Your Bay Area Yard Waste Solution</h2>

      <p>
        At <strong>TP Dumpsters</strong>, we handle yard waste projects of every size across the Bay Area. From a
        weekend backyard cleanup in <Link href="/richmond">Richmond</Link> to a full property clearing in{' '}
        <Link href="/concord">Concord</Link>, we&apos;ve got the right dumpster for the job.
      </p>

      <p>Here&apos;s what makes us different:</p>

      <ul>
        <li><strong>Same-day delivery</strong> — Book by mid-morning and get your dumpster the same day</li>
        <li><strong>Transparent pricing</strong> — One price covers delivery, rental, and disposal. No surprise fees</li>
        <li><strong>Bilingual support</strong> — Our team speaks English and Spanish fluently</li>
        <li><strong>Responsible disposal</strong> — We divert green waste to recycling and composting facilities</li>
        <li><strong>Flexible scheduling</strong> — Rent for a day or a week — whatever your project needs</li>
      </ul>

      <p>
        Ready to tackle that yard project? <Link href="/booking">Book your dumpster online</Link> in minutes
        or call us at <a href="tel:+15106502083"><strong>(510) 650-2083</strong></a>. We serve{' '}
        <Link href="/oakland">Oakland</Link>, <Link href="/concord">Concord</Link>,{' '}
        <Link href="/richmond">Richmond</Link>, <Link href="/hayward">Hayward</Link>,{' '}
        <Link href="/walnut-creek">Walnut Creek</Link>, <Link href="/san-leandro">San Leandro</Link>, and
        communities throughout the Bay Area.
      </p>

      <div className="bg-gray-900 text-white rounded-2xl p-6 md:p-8 my-10 not-prose">
        <div className="text-center">
          <p className="font-[var(--font-oswald)] text-2xl md:text-3xl font-bold mb-2">
            Yard Waste Piling Up? We Can Help.
          </p>
          <p className="text-gray-300 mb-5 max-w-lg mx-auto">
            Same-day dumpster delivery for yard cleanups, tree removal, and landscaping projects across the Bay Area.
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
