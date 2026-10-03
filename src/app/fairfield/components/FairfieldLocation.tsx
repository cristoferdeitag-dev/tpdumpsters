import CityLocation from "@/components/CityLocation";

// Areas: Wikipedia "Fairfield, California" (Cordelia, Rancho Solano, Paradise
// Valley, Travis AFB) and one-source listings for Green Valley.
// ZIPs: city infobox (94533-94535).
export const FAIRFIELD_ZIPS = ["94533", "94534", "94535"];

export const FAIRFIELD_NEARBY = [
  { name: "Suisun City", href: "/suisun-city" },
  { name: "Vacaville", href: "/vacaville" },
  { name: "Vallejo", href: "/vallejo" },
  { name: "Benicia", href: "/benicia" },
];

export default function FairfieldLocation() {
  return (
    <CityLocation
      cityName="Fairfield"
      heading="Dumpster delivery across Fairfield"
      neighborhoods={["Cordelia", "Green Valley", "Rancho Solano", "Paradise Valley", "Travis Air Force Base area"]}
      zips={FAIRFIELD_ZIPS}
      nearby={FAIRFIELD_NEARBY}
    />
  );
}
