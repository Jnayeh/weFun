import { Skeleton } from "../ui/skeleton";

export default function CategoryCarouselSkeleton() {
  return (
    <div className="w-full overflow-hidden px-2">
      <div className=" flex min-w-[900px] gap-2 ">
        {[0, 1, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
          <Skeleton
            className={` h-9 even:w-[30vw] rounded-lg bg-slate-400 pl-2 odd:w-[40vw]`}
          />
        ))}
      </div>
    </div>
  );
}
