// @ts-nocheck
const { migrate } = require("drizzle-orm/mysql2/migrator");
const mysql = require("mysql2/promise");
const { drizzle } = require("drizzle-orm/mysql2");

/**
 * @type {import("mysql2/promise").Connection | undefined}
 */
let connect;

const migrateDB = async () => {
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
};
'use strict';


function once(func) {
  function _f() {
    if (!_f.isCalled) {
      _f.isCalled = true;
      _f.res = func.apply(this, arguments);
    }
    return _f.res;
  }

  _f.prototype = func.prototype;
  _f.isCalled = false;

  return _f;
}

module.exports = {
  migrateDB, once
};
