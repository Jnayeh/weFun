import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { cn, nextNoStore } from "~/utils/helpers/server";
import { Input } from "~/components/ui/input";
import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
import { FaLocationArrow } from "@react-icons/all-files/fa/FaLocationArrow";
import { BiHeart } from "@react-icons/all-files/bi/BiHeart";
import { BiSearchAlt } from "@react-icons/all-files/bi/BiSearchAlt";
import defaultImage from "~/Assets/placeholder.webp";
import ImageWithFallback from "~/components/image-with-fallback";
import { Metadata } from "next";
import { Suspense, lazy } from "react";
import { ActivitiesSkeleton } from "~/components/skeletons/activities";
import { cachableGetActivities } from "~/server/actions/cachable-get-activities";
import Link from "next/link";
import Image from "next/image";
const LottiePlayer = lazy(() =>
  import("~/components/LottiePlayer").then((mod) => ({
    default: mod.LottiePlayer,
  }))
);

export const metadata: Metadata = {
  title: "Activities - Find your new experiences",
  description: "List of activities from different providers",
};
const ActivitiesPage = () => {
  return (
    <>
      <div className="relative aspect-video overflow-hidden md:hidden">
        <Image
          className="object-cover object-center brightness-90"
          alt="friends sitting in front of firecamp"
          fill
          src="/beach.webp"
        />
      </div>
      <main
        className={cn(
          " mx-auto flex flex-col items-center gap-2 pb-4"
        )}
      >
        <div className="flex w-full max-w-2xl items-center justify-center gap-1 px-6 py-4">
          <Input type="search" className="h-12 rounded-l-full pl-6" />
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
          `grid w-full grid-cols-1 gap-4 p-2 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-3 xl:grid-cols-4`
        )}
      >
        {data.map((act, index) => {
          return (
            <Card
              key={act.id}
              className={cn(
                `relative flex flex-col justify-between rounded-3xl bg-slate-50 shadow-lg dark:bg-slate-600`
              )}
            >
              <CardHeader className="relative aspect-video flex-shrink flex-grow p-0">
                <ImageWithFallback
                  src={act.cover ?? defaultImage.src}
                  fallBackSrc={defaultImage}
                  blurDataURL={defaultImage.src}
                  alt={act.label ?? "activity"}
                  className="aspect-video h-full w-full rounded-t-3xl object-cover"
                  width={800}
                  height={800}
                />
                <button className="text-brand-500 absolute right-2 top-2 flex items-center justify-center rounded-full bg-white p-2 hover:cursor-pointer sm:scale-90 md:scale-100">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full text-2xl hover:bg-gray-50">
                    {act.id % 2 == 0 ? (
                      <FaHeart fill="red" />
                    ) : (
                      <BiHeart fill="red" />
                    )}
                  </div>
                </button>
              </CardHeader>
              <CardContent className="px-5 pb-1 pt-6 [&>*]:line-clamp-1">
                <CardTitle className=" leading-normal" title={act.label ?? ""}>
                  {act.label}
                </CardTitle>
              </CardContent>
              <CardFooter className="flex justify-between px-5 pb-2">
                {act.location ? (
                  <p className="flex items-center font-medium text-red-600 dark:text-slate-50">
                    <FaLocationArrow className="scale-75" />
                    <span className="line-clamp-1">{act.location}</span>
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
              <Link
                href={"/activities/" + act.id}
                className=" flex h-12 w-full flex-col items-center justify-center self-center rounded-[20px] bg-red-500 px-4 text-xl font-semibold uppercase text-white shadow-sm"
              >
                View details
              </Link>
            </Card>
          );
        })}
      </ul>
    );
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 py-4">
      <p className="text-center text-2xl font-bold text-red-600 dark:text-slate-50">
        No activities found
      </p>
      <LottiePlayer
        src="/animated/not-found.lottie"
        loop
        autoplay
        className="mx-auto w-[90%] max-w-lg"
      />
    </div>
  );
};

export default ActivitiesPage;
