"use server";

import { revalidateTag } from "next/cache";

export async function nextRevalidate(tag: string) {
  revalidateTag(tag);
}
