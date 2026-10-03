import CityLocation from "@/components/CityLocation";

// Areas: Wikipedia "Vallejo, California" (Mare Island, Downtown) and City of
// Vallejo historic districts; Glen Cove and Hiddenbrooke from one source each.
// ZIPs: city infobox (94589-94592).
export const VALLEJO_ZIPS = ["94589", "94590", "94591", "94592"];

export const VALLEJO_NEARBY = [
  { name: "Benicia", href: "/benicia" },
  { name: "American Canyon", href: "/american-canyon" },
  { name: "Fairfield", href: "/fairfield" },
  { name: "Crockett", href: "/crockett" },
  { name: "Hercules", href: "/hercules" },
];

export default function VallejoLocation() {
  return (
    <CityLocation
      cityName="Vallejo"
      heading="Dumpster delivery across Vallejo"
      neighborhoods={[
        "Downtown Vallejo",
        "Mare Island",
        "St. Vincent's Hill Historic District",
        "Vallejo Heritage District",
        "Vallejo Old City District",
        "Glen Cove",
        "Hiddenbrooke",
      ]}
      zips={VALLEJO_ZIPS}
      nearby={VALLEJO_NEARBY}
    />
  );
}
