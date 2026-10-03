import CityLocation from "@/components/CityLocation";

// Neighborhoods: Wikipedia "Richmond, California". ZIPs: city infobox
// (delivery ZIPs only; 94803 is El Sobrante, not Richmond, so it is not listed).
export const RICHMOND_ZIPS = ["94801", "94804", "94805"];

export const RICHMOND_NEARBY = [
  { name: "El Cerrito", href: "/el-cerrito" },
  { name: "San Pablo", href: "/san-pablo" },
  { name: "El Sobrante", href: "/el-sobrante" },
  { name: "Pinole", href: "/pinole" },
  { name: "Hercules", href: "/hercules" },
];

export default function RichmondLocation() {
  return (
    <CityLocation
      cityName="Richmond"
      heading="Dumpster delivery across Richmond"
      neighborhoods={[
        "Point Richmond / Brickyard Cove",
        "Marina Bay",
        "Iron Triangle / Downtown",
        "Hilltop",
        "Atchison Village",
        "Richmond Annex",
        "Parchester Village",
      ]}
      zips={RICHMOND_ZIPS}
      nearby={RICHMOND_NEARBY}
    />
  );
}
