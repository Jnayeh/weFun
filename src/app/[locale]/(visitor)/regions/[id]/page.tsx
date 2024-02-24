import { Metadata } from "next";
import { CategoryCarousel } from "~/components/ui/carousels/category-carousel";
import { cn } from "~/utils/helpers/server";
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
        <CategoryCarousel />
        heyy region
      </main>
    </>
  );
};
export default RegionPage;
