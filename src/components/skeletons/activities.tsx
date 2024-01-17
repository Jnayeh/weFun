import { Skeleton } from "../ui/skeleton";

export function ActivitiesSkeleton() {
    return (
      <div className="mb-12 grid w-full grid-cols-1 gap-3 px-2 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-3 xl:grid-cols-4">
        {[0, 1, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div
            key={i}
            /* className=" flex flex-col overflow-hidden rounded-3xl bg-slate-50 p-2 shadow-md dark:bg-slate-600
              [&:nth-child(1)>#img]:h-48 lg:[&:nth-child(1)>#img]:max-h-full [&:nth-child(1)]:col-span-2 
              lg:[&:nth-child(1)]:col-span-1 [&:nth-child(2)]:row-span-2" */
            className="relative flex flex-col justify-between rounded-3xl bg-slate-50 dark:bg-slate-600"
          >
            <Skeleton className="aspect-[19/10] h-full w-full animate-pulse rounded-b-none rounded-t-3xl bg-slate-400 object-cover shadow-md lg:aspect-video" />
            <div className="px-5 pb-1 pt-8">
              <Skeleton className="h-6 w-[90%] animate-pulse rounded-full bg-slate-400" />
            </div>
            <div className=" flex justify-between px-5 pb-10 pt-1">
              <Skeleton className="h-6 w-[40%] animate-pulse rounded-full bg-slate-400" />
              <Skeleton className="h-6 w-[20%] animate-pulse rounded-full bg-slate-400" />
            </div>
            <div className="w-full shrink-0 grow-0 self-center overflow-hidden rounded-[20px] bg-slate-500 ">
              <Skeleton className=" h-full w-full bg-slate-400 " />
            </div>
          </div>
        ))}
      </div>
    );
  }