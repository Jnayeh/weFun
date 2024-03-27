import { categories } from "~/db/schema";
import { Category } from "~/db/types";
import { dynamicBlurDataUrl } from "~/server/actions";

import { SQL, eq, sql } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";



export const categoryRouter = createTRPCRouter({
   getAllv1: publicProcedure.query(async ({ ctx }) => {
     const cats: Category[] = await ctx.db.select().from(categories);
    if (cats && cats.length > 0) {
       for (let index = 0; index < cats.length; index++) {
        let it = cats[index];
        if (it && it.cover) it.blurUrl = await dynamicBlurDataUrl(it.cover);
      }
    }
    return cats;
  }),
  // bruh if this breaks shit ill get it back  cuz i just need my .query func

  getAll: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ ctx, input }) => {
      const sqlChunks: SQL[] = [];

      if (input.name.replaceAll(" ", "").length > 0) {
        sqlChunks.push(sql`${categories.label} like ${"%" + input.name + "%"}`);
      }
      if (sqlChunks.length == 0) {
        sqlChunks.push(sql`null is null`);
      }
      return ctx.db
        .select()
        .from(categories)
        .where(sql.join(sqlChunks, sql.raw(" ")));
    }),


    create: publicProcedure
    .input(
      z.object({
        id: z.number().optional(),
        label: z.string(),
        cover: z.string().optional(),
        details: z.string().optional(),
        visible: z.number().default(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insert(categories)
        .values(input);
    }),

    update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        label: z.string(),
        cover: z.string().optional(),
        details: z.string().optional(),
        visible: z.number().default(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(categories)
        .set(input)
        .where(eq(categories.id, input.id));
    }),

    delete: protectedProcedure.input(
      z.object({
        id: z.number(),
      })
    ).mutation(({ ctx, input })=>{
      // ctx.db.delete(categories).where(eq(categories.id, input.id))        
      
      ctx.db
      .update(categories)
      .set({
        visible: 0,
      })
      .where(eq(categories.id, input.id));
    }),



  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
