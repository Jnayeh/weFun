import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { env } from "~/env.mjs";

const client = await mysql.createConnection(env.DATABASE_URL);
export const db = drizzle(client,{ logger: false });
