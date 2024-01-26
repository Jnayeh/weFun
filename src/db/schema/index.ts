import {
  pgTable,
  integer,
  primaryKey,
  real,
  timestamp,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: integer("id").notNull().primaryKey(),
  label: varchar("label", { length: 255 }),
  details: text("details"),
  cover: varchar("cover", { length: 255 }),
  visible: integer("visible").default(1),
  createdAt: timestamp("createdAt").defaultNow(),
  modifiedAt: timestamp("modifiedAt").defaultNow(),
});

export const activities = pgTable("activities", {
  id: integer("id").notNull().primaryKey(),
  label: varchar("label", { length: 255 }),
  description: text("description"),
  cover: varchar("cover", { length: 255 }),
  location: varchar("location", { length: 255 }),
  price: real("price").notNull(),
  visible: integer("visible").default(1).notNull(),
  discount: real("discount").default(0),
  capacity: integer("capacity").notNull(),
  activity_duration: integer("activity_duration").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  modifiedAt: timestamp("modifiedAt").defaultNow(),
  categoryId: integer("categoryId")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
});

export const images = pgTable("images", {
  id: integer("id").notNull().primaryKey(),
  filename: varchar("filename", { length: 255 }),
  size: integer("size"),
  createdAt: timestamp("createdAt").defaultNow(),
  modifiedAt: timestamp("modifiedAt").defaultNow(),
  activityId: integer("activityId").references(() => categories.id, {
    onDelete: "cascade",
  }),
});

