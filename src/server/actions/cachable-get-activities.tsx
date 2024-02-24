"use server"
import { nextCache } from "~/utils/helpers/server";
import { api } from "~/trpc/server";

export const cachableGetActivities = nextCache(
  async ({ name }) => {
    return api.activity.getAll.query({ name });
  },
  ["activities"],
  { tags: ["getActivities"], revalidate: 60 }
);
