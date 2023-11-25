import { cn } from "@/lib/utils";
import { Category } from "~/db/schema";
import ImageWithFallback from "./ImageWithFallback";
import defaultImage from "~/Assets/Images/placeholder.webp";
import { Skeleton } from "@/components/ui/skeleton";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Card, CardHeader } from "@/components/ui/card";
import Link from "next/link";

type MasonryGridProps = React.HTMLAttributes<HTMLDivElement> & {
  dataList: {} & Category [];
  detailsUrl:string;
};

const MasonryGrid = (props: MasonryGridProps) => {
  const { className, dataList,detailsUrl, ...rest } = props;

  return (
    <ul className={cn(`grid w-full max-w-screen-2xl grid-cols-1 ${className}`)}>
      <ResponsiveMasonry columnsCountBreakPoints={{ 100: 2, 640: 3, 1024: 4 }}>
        <Masonry gutter="10px">
          {dataList.map((cat, index) => {
            return (
              <Card
                key={cat.id}
                className={cn(
                  `relative flex flex-col justify-between overflow-hidden rounded-2xl bg-slate-50 hover:translate-y-1  dark:bg-slate-600`
                )}
              >
                {/*lg:[&:nth-child(1)]:col-span-1 [&:nth-child(3)]:row-span-2 [&:nth-child(3)>div>img]:h-full */}
                <CardHeader className={cn("flex flex-grow p-0")}>
                  <ImageWithFallback
                    src={cat.image ?? defaultImage.src}
                    fallBackSrc={defaultImage}
                    placeholder="blur"
                    blurDataURL={defaultImage.src}
                    alt={cat.label ?? "category"}
                    className={cn("h-full rounded-2xl object-cover shadow-md")}
                    width={800}
                    height={800}
                  />
                  <Link
                    className="absolute flex h-full w-full items-end bg-gradient-to-b from-transparent from-80% to-black p-1 px-3 text-lg
                             font-bold text-white drop-shadow-xl sm:text-xl"
                    href={detailsUrl + cat.id}
                  >
                    <span className="line-clamp-1">{cat.label}</span>
                  </Link>
                </CardHeader>
              </Card>
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
    </ul>
  );
};
export function MasonryGridSkeleton() {
  return (
    <div className="flex h-[69vh] justify-center gap-2">
      <Skeleton className="h-full w-full flex-grow animate-pulse rounded-[40px]  bg-slate-400 " />
      <Skeleton className="h-full w-10 animate-pulse rounded-[40px]  bg-slate-400 " />
      <Skeleton className="h-full w-4 animate-pulse rounded-[40px]  bg-slate-400 " />
    </div>
  );
}
export default MasonryGrid;