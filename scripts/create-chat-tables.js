const mysql = require("mysql2/promise");
const fs = require("fs");

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "",
};

async function createTables() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("Connected to database...");

    const sql = fs.readFileSync("./sql/create_chat_tables.sql", "utf8");
    const statements = sql.split(";").filter((s) => s.trim());

    for (const statement of statements) {
      if (statement.trim()) {
        await connection.execute(statement);
        console.log("Executed:", statement.substring(0, 50) + "...");
      }
    }

    await connection.end();
    console.log("✅ Chat tables created successfully!");
  } catch (error) {
    console.error("❌ Error creating tables:", error);
    process.exit(1);
  }
}

createTables();
