import mysql from "mysql2/promise";
import { readFileSync } from "fs";

// The DB password is read from a file on the server (same pattern as the
// Stripe/Twilio keys and the dashboard password). Hostinger does NOT inject env
// vars into the Node process, so process.env.DB_PASSWORD is empty in prod, which
// made every DB query fail with "Access denied (using password: NO)". Falls back
// to env for local/dev.
function getDbPassword(): string {
  try {
    const parsed = JSON.parse(readFileSync("/home/u781187371/db-creds.json", "utf8"));
    if (typeof parsed.password === "string" && parsed.password) return parsed.password;
  } catch {
    // file missing (local/dev) — fall through to env
  }
  return process.env.DB_PASSWORD || "";
}

// Database config — Hostinger MySQL
const DB_CONFIG = {
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "u781187371_cristoferdeita",
  password: getDbPassword(),
  database: process.env.DB_NAME || "u781187371_DumspterBookin",
  waitForConnections: true,
  connectionLimit: 5,
};

let pool: mysql.Pool | null = null;

// DATE columns come back from mysql2 as JS Date objects (midnight in the
// server's timezone). Format via the LOCAL components so the stored calendar
// day is reproduced exactly — converting through another timezone (or
// toISOString) can shift the day by one.
export function dateToYMD(v: unknown): string {
  if (v instanceof Date) {
    const m = String(v.getMonth() + 1).padStart(2, "0");
    const d = String(v.getDate()).padStart(2, "0");
    return `${v.getFullYear()}-${m}-${d}`;
  }
  return String(v ?? "").slice(0, 10);
}

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool(DB_CONFIG);
  }
  return pool;
}

export async function getConnection() {
  return mysql.createConnection(DB_CONFIG);
}

// Initialize tables if they don't exist
export async function initDB() {
  const db = getPool();

  await db.execute(`
    CREATE TABLE IF NOT EXISTS customers (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      email VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS bookings (
      id VARCHAR(36) PRIMARY KEY,
      booking_id VARCHAR(20) UNIQUE NOT NULL,
      customer_id VARCHAR(36) NOT NULL,
      service_type VARCHAR(100) NOT NULL,
      dumpster_size VARCHAR(20) NOT NULL,
      base_price DECIMAL(10,2) NOT NULL,
      extra_days INT DEFAULT 0,
      extra_day_fee DECIMAL(10,2) DEFAULT 75,
      total_price DECIMAL(10,2) NOT NULL,
      delivery_date DATE NOT NULL,
      pickup_date DATE NOT NULL,
      address VARCHAR(500) NOT NULL,
      city VARCHAR(100) NOT NULL,
      zip_code VARCHAR(10) NOT NULL,
      notes TEXT,
      status VARCHAR(20) DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES customers(id)
    )
  `);
}
