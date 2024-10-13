"use client";

import { LottiePlayer } from "~/components/LottiePlayer";
import { MasonryGridSkeleton } from "~/components/skeletons/masonry-grid";
import { api } from "~/trpc/react";
import Link from "next/link";
import ImageWithFallback from "~/components/image-with-fallback";
import defaultImage from "~/Assets/placeholder.webp";
import { Card, CardHeader } from "~/components/ui/card";
import { cn } from "~/utils/helpers/server";

export default function Regions() {
  const { data, isLoading } = api.category.getAllv1.useQuery(undefined, {
    staleTime: 1000 * 60 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  if (isLoading) return <MasonryGridSkeleton />;

  if (data && data.length && data.length > 1)
    return (
      <>
        <h2>All regions</h2>
        <ul className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data.map((cat, index) => {
            return (
              <li
                key={cat.id}
                className={cn(
                  `row-span-4 rounded-2xl hover:translate-y-1 ${
                    index % 3 == 1
                      ? "row-span-5"
                      : index % 3 == 2 && "row-span-3"
                  }`
                )}
              >
                <Card
                  key={cat.id}
                  className={cn(
                    `relative flex h-full flex-col justify-between overflow-hidden rounded-2xl 
                  bg-slate-300 dark:bg-slate-600 `
                  )}
                >
                  {/*lg:[&:nth-child(1)]:col-span-1 [&:nth-child(3)]:row-span-2 [&:nth-child(3)>div>img]:h-full */}
                  <CardHeader
                    className={cn("flex h-64 flex-grow space-y-0 p-0 sm:h-80")}
                  >
                    <ImageWithFallback
                      priority
                      loading="eager"
                      src={cat.cover ?? defaultImage.src}
                      fallBackSrc={defaultImage}
                      placeholder="blur"
                      blurDataURL={cat.blurUrl ?? defaultImage.src}
                      alt={cat.label ?? "category"}
                      className={cn(
                        "h-full rounded-2xl object-cover shadow-md"
                      )}
                      width={800}
                      height={800}
                    />
                    <Link
                      className="absolute z-0 m-0 flex h-full w-full items-end bg-gradient-to-b from-transparent from-85% to-black p-1 px-3
                         text-lg font-bold text-white drop-shadow-xl transition-opacity duration-200 hover:opacity-0 focus:opacity-0 sm:text-xl"
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
        className="mx-auto w-[90%] max-w-lg"
      />
    </>
  );
}
