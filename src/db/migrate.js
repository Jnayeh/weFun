const { migrate } = require("drizzle-orm/mysql2/migrator");
const mysql = require("mysql2");
const { drizzle } = require("drizzle-orm/mysql2");
var { once } = require("lodash");

/**
 * @type {import("drizzle-orm/mysql2").MySql2Client | import("mysql2").Connection | import("mysql2").Pool | undefined}
 */
let connect;

const migrateDB = once(async () => {
  try {
    if (connect === undefined) {
      connect = mysql.createConnection(process.env.DATABASE_URL ?? "");
    }
    const db = drizzle(connect, { logger: true });
    await migrate(db, { migrationsFolder: "./drizzle" });
    connect.end();
    console.log("Migration complete");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
module.exports = {
  migrateDB,
};
