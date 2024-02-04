import { type ClassValue, clsx } from "clsx";
import { unstable_cache, unstable_noStore } from "next/cache";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const nextNoStore = unstable_noStore;
export const nextCache = unstable_cache;

/**
 * Register service.
 * @description Stores instances in `global` to prevent memory leaks in development.
 * @arg {string} name Service name.
 * @arg {function} initFn Function returning the service instance.
 * @return {*} Service instance.
 */

export function registerService<Type> (name:string, initFn: ()=> Type): Type {
  if (process.env.NODE_ENV === "development") {
    if (!(name in global)) {
      console.log("reusing client");

      (global as any)[name] = initFn();
    }
    return (global as any)[name];
  }
  return initFn();
};