/**
 * Booking wizard copy, English + Spanish (Cris, msgs 24219/24221, 2-oct-2026).
 *
 * English is the default; Spanish is chosen with the toggle above the wizard
 * or with `?lang=es` (Spanish-language ad traffic). This file is TEXT ONLY:
 * prices, validations, service ids and tracking never read from it.
 *
 * Inline markup: `**bold**` is rendered as <strong> by `rich()` in
 * ./useBookingLang. Customer-typed values (names, emails, phones) are never
 * put inside a `**…**` string — they go between text parts instead.
 *
 * Spanish register: "usted", vocabulary of Hispanic contractors in
 * California (dumpster, escombro, yardas, entrega, recolección, sobrepeso).
 */

export type Lang = "en" | "es";

export const BOOKING_LANG_KEY = "tp_booking_lang";

const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);

const en = {
  lang: {
    group: "Language / Idioma",
    en: "English",
    es: "Español",
  },
  common: {
    back: "← Back",
    required: " (required)",
    requiredPrefix: "Fields marked",
    loading: "Loading...",
    loadingForm: "Loading booking form...",
  },
  wizard: {
    steps: ["Service", "Dates", "Address", "Summary"],
    verifyFailTitle: "We couldn't verify your previous payment session.",
    verifyFailBody:
      "To make sure you're never charged twice, we paused here. Try again, or call us and we'll sort it out on the spot.",
    tryAgain: "Try again",
    sessionError: "Error creating payment session. Please call us at (510) 650-2083.",
  },
  resume: {
    welcomeBack: "Welcome back! Your booking is saved — review it and pay below.",
    confirmWindow:
      "Welcome back! Please confirm your delivery date and time window — the rest of your booking is already filled in.",
    alreadyCompleted: "This booking was already completed. Questions? Call us at (510) 650-2083.",
    datePassed:
      "The delivery date on this booking already passed — call us at (510) 650-2083 and we'll set you up with a new date.",
    linkExpired:
      "That link expired. You can book again below in a couple of minutes, or call us at (510) 650-2083.",
    alreadyPaid:
      "Looks like that booking was already paid. Need another dumpster? Book below, or call us at (510) 650-2083 if you need a copy of your receipt.",
    bonusExpired: "The $15 bonus on your link has expired — the regular online price applies below.",
  },
  service: {
    stepOf: "Step 1 of 4",
    title: "Choose your dumpster",
    subtitle: "Select what you're disposing of, then choose the size you need.",
    pickFirst:
      "Pick what you're getting rid of and we'll show you the sizes and prices that apply to it.",
    overload: "Nothing above the top edge of the dumpster. Overloaded loads add a **$149 fee, charged at pickup**.",
    selected: "✓ Selected",
    popular: "⭐ Most Popular",
    startingAt: "Starting at",
    saveOnline: (amount: string) => `Save ${amount} online`,
    heading: (size: string) => `${size} Dumpster`,
    daysIncluded: (n: number) => `${n}-day rental included`,
    deliveryIncluded: "Delivery, pickup & disposal included",
    noHiddenFees: "No hidden fees",
    selectThis: "Select this dumpster",
    footnote: "Extra weight charged at $179/ton (prorated) · Extra days: $49/day",
    next: "Next: Choose dates →",
  },
  date: {
    title: "Choose your dates",
    includes: (svc: string, n: number) => `${svc} includes **${n} days** of rental.`,
    requiredSuffix: "are required.",
    infoBanner: (n: number) =>
      `ℹ **Pickup date is set automatically** based on your rental period (${n} days). Done early? You can pick an **earlier pickup date** — same price, the ${n} days are always included. Need more time? Pick a later date — extra days are **$49/day**.`,
    deliveryDate: "Delivery date",
    deliveryMissing: "Pick the day you want the dumpster delivered",
    deliveryNote:
      "We deliver **any time during the day**. Have the spot clear and accessible — our driver can't wait. Blocked spot: **$149 fee**.",
    pickupDate: "Pickup date",
    autoSet: "Auto-set",
    maxRental: (base: number, max: number) =>
      `The longest rental we can book online is ${base} days plus ${max} extra. Call (510) 650-2083 for anything longer.`,
    extraDaysNote: (n: number, amount: string) =>
      `(+${n} extra ${plural(n, "day", "days")} = +${amount})`,
    pickupNote:
      "We pick up **any time during the day**. Keep the area clear or a **$149 fee** applies. Need more days? Tell us **24 hours ahead**.",
    windowTitle: "Choose a delivery time window",
    windowHelp:
      "Time windows are a guide, not a guaranteed hour — the exact time can shift with routing, logistics and traffic.",
    windowMissing: "Pick a time window — morning or afternoon",
    breakdown: "Price breakdown",
    includedRental: (n: number) => `Included rental: ${n} days`,
    included: "Included",
    extraDaysLine: (n: number, fee: string) => `Extra days: ${n} × ${fee}/day`,
    onlineDiscount: "Online booking discount ($50 OFF)",
    rescueBonus: "Book-now bonus from your email ($15 OFF)",
    total: "Total",
    totalRental: (n: number) => `Total rental: ${n} days. Extra weight charged at $179/ton (prorated).`,
    missDelivery: "a delivery date",
    missWindow: "a delivery time window",
    missPickup: "a valid pickup date",
    beforeContinue: (items: string[]) => `Before you continue, please choose: ${items.join(" and ")}.`,
    next: "Next: Delivery address →",
    blocked: {
      past: "Online bookings need at least one day's notice — please choose tomorrow or later. For same-day service, call us at (510) 650-2083.",
      sunday: "We don't deliver on Sundays. Please pick another day.",
      full: "Sorry — we're fully booked on that day. Please choose the next available day, or call us at (510) 650-2083.",
      size: (size: string) =>
        `Sorry — the ${size} dumpster is fully booked for that delivery date. Please choose the next available day, pick a different size, or call us at (510) 650-2083.`,
    },
  },
  address: {
    title: "Delivery address & contact",
    subtitle: "Where should we deliver the dumpster?",
    requiredSuffix: "are required — everything else is optional.",
    yourInfo: "Your information",
    name: "Name or company",
    namePh: "John Smith or Company Name",
    phone: "Phone number",
    email: "Email",
    emailPh: "john@email.com",
    errors: {
      nameShort: "Name must be at least 2 characters",
      nameInvalid: "Name contains invalid characters",
      phoneShort: "Phone must be at least 10 digits",
      phoneLong: "Phone number is too long",
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email",
      emailDomain: "Email domain looks incorrect",
      emailTld: "Check your email — the domain ending looks incorrect",
      didYouMean: (s: string) => `Did you mean ${s}?`,
      zipInvalid: "Enter a valid ZIP code (e.g. 94601)",
    },
    deliveryAddress: "Delivery address",
    startTyping: "— Start typing to search",
    weServe: "We serve the San Francisco Bay Area.",
    street: "Street address",
    streetPhSearch: "Start typing your address...",
    streetRequired: "Street address is required",
    city: "City",
    cityRequired: "City is required",
    zip: "ZIP code",
    thatArea: "that area",
    outside: (city: string) => `Sorry — we don't currently service ${city}.`,
    outsideDetail:
      "We deliver to Contra Costa, Alameda, San Francisco, San Mateo, Marin, Solano and nearby communities. Questions? Call (510) 650-2083.",
    billing: "Billing address",
    optional: "(optional)",
    addBilling: "+ Add different billing address",
    sameAsDelivery: "Same as delivery address by default.",
    billingPh: "Start typing your billing address...",
    billingCaptured: "Billing address captured:",
    billingIncomplete: "Some fields missing — pick a more specific address from the dropdown.",
    billingPick: "Pick an address from the dropdown so we capture the full street, city, state, and ZIP.",
    useDelivery: "Use delivery address instead",
    place: "Where exactly should we place the dumpster?",
    placeHelp: "The exact spot, plus a gate code if we need one.",
    placePh: "Example: in the driveway, right side, in front of the garage door. Gate code 1234.",
    placeMissing: "Please tell us where to place the dumpster",
    miss: {
      name: "your name",
      phone: "phone number",
      email: "email",
      street: "street address",
      city: "city",
      zip: "ZIP code",
      billing: "billing address",
      place: "where to place the dumpster",
    },
    outsideAlert: (city: string) =>
      `We don't currently service ${city} — call us at (510) 650-2083 and we'll see what we can do.`,
    stillNeed: (items: string[]) => `Before you continue, we still need: ${items.join(", ")}.`,
    placeRequired: "The spot for the dumpster is required — our driver needs to know exactly where to leave it.",
    next: "Next: Review & confirm →",
  },
  summary: {
    title: "Review & pay",
    subtitle: "Delivery, pickup and disposal are included in the price.",
    totalToday: "Total today",
    seeBreakdown: "See price breakdown",
    extraDaysLine: (n: number, fee: string) => `${n} extra ${plural(n, "day", "days")} × ${fee}`,
    onlineDiscount: "Online booking discount",
    rescueBonus: "Book-now bonus (from your email)",
    includes: (weight: string, days: number, fee: string) =>
      `**Your rental includes** ${weight} and ${days} days. Need more? Extra weight is **$179**/ton and each extra day **${fee}**.`,
    weightFallback: "the weight allowance",
    review: "Review",
    dumpster: "Dumpster",
    dates: "Dates",
    dropOff: "Drop-off",
    pickUp: "Pick-up",
    deliveryTo: "Delivery to",
    fixBack: "Something to fix? Go back",
    consentBefore: "I agree to pay today’s total and authorize charges for extra weight, extra days or prohibited items, per the ",
    consentLink: "rental terms",
    consentAfter: ".",
    readTerms: "Read the rental terms",
    terms1: (fee: string) =>
      `I authorize TP Dumpsters to charge my card for any additional fees incurred during the rental period, including but not limited to: extra weight ($179/ton prorated), additional rental days (${fee}/day), and prohibited or hazardous items found in the dumpster ($20–$60 per item). I understand these charges may be processed after the dumpster is picked up.`,
    cancelLabel: "Cancellation:",
    cancelText:
      " 24-hour notice required; a $150 cancellation fee applies. Overloaded loads (above the top edge) add a $149 fee, charged at pickup.",
    nextLabel: "What happens next:",
    nextText:
      " once the booking is confirmed, someone from our team contacts you within 24 hours to confirm delivery details and placement.",
    consentMissing: "Check the box to authorize the charges — we can’t take the payment without it.",
    smsBold: "Text me about my rental (optional).",
    smsText:
      " I agree to receive text messages from TP Dumpsters at the number I provided, about my delivery, pickup and account. Message frequency varies. Message and data rates may apply. Reply STOP to cancel or HELP for help. Consent is not a condition of purchase. See our ",
    smsTerms: "SMS Terms",
    and: " and ",
    privacy: "Privacy Policy",
    preparing: "Preparing payment…",
    pay: "Pay & confirm",
  },
  payment: {
    loadFailTitle: "The payment form couldn't load.",
    loadFailBody: "Please try again, or call us and we'll take your booking by phone.",
    backToSummary: "← Back to summary",
    title: "Payment",
    nameOnCard: "Name on card",
    nameOnCardPh: "Exactly as it appears on the card",
    declined: "Your card was declined. Please try another card.",
    failed: "We couldn't process the payment. Please try again or call us.",
    processing: "Processing...",
    pay: (amount: string) => `Pay ${amount} & confirm booking`,
    secure: "Secure payment by Stripe · You never leave tpdumpsters.com",
  },
  confirmation: {
    title: "Booking request received!",
    bodyBefore: "We'll confirm your booking shortly. You'll receive a call or text at ",
    bodyAfter: " to finalize the details.",
    service: "Service:",
    delivery: "Delivery:",
    pickup: "Pickup:",
    address: "Address:",
    estimatedTotal: "Estimated total:",
    bilingual: "Questions? Call us anytime — we're bilingual (English & Spanish)",
    call: "Call (510) 650-2083",
  },
  success: {
    title: "Booking Confirmed! 🎉",
    subtitle: "Payment received — your dumpster rental is confirmed.",
    inboxBefore: "Check your inbox at ",
    inboxAfter: " for both emails below.",
    reference: "Booking Reference",
    totalPaid: "Total paid: ",
    yourBooking: "Your Booking",
    dumpster: "Dumpster",
    delivery: "Delivery",
    pickup: "Pickup",
    address: "Address",
    viewMap: "View delivery location on Google Maps",
    receiptTitle: "Your receipt & invoice",
    receiptBody:
      "Download or print them here — they include the charge, the rental dates and your booking ID. Save them now for your records.",
    viewReceipt: "View receipt & invoice",
    downloadPdf: "Download PDF",
    invoicePendingBefore: "Your invoice is still being generated. Refresh this page in a moment, or call us at ",
    invoicePendingAfter: " and we'll get you a copy.",
    whatNext: "What happens next?",
    paidTitle: "Payment confirmed",
    paidBody: "Your card has been charged successfully. Your receipt and invoice are ready above.",
    scheduledTitle: "Delivery scheduled",
    scheduledBody: "Our team will deliver on your selected date and window. We'll text you 30 min before arrival.",
    placementTitle: "Placement",
    placementBody:
      "Our driver will place the dumpster at your specified location. Make sure the area is clear and accessible.",
    changeTitle: "Need to change or cancel?",
    changeBefore: "Call (510) 650-2083 or email info@tpdumpsters.com. Quote your booking ID ",
    changeAfter: ".",
    policyLabel: "Cancellation policy:",
    policyText:
      " Cancel more than 24 hours before delivery for a 90% refund. Cancellations within 24 hours of delivery are non-refundable.",
    backHome: "Back to Home",
    call: "📞 Call (510) 650-2083",
    loadingDetails: "Loading booking details…",
  },
};

export type BookingDict = typeof en;

const es: BookingDict = {
  lang: {
    group: "Idioma / Language",
    en: "English",
    es: "Español",
  },
  common: {
    back: "← Regresar",
    required: " (obligatorio)",
    requiredPrefix: "Los campos marcados con",
    loading: "Cargando...",
    loadingForm: "Cargando el formulario de reservación...",
  },
  wizard: {
    steps: ["Servicio", "Fechas", "Dirección", "Resumen"],
    verifyFailTitle: "No pudimos verificar su sesión de pago anterior.",
    verifyFailBody:
      "Para asegurarnos de que nunca se le cobre dos veces, hicimos una pausa aquí. Intente de nuevo, o llámenos y lo resolvemos al momento.",
    tryAgain: "Intentar de nuevo",
    sessionError: "Hubo un error al preparar el pago. Por favor llámenos al (510) 650-2083.",
  },
  resume: {
    welcomeBack: "¡Qué gusto verle de nuevo! Su reservación está guardada: revísela y pague abajo.",
    confirmWindow:
      "¡Qué gusto verle de nuevo! Confirme su fecha y horario de entrega; el resto de su reservación ya está lleno.",
    alreadyCompleted: "Esta reservación ya se completó. ¿Preguntas? Llámenos al (510) 650-2083.",
    datePassed:
      "La fecha de entrega de esta reservación ya pasó. Llámenos al (510) 650-2083 y le damos una fecha nueva.",
    linkExpired:
      "Ese enlace ya venció. Puede volver a reservar abajo en un par de minutos, o llamarnos al (510) 650-2083.",
    alreadyPaid:
      "Parece que esa reservación ya está pagada. ¿Necesita otro dumpster? Reserve abajo, o llámenos al (510) 650-2083 si necesita una copia de su recibo.",
    bonusExpired: "El bono de $15 de su enlace ya venció; abajo aplica el precio normal en línea.",
  },
  service: {
    stepOf: "Paso 1 de 4",
    title: "Elija su dumpster",
    subtitle: "Seleccione qué va a tirar y luego el tamaño que necesita.",
    pickFirst: "Elija qué va a tirar y le mostramos los tamaños y precios que le aplican.",
    overload:
      "Nada por encima del borde del dumpster. Si la carga sobrepasa el borde, hay un **cargo de $149 que se cobra en la recolección**.",
    selected: "✓ Seleccionado",
    popular: "⭐ El más pedido",
    startingAt: "Desde",
    saveOnline: (amount: string) => `Ahorre ${amount} en línea`,
    heading: (size: string) => `Dumpster de ${size}`,
    daysIncluded: (n: number) => `${n} días de renta incluidos`,
    deliveryIncluded: "Entrega, recolección y desecho incluidos",
    noHiddenFees: "Sin cargos ocultos",
    selectThis: "Elegir este dumpster",
    footnote: "Sobrepeso: $179 por tonelada (prorrateado) · Días extra: $49 por día",
    next: "Siguiente: elegir fechas →",
  },
  date: {
    title: "Elija sus fechas",
    includes: (svc: string, n: number) => `${svc} incluye **${n} días** de renta.`,
    requiredSuffix: "son obligatorios.",
    infoBanner: (n: number) =>
      `ℹ **La fecha de recolección se pone sola** según su periodo de renta (${n} días). ¿Terminó antes? Puede elegir una **fecha de recolección más temprana**: mismo precio, los ${n} días siempre van incluidos. ¿Necesita más tiempo? Elija una fecha más adelante; cada día extra cuesta **$49**.`,
    deliveryDate: "Fecha de entrega",
    deliveryMissing: "Elija el día en que quiere que le entreguemos el dumpster",
    deliveryNote:
      "Entregamos **a cualquier hora del día**. Tenga el lugar despejado y con acceso libre: el chofer no puede esperar. Si el lugar está bloqueado: **cargo de $149**.",
    pickupDate: "Fecha de recolección",
    autoSet: "Automática",
    maxRental: (base: number, max: number) =>
      `Lo más largo que podemos reservar en línea son ${base} días más ${max} días extra. Para una renta más larga, llame al (510) 650-2083.`,
    extraDaysNote: (n: number, amount: string) =>
      `(+${n} ${plural(n, "día extra", "días extra")} = +${amount})`,
    pickupNote:
      "Recogemos **a cualquier hora del día**. Mantenga el área despejada o aplica un **cargo de $149**. ¿Necesita más días? Avísenos con **24 horas de anticipación**.",
    windowTitle: "Elija un horario de entrega",
    windowHelp:
      "Los horarios son una guía, no una hora garantizada: la hora exacta puede cambiar por la ruta, la logística y el tráfico.",
    windowMissing: "Elija un horario: mañana o tarde",
    breakdown: "Desglose del precio",
    includedRental: (n: number) => `Renta incluida: ${n} días`,
    included: "Incluido",
    extraDaysLine: (n: number, fee: string) => `Días extra: ${n} × ${fee} por día`,
    onlineDiscount: "Descuento por reservar en línea ($50 menos)",
    rescueBonus: "Bono por reservar ya, de su correo ($15 menos)",
    total: "Total",
    totalRental: (n: number) => `Renta total: ${n} días. Sobrepeso: $179 por tonelada (prorrateado).`,
    missDelivery: "una fecha de entrega",
    missWindow: "un horario de entrega",
    missPickup: "una fecha de recolección válida",
    beforeContinue: (items: string[]) => `Antes de continuar, elija: ${items.join(" y ")}.`,
    next: "Siguiente: dirección de entrega →",
    blocked: {
      past: "Las reservaciones en línea necesitan al menos un día de anticipación: elija mañana o una fecha posterior. Para servicio el mismo día, llámenos al (510) 650-2083.",
      sunday: "No entregamos en domingo. Por favor elija otro día.",
      full: "Lo sentimos, ese día ya no tenemos lugar. Elija el siguiente día disponible, o llámenos al (510) 650-2083.",
      size: (size: string) =>
        `Lo sentimos, el dumpster de ${size} ya no está disponible para esa fecha de entrega. Elija el siguiente día disponible, otro tamaño, o llámenos al (510) 650-2083.`,
    },
  },
  address: {
    title: "Dirección de entrega y contacto",
    subtitle: "¿Dónde le entregamos el dumpster?",
    requiredSuffix: "son obligatorios; todo lo demás es opcional.",
    yourInfo: "Sus datos",
    name: "Nombre o empresa",
    namePh: "Juan Pérez o nombre de su empresa",
    phone: "Teléfono",
    email: "Correo electrónico",
    emailPh: "juan@correo.com",
    errors: {
      nameShort: "El nombre debe tener al menos 2 caracteres",
      nameInvalid: "El nombre tiene caracteres no válidos",
      phoneShort: "El teléfono debe tener al menos 10 dígitos",
      phoneLong: "El número de teléfono es demasiado largo",
      emailRequired: "El correo es obligatorio",
      emailInvalid: "Escriba un correo válido",
      emailDomain: "El dominio del correo parece incorrecto",
      emailTld: "Revise su correo: la terminación del dominio parece incorrecta",
      didYouMean: (s: string) => `¿Quiso decir ${s}?`,
      zipInvalid: "Escriba un código postal (ZIP) válido (por ejemplo, 94601)",
    },
    deliveryAddress: "Dirección de entrega",
    startTyping: "— Empiece a escribir para buscar",
    weServe: "Damos servicio en el Área de la Bahía de San Francisco.",
    street: "Dirección (número y calle)",
    streetPhSearch: "Empiece a escribir su dirección...",
    streetRequired: "La dirección es obligatoria",
    city: "Ciudad",
    cityRequired: "La ciudad es obligatoria",
    zip: "Código postal (ZIP)",
    thatArea: "esa zona",
    outside: (city: string) => `Lo sentimos, por ahora no damos servicio en ${city}.`,
    outsideDetail:
      "Entregamos en Contra Costa, Alameda, San Francisco, San Mateo, Marin, Solano y comunidades cercanas. ¿Preguntas? Llame al (510) 650-2083.",
    billing: "Dirección de facturación",
    optional: "(opcional)",
    addBilling: "+ Agregar otra dirección de facturación",
    sameAsDelivery: "Si no la cambia, es la misma que la de entrega.",
    billingPh: "Empiece a escribir su dirección de facturación...",
    billingCaptured: "Dirección de facturación registrada:",
    billingIncomplete: "Faltan datos: elija una dirección más específica de la lista.",
    billingPick: "Elija una dirección de la lista para que quede completa: calle, ciudad, estado y código postal.",
    useDelivery: "Mejor usar la dirección de entrega",
    place: "¿Dónde exactamente ponemos el dumpster?",
    placeHelp: "El lugar exacto y, si hace falta, el código del portón.",
    placePh: "Ejemplo: en el driveway, lado derecho, frente a la puerta del garaje. Código del portón 1234.",
    placeMissing: "Díganos dónde poner el dumpster",
    miss: {
      name: "su nombre",
      phone: "su teléfono",
      email: "su correo",
      street: "la dirección",
      city: "la ciudad",
      zip: "el código postal",
      billing: "la dirección de facturación",
      place: "dónde poner el dumpster",
    },
    outsideAlert: (city: string) =>
      `Por ahora no damos servicio en ${city}. Llámenos al (510) 650-2083 y vemos qué podemos hacer.`,
    stillNeed: (items: string[]) => `Antes de continuar, todavía nos falta: ${items.join(", ")}.`,
    placeRequired: "El lugar para el dumpster es obligatorio: el chofer necesita saber exactamente dónde dejarlo.",
    next: "Siguiente: revisar y confirmar →",
  },
  summary: {
    title: "Revisar y pagar",
    subtitle: "La entrega, la recolección y el desecho ya van incluidos en el precio.",
    totalToday: "Total a pagar hoy",
    seeBreakdown: "Ver desglose del precio",
    extraDaysLine: (n: number, fee: string) => `${n} ${plural(n, "día extra", "días extra")} × ${fee}`,
    onlineDiscount: "Descuento por reservar en línea",
    rescueBonus: "Bono por reservar ya (de su correo)",
    includes: (weight: string, days: number, fee: string) =>
      `**Su renta incluye** ${weight} y ${days} días. ¿Necesita más? El sobrepeso cuesta **$179** por tonelada y cada día extra **${fee}**.`,
    weightFallback: "el peso permitido",
    review: "Revisar",
    dumpster: "Dumpster",
    dates: "Fechas",
    dropOff: "Entrega:",
    pickUp: "Recolección:",
    deliveryTo: "Entregar a",
    fixBack: "¿Algo que corregir? Regresar",
    consentBefore:
      "Acepto pagar el total de hoy y autorizo los cargos por sobrepeso, días extra o materiales prohibidos, según los ",
    consentLink: "términos de renta",
    consentAfter: ".",
    readTerms: "Leer los términos de renta",
    terms1: (fee: string) =>
      `Autorizo a TP Dumpsters a cobrar a mi tarjeta cualquier cargo adicional que se genere durante el periodo de renta, incluyendo, entre otros: sobrepeso ($179 por tonelada, prorrateado), días adicionales de renta (${fee} por día) y materiales prohibidos o peligrosos que se encuentren en el dumpster ($20–$60 por pieza). Entiendo que estos cargos pueden procesarse después de que se recoja el dumpster.`,
    cancelLabel: "Cancelación:",
    cancelText:
      " se requiere aviso con 24 horas de anticipación; aplica un cargo de cancelación de $150. Si la carga sobrepasa el borde superior, hay un cargo de $149 que se cobra en la recolección.",
    nextLabel: "Qué sigue:",
    nextText:
      " una vez confirmada la reservación, alguien de nuestro equipo se comunica con usted en menos de 24 horas para confirmar los detalles de la entrega y dónde va el dumpster.",
    consentMissing: "Marque la casilla para autorizar los cargos; sin ella no podemos procesar el pago.",
    smsBold: "Envíenme mensajes de texto sobre mi renta (opcional).",
    smsText:
      " Acepto recibir mensajes de texto de TP Dumpsters al número que proporcioné, sobre mi entrega, recolección y cuenta. La frecuencia de los mensajes varía. Pueden aplicar tarifas de mensajes y datos. Responda STOP para cancelar o HELP para recibir ayuda. Dar su consentimiento no es condición para comprar. Consulte nuestros ",
    smsTerms: "Términos de SMS",
    and: " y nuestro ",
    privacy: "Aviso de Privacidad",
    preparing: "Preparando el pago…",
    pay: "Pagar y confirmar",
  },
  payment: {
    loadFailTitle: "No se pudo cargar el formulario de pago.",
    loadFailBody: "Intente de nuevo, o llámenos y le tomamos la reservación por teléfono.",
    backToSummary: "← Regresar al resumen",
    title: "Pago",
    nameOnCard: "Nombre en la tarjeta",
    nameOnCardPh: "Tal como aparece en la tarjeta",
    declined: "Su tarjeta fue rechazada. Intente con otra tarjeta.",
    failed: "No pudimos procesar el pago. Intente de nuevo o llámenos.",
    processing: "Procesando...",
    pay: (amount: string) => `Pagar ${amount} y confirmar la reservación`,
    secure: "Pago seguro con Stripe · Usted nunca sale de tpdumpsters.com",
  },
  confirmation: {
    title: "¡Recibimos su solicitud de reservación!",
    bodyBefore: "Confirmaremos su reservación en breve. Le llamaremos o le mandaremos un mensaje de texto al ",
    bodyAfter: " para cerrar los detalles.",
    service: "Servicio:",
    delivery: "Entrega:",
    pickup: "Recolección:",
    address: "Dirección:",
    estimatedTotal: "Total estimado:",
    bilingual: "¿Preguntas? Llámenos cuando quiera; hablamos inglés y español.",
    call: "Llamar al (510) 650-2083",
  },
  success: {
    title: "¡Reservación confirmada! 🎉",
    subtitle: "Pago recibido: la renta de su dumpster está confirmada.",
    inboxBefore: "Revise su bandeja de entrada en ",
    inboxAfter: " para los dos correos de abajo.",
    reference: "Número de reservación",
    totalPaid: "Total pagado: ",
    yourBooking: "Su reservación",
    dumpster: "Dumpster",
    delivery: "Entrega",
    pickup: "Recolección",
    address: "Dirección",
    viewMap: "Ver el lugar de entrega en Google Maps",
    receiptTitle: "Su recibo y factura",
    receiptBody:
      "Descárguelos o imprímalos aquí: incluyen el cargo, las fechas de renta y su número de reservación. Guárdelos ahora para sus registros.",
    viewReceipt: "Ver recibo y factura",
    downloadPdf: "Descargar PDF",
    invoicePendingBefore: "Su factura todavía se está generando. Actualice esta página en un momento, o llámenos al ",
    invoicePendingAfter: " y le hacemos llegar una copia.",
    whatNext: "¿Qué sigue?",
    paidTitle: "Pago confirmado",
    paidBody: "El cargo a su tarjeta se hizo correctamente. Su recibo y factura están listos arriba.",
    scheduledTitle: "Entrega programada",
    scheduledBody:
      "Nuestro equipo entregará en la fecha y horario que eligió. Le mandamos un mensaje de texto 30 minutos antes de llegar.",
    placementTitle: "Colocación",
    placementBody:
      "El chofer pondrá el dumpster en el lugar que nos indicó. Asegúrese de que el área esté despejada y con acceso libre.",
    changeTitle: "¿Necesita cambiar o cancelar?",
    changeBefore: "Llame al (510) 650-2083 o escriba a info@tpdumpsters.com. Mencione su número de reservación ",
    changeAfter: ".",
    policyLabel: "Política de cancelación:",
    policyText:
      " si cancela más de 24 horas antes de la entrega, le reembolsamos el 90%. Las cancelaciones dentro de las 24 horas previas a la entrega no son reembolsables.",
    backHome: "Volver al inicio",
    call: "📞 Llamar al (510) 650-2083",
    loadingDetails: "Cargando los detalles de la reservación…",
  },
};

export const BOOKING_DICT: Record<Lang, BookingDict> = { en, es };

/* ───────── Data-driven labels ─────────
   The service / size / weight strings in ServiceStep are also the values the
   backend receives (serviceType, size, weightLimit). They are NEVER changed;
   these helpers only translate how they are DISPLAYED. English returns the
   value untouched. */

const SERVICE_ES: Record<string, { name: string; description?: string; note?: string }> = {
  "General Debris": {
    name: "Escombro general",
    description: "Remodelaciones de casa, muebles, cosas que ya no sirven, demolición ligera",
    note: "Colchones, electrodomésticos, electrónicos y llantas: $20–$60 por pieza (según el tamaño; requieren desecho especial)",
  },
  "Household Clean Out": {
    name: "Limpieza de casa",
    description: "Limpieza de casa y garaje, retiro de muebles, sacar lo que ya no usa",
    note: "Colchones, electrodomésticos, electrónicos y llantas: $20–$60 por pieza (según el tamaño; requieren desecho especial)",
  },
  "Construction Debris": {
    name: "Escombro de construcción",
    description: "Demolición, remodelación, desechos de obra",
  },
  Roofing: {
    name: "Techos (roofing)",
    description: "Tejas (shingles), material de techo que se quita, escombro pesado",
  },
  "Clean Soil": {
    name: "Tierra limpia",
    description: "Debe ser 95% pura. Sin piedras, pasto, grava, malla, madera ni basura.",
    note: "Cargo extra: $150 si se agregan materiales prohibidos",
  },
  "Clean Concrete": {
    name: "Concreto limpio",
    description: "Debe ser 95% puro. Sin varilla y sin basura.",
    note: "Cargo extra: $150 si se agregan materiales prohibidos",
  },
  "Green Waste": {
    name: "Desechos de jardín",
    description: "Jardinería, ramas, hojas, limpieza de patio, desechos orgánicos",
  },
  "Mixed Materials": {
    name: "Materiales mixtos",
    description: "Elija el tipo de carga limpia: cada una tiene sus reglas.",
    note: "Cargo extra: $150 si se agregan materiales prohibidos",
  },
  Bricks: { name: "Ladrillo" },
  "Clean Asphalt": { name: "Asfalto limpio" },
};

// Mixed Materials sub-types, keyed by their backend serviceType.
const VARIANT_ES: Record<string, { label: string; sublabel: string }> = {
  "Mixed Materials": {
    label: "Mezcla de tierra y concreto",
    sublabel: "Tierra limpia y concreto limpio en la misma carga",
  },
  Bricks: {
    label: "Sólo ladrillo",
    sublabel: "Sólo ladrillo limpio, sin mezclar otros materiales",
  },
  "Clean Asphalt": {
    label: "Asfalto limpio",
    sublabel: "Sólo asfalto: sin tierra, concreto, varilla, grava, madera, basura ni tela",
  },
};

const SIZE_SUBTEXT_ES: Record<string, string> = {
  "10 Yard": "Ideal para limpiezas pequeñas",
  "20 Yard": "Perfecto para proyectos en casa",
  "30 Yard": "El mejor para trabajos grandes",
};

export function serviceName(lang: Lang, service: string | undefined | null): string {
  if (!service) return "";
  return lang === "es" ? SERVICE_ES[service]?.name ?? service : service;
}

export function serviceDescription(lang: Lang, service: string, fallback: string): string {
  return lang === "es" ? SERVICE_ES[service]?.description ?? fallback : fallback;
}

export function serviceNote(lang: Lang, service: string, fallback: string | undefined): string | undefined {
  if (!fallback) return fallback;
  return lang === "es" ? SERVICE_ES[service]?.note ?? fallback : fallback;
}

export function variantText(
  lang: Lang,
  serviceType: string,
  field: "label" | "sublabel",
  fallback: string | undefined
): string | undefined {
  if (!fallback) return fallback;
  return lang === "es" ? VARIANT_ES[serviceType]?.[field] ?? fallback : fallback;
}

export function sizeSubtext(lang: Lang, size: string, fallback: string | undefined): string | undefined {
  return lang === "es" ? SIZE_SUBTEXT_ES[size] ?? fallback : fallback;
}

/** "10 Yard" → "10 yardas" in Spanish. */
export function sizeName(lang: Lang, size: string | undefined | null): string {
  if (!size) return "";
  return lang === "es" ? size.replace(/\s*Yard$/i, " yardas") : size;
}

/** "1 ton" → "1 tonelada", "No weight limit" → "Sin límite de peso". */
export function weightName(lang: Lang, w: string | undefined | null): string {
  if (!w) return "";
  if (lang !== "es") return w;
  if (/^no weight limit$/i.test(w)) return "Sin límite de peso";
  const m = w.match(/^(\d+(?:\.\d+)?)\s*tons?$/i);
  if (m) return `${m[1]} ${m[1] === "1" ? "tonelada" : "toneladas"}`;
  return w;
}

/** The "… included" line on the size cards and the summary. */
export function weightIncluded(lang: Lang, w: string | undefined | null): string {
  if (!w) return "";
  if (lang !== "es") return `${w} included`;
  if (/^no weight limit$/i.test(w)) return "Sin límite de peso";
  const name = weightName(lang, w);
  return `${name} ${/^1 /.test(name) ? "incluida" : "incluidas"}`;
}

/** Weight as the object of "Your rental includes …". */
export function weightPhrase(lang: Lang, w: string | undefined | null): string {
  if (!w) return "";
  if (lang === "es" && /^no weight limit$/i.test(w)) return "peso sin límite";
  return weightName(lang, w);
}

const WINDOWS: Record<string, { en: string; es: string; timeEn: string; timeEs: string }> = {
  morning: { en: "Morning", es: "Mañana", timeEn: "7:00 AM - 12:00 PM", timeEs: "7:00 a. m. – 12:00 p. m." },
  // Legacy window, only shown for bookings made before the 2-window switch.
  midday: { en: "Midday", es: "Mediodía", timeEn: "11:00 AM - 3:00 PM", timeEs: "11:00 a. m. – 3:00 p. m." },
  afternoon: { en: "Afternoon", es: "Tarde", timeEn: "1:00 PM - 6:00 PM", timeEs: "1:00 p. m. – 6:00 p. m." },
};

export function windowName(lang: Lang, id: string): string {
  const w = WINDOWS[id];
  return w ? w[lang] : id;
}

export function windowTime(lang: Lang, id: string): string {
  const w = WINDOWS[id];
  return w ? (lang === "es" ? w.timeEs : w.timeEn) : "";
}

/** "Morning (7:00 AM - 12:00 PM)"; unknown ids come back as-is. */
export function windowLabel(lang: Lang, id: string): string {
  const w = WINDOWS[id];
  return w ? `${windowName(lang, id)} (${windowTime(lang, id)})` : id;
}

/** yyyy-mm-dd → localized date ("Monday, October 5, 2026" / "lunes, 5 de octubre de 2026"). */
export function formatBookingDate(lang: Lang, iso: string, style: "long" | "short" = "long"): string {
  if (!iso) return "";
  const date = new Date(iso + "T12:00:00");
  return date.toLocaleDateString(lang === "es" ? "es-US" : "en-US", {
    weekday: style,
    month: style,
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Money for display. English keeps the exact strings the wizard always
 * showed (`$599`, `$549.00`); Spanish uses es-US formatting.
 */
export function money(lang: Lang, n: number, cents = false): string {
  if (lang !== "es") return cents ? `$${n.toFixed(2)}` : `$${n}`;
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(n);
}

/** "12' L × 8' W × 2.5' H" → "12' largo × 8' ancho × 2.5' alto" in Spanish. */
export function dimensionsName(lang: Lang, d: string | undefined | null): string {
  if (!d) return "";
  if (lang !== "es") return d;
  return d.replace(/' L\b/, "' largo").replace(/' W\b/, "' ancho").replace(/' H\b/, "' alto");
}
