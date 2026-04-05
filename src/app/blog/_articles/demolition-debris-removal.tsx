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

export default function DemolitionDebrisRemoval() {
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-[var(--font-oswald)] prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-tp-red prose-a:no-underline hover:prose-a:underline">
      <p className="text-xl text-gray-600 leading-relaxed !mt-0">
        Demolition projects are exciting — tearing out the old to make way for something better. But all that excitement
        comes with a serious amount of debris. From interior gut jobs to full structure teardowns,{' '}
        <strong>demolition debris removal</strong> is one of the most critical aspects of project planning that often
        gets overlooked until the rubble starts piling up.
      </p>

      <p>
        This guide covers everything you need to know about planning, managing, and disposing of demolition debris in
        the Bay Area — from permits and safety to choosing the right dumpster for the job. At <strong>TP Dumpsters</strong>,
        we&apos;ve helped contractors and homeowners across <Link href="/oakland">Oakland</Link>,{' '}
        <Link href="/concord">Concord</Link>, <Link href="/richmond">Richmond</Link>, and the greater Bay Area
        manage demolition waste efficiently and affordably.
      </p>

      <h2>Planning Your Demolition Project</h2>

      <SectionImage
        src="/images/gallery/demolition-03.jpg"
        alt="Active demolition project with debris management in progress"
      />

      <p>
        Whether you&apos;re knocking down a garage, gutting a kitchen, or doing a complete interior strip-out, proper
        planning makes the difference between a smooth project and a chaotic one. Here&apos;s how to plan your
        demolition debris removal:
      </p>

      <h3>1. Assess the Scope</h3>

      <p>
        Before swinging a sledgehammer, walk through the space and inventory what&apos;s coming out:
      </p>

      <ul>
        <li><strong>Structural elements</strong> — Walls, framing, subfloor, ceiling materials</li>
        <li><strong>Fixtures and finishes</strong> — Cabinets, countertops, tile, flooring, trim</li>
        <li><strong>Mechanical systems</strong> — Old plumbing, wiring, ductwork, HVAC units</li>
        <li><strong>Exterior elements</strong> — Siding, roofing, concrete, masonry, fencing</li>
      </ul>

      <p>
        This inventory helps you estimate the volume of debris you&apos;ll generate and choose the right dumpster size.
        For most interior demolitions, a <strong>20-yard dumpster</strong> handles the job. Full structure teardowns
        or large-scale demos typically call for a <strong>30-yard dumpster</strong> — or multiple containers on rotation.
      </p>

      <h3>2. Check for Hazardous Materials</h3>

      <p>
        Before any demolition begins, especially in older buildings (pre-1980), you must check for hazardous materials:
      </p>

      <ul>
        <li><strong>Asbestos</strong> — Found in insulation, floor tiles, popcorn ceilings, pipe wrap, and siding in homes built before 1980. California law requires testing before demolition and certified abatement if present.</li>
        <li><strong>Lead paint</strong> — Common in homes built before 1978. Demolition that disturbs lead paint creates hazardous dust requiring special handling.</li>
        <li><strong>Mold</strong> — Especially in water-damaged areas. Disturbing mold during demo can spread spores and create health hazards.</li>
      </ul>

      <div className="bg-red-50 border-l-4 border-tp-red p-5 rounded-r-xl my-8 not-prose">
        <p className="font-bold text-gray-900 mb-2">⚠️ Important Safety Warning</p>
        <p className="text-gray-700">
          Never demolish a structure without first checking for asbestos and lead paint — it&apos;s not just dangerous,
          it&apos;s illegal in California. Hire a certified inspector before starting any demolition on pre-1980 buildings.
          Hazardous materials cannot go in a standard roll-off dumpster and require specialized disposal.
        </p>
      </div>

      <h3>3. Obtain Necessary Permits</h3>

      <p>
        Most demolition work in Bay Area cities requires permits. Here&apos;s what to expect:
      </p>

      <ul>
        <li><strong>Demolition permits</strong> — Required for structural demolition in virtually all Bay Area jurisdictions. Costs vary by city and project scope.</li>
        <li><strong>Utility disconnection</strong> — You must disconnect gas, electric, water, and sewer before structural demolition. Coordinate with PG&amp;E and your local water district.</li>
        <li><strong>Encroachment permits</strong> — If your dumpster will be placed on a public street or sidewalk, most cities require an encroachment permit.</li>
        <li><strong>Environmental review</strong> — Larger demolitions may require CEQA (California Environmental Quality Act) review.</li>
        <li><strong>Waste management plan</strong> — California requires a plan showing how you&apos;ll divert at least 65% of C&amp;D waste from landfills.</li>
      </ul>

      <p>
        Check with your local building department for specific requirements. In <Link href="/oakland">Oakland</Link>,
        permits are handled through the Planning &amp; Building Department. <Link href="/concord">Concord</Link> and
        other Contra Costa County cities have their own permitting processes.
      </p>

      {/* CTA handled by page wrapper */}

      <h2>What Goes in a Demolition Dumpster</h2>

      <SectionImage
        src="/images/gallery/14.jpg"
        alt="Roll-off dumpster filled with demolition materials"
      />

      <p>
        A standard roll-off dumpster can handle the vast majority of demolition debris. Here&apos;s what&apos;s typically accepted:
      </p>

      <h3>✅ Accepted Demolition Materials</h3>

      <ul>
        <li>Lumber, plywood, and wood framing (untreated)</li>
        <li>Drywall, plaster, and lath</li>
        <li>Concrete, brick, and block (note: very heavy — inform your hauler)</li>
        <li>Roofing shingles and underlayment</li>
        <li>Tile, stone, and masonry</li>
        <li>Metal (framing, ductwork, pipes, rebar)</li>
        <li>Carpet and padding</li>
        <li>Vinyl and laminate flooring</li>
        <li>Cabinets, doors, and window frames</li>
        <li>Insulation (non-asbestos)</li>
      </ul>

      <h3>❌ Prohibited Materials</h3>

      <ul>
        <li>Asbestos-containing materials (requires specialized disposal)</li>
        <li>Lead paint chips and dust in large quantities (hazardous waste)</li>
        <li>Chemical solvents, adhesives, and coatings</li>
        <li>Fluorescent light tubes and ballasts (contain mercury)</li>
        <li>Refrigerators, AC units, and appliances with refrigerant (require Freon removal first)</li>
      </ul>

      <p>
        For the full list of accepted and prohibited items, see our detailed guide:{' '}
        <Link href="/blog/what-can-go-in-a-dumpster">What Can (and Can&apos;t) Go in a Dumpster</Link>.
      </p>

      <h2>Safety During Demolition</h2>

      <p>
        Demolition is inherently dangerous work. Whether you&apos;re a professional contractor or a DIY homeowner,
        follow these safety essentials:
      </p>

      <h3>Personal Protective Equipment (PPE)</h3>

      <ul>
        <li><strong>Hard hat</strong> — Falling debris is the #1 risk on any demo site</li>
        <li><strong>Safety glasses or goggles</strong> — Protect against dust, fragments, and splinters</li>
        <li><strong>N95 or P100 respirator</strong> — Essential for dust control, especially with drywall, concrete, and insulation</li>
        <li><strong>Heavy-duty gloves</strong> — Protect hands from sharp edges, nails, and splinters</li>
        <li><strong>Steel-toe boots</strong> — Dropped materials and exposed nails are constant hazards</li>
        <li><strong>Hearing protection</strong> — Power tools and impact noise can cause permanent hearing damage</li>
      </ul>

      <h3>Job Site Safety</h3>

      <ul>
        <li>Ensure all utilities are disconnected before starting structural demolition</li>
        <li>Work from top to bottom — remove upper floors/roof before lower walls</li>
        <li>Never undercut a wall or remove structural supports without a plan</li>
        <li>Keep the dumpster close to the work area to minimize carrying distance</li>
        <li>Clean debris as you go — don&apos;t let it accumulate on floors where people are working</li>
        <li>Never work alone on structural demolition</li>
      </ul>

      <h2>Demolition Timeline &amp; Dumpster Scheduling</h2>

      <SectionImage
        src="/images/gallery/jobsite-05.jpg"
        alt="Active construction job site with roll-off dumpster for debris"
      />

      <p>
        Coordinating your dumpster rental with your demolition timeline is crucial for maintaining productivity
        and keeping costs down:
      </p>

      <h3>Small Interior Demo (1-3 days)</h3>
      <p>
        Single room or bathroom gut: Order a 10 or 20-yard dumpster to arrive the morning of demo day.
        A standard 3-5 day rental is usually sufficient.
      </p>

      <h3>Medium Renovation Demo (3-7 days)</h3>
      <p>
        Multi-room gut or kitchen/bath combo: A 20-yard dumpster with a 7-day rental covers most projects.
        If you&apos;re doing the demo in phases, you can load as you go throughout the week.
      </p>

      <h3>Large-Scale Demolition (1-3 weeks)</h3>
      <p>
        Full structure teardown or major commercial demo: Plan for a 30-yard dumpster with regular swap-outs.
        TP Dumpsters offers flexible scheduling with pick-up-and-replace service — when one container is full,
        we swap it for an empty one so your project never stops.
      </p>

      <h2>TP Dumpsters: Your Demolition Partner</h2>

      <p>
        Demolition projects need a waste management partner that&apos;s reliable, responsive, and understands the
        pace of construction. <strong>TP Dumpsters</strong> delivers:
      </p>

      <ul>
        <li><strong>Same-day delivery</strong> — Demo day arrives faster than expected? We can get a dumpster to you fast.</li>
        <li><strong>Flexible swap-outs</strong> — Full container? We&apos;ll replace it with an empty one, often same-day.</li>
        <li><strong>Transparent pricing</strong> — One all-inclusive price. No surprises when the invoice arrives.</li>
        <li><strong>Bilingual support</strong> — English and Spanish, serving our diverse Bay Area community.</li>
        <li><strong>Compliant disposal</strong> — We route demo debris to certified C&amp;D recycling facilities to help you meet California&apos;s 65% diversion requirement.</li>
      </ul>

      <p>
        We serve contractors and homeowners across <Link href="/oakland">Oakland</Link>,{' '}
        <Link href="/concord">Concord</Link>, <Link href="/richmond">Richmond</Link>,{' '}
        <Link href="/hayward">Hayward</Link>, <Link href="/walnut-creek">Walnut Creek</Link>,{' '}
        <Link href="/san-leandro">San Leandro</Link>, and communities throughout the Bay Area.
      </p>

      <div className="bg-gray-900 text-white rounded-2xl p-6 md:p-8 my-10 not-prose">
        <div className="text-center">
          <p className="font-[var(--font-oswald)] text-2xl md:text-3xl font-bold mb-2">
            Demolition Project Coming Up?
          </p>
          <p className="text-gray-300 mb-5 max-w-lg mx-auto">
            Get your dumpster on-site before the first swing. Same-day delivery, transparent pricing, flexible swap-outs.
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
