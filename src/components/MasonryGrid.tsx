import { cn } from "@/lib/utils";
import { Category } from "~/db/schema";
import ImageWithFallback from "./ImageWithFallback";
import defaultImage from "~/Assets/Images/placeholder.webp";
import { Skeleton } from "@/components/ui/skeleton";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Card, CardHeader } from "@/components/ui/card";
import Link from "next/link";

type MasonryGridProps = React.HTMLAttributes<HTMLDivElement> & {
  dataList?: {} & Category[];
  detailsUrl?: string;
  columnsCountBreakPoints?:
    | {
        [key: number]: number;
      }
    | undefined;
};

const MasonryGrid = (props: MasonryGridProps) => {
  const { className, dataList, detailsUrl, columnsCountBreakPoints, ...rest } =
    props;

  return (
    <div className={cn(`grid w-full max-w-screen-2xl grid-cols-1 mx-auto ${className}`)}>
      <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints??{ 100: 2, 640: 3, 1024: 4 }}>
        <Masonry gutter="10px">
          {dataList && dataList.map((cat, index) => {
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
                    href={detailsUrl? detailsUrl + cat.id : ""}
                  >
                    <span className="line-clamp-1">{cat.label}</span>
                  </Link>
                </CardHeader>
              </Card>
            );
          })}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};
export function MasonryGridSkeleton(props: MasonryGridProps) {
  const { className, dataList, detailsUrl, columnsCountBreakPoints, ...rest } =
    props;
  return (
    <ul className={cn(`w-full max-w-screen-2xl mx-auto ${className??""}`)}>
      <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints??{ 100: 2, 640: 3, 1024: 4 }}>
        <Masonry gutter="10px" >
        {[0, 1, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div
                  key={i}
                  className={cn(`relative h-60 ${i%3 == 1 ? "h-96" : i%3 == 2 ? "h-48" : "" }  flex flex-col justify-end  dark:bg-slate-600 animate-pulse rounded-2xl bg-slate-400`)}
                >
                  <Skeleton
                    id="img"
                    className="h-5 w-[80%] m-2 animate-pulse rounded-2xl dark:bg-slate-400 bg-slate-200"
                  />
                </div>
              ))}
        </Masonry>
      </ResponsiveMasonry>
    </ul>
  );
}
export default MasonryGrid;
