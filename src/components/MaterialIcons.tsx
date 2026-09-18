/**
 * Iconos de los materiales del booking.
 *
 * 18-sep-2026: sustituyen a los emojis (🏗️ 🏠 🔨 🏚️ 🟫 🪨 ♻️ 🔀) que el paso 1
 * usaba desde el principio. Cris: *"siento que se ve medio infantil o no tan
 * profesional"* (msg 22078), y el Consejo IA coincidió por los dos lados:
 * los emojis mezclan estilos, color y nivel de detalle, y eran **la** señal
 * infantil en una compra de $599 a $1,100 que se paga por adelantado.
 * Espejo estético acordado: renta B2B de equipo pesado (Sunbelt, United
 * Rentals), no e-commerce juvenil.
 *
 * Son SVG en línea a propósito: cero peticiones nuevas, cero librerías, y
 * heredan el color del texto (`currentColor`), así que el estado elegido no
 * necesita un segundo juego de iconos.
 *
 * Todos comparten trazo 1.75, viewBox 24 y remates redondeados. El de
 * concreto es el muro de ladrillo de Lucide (licencia ISC) — Cris eligió los
 * dibujados a mano para los otros siete y ése en particular de la librería
 * (msg 22085), porque los tres intentos propios no se leían.
 */

type Props = { className?: string; size?: number };

function Svg({ children, size = 21, className }: Props & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const IconGeneralDebris = (p: Props) => (
  <Svg {...p}>
    <path d="M3 7h18l-1.6 11.2A2 2 0 0 1 17.4 20H6.6a2 2 0 0 1-2-1.8L3 7Z" />
    <path d="M7.5 7V5.5A1.5 1.5 0 0 1 9 4h6a1.5 1.5 0 0 1 1.5 1.5V7" />
    <path d="M8 11v5M12 11v5M16 11v5" />
  </Svg>
);

export const IconHouseClean = (p: Props) => (
  <Svg {...p}>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5.5 9.5V20h13V9.5" />
    <path d="M10 20v-5.5h4V20" />
  </Svg>
);

export const IconConstruction = (p: Props) => (
  <Svg {...p}>
    <path d="M13.5 3.5 20 10l-2.5 2.5-2-2-2.5 2.5-2.5-2.5 2.5-2.5-2-2L13.5 3.5Z" />
    <path d="m11 11.5-7.5 7.5a1.4 1.4 0 0 0 2 2l7.5-7.5" />
  </Svg>
);

export const IconRoofing = (p: Props) => (
  <Svg {...p}>
    <path d="M12 4 2 13h20L12 4Z" />
    <path d="M6.4 13 12 8.5l5.6 4.5" />
    <path d="M3 17h18M5 20.5h14" />
  </Svg>
);

export const IconSoil = (p: Props) => (
  <Svg {...p}>
    <path d="M2 19.5c3.5-5 6.5-7.5 10-7.5s6.5 2.5 10 7.5Z" />
    <circle cx="9" cy="16" r=".9" />
    <circle cx="13.5" cy="17.5" r=".9" />
    <circle cx="16.5" cy="15" r=".9" />
    <path d="M8.5 8.5 12 5l3.5 3.5" />
  </Svg>
);

/** Muro de ladrillo — Lucide `brick-wall`, ISC. */
export const IconConcrete = (p: Props) => (
  <Svg {...p}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M12 9v6M16 15v6M16 3v6M21 9H3M21 15H3M8 15v6M8 3v6" />
  </Svg>
);

export const IconGreenWaste = (p: Props) => (
  <Svg {...p}>
    <path d="M12 21c-1-4.5 1-9 7-11.5-1 6-3.5 9.5-7 11.5Z" />
    <path d="M12 21c0-5-2.5-8.5-7-10 .5 5 3 8.5 7 10Z" />
    <path d="M12 21v-4.5" />
  </Svg>
);

export const IconMixed = (p: Props) => (
  <Svg {...p}>
    <path d="M3 7h6l2 3" />
    <path d="M21 7h-5l-6 10H3" />
    <path d="m18 4 3 3-3 3" />
    <path d="m18 14 3 3-3 3" />
    <path d="M13 17h3" />
  </Svg>
);

export const IconCheck = ({ size = 12 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={3.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path d="m5 13 4 4L19 7" />
  </svg>
);

/** Los iconos por nombre de servicio, en el orden en que salen en pantalla. */
export const MATERIAL_ICONS: Record<string, (p: Props) => React.ReactElement> = {
  "General Debris": IconGeneralDebris,
  "Household Clean Out": IconHouseClean,
  "Construction Debris": IconConstruction,
  Roofing: IconRoofing,
  "Clean Soil": IconSoil,
  "Clean Concrete": IconConcrete,
  "Green Waste": IconGreenWaste,
  "Mixed Materials": IconMixed,
};
