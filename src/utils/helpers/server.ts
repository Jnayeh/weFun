import { type ClassValue, clsx } from "clsx";
import { unstable_cache, unstable_noStore } from "next/cache";
import React from "react";
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

export function registerService<Type>(name: string, initFn: () => Type): Type {
  if (process.env.NODE_ENV === "development") {
    if (!(name in global)) {
      console.log(`Service "${name}" registered.`);
      (global as any)[name] = initFn();
    } else {
      console.warn(`Service "${name}" already registered.`);
    }

    return (global as any)[name];
  }
  return initFn();
}
export function unregisterService(name: string) {
  if (process.env.NODE_ENV === "development") {
    delete (global as any)[name];
  }
}
export function useTranslatedElements(
  keys: number[],
  translation: (key: string) => string
) {
  return keys.map((i) => {
    try {
      if (!translation(`${i}.element`).includes(`${i}.element`)) {
        if (translation(`${i}.element`).includes("br")) {
          return React.createElement("br", { key: i });
        }
        return React.createElement(
          translation(`${i}.element`),
          { className: translation(`${i}.class`), key: i },
          translation(`${i}.text`)
        );
      }
    } catch (error) {
      return null;
    }
  });
}
