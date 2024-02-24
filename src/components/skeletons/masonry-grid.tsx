import { Skeleton } from "../ui/skeleton";
import { cn } from "~/utils/helpers/server";

export function MasonryGridSkeleton() {
  return (
    <ul
      className={cn(
        `mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-3 `
      )}
    >
      {[0, 1, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <div
          key={i}
          className={cn(
            `relative row-span-4 flex-grow ${
              i % 3 == 1 ? "row-span-5" : i % 3 == 2 && "row-span-3"
            }
            }  flex animate-pulse flex-col  justify-end rounded-2xl bg-slate-400 dark:bg-slate-600`
          )}
        >
          <div className=" h-64 sm:h-80"></div>
          <Skeleton className="m-2 h-5 w-[80%] animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-400" />
        </div>
      ))}
    </ul>
  );
}
