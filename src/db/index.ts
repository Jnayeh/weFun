import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { env } from "~/env.mjs";
import { migrate } from "drizzle-orm/mysql2/migrator";

/* const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; */

const client = await mysql.createConnection(env.DATABASE_URL);
export const db = drizzle(client,{ logger: true });
/* await migrate(db, { migrationsFolder: "drizzle" }); */