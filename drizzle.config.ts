import type { Config } from "drizzle-kit";
 
export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    connectionString: "mysql://root@localhost:3306/wefun"
  }
} satisfies Config;