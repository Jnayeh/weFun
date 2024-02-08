const { migrate } = require("drizzle-orm/mysql2/migrator");
const mysql = require("mysql2/promise");
const { drizzle } = require("drizzle-orm/mysql2");
var { once } = require("lodash");

/**
 * @type {import("mysql2/promise").Connection | undefined}
 */
let connect;

const migrateDB = once(async () => {
  try {
    if (connect === undefined) {
      connect = await mysql.createConnection(process.env.DATABASE_URL ?? "");
    }
    const db = drizzle(connect, { logger: true });
    await migrate(db, { migrationsFolder: "./drizzle" });
    await connect.end();
    connect.destroy();
    console.log("Migration complete");
  } catch (err) {
    console.error(err);
    console.warn("Migration failed");
  } finally {
    connect?.destroy();
    console.info("Connection destroyed");
  }
});
module.exports = {
  migrateDB,
};
