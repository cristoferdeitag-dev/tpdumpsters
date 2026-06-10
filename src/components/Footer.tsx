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

function LinkCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="text-left">
      <h3 className="text-white text-sm font-bold uppercase tracking-wide mb-3 font-[var(--font-poppins)]">
        {title}
      </h3>
      <ul className="space-y-1.5">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-[#ddd] text-sm hover:text-white transition-colors duration-200 font-[var(--font-poppins)]"
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
    <footer className="bg-tp-red pt-12 pb-8">
      <div className="w-[88%] max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <LinkCol title="Service Areas" links={SERVICE_AREAS} />
          <LinkCol title="Counties We Serve" links={COUNTIES} />
          <LinkCol title="Services" links={SERVICES} />
          <div className="text-left">
            <h3 className="text-white text-sm font-bold uppercase tracking-wide mb-3 font-[var(--font-poppins)]">
              TP Dumpsters
            </h3>
            <ul className="space-y-1.5 text-sm font-[var(--font-poppins)]">
              <li>
                <a href="/booking" className="text-[#ddd] hover:text-white transition-colors duration-200">
                  Book a Dumpster
                </a>
              </li>
              <li>
                <a href="/services" className="text-[#ddd] hover:text-white transition-colors duration-200">
                  All Services
                </a>
              </li>
              <li>
                <a href="/blog" className="text-[#ddd] hover:text-white transition-colors duration-200">
                  Blog
                </a>
              </li>
              <li className="pt-2">
                <a href="tel:+15106502083" className="text-[#ddd] hover:text-white transition-colors duration-200">
                  (510) 650-2083
                </a>
              </li>
              <li>
                <a href="mailto:contact@tpdumpsters.com" className="text-[#ddd] hover:text-white transition-colors duration-200 break-all">
                  contact@tpdumpsters.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 text-center">
          <p className="text-[#ddd] text-sm font-[var(--font-poppins)]">
            150 Brookside Dr, Richmond, California, 94801, United States
          </p>
          <p className="text-[#bbb] text-xs mt-2 font-[var(--font-poppins)]">
            &copy; {new Date().getFullYear()} TP Dumpsters. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
