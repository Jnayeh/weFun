import { categories } from "~/db/schema";
import { Category } from "~/db/types";
import { dynamicBlurDataUrl } from "~/server/actions";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const cats: Category[] = await ctx.db.select().from(categories);
    if (cats && cats.length > 0) {
      for (let index = 0; index < cats.length; index++) {
        let it = cats[index];
        if (it && it.cover) it.blurUrl = await dynamicBlurDataUrl(it.cover);
      }
    }
    return cats;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
