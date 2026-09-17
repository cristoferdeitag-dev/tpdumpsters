// ÁREA DE SERVICIO DE TP — LISTA BLANCA.
//
// 17-sep-2026 (Asaí, Telegram msgs 3309-3315). Antes esto era una lista
// NEGRA: sólo rechazaba el condado de Santa Clara y Sebastopol, así que
// TODO lo demás del planeta pasaba. Se colaron reservas PAGADAS en Redwood
// Valley (95470, condado de Mendocino, ~2 h de camino), y hubo intentos
// desde Guadalajara, México. Asaí: "todo lo demás más lejos de los que sí,
// no hacemos. Y no pueden bookear".
//
// Ahora se permite SÓLO lo que está aquí. Se comprueba en el wizard
// (AddressStep) y otra vez en /api/checkout, para que un POST directo
// tampoco entre.
//
// Decisiones de Asaí en ese hilo: Napa, Petaluma y Palo Alto SÍ (Palo Alto
// estaba bloqueada por ser del condado de Santa Clara). Milpitas NO y Santa
// Clara NO, aunque las dos tengan página propia en el sitio — esa
// contradicción de marketing sigue viva y está anotada en la bitácora.
//
// Los ZIPs salieron de DOS bases públicas independientes (US-Zip-Codes-JSON
// y us-state-county-zip), unidas. Dos ciudades no aparecían con su nombre
// en ninguna de las dos y se resolvieron por ZIP, no a ojo: Tiburon es
// "Belvedere Tiburon" (94920) y Bay Point comparte el 94565 con Pittsburg.
export const SERVICED_CITIES = new Set([
  "alameda", "american canyon", "antioch", "bay point",
  "belmont", "benicia", "berkeley", "brentwood",
  "burlingame", "castro valley", "clayton", "concord",
  "corte madera", "crockett", "daly city", "danville",
  "dublin", "el cerrito", "el sobrante", "emeryville",
  "fairfield", "foster city", "fremont", "hayward",
  "hercules", "lafayette", "larkspur", "livermore",
  "martinez", "mill valley", "millbrae", "moraga",
  "napa", "newark", "novato", "oakland",
  "oakley", "orinda", "pacifica", "palo alto",
  "petaluma", "piedmont", "pinole", "pittsburg",
  "pleasant hill", "pleasanton", "redwood city", "richmond",
  "rodeo", "san anselmo", "san bruno", "san carlos",
  "san francisco", "san leandro", "san lorenzo", "san mateo",
  "san pablo", "san rafael", "san ramon", "sausalito",
  "south san francisco", "suisun city", "tiburon", "union city",
  "vacaville", "vallejo", "walnut creek",
]);

// 274 ZIPs. Si una ciudad servida estrena un ZIP que no esté aquí, la regla
// de abajo la rescata por nombre de ciudad — mejor dejar pasar una venta
// buena que rechazarla por un hueco en la tabla.
export const SERVICED_ZIPS = new Set([
  // alameda
  "94501", "94502",
  // american canyon
  "94503", "94589",
  // antioch
  "94509", "94531",
  // bay point
  "94565",
  // belmont
  "94002", "94003",
  // benicia
  "94510",
  // berkeley
  "94701", "94702", "94703", "94704", "94705", "94707", "94708", "94709",
  "94710", "94712", "94720",
  // brentwood
  "94513",
  // burlingame
  "94010", "94011", "94012",
  // castro valley
  "94546", "94552",
  // clayton
  "94517",
  // concord
  "94518", "94519", "94520", "94521", "94522", "94524", "94527", "94529",
  // corte madera
  "94925", "94976",
  // crockett
  "94525",
  // daly city
  "94013", "94014", "94015", "94016", "94017",
  // danville
  "94506", "94526",
  // dublin
  "94568",
  // el cerrito
  "94530",
  // el sobrante
  "94803", "94820",
  // emeryville
  "94608", "94662",
  // fairfield
  "94533",
  // foster city
  "94404",
  // fremont
  "94536", "94537", "94538", "94539", "94555",
  // hayward
  "94540", "94541", "94542", "94543", "94544", "94545", "94557",
  // hercules
  "94547",
  // lafayette
  "94549",
  // larkspur
  "94939", "94977",
  // livermore
  "94550", "94551",
  // martinez
  "94553",
  // mill valley
  "94941", "94942",
  // millbrae
  "94030", "94031",
  // moraga
  "94556", "94570", "94575",
  // napa
  "94558", "94559", "94581",
  // newark
  "94560",
  // novato
  "94945", "94947", "94948", "94949", "94998",
  // oakland
  "94601", "94602", "94603", "94604", "94605", "94606", "94607", "94609",
  "94610", "94611", "94612", "94613", "94614", "94615", "94617", "94618",
  "94619", "94621", "94622", "94623", "94624", "94625", "94626", "94627",
  "94643", "94649", "94659", "94660", "94661", "94666",
  // oakley
  "94561",
  // orinda
  "94563",
  // pacifica
  "94044", "94045",
  // palo alto
  "94301", "94302", "94303", "94304", "94306", "94307", "94308", "94309",
  "94310",
  // petaluma
  "94952", "94953", "94954", "94955", "94975", "94999",
  // piedmont
  "94611", "94618", "94620",
  // pinole
  "94564",
  // pittsburg
  "94565",
  // pleasant hill
  "94523",
  // pleasanton
  "94566", "94588",
  // redwood city
  "94059", "94061", "94062", "94063", "94064", "94065",
  // richmond
  "94801", "94802", "94804", "94805", "94807", "94808", "94850",
  // rodeo
  "94572",
  // san anselmo
  "94960", "94979",
  // san bruno
  "94066", "94067", "94096", "94098",
  // san carlos
  "94070", "94071",
  // san francisco
  "94101", "94102", "94103", "94104", "94105", "94106", "94107", "94108",
  "94109", "94110", "94111", "94112", "94114", "94115", "94116", "94117",
  "94118", "94119", "94120", "94121", "94122", "94123", "94124", "94125",
  "94126", "94127", "94128", "94129", "94130", "94131", "94132", "94133",
  "94134", "94135", "94136", "94137", "94138", "94139", "94140", "94141",
  "94142", "94143", "94144", "94145", "94146", "94147", "94150", "94151",
  "94152", "94153", "94154", "94155", "94156", "94157", "94159", "94160",
  "94161", "94162", "94163", "94164", "94165", "94166", "94167", "94168",
  "94169", "94170", "94171", "94172", "94175", "94177", "94188",
  // san leandro
  "94577", "94578", "94579",
  // san lorenzo
  "94580",
  // san mateo
  "94401", "94402", "94403", "94404", "94405", "94406", "94407", "94408",
  "94409", "94497",
  // san pablo
  "94806",
  // san rafael
  "94901", "94903", "94912", "94913", "94915",
  // san ramon
  "94583",
  // sausalito
  "94965", "94966",
  // south san francisco
  "94080", "94083", "94099",
  // suisun city
  "94585",
  // tiburon
  "94920",
  // union city
  "94587",
  // vacaville
  "95687", "95688", "95696",
  // vallejo
  "94589", "94590", "94591", "94592",
  // walnut creek
  "94595", "94596", "94597", "94598",
]);

export function isOutsideServiceArea(city?: string, zip?: string): boolean {
  const c = (city || "").trim().toLowerCase();
  const z = (zip || "").trim().slice(0, 5);

  // Formulario vacío no es "fuera de área", es "todavía no sabemos". El
  // wizard llama a esto en cada tecla y el botón depende del resultado.
  if (!c && !z) return false;

  // ZIP a medio escribir: esperar a que esté completo antes de juzgar.
  if (z && !/^\d{5}$/.test(z)) return false;

  // El ZIP manda: es el campo que Google Places llena solo, y el que vino
  // CORRECTO incluso en las reservas donde la ciudad llegó basura ("P",
  // "Alamo" con ZIP de Petaluma).
  if (z && SERVICED_ZIPS.has(z)) return false;

  // Rescate por ciudad: cubre el ZIP nuevo que aún no esté en la tabla.
  if (c && SERVICED_CITIES.has(c)) return false;

  return true;
}
