import type { Config } from "drizzle-kit";
 
export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: "postgresql://all_we_do:act_pass@localhost:5432/barmejha"
  }
} satisfies Config;