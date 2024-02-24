import { categories, activities, images } from "./schema";

export type Category = typeof categories.$inferSelect & { blurUrl?: string };
export type Activity = typeof activities.$inferSelect & {
  category?: Category;
  blurUrl?: string;
};
export type createActivity = Omit<typeof activities.$inferInsert, "id">;
export type Image = typeof images.$inferSelect;
