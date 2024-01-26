import { error, log } from "console";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { env } from "~/env.mjs";
const migrationClient = postgres(env.DATABASE_URL, { max: 1 });
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
