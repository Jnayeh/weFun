"use client";

import { LottiePlayer } from "~/components/LottiePlayer";
import { MasonryGridSkeleton } from "~/components/skeletons/masonry-grid";
import { api } from "~/trpc/react";
import Link from "next/link";
import ImageWithFallback from "~/components/ImageWithFallback";
import defaultImage from "~/Assets/placeholder.webp";
import { Card, CardHeader } from "~/components/ui/card";
import { cn } from "~/utils/helpers/server";

export default function Regions() {
  const { data, isLoading } = api.category.getAll.useQuery(undefined, {
    staleTime: 1000 * 60 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  if (isLoading) return <MasonryGridSkeleton />;

  if (data && data.length && data.length > 1)
    return (
      <>
        <h2>All regions</h2>
        <ul className=" grid grid-cols-2 gap-3 md:grid-cols-3">
          {data.map((cat, index) => {
            return (
              <li key={cat.id}
              className={cn(
                `rounded-2xl hover:translate-y-1 row-span-4 ${
                  index % 3 == 1 ? "row-span-5" : index % 3 == 2 ? "row-span-3" : ""
                }`
              )}>
              <Card
                key={cat.id}
                className={cn(
                  `relative flex flex-col justify-between overflow-hidden h-full rounded-2xl 
                  bg-slate-50 dark:bg-slate-600 `
                )}
              >
                {/*lg:[&:nth-child(1)]:col-span-1 [&:nth-child(3)]:row-span-2 [&:nth-child(3)>div>img]:h-full */}
                <CardHeader className={cn("flex flex-grow p-0 h-80 space-y-0")}>
                  <ImageWithFallback
                    src={cat.cover ?? defaultImage.src}
                    fallBackSrc={defaultImage}
                    placeholder="blur"
                    blurDataURL={defaultImage.src}
                    alt={cat.label ?? "category"}
                    className={cn("h-full rounded-2xl object-cover shadow-md")}
                    width={800}
                    height={800}
                  />
                  <Link
                    className="absolute m-0 hover:opacity-0 focus:opacity-0 transition-opacity duration-200 flex h-full w-full items-end p-1 px-3 text-lg
                         font-bold text-white drop-shadow-xl sm:text-xl z-0 bg-gradient-to-b from-transparent from-80% to-black"
                    href={"regions/" + cat.id}
                  >
                    <span className="line-clamp-1 py-1">{cat.label}</span>
                  </Link>
                </CardHeader>
              </Card>
              </li>
            );
          })}
        </ul>
      </>
    );
  return (
    <>
      <p className="text-center text-2xl font-bold text-red-600 dark:text-slate-50">
        Can not find any places
      </p>
      <LottiePlayer
        src="/animated/not-found.lottie"
        loop
        autoplay
        className="mx-auto w-[90dvw] max-w-lg"
      />
    </>
  );
}
