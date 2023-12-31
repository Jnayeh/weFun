import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { activityRouter } from "./routers/activities";
import { categoryRouter } from "./routers/categories";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  activity: activityRouter,
  category: categoryRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
