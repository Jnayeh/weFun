import {
  pgTable,
  integer,
  primaryKey,
  real,
  timestamp,
  text,
  varchar,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const users = pgTable("users", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  role: varchar("role", { length: 20 }).notNull().default("user"),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    precision: 3,
  }),
  image: varchar("image", { length: 255 }),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 255 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export const sessions = pgTable("sessions", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);

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

export type User = typeof users.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Activity = typeof activities.$inferSelect & {
  category?: Category;
};
export type Image = typeof images.$inferSelect;
