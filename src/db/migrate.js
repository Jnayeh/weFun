const { migrate } = require("drizzle-orm/mysql2/migrator");
const mysql = require("mysql2");
const { drizzle } = require("drizzle-orm/mysql2");
var { once } = require("lodash");

/**
 * @type {import("drizzle-orm/mysql2").MySql2Client | import("mysql2").Connection | import("mysql2").Pool | undefined}
 */
const connect = mysql.createConnection(process.env.DATABASE_URL ?? "");

const migrateDB = once(async () => {
  try {
    const db = drizzle(connect, { logger: true });
    await migrate(db, { migrationsFolder: "./drizzle" });
    connect.destroy();
    console.log("Migration complete");
  } catch (err) {
    console.error(err);
    connect.destroy();
    console.warn("Migration failed");
  }
});
module.exports = {
  migrateDB,
};
