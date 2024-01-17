import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Skeleton } from "../ui/skeleton";
import { cn } from "~/utils/helpers/server";
import { MasonryGridProps } from "../MasonryGrid";

export function MasonryGridSkeleton(props: MasonryGridProps) {
    const { className, dataList, detailsUrl, columnsCountBreakPoints, ...rest } =
      props;
    return (
      <ul className={cn(`w-full max-w-screen-2xl mx-auto ${className}`)}>
        <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints??{ 100: 2, 640: 3, 1024: 4 }}>
          <Masonry gutter="10px" >
          {[0, 1, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <div
                    key={i}
                    className={cn(`relative h-60 ${i%3 == 1 ? "h-96" : i%3 == 2 ? "h-48" : "" }  flex flex-col justify-end  dark:bg-slate-600 animate-pulse rounded-2xl bg-slate-400`)}
                  >
                    <Skeleton
                      className="h-5 w-[80%] m-2 animate-pulse rounded-2xl dark:bg-slate-400 bg-slate-200"
                    />
                  </div>
                ))}
          </Masonry>
        </ResponsiveMasonry>
      </ul>
    );
  }