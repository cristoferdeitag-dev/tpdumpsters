import CityHero from "@/components/CityHero";

export default function SanPabloHero() {
  return (
    <CityHero
      cityName="San Pablo"
      eyebrow="Dumpster Rentals in San Pablo, California"
      title="San Pablo Dumpster Rental"
      subtitle="Right-sized roll-offs for San Pablo homes, shops and lots"
      areas={["Rumrill Blvd", "El Portal", "San Pablo Ave", "Contra Costa College area", "San Pablo Dam Rd"]}
    />
  );
}
