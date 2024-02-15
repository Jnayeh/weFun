import { cn } from "~/utils/helpers/server";
import { MasonryGridSkeleton } from "~/components/skeletons/masonry-grid";
import { Metadata } from "next";
import { Suspense } from "react";
import Regions from "./regions";

export const metadata: Metadata = {
  title: "Places - Find your new experiences",
  description: "List of Places for activities",
};
const RegionsPage = async () => {
  return (
    <>
      <main
        className={cn(
          " mx-auto flex min-h-[300px] max-w-[97%] flex-col items-center gap-2 py-4"
        )}
      >
        <Regions />
      </main>
    </>
  );
};
export default RegionsPage;
