

import { Metadata } from "next";
import { CategoryCarousel } from "~/components/carousels/category-carousel";
import { cn } from "~/utils/helpers/server";
import { Activities } from "../../activities/page";

export const metadata: Metadata = {
  title: "Places - Find your new experiences",
  description: "Details about the category",
};
const RegionPage = () => {
  return (
    <>
      <main
        className={cn(
          " mx-auto flex min-h-screen max-w-[97%] flex-col items-center gap-2 py-4"
        )}
      >
        {/* Details of the place */}
        <CategoryCarousel />


      <Activities />
      </main>
    </>
  );
};
export default RegionPage;
