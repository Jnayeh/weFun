import { Skeleton } from "../ui/skeleton";

export default function CategoryCarouselSkeleton()  {
    return (
        <div className="w-full flex gap-2 px-2 overflow-hidden">
        {[0, 1, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
            <Skeleton className={`odd:w-40 even:w-32 h-[40px] rounded-lg pl-2 bg-slate-400`} />
        ))}
        </div>
    );
    }