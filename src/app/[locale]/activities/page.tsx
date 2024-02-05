import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { cn, nextCache, nextNoStore } from "~/utils/helpers/server";
import { Input } from "~/components/ui/input";
import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
import { FaLocationArrow } from "@react-icons/all-files/fa/FaLocationArrow";
import { BiHeart } from "@react-icons/all-files/bi/BiHeart";
import { BiSearchAlt } from "@react-icons/all-files/bi/BiSearchAlt";
import defaultImage from "~/Assets/placeholder.webp";
import ImageWithFallback from "~/components/ImageWithFallback";
import { Metadata } from "next";
import { api } from "~/trpc/server";
import { Suspense, lazy } from "react";
import { ActivitiesSkeleton } from "~/components/skeletons/activities";
const LottiePlayer = lazy(() =>
  import("~/components/LottiePlayer").then((mod) => ({
    default: mod.LottiePlayer,
    loader: <ActivitiesSkeleton />,
  }))
);

export const metadata: Metadata = {
  title: "Activities - Find your new experiences",
  description: "List of activities from different providers",
};
export const cachableGetActivities= nextCache(
  async ({ name }) => {
    return api.activity.getAll.query({ name });
  },
  ["activities"],
  { tags: ["getActivities"], revalidate: 0.1 }
);
const ActivitiesPage = () => {
  return (
    <>
      <main
        className={cn(
          " mx-auto flex min-h-[300px] max-w-[97%] flex-col items-center gap-2 pb-4"
        )}
      >
        <div className="flex w-full max-w-2xl items-center justify-center gap-1 px-6 py-4">
          <Input type="search" className="h-[46px] rounded-l-full pl-6" />
          <button
            className="h-full rounded-r-full bg-slate-500 px-4 py-2 text-3xl text-white hover:bg-slate-600"
            aria-label="click to search"
          >
            <BiSearchAlt />
            <span className="sr-only">Search</span>
          </button>
        </div>
        <Suspense
          fallback={
            <>
              <p className=" sr-only">Is Loading</p>
              <ActivitiesSkeleton />
            </>
          }
        >
          <Activities />
        </Suspense>
      </main>
    </>
  );
};
export const Activities = async () => {
  nextNoStore();
  const data = await cachableGetActivities({ name: "" });
  if (data && data.length && data.length > 1)
    return (
      <ul
        className={cn(
          `grid w-full grid-cols-1 gap-3 p-2 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-3 xl:grid-cols-4`
        )}
      >
        {data.map((act, index) => {
          return (
            <Card
              key={act.id}
              className={cn(
                `relative flex flex-col justify-between rounded-3xl bg-slate-50 shadow-xl dark:bg-slate-600 [&>div>img]:aspect-[19/10] lg:[&>div>img]:aspect-video`
              )}
            >
              <CardHeader className="relative flex-shrink flex-grow p-0">
                <ImageWithFallback
                  src={act.cover ?? defaultImage.src}
                  fallBackSrc={defaultImage}
                  blurDataURL={defaultImage.src}
                  alt={act.label ?? "activity"}
                  className="aspect-video h-full w-full rounded-t-3xl object-cover shadow-md"
                  width={800}
                  height={800}
                />
                <button className="text-brand-500 absolute right-2 top-2 flex items-center justify-center rounded-full bg-white p-2 hover:cursor-pointer sm:scale-90 md:scale-75">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full text-2xl hover:bg-gray-50">
                    {act.id % 2 == 0 ? (
                      <FaHeart fill="red" />
                    ) : (
                      <BiHeart fill="red" />
                    )}
                  </div>
                </button>
              </CardHeader>
              <CardContent className="px-5 pb-1 pt-6 [&>*]:line-clamp-1 ">
                <CardTitle title={act.label ?? ""}>{act.label}</CardTitle>
              </CardContent>
              <CardFooter className="flex justify-between px-5 pb-2">
                {act.location ? (
                  <p className=" flex items-baseline font-medium text-red-600 dark:text-slate-50">
                    <FaLocationArrow className=" scale-75" />
                    {act.location}
                  </p>
                ) : (
                  ""
                )}

                <div className="flex">
                  {act.discount ? (
                    <p className={cn(`whitespace-nowrap pr-1 font-normal`)}>
                      {(act.price * (100 - act.discount)) / 100 + " DT"}
                    </p>
                  ) : (
                    ""
                  )}
                  <p
                    className={cn(
                      `whitespace-nowrap pr-1 ${
                        act.discount
                          ? "text-xs font-bold line-through"
                          : "font-normal"
                      }`
                    )}
                  >
                    {act.price + " DT"}
                  </p>
                </div>
              </CardFooter>
              <button className="h-12 w-full self-center rounded-[20px] bg-tomato-300 py-0 text-xl font-semibold uppercase text-white shadow-sm">
                View details
              </button>
            </Card>
          );
        })}
      </ul>
    );
  return (
    <div className="flex flex-col justify-center items-center h-full gap-3 py-4">
      <LottiePlayer
        src="/animated/search-not-found.json"
        loop={false}
        autoplay
        className="w-[90dvw] max-w-lg mx-auto"
      />
      <p className="text-center text-2xl font-bold text-red-600 dark:text-slate-50">
        No activities found
      </p>
    </div>
  );
};

export default ActivitiesPage;
