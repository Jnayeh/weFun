import { SQL, sql } from "drizzle-orm";
import { z } from "zod";
import { activities } from "~/db/schema";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const activityRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ ctx, input }) => {
      const sqlChunks: SQL[] = [];

      if (input.name.replaceAll(" ", "").length > 0) {
        sqlChunks.push(sql`${activities.label} like ${"%" + input.name + "%"}`);
      }
      if (sqlChunks.length == 0) {
        sqlChunks.push(sql`null is null`);
      }
      return ctx.db
        .select()
        .from(activities)
        .where(sql.join(sqlChunks, sql.raw(" ")));
    }),
  create: publicProcedure
    .input(
      z.object({
        label: z.string(),
        description: z.string().optional(),
        cover: z.string().optional(),
        location: z.string().optional(),
        price: z.number(),
        visible: z.number().default(1),
        discount: z.number().default(0),
        capacity: z.number(),
        activity_duration: z.number(),
        categoryId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insert(activities)
        .values({
          id: new Date().getTime()-1705826340000,
          label: input.label,
          description: input.description,
          cover: "test",
          location: "test",
          price: input.price,
          visible: input.visible,
          discount: input.discount,
          capacity: input.capacity,
          activity_duration: input.activity_duration,
          categoryId: input.categoryId,
          modifiedAt: new Date(),
          createdAt: new Date(),
        })
        .returning();
    }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
