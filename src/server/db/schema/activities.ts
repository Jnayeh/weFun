import {
  mysqlTable,
  int,
  real,
  timestamp,
  text,
  varchar,
  smallint,
  bigint,
} from "drizzle-orm/mysql-core";
import {sql} from "drizzle-orm";

export const categories = mysqlTable("categories", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  label: varchar("label", { length: 255 }),
  details: text("details"),
  cover: varchar("cover", { length: 255 }),
  visible: smallint("visible").default(1),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow()
    .notNull(),
});

export const activities = mysqlTable("activities", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  label: varchar("label", { length: 255 }),
  description: text("description"),
  cover: varchar("cover", { length: 255 }),
  location: varchar("location", { length: 255 }),
  price: real("price").notNull(),
  visible: smallint("visible").default(1).notNull(),
  discount: int("discount").default(0),
  capacity: int("capacity").notNull(),
  activity_duration: int("activity_duration").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow()
    .notNull(),
  categoryId: bigint("categoryId", {
    mode: "number",
  })
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
});

export const images = mysqlTable("images", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  filename: varchar("filename", { length: 255 }),
  url: text("url"),
  blurUrl: text("blur_url"),
  size: bigint("size", {
    unsigned: true,
    mode: "number",
  }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow()
    .notNull(),
  activityId: bigint("activityId", {
    mode: "number",
  }).references(() => activities.id, {
    onDelete: "cascade",
  }),
});

export const locations = mysqlTable("locations", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  label: varchar("label", { length: 255 }),
  cover: varchar("cover", { length: 255 }),
  visible: smallint("visible").default(1),
  latitude: real("latitude"),
  longitude: real("longitude"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow()
    .notNull(),
});
