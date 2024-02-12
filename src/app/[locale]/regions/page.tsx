"use client";
import { cn } from "~/utils/helpers/server";
import MasonryGrid from "~/components/MasonryGrid";
import Head from "next/head";
import { api } from "~/trpc/react";
import { MasonryGridSkeleton } from "~/components/skeletons/masonry-grid";
import { LottiePlayer } from "~/components/LottiePlayer";

const RegionsPage = () => {
  const { data, isLoading } = api.category.getAll.useQuery(undefined, {
    staleTime: 1000 * 60 * 60 * 5,
  });
  return (
    <>
      <Head>
        <title>Places - Find your new experiences</title>
        <meta name="description" content="List of Places for activities" />
      </Head>
      <main
        className={cn(
          " mx-auto flex min-h-[300px] max-w-[97%] flex-col items-center gap-2 py-4"
        )}
      >
        {isLoading ? (
          <MasonryGridSkeleton />
        ) : data && data.length && data.length > 1 ? (
          <>
            <h2>All regions</h2>
            <MasonryGrid dataList={data} detailsUrl="regions/" />
          </>
        ) : (
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
        )}
      </main>
    </>
  );
};
export default RegionsPage;
