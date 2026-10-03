import CityHero from "@/components/CityHero";

export default function RichmondHero() {
  return (
    <CityHero
      cityName="Richmond"
      eyebrow="Dumpster Rentals in Richmond, California"
      title="Richmond Dumpster Rental"
      subtitle="10, 20 & 30 yard roll-offs for Richmond homes and job sites"
      areas={["Point Richmond", "Marina Bay", "Iron Triangle", "Hilltop", "Richmond Annex", "Atchison Village"]}
    />
  );
}
