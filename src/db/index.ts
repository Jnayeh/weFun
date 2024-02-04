import mysql from "mysql2";
import { drizzle } from "drizzle-orm/mysql2";
import { env } from "~/env.mjs";
import { registerService } from "~/utils/helpers/server";

const client = registerService("DB", () => {
  return mysql.createConnection(env.DATABASE_URL);
});
export const db = drizzle(client, { logger: true });
