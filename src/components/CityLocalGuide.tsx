import { FaTruckRampBox, FaRoad, FaRecycle, FaBan } from "react-icons/fa6";
import { PROHIBITED_ITEMS } from "@/lib/cityLanding";

// Local, sourced facts for a city landing page. Content is passed in per city;
// only facts with a documented source belong here (see
// /root/reports/tp-ciudades-tanda1/hechos.json for the research behind them).

interface CityLocalGuideProps {
  cityName: string;
  /** Short intro line under the heading. */
  lead: string;
  /** Nearest large disposal site: name + where it is. No rates on purpose. */
  disposal: { name: string; location: string; note?: string };
  /** Street vs. driveway placement, neutral and sourced. */
  placement: string[];
  /** Construction & demolition recycling rule for permitted projects (optional). */
  cdRule?: string[];
  /** Where the information comes from, shown in small print. */
  sourceNote: string;
}

function Card({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eee]">
      <h3 className="font-[var(--font-poppins)] text-lg font-bold text-[#333] mb-3 flex items-center gap-2">
        <span className="text-tp-red">{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

const pClass = "font-[var(--font-poppins)] text-sm text-[#555] leading-[1.75] mb-2.5";

export default function CityLocalGuide({
  cityName,
  lead,
  disposal,
  placement,
  cdRule,
  sourceNote,
}: CityLocalGuideProps) {
  return (
    <section className="py-20 bg-white">
      <div className="w-[92%] sm:w-[80%] max-w-[1080px] mx-auto">
        <h4 className="font-[var(--font-red-hat)] text-sm font-bold text-tp-gold uppercase tracking-[2px] mb-2">
          {cityName.toUpperCase()} LOCAL GUIDE
        </h4>
        <h2 className="font-[var(--font-poppins)] text-[26px] md:text-[32px] font-bold text-[#333] mb-4">
          Good to know before you rent in {cityName}
        </h2>
        <p className="font-[var(--font-poppins)] text-[15px] text-[#555] leading-[1.8] mb-8">{lead}</p>

        <div className="grid md:grid-cols-2 gap-6">
          <Card icon={<FaTruckRampBox />} title="Nearest disposal site">
            <p className={pClass}>
              <strong className="text-[#333]">{disposal.name}</strong>, {disposal.location}.
            </p>
            {disposal.note && <p className={pClass}>{disposal.note}</p>}
          </Card>

          <Card icon={<FaRoad />} title="Driveway or street?">
            {placement.map((t, i) => (
              <p key={i} className={pClass}>
                {t}
              </p>
            ))}
          </Card>

          {cdRule && (
            <Card icon={<FaRecycle />} title="Permitted construction projects">
              {cdRule.map((t, i) => (
                <p key={i} className={pClass}>
                  {t}
                </p>
              ))}
            </Card>
          )}

          <Card icon={<FaBan />} title="What can't go in the dumpster">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 mb-3">
              {PROHIBITED_ITEMS.map((item) => (
                <li key={item} className="font-[var(--font-poppins)] text-sm text-[#555] leading-snug flex gap-2">
                  <span className="text-tp-red font-bold">×</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className={pClass}>Mattresses and appliances may carry an extra per-item fee.</p>
          </Card>
        </div>

        <p className="font-[var(--font-poppins)] text-xs text-[#888] leading-relaxed mt-6">{sourceNote}</p>
      </div>
    </section>
  );
}
