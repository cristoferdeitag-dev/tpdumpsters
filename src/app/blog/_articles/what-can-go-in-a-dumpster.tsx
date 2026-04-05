import Image from 'next/image';
import Link from 'next/link';
import { FiCheckCircle, FiXCircle, FiPhone, FiChevronRight } from 'react-icons/fi';
import { InlineCTA } from '../[slug]/page';

function SectionImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden my-8 shadow-lg">
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}

export default function WhatCanGoInDumpster() {
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-[var(--font-oswald)] prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-tp-red prose-a:no-underline hover:prose-a:underline">
      <p className="text-xl text-gray-600 leading-relaxed !mt-0">
        One of the most common questions we get at <strong>TP Dumpsters</strong> is: &quot;<strong>What can I actually
        put in the dumpster?</strong>&quot; It&apos;s an important question — tossing the wrong items can result in
        extra fees, service refusal, or even legal penalties under California regulations.
      </p>

      <p>
        This comprehensive guide covers exactly what&apos;s accepted in a standard roll-off dumpster, what&apos;s
        prohibited, and how to handle items that need special disposal. Knowing the rules upfront saves you money,
        avoids headaches, and keeps your project running smoothly.
      </p>

      <h2>What CAN Go in a Dumpster</h2>

      <SectionImage
        src="/images/dumpsters/truck-dumping.jpg"
        alt="Roll-off dumpster being emptied at disposal facility"
      />

      <p>
        The good news? Most of the debris from typical cleanout, renovation, construction, and landscaping projects
        is perfectly acceptable in a standard roll-off dumpster. Here&apos;s a comprehensive list:
      </p>

      <h3>Household Items</h3>

      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
        {[
          'Furniture (couches, tables, chairs, desks, bed frames)',
          'Mattresses and box springs',
          'Clothing and textiles',
          'Books, papers, and cardboard',
          'Kitchenware (pots, pans, dishes)',
          'Small appliances (microwaves, toasters, blenders)',
          'Toys and sports equipment',
          'Luggage and bags',
          'Lamps and light fixtures (remove bulbs)',
          'Rugs and carpets',
        ].map((item) => (
          <div key={item} className="flex items-start gap-2 text-gray-700">
            <FiCheckCircle className="text-green-600 mt-0.5 shrink-0 w-[18px] h-[18px]" />
            <span className="text-sm">{item}</span>
          </div>
        ))}
      </div>

      <h3>Construction &amp; Renovation Debris</h3>

      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
        {[
          'Lumber and wood (untreated and treated)',
          'Drywall and plaster',
          'Concrete, brick, and block (heavy — note weight limits)',
          'Roofing shingles and underlayment',
          'Tile and stone',
          'Vinyl and laminate flooring',
          'Carpet and padding',
          'Cabinets and countertops',
          'Doors and window frames',
          'Insulation (non-asbestos)',
          'Metal framing, ductwork, and pipes',
          'Wiring and electrical conduit',
          'PVC and plastic pipe',
          'Nails, screws, and hardware',
        ].map((item) => (
          <div key={item} className="flex items-start gap-2 text-gray-700">
            <FiCheckCircle className="text-green-600 mt-0.5 shrink-0 w-[18px] h-[18px]" />
            <span className="text-sm">{item}</span>
          </div>
        ))}
      </div>

      <h3>Yard Waste &amp; Landscaping Debris</h3>

      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
        {[
          'Branches, limbs, and tree trunks',
          'Leaves and grass clippings',
          'Shrub and hedge trimmings',
          'Weeds and dead plants',
          'Mulch and wood chips',
          'Soil and dirt (very heavy — watch weight limits)',
          'Sod and turf',
          'Small stumps and root balls',
          'Fencing and lattice',
          'Landscape timbers',
        ].map((item) => (
          <div key={item} className="flex items-start gap-2 text-gray-700">
            <FiCheckCircle className="text-green-600 mt-0.5 shrink-0 w-[18px] h-[18px]" />
            <span className="text-sm">{item}</span>
          </div>
        ))}
      </div>

      <p>
        For more on handling yard waste specifically, check out our{' '}
        <Link href="/blog/yard-waste-disposal">yard waste disposal guide</Link>.
      </p>

      <h3>Large Appliances (With Conditions)</h3>

      <p>
        Most large appliances can go in a dumpster, but there&apos;s an important exception:
      </p>

      <ul>
        <li><strong>Washers &amp; dryers</strong> — ✅ Accepted</li>
        <li><strong>Dishwashers</strong> — ✅ Accepted</li>
        <li><strong>Stoves &amp; ovens</strong> — ✅ Accepted</li>
        <li><strong>Water heaters</strong> — ✅ Accepted</li>
        <li><strong>Refrigerators &amp; freezers</strong> — ⚠️ Only AFTER refrigerant (Freon) has been professionally removed and certified</li>
        <li><strong>Air conditioning units</strong> — ⚠️ Same as refrigerators — refrigerant must be removed first</li>
      </ul>

      {/* CTA handled by page wrapper */}

      <h2>What CANNOT Go in a Dumpster</h2>

      <SectionImage
        src="/images/gallery/15.png"
        alt="Prohibited items that cannot be placed in a roll-off dumpster"
      />

      <p>
        Certain materials are prohibited from standard roll-off dumpsters due to environmental regulations, safety
        hazards, or disposal requirements. In California, these restrictions are stricter than in many other states.
        Here&apos;s what you <strong>cannot</strong> put in your dumpster:
      </p>

      <h3>Hazardous Materials</h3>

      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
        {[
          'Paint (latex and oil-based)',
          'Solvents, thinners, and strippers',
          'Pesticides and herbicides',
          'Motor oil and automotive fluids',
          'Gasoline, kerosene, and propane',
          'Cleaning chemicals and pool chemicals',
          'Adhesives and epoxies',
          'Antifreeze and transmission fluid',
        ].map((item) => (
          <div key={item} className="flex items-start gap-2 text-gray-700">
            <FiXCircle className="text-red-600 mt-0.5 shrink-0 w-[18px] h-[18px]" />
            <span className="text-sm">{item}</span>
          </div>
        ))}
      </div>

      <h3>Batteries &amp; Electronics</h3>

      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
        {[
          'Car batteries and lithium batteries',
          'Household batteries (AA, AAA, 9V, etc.)',
          'Computers, monitors, and laptops',
          'TVs and screens',
          'Cell phones and tablets',
          'Printers and electronics with circuit boards',
        ].map((item) => (
          <div key={item} className="flex items-start gap-2 text-gray-700">
            <FiXCircle className="text-red-600 mt-0.5 shrink-0 w-[18px] h-[18px]" />
            <span className="text-sm">{item}</span>
          </div>
        ))}
      </div>

      <h3>Tires</h3>

      <p>
        Tires are banned from California landfills and cannot go in a standard dumpster. They must be taken to a
        licensed tire recycler. Most tire shops accept old tires (sometimes for a small fee). If you have a large
        quantity, contact your local waste management agency for commercial tire recycling options.
      </p>

      <h3>Medical &amp; Biological Waste</h3>

      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
        {[
          'Needles, syringes, and sharps',
          'Medical waste and biohazard materials',
          'Pharmaceutical medications',
          'Animal carcasses',
        ].map((item) => (
          <div key={item} className="flex items-start gap-2 text-gray-700">
            <FiXCircle className="text-red-600 mt-0.5 shrink-0 w-[18px] h-[18px]" />
            <span className="text-sm">{item}</span>
          </div>
        ))}
      </div>

      <h3>Asbestos-Containing Materials</h3>

      <p>
        Asbestos cannot go in any standard dumpster. It requires certified abatement by a licensed professional and
        disposal at a facility permitted to accept asbestos waste. If your renovation involves a pre-1980 building,
        have materials tested before demolition.
      </p>

      <div className="bg-red-50 border-l-4 border-tp-red p-5 rounded-r-xl my-8 not-prose">
        <p className="font-bold text-gray-900 mb-2">⚠️ California Penalty Warning</p>
        <p className="text-gray-700">
          Illegally disposing of hazardous materials in California can result in fines ranging from $1,000 to $70,000
          per violation, plus criminal penalties for serious offenses. It&apos;s not worth the risk — always dispose
          of prohibited items through proper channels.
        </p>
      </div>

      <h2>How to Dispose of Prohibited Items</h2>

      <p>
        So what do you do with items that can&apos;t go in the dumpster? Here are California-specific resources:
      </p>

      <h3>Household Hazardous Waste (HHW)</h3>

      <p>
        Every county in the Bay Area operates household hazardous waste collection programs. These accept paint,
        chemicals, batteries, electronics, and other prohibited items — usually for free:
      </p>

      <ul>
        <li><strong>Alameda County</strong> — HHW facilities in Oakland and Livermore, plus mobile collection events</li>
        <li><strong>Contra Costa County</strong> — HHW collection at transfer stations in Martinez, Richmond, and other locations</li>
        <li><strong>San Francisco</strong> — Recology HHW drop-off facility</li>
      </ul>

      <h3>Electronics Recycling (E-Waste)</h3>

      <p>
        California&apos;s e-waste law (SB 20) requires electronics to be recycled, not landfilled. Free drop-off
        options include:
      </p>

      <ul>
        <li>Best Buy and Staples accept most electronics for free recycling</li>
        <li>County e-waste collection events</li>
        <li>Certified e-waste recyclers (search CalRecycle&apos;s database)</li>
      </ul>

      <h3>Paint</h3>

      <p>
        California participates in the PaintCare program, which provides free drop-off locations for leftover paint
        at participating retailers including many hardware stores, paint stores, and transfer stations.
      </p>

      <h2>Sorting Tips to Avoid Extra Charges</h2>

      <SectionImage
        src="/images/gallery/residential-04.jpg"
        alt="Well-organized dumpster loading at residential property"
      />

      <p>
        Proper sorting before and during loading helps you avoid fees and makes disposal more efficient:
      </p>

      <ul>
        <li><strong>Separate prohibited items first</strong> — Before you start loading the dumpster, set aside anything that can&apos;t go in. Create a separate pile for HHW, electronics, and tires.</li>
        <li><strong>Check containers</strong> — Empty paint cans are sometimes accepted; full ones never are. When in doubt, ask your hauler.</li>
        <li><strong>Remove refrigerant before discarding appliances</strong> — Have a certified technician remove Freon from refrigerators and AC units, then they can go in the dumpster.</li>
        <li><strong>Separate metals</strong> — Scrap metal can often be recycled for money. Separate copper, aluminum, and steel from general debris.</li>
        <li><strong>Don&apos;t hide prohibited items</strong> — Burying banned materials under regular debris doesn&apos;t work. Transfer stations inspect loads, and finding prohibited items causes delays and fees.</li>
      </ul>

      <h2>TP Dumpsters: Clear Rules, No Surprises</h2>

      <p>
        At <strong>TP Dumpsters</strong>, we want you to know exactly what&apos;s allowed before you start loading.
        Our team is always available to answer questions about specific items — just call{' '}
        <a href="tel:+15106502083"><strong>(510) 650-2083</strong></a> or reach out through our{' '}
        <Link href="/booking">booking page</Link>. We&apos;re bilingual (English &amp; Spanish) and happy to help.
      </p>

      <p>
        We serve the entire Bay Area, including <Link href="/oakland">Oakland</Link>,{' '}
        <Link href="/concord">Concord</Link>, <Link href="/richmond">Richmond</Link>,{' '}
        <Link href="/hayward">Hayward</Link>, <Link href="/walnut-creek">Walnut Creek</Link>,{' '}
        <Link href="/san-leandro">San Leandro</Link>, and surrounding communities. Same-day delivery,
        transparent pricing, no hidden fees — that&apos;s the TP Dumpsters way.
      </p>

      <div className="bg-gray-900 text-white rounded-2xl p-6 md:p-8 my-10 not-prose">
        <div className="text-center">
          <p className="font-[var(--font-oswald)] text-2xl md:text-3xl font-bold mb-2">
            Questions About What Goes in the Dumpster?
          </p>
          <p className="text-gray-300 mb-5 max-w-lg mx-auto">
            Call our team for quick answers — or book online and we&apos;ll confirm everything before delivery.
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
