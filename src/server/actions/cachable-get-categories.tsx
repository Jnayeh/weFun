"use server"
import { nextCache } from "~/utils/helpers/server";
import { api } from "~/trpc/server";

export const cachableGetCategories = nextCache(
  async ({ name }) => {
    return api.category.getAll.query({ name });
  },
  ["categories"],
  { tags: ["getCategories"], revalidate: 60 }
);
