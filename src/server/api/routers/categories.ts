import { z } from "zod";
import { activities, categories } from "~/db/schema";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  getAllProtected: protectedProcedure
    .query(({ ctx }) => {
      return ctx.db.select().from(categories);
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
