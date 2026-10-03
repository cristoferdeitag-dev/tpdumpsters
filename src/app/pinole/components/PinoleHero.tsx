import CityHero from "@/components/CityHero";

export default function PinoleHero() {
  return (
    <CityHero
      cityName="Pinole"
      eyebrow="Dumpster Rentals in Pinole, California"
      title="Pinole Dumpster Rental"
      subtitle="From Old Town renovations to Pinole Valley cleanouts"
      areas={["Historic Old Town", "Pinole Valley", "Appian Way", "San Pablo Ave", "Pinole Valley Rd"]}
    />
  );
}
