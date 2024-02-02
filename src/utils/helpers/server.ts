import { type ClassValue, clsx } from "clsx"
import { unstable_cache, unstable_noStore } from "next/cache"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const nextNoStore = unstable_noStore
export const nextCache = unstable_cache