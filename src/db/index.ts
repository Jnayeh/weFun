import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { env } from "~/env.mjs";
import { registerService } from "~/utils/helpers/server";

let client = await registerService("DB", () => {
  return mysql.createConnection(env.DATABASE_URL);
});

export const db = drizzle(client, { logger: true });
