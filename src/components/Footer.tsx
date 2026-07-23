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

// Compact by design (Cris, 2026-07-23): every link stays (SEO backbone —
// do NOT remove entries), but the type scale, spacing and column layout are
// tightened so the footer reads as a small closing strip, not a wall.
function LinkCol({
  title,
  links,
  twoCols = false,
}: {
  title: string;
  links: { label: string; href: string }[];
  twoCols?: boolean;
}) {
  return (
    <div className="text-left">
      <h3 className="text-white text-[11px] font-bold uppercase tracking-wide mb-2 font-[var(--font-poppins)]">
        {title}
      </h3>
      <ul className={twoCols ? "grid grid-cols-2 gap-x-3 gap-y-1" : "space-y-1"}>
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-[#eec] text-xs leading-snug hover:text-white transition-colors duration-200 font-[var(--font-poppins)]"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-tp-red pt-7 pb-4">
      <div className="w-[88%] max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-x-6 gap-y-5 mb-5">
          <LinkCol title="Service Areas" links={SERVICE_AREAS} twoCols />
          <LinkCol title="Counties We Serve" links={COUNTIES} />
          <LinkCol title="Services" links={SERVICES} />
          <div className="text-left">
            <h3 className="text-white text-[11px] font-bold uppercase tracking-wide mb-2 font-[var(--font-poppins)]">
              TP Dumpsters
            </h3>
            <ul className="space-y-1 text-xs font-[var(--font-poppins)]">
              <li>
                <a href="/booking" className="text-[#eec] hover:text-white transition-colors duration-200">
                  Book a Dumpster
                </a>
              </li>
              <li>
                <a href="/services" className="text-[#eec] hover:text-white transition-colors duration-200">
                  All Services
                </a>
              </li>
              <li>
                <a href="/blog" className="text-[#eec] hover:text-white transition-colors duration-200">
                  Blog
                </a>
              </li>
              <li className="pt-1">
                <a href="tel:+15106502083" className="text-white font-semibold hover:text-[#eec] transition-colors duration-200">
                  (510) 650-2083
                </a>
              </li>
              <li>
                <a href="mailto:contact@tpdumpsters.com" className="text-[#eec] hover:text-white transition-colors duration-200 break-all">
                  contact@tpdumpsters.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-center sm:text-left">
          <p className="text-[#eec] text-[11px] font-[var(--font-poppins)]">
            150 Brookside Dr, Richmond, California, 94801, United States
          </p>
          <p className="text-[#e8c8c8] text-[11px] font-[var(--font-poppins)]">
            &copy; {new Date().getFullYear()} TP Dumpsters. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
