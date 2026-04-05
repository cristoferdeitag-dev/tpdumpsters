import mysql from "mysql2/promise";

// Database config — Hostinger MySQL
const DB_CONFIG = {
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "u781187371_cristoferdeita",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "u781187371_DumspterBookin",
  waitForConnections: true,
  connectionLimit: 5,
};

let pool: mysql.Pool | null = null;

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
      extra_day_fee DECIMAL(10,2) DEFAULT 49,
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
