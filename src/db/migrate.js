const { migrate } = require("drizzle-orm/mysql2/migrator");
const mysql = require("mysql2/promise");
const { drizzle } = require("drizzle-orm/mysql2");
// @ts-ignore
var { once } = require("lodash");

/**
 * @type {import("mysql2/promise").Connection | undefined}
 */
let connect;

/**
 * @param {string} name
 * @param {() => Promise<void>} initFn
 * @returns {Promise<void>}
 */
function registerService(name, initFn) {
  if (process.env.NODE_ENV === "development") {
    if (!(name in global)) {
      console.log("reusing client");

      // @ts-ignore
      global[name] = initFn();
    }
    // @ts-ignore
    return global[name];
  }
  return initFn();
}
const migrateDB = () => {
  registerService("migrateDB", async () => {
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
};
module.exports = {
  migrateDB,
};
