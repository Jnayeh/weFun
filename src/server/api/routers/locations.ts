import { SQL, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { locations } from "~/db/schema";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const locationRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ ctx, input }) => {
      const sqlChunks: SQL[] = [];

      if (input.name.replaceAll(" ", "").length > 0) {
        sqlChunks.push(sql`${locations.label} like ${"%" + input.name + "%"}`);
      }
      if (sqlChunks.length == 0) {
        sqlChunks.push(sql`null is null`);
      }
      return ctx.db
        .select()
        .from(locations)
        .where(sql.join(sqlChunks, sql.raw(" ")));
    }),
  create: publicProcedure
    .input(
      z.object({
        id: z.number().optional(),
        label: z.string(),
        cover: z.string().optional(),
        location: z.string().optional(),
        latitude: z.number().min(0.01),
        longitude: z.number().min(0.01),
        visible: z.number().default(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .insert(locations)
        .values(input);
    }),

   update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        label: z.string(),
        cover: z.string().optional(),
        location: z.string().optional(),
        latitude: z.number().min(0.01),
        longitude: z.number().min(0.01),
        visible: z.number().default(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db
        .update(locations)
        .set(input)
        .where(eq(locations.id, input.id));
    }),


    delete: protectedProcedure.input(
      z.object({
        id: z.number(),
      })
    ).mutation(({ ctx, input })=>{
      // ctx.db.delete(locations).where(eq(locations.id, input.id))        
      
      ctx.db
      .update(locations)
      .set({
        visible: 0,
      })
      .where(eq(locations.id, input.id));
    }),




  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
