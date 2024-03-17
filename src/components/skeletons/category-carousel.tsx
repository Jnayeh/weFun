import { Skeleton } from "../ui/skeleton";

export default function CategoryCarouselSkeleton() {
  return (
    <div className="w-full overflow-hidden p-2">
      <div className=" flex min-w-[900px] gap-2 ">
        {[0, 1, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
          <Skeleton
            key={index}
            className={`h-9 rounded-lg bg-slate-400 pl-2 odd:w-[40vw] even:w-[30vw]`}
          />
        ))}
      </div>
    </div>
  );
}
