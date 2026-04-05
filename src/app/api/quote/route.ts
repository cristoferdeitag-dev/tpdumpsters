import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";

/* ───────── Service definitions ───────── */
const SERVICES: Record<string, { sizes: Record<string, { price: number; dims: string; weight: string; days: number }> }> = {
  "General Debris": {
    sizes: {
      "10 Yard": { price: 599, dims: "12'L × 8'W × 2.5'H", weight: "1 ton", days: 7 },
      "20 Yard": { price: 649, dims: "16'L × 8'W × 4'H", weight: "2 tons", days: 7 },
      "30 Yard": { price: 749, dims: "16'L × 8'W × 6'H", weight: "3 tons", days: 7 },
    },
  },
  "Household Clean Out": {
    sizes: {
      "10 Yard": { price: 599, dims: "12'L × 8'W × 2.5'H", weight: "1 ton", days: 7 },
      "20 Yard": { price: 649, dims: "16'L × 8'W × 4'H", weight: "2 tons", days: 7 },
      "30 Yard": { price: 749, dims: "16'L × 8'W × 6'H", weight: "3 tons", days: 7 },
    },
  },
  "Construction Debris": {
    sizes: {
      "10 Yard": { price: 599, dims: "12'L × 8'W × 2.5'H", weight: "1 ton", days: 7 },
      "20 Yard": { price: 649, dims: "16'L × 8'W × 4'H", weight: "2 tons", days: 7 },
      "30 Yard": { price: 749, dims: "16'L × 8'W × 6'H", weight: "3 tons", days: 7 },
    },
  },
  "Roofing": {
    sizes: {
      "10 Yard": { price: 599, dims: "12'L × 8'W × 2.5'H", weight: "1 ton", days: 7 },
      "20 Yard": { price: 649, dims: "16'L × 8'W × 4'H", weight: "2 tons", days: 7 },
      "30 Yard": { price: 749, dims: "16'L × 8'W × 6'H", weight: "3 tons", days: 7 },
    },
  },
  "Green Waste": {
    sizes: {
      "10 Yard": { price: 599, dims: "12'L × 8'W × 2.5'H", weight: "1 ton", days: 7 },
      "20 Yard": { price: 649, dims: "16'L × 8'W × 4'H", weight: "2 tons", days: 7 },
      "30 Yard": { price: 749, dims: "16'L × 8'W × 6'H", weight: "3 tons", days: 7 },
    },
  },
  "Clean Soil": {
    sizes: {
      "10 Yard": { price: 599, dims: "12'L × 8'W × 2.5'H", weight: "No weight limit", days: 3 },
    },
  },
  "Clean Concrete": {
    sizes: {
      "10 Yard": { price: 599, dims: "12'L × 8'W × 2.5'H", weight: "No weight limit", days: 3 },
    },
  },
  "Mixed Materials": {
    sizes: {
      "10 Yard": { price: 749, dims: "12'L × 8'W × 2.5'H", weight: "No weight limit", days: 3 },
    },
  },
};

function generateId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `QT-${date}-${rand}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, customerPhone, deliveryAddress, billingAddress, serviceType, size, notes } = body;

    if (!customerName || !deliveryAddress || !serviceType || !size) {
      return NextResponse.json({ error: "Missing required fields: customerName, deliveryAddress, serviceType, size" }, { status: 400 });
    }

    const service = SERVICES[serviceType];
    if (!service) return NextResponse.json({ error: `Unknown service: ${serviceType}` }, { status: 400 });

    const sizeInfo = service.sizes[size];
    if (!sizeInfo) return NextResponse.json({ error: `Unknown size ${size} for ${serviceType}` }, { status: 400 });

    const id = generateId();
    const discountPct = 5;
    const discountAmount = Math.round(sizeInfo.price * discountPct) / 100;
    const totalPrice = sizeInfo.price - discountAmount;
    const validUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    try {
      const db = getPool();
      await db.execute(
        `INSERT INTO quotes (id, customer_name, customer_email, customer_phone, delivery_address, billing_address, service_type, size, dimensions, weight_limit, rental_days, base_price, discount_pct, discount_amount, total_price, notes, valid_until)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, customerName, customerEmail || null, customerPhone || null, deliveryAddress, billingAddress || null, serviceType, size, sizeInfo.dims, sizeInfo.weight, sizeInfo.days, sizeInfo.price, discountPct, discountAmount, totalPrice, notes || null, validUntil]
      );
      
    } catch (dbErr) {
      console.error("DB error (quote saved in response only):", dbErr);
    }

    const quote = {
      id,
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress,
      billingAddress,
      serviceType,
      size,
      dimensions: sizeInfo.dims,
      weightLimit: sizeInfo.weight,
      rentalDays: sizeInfo.days,
      basePrice: sizeInfo.price,
      discountPct,
      discountAmount,
      totalPrice,
      notes,
      validUntil,
      url: `https://tpdumpsters.com/quote/${id}`,
    };

    console.log(`📄 QUOTE CREATED: ${id} | ${customerName} | ${serviceType} ${size} | $${totalPrice}`);
    return NextResponse.json(quote);
  } catch (err) {
    console.error("Quote error:", err);
    return NextResponse.json({ error: "Failed to create quote" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    const db = getPool();
    const [rows] = await db.execute("SELECT * FROM quotes WHERE id = ?", [id]);
    
    const results = rows as Record<string, unknown>[];
    if (!results.length) return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    return NextResponse.json(results[0]);
  } catch (err) {
    console.error("Quote fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch quote" }, { status: 500 });
  }
}
