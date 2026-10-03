import CityLocation from "@/components/CityLocation";

// Areas: Wikipedia "Pinole, California" (Old Town, Pinole Valley) plus the
// Appian Way and San Pablo Ave / Pinole Valley Rd corridors. ZIP: city infobox.
export const PINOLE_ZIPS = ["94564"];

export const PINOLE_NEARBY = [
  { name: "Hercules", href: "/hercules" },
  { name: "El Sobrante", href: "/el-sobrante" },
  { name: "San Pablo", href: "/san-pablo" },
  { name: "Richmond", href: "/richmond" },
  { name: "Rodeo", href: "/rodeo" },
];

export default function PinoleLocation() {
  return (
    <CityLocation
      cityName="Pinole"
      heading="Dumpster delivery across Pinole"
      neighborhoods={[
        "Historic Old Town Pinole",
        "Pinole Valley",
        "Appian Way corridor",
        "San Pablo Ave / Pinole Valley Rd",
      ]}
      zips={PINOLE_ZIPS}
      nearby={PINOLE_NEARBY}
    />
  );
}
