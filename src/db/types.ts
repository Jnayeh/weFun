import { categories, activities, images } from "./schema";

export type Category = typeof categories.$inferSelect;
export type Activity = typeof activities.$inferSelect & {
  category?: Category;
};
export type createActivity = Omit<typeof activities.$inferInsert, "id">;
export type Image = typeof images.$inferSelect;