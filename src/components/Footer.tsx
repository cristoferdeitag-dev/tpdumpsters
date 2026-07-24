// Sitewide footer. Beyond contact info, this carries the internal-linking
// backbone for SEO: every page links down to the top service-area pages, the
// county hubs and the 8 service pages, so PageRank flows to the city pages
// (previously orphaned ~4 clicks from the home with ~1 internal link each).

const SERVICE_AREAS: { label: string; href: string }[] = [
  { label: "Oakland", href: "/oakland" },
  { label: "Concord", href: "/concord" },
  { label: "Richmond", href: "/richmond" },
  { label: "Antioch", href: "/antioch" },
  { label: "Fremont", href: "/fremont" },
  { label: "Walnut Creek", href: "/walnut-creek" },
  { label: "Vallejo", href: "/vallejo" },
  { label: "San Leandro", href: "/san-leandro" },
  { label: "Hayward", href: "/hayward" },
  { label: "Berkeley", href: "/berkeley" },
  { label: "Pittsburg", href: "/pittsburg" },
  { label: "Brentwood", href: "/brentwood" },
  { label: "San Ramon", href: "/san-ramon" },
  { label: "Pleasanton", href: "/pleasanton" },
  { label: "Livermore", href: "/livermore" },
];

const COUNTIES: { label: string; href: string }[] = [
  { label: "Contra Costa County", href: "/contra-costa-county" },
  { label: "Alameda County", href: "/alameda-county" },
  { label: "Solano County", href: "/solano-county" },
  { label: "Marin County", href: "/marin-county" },
  { label: "San Mateo County", href: "/san-mateo-county" },
  { label: "Santa Clara County", href: "/santa-clara-county" },
];

const SERVICES: { label: string; href: string }[] = [
  { label: "General Debris", href: "/general-debris" },
  { label: "Construction Debris", href: "/construction-debris" },
  { label: "Household Cleanout", href: "/household-cleanout" },
  { label: "Roofing", href: "/roofing" },
  { label: "Green Waste", href: "/green-waste" },
  { label: "Clean Soil", href: "/clean-soil" },
  { label: "Clean Concrete", href: "/clean-concrete" },
  { label: "Mixed Materials", href: "/mixed-materials" },
];

// Minimal strip by design (Cris, 2026-07-23 ×2 — "mucho más pequeño"): every
// link STAYS (SEO backbone for the city pages — do not remove entries), but
// each group renders as one wrapped inline row of tiny links, so the whole
// footer is a handful of short lines instead of four tall columns.
function InlineLinks({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <p className="text-[11px] leading-relaxed font-[var(--font-poppins)]">
      <span className="text-white font-bold uppercase tracking-wide mr-1.5">{title}:</span>
      {links.map((l, i) => (
        <span key={l.href} className="whitespace-nowrap">
          <a href={l.href} className="text-[#eec] hover:text-white transition-colors duration-200">
            {l.label}
          </a>
          {i < links.length - 1 && <span className="text-white/30"> · </span>}
        </span>
      ))}
    </p>
  );
}

export default function Footer() {
  return (
    <footer className="bg-tp-red pt-5 pb-3">
      <div className="w-[88%] max-w-[1200px] mx-auto space-y-1.5">
        <InlineLinks title="Service Areas" links={SERVICE_AREAS} />
        <InlineLinks title="Counties" links={COUNTIES} />
        <InlineLinks
          title="Services"
          links={[...SERVICES, { label: "Book a Dumpster", href: "/booking" }, { label: "All Services", href: "/services" }, { label: "Blog", href: "/blog" }]}
        />

        <div className="border-t border-white/20 mt-2.5 pt-2.5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-center sm:text-left">
          <p className="text-[11px] font-[var(--font-poppins)]">
            <a href="tel:+15106502083" className="text-white font-semibold hover:text-[#eec]">(510) 650-2083</a>
            <span className="text-white/30"> · </span>
            <a href="mailto:contact@tpdumpsters.com" className="text-[#eec] hover:text-white">contact@tpdumpsters.com</a>
            <span className="text-white/30"> · </span>
            <span className="text-[#eec]">150 Brookside Dr, Richmond, CA 94801</span>
          </p>
          <p className="text-[#e8c8c8] text-[11px] font-[var(--font-poppins)]">
            &copy; {new Date().getFullYear()} TP Dumpsters. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
