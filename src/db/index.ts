import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { env } from "~/env.mjs";
import { registerService } from "~/utils/helpers/server";

let client = await mysql.createConnection(env.DATABASE_URL);
try {
  await client.connect();
  console.log("Database connection successful");
} catch (error) {
  console.error("Database connection error:", error);
}
export const db = drizzle(client, { logger: true });
