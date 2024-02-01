import { Skeleton } from "../ui/skeleton";

export function SlidingCardsSkeleton() {
    return (
      <div className="flex h-40v justify-center gap-2">
        <Skeleton className="h-full w-full flex-grow animate-pulse rounded-[40px]  bg-slate-400 " />
        <Skeleton className="h-full w-10 animate-pulse rounded-[40px]  bg-slate-400 " />
        <Skeleton className="h-full w-4 animate-pulse rounded-[40px]  bg-slate-400 " />
      </div>
    );
  }