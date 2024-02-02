import { error, log } from "console";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";
import { env } from "~/env.mjs";
const migrationClient = await mysql.createConnection(env.DATABASE_URL);
export const db = drizzle(migrationClient, { logger: true });
export const migrateDB = async () => {
  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    log("Migration complete");
    await migrationClient.end();
  } catch (err) {
    error(err);
    process.exit(1);
  }
};
