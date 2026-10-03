import CityLocation from "@/components/CityLocation";

// Areas: City of San Pablo (Rumrill Corridor Plan, San Pablo Avenue Complete
// Streets, General Plan) and Wikipedia. ZIP: city infobox.
export const SAN_PABLO_ZIPS = ["94806"];

export const SAN_PABLO_NEARBY = [
  { name: "Richmond", href: "/richmond" },
  { name: "El Sobrante", href: "/el-sobrante" },
  { name: "Pinole", href: "/pinole" },
  { name: "El Cerrito", href: "/el-cerrito" },
  { name: "Hercules", href: "/hercules" },
];

export default function SanPabloLocation() {
  return (
    <CityLocation
      cityName="San Pablo"
      heading="Dumpster delivery across San Pablo"
      neighborhoods={[
        "Rumrill Boulevard corridor",
        "El Portal",
        "San Pablo Avenue / Downtown",
        "Contra Costa College area",
        "San Pablo Dam Road / Church Lane",
      ]}
      zips={SAN_PABLO_ZIPS}
      nearby={SAN_PABLO_NEARBY}
    />
  );
}
