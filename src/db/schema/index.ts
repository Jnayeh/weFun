import {
  mysqlTable,
  int,
  real,
  timestamp,
  text,
  varchar,
  serial,
  smallint,
  boolean,
  bigint,
} from "drizzle-orm/mysql-core";

export const categories = mysqlTable("categories", {
  id: serial("id").primaryKey(),
  label: varchar("label", { length: 255 }),
  details: text("details"),
  cover: varchar("cover", { length: 255 }),
  visible: smallint("visible").default(1),
  createdAt: timestamp("createdAt").defaultNow(),
  modifiedAt: timestamp("modifiedAt").defaultNow().onUpdateNow(),
});

export const activities = mysqlTable("activities", {
  id: serial("id").primaryKey(),
  label: varchar("label", { length: 255 }),
  description: text("description"),
  cover: varchar("cover", { length: 255 }),
  location: varchar("location", { length: 255 }),
  price: real("price").notNull(),
  visible: smallint("visible").default(1).notNull(),
  discount: int("discount").default(0),
  capacity: int("capacity").notNull(),
  activity_duration: int("activity_duration").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  modifiedAt: timestamp("modifiedAt").defaultNow().onUpdateNow(),
  categoryId: int("categoryId")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
});

export const images = mysqlTable("images", {
  id: serial("id").primaryKey(),
  filename: varchar("filename", { length: 255 }),
  size: bigint("size",{
    unsigned: true,
    mode: "number"
  }),
  createdAt: timestamp("createdAt").defaultNow(),
  modifiedAt: timestamp("modifiedAt").defaultNow().onUpdateNow(),
  activityId: int("activityId").references(() => activities.id, {
    onDelete: "cascade",
  }),
});

