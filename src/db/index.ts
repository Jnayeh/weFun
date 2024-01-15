import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { env } from "~/env.mjs";

const client = postgres(env.DATABASE_URL);
const migrationClient = postgres(env.DATABASE_URL, { max: 1 });
export const db = drizzle(client,{ logger: true });
await migrate(drizzle(migrationClient), { migrationsFolder: "drizzle" });
await migrationClient.end();