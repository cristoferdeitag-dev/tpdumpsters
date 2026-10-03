import CityHero from "@/components/CityHero";

export default function VallejoHero() {
  return (
    <CityHero
      cityName="Vallejo"
      eyebrow="Dumpster Rentals in Vallejo, California"
      title="Vallejo Dumpster Rental"
      subtitle="Roll-offs for Vallejo's historic homes and newer neighborhoods"
      areas={["Downtown Vallejo", "Mare Island", "St. Vincent's Hill", "Glen Cove", "Hiddenbrooke"]}
    />
  );
}
