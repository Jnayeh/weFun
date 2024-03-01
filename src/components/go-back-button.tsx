"use client";
import Arrow from "./SvgStore/arrow";
import { cn } from "~/utils/helpers/client";
export default function GoBack() {
  return (
    <button
      onClick={() => window.history.back()}
      className="flex w-1/2 items-center justify-center gap-x-2 rounded-lg border bg-white px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 sm:w-auto"
    >
      <Arrow className={cn("-scale-90 text-black dark:text-white")} />
      <span>Go back</span>
    </button>
  );
}
