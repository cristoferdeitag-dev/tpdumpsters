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

export default function ConstructionDebrisDisposal() {
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-[var(--font-oswald)] prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-tp-red prose-a:no-underline hover:prose-a:underline">
      <p className="text-xl text-gray-600 leading-relaxed !mt-0">
        Every construction project generates waste — from framing scraps and drywall offcuts to old fixtures and packaging
        materials. Proper <strong>construction debris disposal</strong> isn&apos;t just about keeping your job site clean;
        it&apos;s a legal requirement in California with specific regulations about what goes where and how it must be handled.
      </p>

      <p>
        Whether you&apos;re a general contractor running multiple jobs, a specialty tradesperson, or a homeowner managing
        your own renovation, this guide covers everything you need to know about disposing of construction debris safely,
        legally, and affordably in the Bay Area.
      </p>

      <h2>Types of Construction Debris</h2>

      <SectionImage
        src="/images/dumpsters/worker-action.jpg"
        alt="Construction worker loading debris into roll-off dumpster"
      />

      <p>
        Construction and demolition (C&amp;D) waste encompasses a wide range of materials generated during building,
        renovation, and demolition projects. Understanding what you&apos;re dealing with is the first step toward proper
        disposal:
      </p>

      <h3>Structural Materials</h3>
      <ul>
        <li><strong>Lumber and wood framing</strong> — Studs, joists, plywood, OSB, and trim pieces</li>
        <li><strong>Concrete and masonry</strong> — Foundation pieces, blocks, bricks, mortar</li>
        <li><strong>Metal</strong> — Steel beams, rebar, flashing, ductwork, pipes</li>
        <li><strong>Drywall and plaster</strong> — Wall and ceiling materials from demolition or new construction</li>
      </ul>

      <h3>Finishing Materials</h3>
      <ul>
        <li><strong>Roofing</strong> — Shingles (asphalt, tile, or wood shake), underlayment, flashing</li>
        <li><strong>Flooring</strong> — Tile, hardwood, laminate, carpet, vinyl</li>
        <li><strong>Fixtures</strong> — Cabinets, countertops, sinks, tubs, toilets</li>
        <li><strong>Windows and doors</strong> — Frames, glass, hardware</li>
      </ul>

      <h3>Miscellaneous Job Site Waste</h3>
      <ul>
        <li><strong>Packaging</strong> — Cardboard, plastic wrap, banding, pallets</li>
        <li><strong>Insulation</strong> — Fiberglass batts, foam board, blown-in material</li>
        <li><strong>Wiring and electrical</strong> — Old wiring, outlet boxes, conduit</li>
        <li><strong>Plumbing</strong> — PVC, copper, cast iron pipes, old fixtures</li>
      </ul>

      <h2>California Construction Debris Regulations</h2>

      <p>
        California has some of the most progressive waste diversion laws in the country, and construction debris is a
        major focus. Here&apos;s what contractors and homeowners need to know:
      </p>

      <h3>CALGreen Building Standards (Title 24)</h3>

      <p>
        California&apos;s green building code requires that at least <strong>65% of construction and demolition
        debris</strong> be diverted from landfills through recycling, reuse, or salvage. This applies to:
      </p>

      <ul>
        <li>All new construction projects</li>
        <li>Renovations and alterations</li>
        <li>Demolition projects</li>
        <li>Both residential and commercial buildings</li>
      </ul>

      <p>
        Contractors must submit a waste management plan as part of the permit process in most Bay Area jurisdictions,
        documenting how C&amp;D waste will be handled and what percentage will be diverted.
      </p>

      <h3>AB 939 and SB 1383</h3>

      <p>
        These landmark laws set statewide waste reduction targets. AB 939 requires 50% waste diversion, while
        SB 1383 targets organic waste specifically. For construction projects, this means:
      </p>

      <ul>
        <li>Wood waste should be recycled or repurposed when possible</li>
        <li>Concrete and asphalt must be recycled rather than landfilled when practical</li>
        <li>Metal is almost always recyclable and should be separated</li>
        <li>Mixed loads going to transfer stations will be sorted for diversion</li>
      </ul>

      <div className="bg-red-50 border-l-4 border-tp-red p-5 rounded-r-xl my-8 not-prose">
        <p className="font-bold text-gray-900 mb-2">⚠️ Important for Contractors</p>
        <p className="text-gray-700">
          Failure to comply with California&apos;s C&amp;D waste diversion requirements can result in permit delays,
          fines, and difficulty passing final inspections. Working with a waste hauler like TP Dumpsters that routes
          debris to certified recycling facilities helps you stay compliant without extra effort.
        </p>
      </div>

      {/* CTA handled by page wrapper */}

      <h2>How to Sort Construction Debris</h2>

      <SectionImage
        src="/images/gallery/13.jpg"
        alt="Sorted construction materials ready for proper disposal"
      />

      <p>
        Sorting your construction debris at the job site saves money, improves recycling rates, and keeps your project
        compliant with California regulations. Here&apos;s how to do it efficiently:
      </p>

      <h3>Set Up a Sorting System</h3>

      <p>
        The most effective approach is to designate areas or containers for different material types right from the start
        of the project:
      </p>

      <ul>
        <li><strong>Clean wood</strong> — Untreated, unpainted lumber can be recycled into mulch, particle board, or biomass fuel</li>
        <li><strong>Metal</strong> — Always separate metals. Scrap yards pay for copper, aluminum, and steel, so this can actually offset your disposal costs</li>
        <li><strong>Concrete, brick, and masonry</strong> — These are crushed and recycled into aggregate for road base and fill material</li>
        <li><strong>Drywall</strong> — Clean, unpainted drywall can be recycled into new gypsum products</li>
        <li><strong>Mixed debris</strong> — Everything else goes in the general roll-off dumpster for sorting at the transfer station</li>
      </ul>

      <h3>Benefits of On-Site Sorting</h3>

      <ul>
        <li><strong>Lower disposal costs</strong> — Clean, single-material loads often cost less to dispose of than mixed loads</li>
        <li><strong>Easier compliance</strong> — Pre-sorted materials make it easier to document your diversion rate</li>
        <li><strong>Potential revenue</strong> — Scrap metal can be sold, offsetting some of your waste management costs</li>
        <li><strong>Cleaner job site</strong> — Organized waste management keeps the work area safer and more productive</li>
      </ul>

      <h2>Best Practices for Contractors</h2>

      <SectionImage
        src="/images/dumpsters/commercial-tarped.jpg"
        alt="Commercial construction dumpster properly tarped and ready for hauling"
      />

      <p>
        Whether you&apos;re running a small remodel or a major commercial build, these best practices for construction
        debris disposal will save you time, money, and headaches:
      </p>

      <h3>Plan Waste Management Before Breaking Ground</h3>

      <ul>
        <li>Estimate debris volume based on project scope — our <Link href="/blog/what-size-dumpster-do-i-need">sizing guide</Link> can help</li>
        <li>Order your dumpster before demo day so it&apos;s on-site when debris starts piling up</li>
        <li>Consider multiple dumpsters for large projects — one for heavy materials, one for general debris</li>
        <li>Schedule regular pickups for ongoing projects rather than waiting for containers to overflow</li>
      </ul>

      <h3>Keep Your Job Site Clean</h3>

      <ul>
        <li>Don&apos;t let debris accumulate on the ground — load it into the dumpster daily</li>
        <li>Position the dumpster close to the work area to minimize hauling distance</li>
        <li>Assign a crew member to manage waste at the end of each work day</li>
        <li>Keep the area around the dumpster clear for safe access</li>
      </ul>

      <h3>Know What Can&apos;t Go in the Dumpster</h3>

      <p>
        Even on a construction site, certain materials are prohibited from roll-off dumpsters. These include:
      </p>

      <ul>
        <li><strong>Asbestos-containing materials</strong> — Requires certified abatement and special disposal</li>
        <li><strong>Lead paint debris</strong> — Regulated as hazardous waste when generated in large quantities</li>
        <li><strong>Chemical solvents and adhesives</strong> — Must be disposed of through hazardous waste programs</li>
        <li><strong>Fuel and oil containers</strong> — Unless completely empty and dry</li>
      </ul>

      <p>
        For a complete list, see our article on{' '}
        <Link href="/blog/what-can-go-in-a-dumpster">what can and can&apos;t go in a dumpster</Link>.
      </p>

      <h2>Choosing the Right Dumpster for Construction Projects</h2>

      <p>
        For construction debris, dumpster selection depends on the type and volume of material:
      </p>

      <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        {[
          {
            size: '10 Yard',
            best: 'Small bathroom remodel, single-room renovation, minor repairs',
            note: 'Good for concrete/masonry (heavy but low volume)',
          },
          {
            size: '20 Yard',
            best: 'Kitchen remodels, roof tear-offs, multi-room renovations',
            note: 'Most popular for residential construction',
          },
          {
            size: '30 Yard',
            best: 'New construction waste, full demolitions, commercial projects',
            note: 'Handles large-volume materials like lumber and drywall',
          },
        ].map((item) => (
          <div key={item.size} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <p className="font-[var(--font-oswald)] text-xl font-bold text-tp-red text-center">{item.size}</p>
            <p className="text-gray-700 mt-3">{item.best}</p>
            <p className="text-gray-500 text-sm mt-2 italic">{item.note}</p>
          </div>
        ))}
      </div>

      <h2>TP Dumpsters: Trusted by Bay Area Contractors</h2>

      <p>
        Contractors across <Link href="/oakland">Oakland</Link>, <Link href="/concord">Concord</Link>,{' '}
        <Link href="/richmond">Richmond</Link>, <Link href="/hayward">Hayward</Link>, and the greater Bay Area
        rely on <strong>TP Dumpsters</strong> for reliable, hassle-free construction debris disposal. Here&apos;s why:
      </p>

      <ul>
        <li><strong>Same-day delivery</strong> — Get a dumpster on-site fast so your project stays on schedule</li>
        <li><strong>Flexible scheduling</strong> — Regular pickups and swaps for ongoing projects</li>
        <li><strong>Transparent pricing</strong> — All-inclusive quotes with no hidden fees. We include delivery, rental, and disposal.</li>
        <li><strong>Bilingual support</strong> — Our team speaks English and Spanish, serving our diverse Bay Area construction community</li>
        <li><strong>Compliant disposal</strong> — We route C&amp;D waste to certified recycling and transfer facilities</li>
        <li><strong>Contractor-friendly service</strong> — We understand job site logistics and work around your schedule</li>
      </ul>

      <p>
        Need a dumpster for your next project? <Link href="/booking">Book online</Link> or call{' '}
        <a href="tel:+15106502083"><strong>(510) 650-2083</strong></a> for a free quote.
      </p>

      <div className="bg-gray-900 text-white rounded-2xl p-6 md:p-8 my-10 not-prose">
        <div className="text-center">
          <p className="font-[var(--font-oswald)] text-2xl md:text-3xl font-bold mb-2">
            Construction Dumpster Rentals Made Easy
          </p>
          <p className="text-gray-300 mb-5 max-w-lg mx-auto">
            Same-day delivery. Transparent pricing. Trusted by contractors across the Bay Area.
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
