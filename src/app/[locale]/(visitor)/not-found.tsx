import "~/styles/globals.css";
import { Skeleton } from "~/components/ui/skeleton";
import Link from "next/link";
import dynamic from "next/dynamic";

const GoBack = dynamic(() => import("~/components/go-back-button"), {
  loading: () => (
    <Skeleton className="flex h-[36px] w-1/2 items-center justify-center gap-x-2 rounded-lg bg-slate-300 text-sm dark:bg-slate-400 sm:w-28" />
  ),
  ssr: false,
});
export default function NotFound() {
  return (
    <h1 className=" text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
      Page not found
    </h1>
  );
}
