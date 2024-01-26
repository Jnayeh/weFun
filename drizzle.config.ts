import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema*",
  out: "./drizzle",
  driver: "pg"
} satisfies Config;