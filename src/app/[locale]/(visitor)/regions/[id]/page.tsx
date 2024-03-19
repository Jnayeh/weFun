import { Metadata } from "next";
import { CategoryCarousel } from "~/components/carousels/category-carousel";
import { cn } from "~/utils/helpers/server";
import { Activities } from "../../activities/page";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Places - Find your new experiences",
  description: "Details about the category",
};
const RegionPage = () => {
  return (
    <>
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          className="object-cover object-center brightness-90"
          alt="friends sitting in front of firecamp"
          fill
          src="/beach.webp"
        />
      </div>
      <main
        className={cn(
          "relative z-10 mx-auto -mt-4 flex min-h-screen flex-col items-center gap-2 rounded-t-2xl bg-slate-900 p-2"
        )}
      >
        {/* Details of the place */}
        <CategoryCarousel className="mt-2" />
        <Activities />
      </main>
    </>
  );
};
export default RegionPage;
