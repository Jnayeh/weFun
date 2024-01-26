"use client";
import { cn } from "~/utils/helpers/server";
import MasonryGrid from "~/components/MasonryGrid";
import Head from "next/head";
import { api } from "~/trpc/react";
import { MasonryGridSkeleton } from "~/components/skeletons/masonry-grid";

const RegionsPage = () => {
  const { data, isLoading } = api.category.getAll.useQuery(undefined, {
    staleTime: 1000 * 60 * 60 * 5
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
            <MasonryGrid dataList={data} detailsUrl="regions/"/>
          </>
        ) : (
          <p> Can not find any places </p>
        )}
      </main>
    </>
  );
};
export default RegionsPage;
