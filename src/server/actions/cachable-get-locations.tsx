"use server"
import { nextCache } from "~/utils/helpers/server";
import { api } from "~/trpc/server";

export const cachableGetLocations = nextCache(
  async ({ name }) => {
    return api.location.getAll.query({ name });
  },
  ["locations"],
  { tags: ["getLocations"], revalidate: 60 }
);
