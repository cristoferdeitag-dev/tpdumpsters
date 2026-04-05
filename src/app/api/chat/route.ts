import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "",
};

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";
const DASHBOARD_URL = "https://tpdumpsters.com/dashboard/chats";
const DASHBOARD_AUTH = process.env.DASHBOARD_PASSWORD || "";

// ── Telegram notification ──────────────────────────────────────
async function sendTelegramNotification(
  sessionId: string,
  message: string,
  language: string
) {
  if (!TELEGRAM_BOT_TOKEN) {
    console.warn("TELEGRAM_BOT_TOKEN not set, skipping notification");
    return;
  }
  try {
    const text =
      `💬 *New chat on tpdumpsters.com*\n\n` +
      `🌐 Language: ${language === "es" ? "🇲🇽 Español" : "🇺🇸 English"}\n` +
      `📝 First message:\n_${message.slice(0, 300)}_\n\n` +
      `🔗 [View in Dashboard](${DASHBOARD_URL}?auth=${encodeURIComponent(DASHBOARD_AUTH)})`;

    await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "Markdown",
          disable_web_page_preview: true,
        }),
      }
    );
  } catch (err) {
    console.error("Telegram notification error:", err);
  }
}

// ── Off-topic detection ────────────────────────────────────────
const OFF_TOPIC_PATTERNS = [
  /\b(trump|biden|obama|politic|democrat|republican|election|congress|senate|vote|liberal|conservative)\b/i,
  /\b(football|basketball|baseball|soccer|nfl|nba|mlb|fifa|world cup)\b/i,
  /\b(dating|girlfriend|boyfriend|love|marry|relationship|sex|porn)\b/i,
  /\b(crypto|bitcoin|ethereum|stock market|invest|forex|nft)\b/i,
  /\b(recipe|cooking|cook me|bake|restaurant|food recommendation)\b/i,
  /\b(homework|math problem|essay|write me a story|poem|joke)\b/i,
  /\b(hack|password|illegal|drug|weapon|gun)\b/i,
  /\b(what is your name|who made you|are you ai|are you a bot|are you real|what are you)\b/i,
];

function isOffTopic(message: string): boolean {
  return OFF_TOPIC_PATTERNS.some((pattern) => pattern.test(message));
}

// ── Prohibited / Allowed materials ─────────────────────────────
const PROHIBITED_ITEMS = [
  "hazardous waste",
  "asbestos",
  "paint",
  "chemicals",
  "batteries",
  "tires",
  "appliances with freon",
  "refrigerators",
  "air conditioners",
  "propane tanks",
  "medical waste",
  "electronics (e-waste)",
  "fluorescent tubes",
  "oil / fuel / gasoline",
  "pesticides / herbicides",
];

const ALLOWED_ITEMS = [
  "construction debris",
  "demolition waste",
  "wood",
  "drywall",
  "roofing shingles",
  "concrete",
  "dirt / soil",
  "yard waste",
  "furniture",
  "household junk",
  "cardboard / paper",
  "metal / scrap",
  "carpet / flooring",
  "general trash",
];

// ── Main POST handler ──────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const { message, sessionId, language, history } = await request.json();

    if (!message || !sessionId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const lang = language || "en";
    const connection = await mysql.createConnection(dbConfig);

    // ── Save user message ──
    await connection.execute(
      `INSERT INTO chat_messages (session_id, role, content, language, created_at) VALUES (?, ?, ?, ?, NOW())`,
      [sessionId, "user", message, lang]
    );

    // ── Upsert chat_sessions ──
    const [existingRows] = await connection.execute(
      `SELECT id, message_count FROM chat_sessions WHERE session_id = ? LIMIT 1`,
      [sessionId]
    );
    const existing = (existingRows as any[])[0];
    const isFirstMessage = !existing;

    if (isFirstMessage) {
      await connection.execute(
        `INSERT INTO chat_sessions (session_id, first_message, last_message, message_count, language, status, created_at, updated_at)
         VALUES (?, ?, ?, 1, ?, 'active', NOW(), NOW())`,
        [sessionId, message.slice(0, 500), message.slice(0, 500), lang]
      );
      // Send Telegram notification for first message
      sendTelegramNotification(sessionId, message, lang);
    } else {
      await connection.execute(
        `UPDATE chat_sessions
         SET last_message = ?, message_count = message_count + 1, updated_at = NOW()
         WHERE session_id = ?`,
        [message.slice(0, 500), sessionId]
      );
    }

    // ── Generate response ──
    const agentResponse = generateResponse(message, lang);

    // ── Save assistant response ──
    await connection.execute(
      `INSERT INTO chat_messages (session_id, role, content, language, created_at) VALUES (?, ?, ?, ?, NOW())`,
      [sessionId, "assistant", agentResponse, lang]
    );

    // Update last_message & count for assistant reply
    await connection.execute(
      `UPDATE chat_sessions
       SET last_message = ?, message_count = message_count + 1, updated_at = NOW()
       WHERE session_id = ?`,
      [agentResponse.slice(0, 500), sessionId]
    );

    await connection.end();

    return NextResponse.json({ reply: agentResponse });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ── Response generator ─────────────────────────────────────────
function generateResponse(message: string, language: string): string {
  const msg = message.toLowerCase().trim();
  const es = language === "es";

  // ── Off-topic ──
  if (isOffTopic(msg)) {
    return es
      ? "Lo siento, solo puedo ayudarte con temas relacionados a renta de dumpsters, precios, materiales permitidos y nuestras áreas de servicio. ¿Te puedo ayudar con algo de eso? 🧱"
      : "Sorry, I can only help with dumpster rental topics — pricing, materials, service areas, and scheduling. Can I help you with any of those? 🧱";
  }

  // ── Greetings ──
  if (/^(hi|hello|hey|hola|buenos dias|buenas tardes|buenas noches|qué tal|que tal|sup|what's up|howdy)[\s!?.]*$/i.test(msg)) {
    return es
      ? `¡Hola! 👋 Bienvenido a TP Dumpsters. Estoy aquí para ayudarte con:\n\n• 💰 Precios y tamaños de dumpsters\n• 📍 Áreas de servicio\n• 📅 Reservaciones\n• ❓ Materiales permitidos\n\n¿En qué te puedo ayudar?`
      : `Hi there! 👋 Welcome to TP Dumpsters. I'm here to help you with:\n\n• 💰 Dumpster pricing & sizes\n• 📍 Service areas\n• 📅 Booking & scheduling\n• ❓ Allowed materials\n\nHow can I help you today?`;
  }

  // ── Prohibited materials ──
  if (
    msg.includes("prohibited") || msg.includes("not allowed") || msg.includes("can't put") || msg.includes("cannot put") ||
    msg.includes("prohibido") || msg.includes("no se puede") || msg.includes("no permitido") ||
    msg.includes("what materials") || msg.includes("hazardous") || msg.includes("peligroso")
  ) {
    const list = PROHIBITED_ITEMS.map((i) => `• ❌ ${i}`).join("\n");
    return es
      ? `🚫 **Materiales prohibidos en nuestros dumpsters:**\n\n${list}\n\n¿No estás seguro si tu material es aceptado? Llámanos al **(510) 650-2083** y te ayudamos.`
      : `🚫 **Prohibited materials in our dumpsters:**\n\n${list}\n\nNot sure if your material is accepted? Call us at **(510) 650-2083** and we'll help.`;
  }

  // ── "Can I put X in the dumpster?" ──
  if (msg.includes("can i put") || msg.includes("puedo poner") || msg.includes("puedo tirar") || msg.includes("can i throw") || msg.includes("can i dump")) {
    const prohibited = PROHIBITED_ITEMS.some((item) =>
      msg.includes(item.toLowerCase().replace(/ \(.*\)/, "").split(" / ")[0])
    );
    if (prohibited) {
      return es
        ? "❌ Lo siento, ese material **no está permitido** en nuestros dumpsters por regulaciones ambientales. Para desechar materiales peligrosos, contacta a tu centro de reciclaje local.\n\n¿Necesitas ayuda con otro material?"
        : "❌ Sorry, that material is **not allowed** in our dumpsters due to environmental regulations. For hazardous material disposal, please contact your local recycling center.\n\nNeed help with a different material?";
    }
    const allowed = ALLOWED_ITEMS.some((item) =>
      msg.includes(item.toLowerCase().split(" / ")[0])
    );
    if (allowed) {
      return es
        ? "✅ ¡Sí! Ese material **sí está permitido** en nuestros dumpsters. ¿Te gustaría reservar uno?\n\n[Reserva aquí](https://tpdumpsters.com/booking) o llama al **(510) 650-2083**"
        : "✅ Yes! That material **is allowed** in our dumpsters. Would you like to book one?\n\n[Book here](https://tpdumpsters.com/booking) or call **(510) 650-2083**";
    }
    // Not sure
    return es
      ? "🤔 No estoy 100% seguro sobre ese material. Te recomiendo llamarnos al **(510) 650-2083** para confirmar antes de reservar."
      : "🤔 I'm not 100% sure about that material. I'd recommend calling us at **(510) 650-2083** to confirm before booking.";
  }

  // ── Weekend delivery ──
  if (msg.includes("weekend") || msg.includes("saturday") || msg.includes("sunday") || msg.includes("fin de semana") || msg.includes("sábado") || msg.includes("sabado") || msg.includes("domingo")) {
    return es
      ? "✅ ¡Sí, entregamos los fines de semana! Sábados y domingos con disponibilidad. Reserva con anticipación para asegurar tu fecha.\n\n[Reserva aquí](https://tpdumpsters.com/booking) o llama: **(510) 650-2083**"
      : "✅ Yes, we deliver on weekends! Saturdays and Sundays based on availability. Book ahead to secure your date.\n\n[Book here](https://tpdumpsters.com/booking) or call: **(510) 650-2083**";
  }

  // ── Cancellation policy ──
  if (msg.includes("cancel") || msg.includes("cancelar") || msg.includes("cancelación") || msg.includes("cancellation") || msg.includes("refund")) {
    return es
      ? "📋 **Política de cancelación:**\n\n• Cancelaciones con más de 24 horas de anticipación: **sin cargo**\n• Cancelaciones con menos de 24 horas: **$150 de tarifa**\n• Para cancelar, llámanos al **(510) 650-2083**\n\nTe recomendamos avisarnos lo antes posible."
      : "📋 **Cancellation Policy:**\n\n• Cancellations with 24+ hours notice: **no charge**\n• Cancellations with less than 24 hours notice: **$150 fee**\n• To cancel, call us at **(510) 650-2083**\n\nWe recommend letting us know as soon as possible.";
  }

  // ── Credit cards / payment ──
  if (msg.includes("credit card") || msg.includes("payment") || msg.includes("pay") || msg.includes("tarjeta") || msg.includes("pago") || msg.includes("zelle") || msg.includes("cash") || msg.includes("efectivo")) {
    return es
      ? "💳 **Métodos de pago aceptados:**\n\n• ✅ Tarjetas de crédito/débito (en línea)\n• ✅ Zelle\n• ✅ Efectivo (al momento de entrega)\n\nReserva en línea con tarjeta: [tpdumpsters.com/booking](https://tpdumpsters.com/booking)"
      : "💳 **Accepted payment methods:**\n\n• ✅ Credit/debit cards (online)\n• ✅ Zelle\n• ✅ Cash (at delivery)\n\nBook online with card: [tpdumpsters.com/booking](https://tpdumpsters.com/booking)";
  }

  // ── Extra day fee ──
  if (msg.includes("extra day") || msg.includes("additional day") || msg.includes("keep longer") || msg.includes("extend") || msg.includes("día extra") || msg.includes("dia extra") || msg.includes("más días") || msg.includes("mas dias") || msg.includes("extender")) {
    return es
      ? "📅 **Tarifa por día extra:** **$49/día**\n\nSi necesitas el dumpster más tiempo del periodo incluido (7 días para General Debris, 3 días para materiales pesados), simplemente llámanos al **(510) 650-2083** para extender.\n\nNo hay límite de extensión — solo $49 por cada día adicional."
      : "📅 **Extra day fee:** **$49/day**\n\nIf you need the dumpster longer than the included period (7 days for General Debris, 3 days for heavy materials), just call us at **(510) 650-2083** to extend.\n\nNo extension limit — just $49 per additional day.";
  }

  // ── Overweight fee ──
  if (msg.includes("overweight") || msg.includes("over weight") || msg.includes("too heavy") || msg.includes("weight limit") || msg.includes("sobrepeso") || msg.includes("peso") || msg.includes("tonelada") || msg.includes("ton limit")) {
    return es
      ? "⚖️ **Tarifa por sobrepeso:** **$125/ton prorrateado**\n\n**Peso incluido por tamaño:**\n• 10 yard: 1 ton\n• 20 yard: 2 tons\n• 30 yard: 3 tons\n\nSi excedes el peso incluido, se cobra $125 por cada tonelada adicional (prorrateado). Los materiales pesados como tierra y concreto tienen peso ilimitado en sus paquetes especiales.\n\n¿Preguntas? **(510) 650-2083**"
      : "⚖️ **Overweight fee:** **$125/ton prorated**\n\n**Included weight by size:**\n• 10 yard: 1 ton\n• 20 yard: 2 tons\n• 30 yard: 3 tons\n\nIf you exceed the included weight, it's $125 per additional ton (prorated). Heavy materials like soil and concrete have unlimited weight in their special packages.\n\nQuestions? **(510) 650-2083**";
  }

  // ── Pricing questions ──
  if (msg.includes("price") || msg.includes("cost") || msg.includes("how much") || msg.includes("precio") || msg.includes("costo") || msg.includes("cuánto") || msg.includes("cuanto")) {
    return es
      ? `💰 **Precios de TP Dumpsters:**\n\n🟢 **General Debris** (construcción, demolición)\n• 10 yard: $600 (7 días, 1 ton incluida)\n• 20 yard: $650 (7 días, 2 tons incluidas)\n• 30 yard: $700 (7 días, 3 tons incluidas)\n\n🟤 **Materiales Pesados** (10 yard, 3 días)\n• Clean Soil: $600 (sin límite de peso)\n• Clean Concrete: $600 (95% puro, sin varilla)\n• Mixed Materials: $750 (mezcla tierra/concreto)\n\n📌 **Extras:**\n• Días extra: $49/día\n• Sobrepeso: $125/ton prorrateado\n\n🎉 **¡Reserva en línea y obtén 5% de descuento!**\n\n[Reserva aquí](https://tpdumpsters.com/booking) o llámanos: **(510) 650-2083**`
      : `💰 **TP Dumpsters Pricing:**\n\n🟢 **General Debris** (construction, demolition)\n• 10 yard: $600 (7 days, 1 ton included)\n• 20 yard: $650 (7 days, 2 tons included)\n• 30 yard: $700 (7 days, 3 tons included)\n\n🟤 **Heavy Materials** (10 yard, 3 days)\n• Clean Soil: $600 (no weight limit)\n• Clean Concrete: $600 (95% pure, no rebar)\n• Mixed Materials: $750 (soil & concrete mix)\n\n📌 **Extras:**\n• Extra days: $49/day\n• Overweight: $125/ton prorated\n\n🎉 **Book online and get 5% off!**\n\n[Book here](https://tpdumpsters.com/booking) or call us: **(510) 650-2083**`;
  }

  // ── Size / which dumpster ──
  if (msg.includes("size") || msg.includes("which") || msg.includes("recommend") || msg.includes("tamaño") || msg.includes("cuál") || msg.includes("necesito") || msg.includes("10 yard") || msg.includes("20 yard") || msg.includes("30 yard")) {
    return es
      ? `🤔 **¿Qué tamaño de dumpster necesitas?**\n\n**10 Yard** (pequeño) — Ideal para:\n• Limpieza de garaje o sótano\n• Renovación de baño\n• Tierra o concreto (proyectos pequeños)\n\n**20 Yard** (mediano) — Ideal para:\n• Renovación de cocina\n• Proyectos de techo\n• Limpieza de casa completa\n• ⭐ **Más popular para contratistas**\n\n**30 Yard** (grande) — Ideal para:\n• Demolición completa\n• Nueva construcción\n• Proyectos comerciales grandes\n\n💡 **¿Aún no estás seguro?** Llámanos al **(510) 650-2083** y te ayudamos a elegir.\n\nO [reserva en línea](https://tpdumpsters.com/booking) con 5% de descuento.`
      : `🤔 **Which dumpster size do you need?**\n\n**10 Yard** (small) — Best for:\n• Garage or basement cleanout\n• Bathroom renovation\n• Soil or concrete (small projects)\n\n**20 Yard** (medium) — Best for:\n• Kitchen remodel\n• Roofing projects\n• Whole-house cleanout\n• ⭐ **Most popular for contractors**\n\n**30 Yard** (large) — Best for:\n• Full demolition\n• New construction\n• Large commercial projects\n\n💡 **Still not sure?** Call us at **(510) 650-2083** and we'll help you pick.\n\nOr [book online](https://tpdumpsters.com/booking) and get 5% off.`;
  }

  // ── How it works / service ──
  if (msg.includes("service") || msg.includes("work") || msg.includes("how does") || msg.includes("process") || msg.includes("servicio") || msg.includes("funciona") || msg.includes("cómo")) {
    return es
      ? `📅 **¿Cómo funciona nuestro servicio?**\n\n1️⃣ **Reserva** en línea o por teléfono\n2️⃣ **Entrega** — Te lo llevamos el día que elijas\n3️⃣ **Llena** el dumpster (7 días incluidos)\n4️⃣ **Recogida** — Llámanos cuando esté listo\n\n✅ **Incluido:**\n• Entrega y recogida\n• 7 días de renta (General Debris)\n• 3 días (materiales pesados)\n• Peso incluido según tamaño\n\n💰 **Precio único** — Sin cargos ocultos\n📞 **Entrega el mismo día** disponible\n🎉 **5% descuento** al reservar en línea\n\n[Reserva ahora](https://tpdumpsters.com/booking) o llama: **(510) 650-2083**`
      : `📅 **How our service works:**\n\n1️⃣ **Book** online or by phone\n2️⃣ **Delivery** — We drop it off on your chosen day\n3️⃣ **Fill it** up (7 days included)\n4️⃣ **Pickup** — Call us when you're ready\n\n✅ **Included:**\n• Delivery and pickup\n• 7-day rental (General Debris)\n• 3 days (heavy materials)\n• Weight allowance based on size\n\n💰 **Flat-rate pricing** — No hidden fees\n📞 **Same-day delivery** available\n🎉 **5% discount** when you book online\n\n[Book now](https://tpdumpsters.com/booking) or call: **(510) 650-2083**`;
  }

  // ── Service areas ──
  if (msg.includes("area") || msg.includes("city") || msg.includes("location") || msg.includes("deliver to") || msg.includes("zona") || msg.includes("ciudad") || msg.includes("entregan")) {
    return es
      ? `📍 **Áreas de Servicio — Bay Area, California**\n\nServimos toda el Área de la Bahía:\n\n**Alameda County:** Oakland, Berkeley, Fremont, Hayward, San Leandro, Livermore, Pleasanton, Dublin, Castro Valley\n\n**Contra Costa County:** Concord, Walnut Creek, Richmond, Antioch, Pittsburg, San Ramon, Martinez, Pinole, Brentwood\n\n**San Mateo County, Santa Clara County, Solano County** y más.\n\n¿No ves tu ciudad? Llámanos al **(510) 650-2083** — ¡probablemente también te servimos!`
      : `📍 **Service Areas — Bay Area, California**\n\nWe serve the entire Bay Area:\n\n**Alameda County:** Oakland, Berkeley, Fremont, Hayward, San Leandro, Livermore, Pleasanton, Dublin, Castro Valley\n\n**Contra Costa County:** Concord, Walnut Creek, Richmond, Antioch, Pittsburg, San Ramon, Martinez, Pinole, Brentwood\n\n**San Mateo County, Santa Clara County, Solano County** and more.\n\nDon't see your city? Call us at **(510) 650-2083** — we probably serve you too!`;
  }

  // ── Book / reserve ──
  if (msg.includes("book") || msg.includes("reserve") || msg.includes("order") || msg.includes("schedule") || msg.includes("reservar") || msg.includes("agendar") || msg.includes("ordenar")) {
    return es
      ? `📅 **¡Reserva tu dumpster ahora!**\n\n🎉 **5% de descuento** al reservar en línea:\n👉 [tpdumpsters.com/booking](https://tpdumpsters.com/booking)\n\nO llama para reservar por teléfono:\n📞 **(510) 650-2083**\n\n⚡ Entrega el mismo día disponible (llama antes del mediodía)`
      : `📅 **Book your dumpster now!**\n\n🎉 **5% off** when you book online:\n👉 [tpdumpsters.com/booking](https://tpdumpsters.com/booking)\n\nOr call to book by phone:\n📞 **(510) 650-2083**\n\n⚡ Same-day delivery available (call before noon)`;
  }

  // ── Contact / phone ──
  if (msg.includes("phone") || msg.includes("call") || msg.includes("contact") || msg.includes("email") || msg.includes("teléfono") || msg.includes("telefono") || msg.includes("llamar") || msg.includes("contacto") || msg.includes("correo")) {
    return es
      ? `📞 **Contáctanos:**\n\n• Teléfono: **(510) 650-2083**\n• Web: [tpdumpsters.com](https://tpdumpsters.com)\n• Reservas: [tpdumpsters.com/booking](https://tpdumpsters.com/booking)\n\n🕐 Lunes a Domingo\n🌐 Atención en Inglés y Español`
      : `📞 **Contact us:**\n\n• Phone: **(510) 650-2083**\n• Web: [tpdumpsters.com](https://tpdumpsters.com)\n• Bookings: [tpdumpsters.com/booking](https://tpdumpsters.com/booking)\n\n🕐 Monday – Sunday\n🌐 English & Spanish support`;
  }

  // ── Default response ──
  return es
    ? `Gracias por tu mensaje. Para una respuesta más específica, te invito a:\n\n• 📞 Llamarnos: **(510) 650-2083**\n• 🌐 Reservar en línea: [tpdumpsters.com/booking](https://tpdumpsters.com/booking)\n\nTambién puedes preguntarme sobre:\n• 💰 Precios y tamaños\n• 🚫 Materiales permitidos/prohibidos\n• 📍 Áreas de servicio\n• 📋 Políticas (cancelación, sobrepeso, días extra)`
    : `Thanks for your message! For a more specific answer:\n\n• 📞 Call us: **(510) 650-2083**\n• 🌐 Book online: [tpdumpsters.com/booking](https://tpdumpsters.com/booking)\n\nYou can also ask me about:\n• 💰 Pricing and sizes\n• 🚫 Allowed/prohibited materials\n• 📍 Service areas\n• 📋 Policies (cancellation, overweight, extra days)`;
}
