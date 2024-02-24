import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { env } from "~/env.mjs";
import { registerService } from "~/utils/helpers/server";

let client = registerService("mysql", () => {
  return mysql.createPool({
    uri: env.DATABASE_URL,
    connectionLimit: 3,
  });
});
export const db = drizzle(client, { logger: true });
