"use client";
import { cn } from "~/utils/helpers/server";
import MasonryGrid from "~/components/MasonryGrid";
import Head from "next/head";
import { api } from "~/trpc/react";

const RegionsPage = () => {
  const { data } = api.category.getAll.useQuery(undefined);
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
        {data && data.length && data.length > 1 ? (
          <>
            <h2>All regions</h2>
            <MasonryGrid dataList={data} detailsUrl="regions/" />
          </>
        ) : (
          <p> Can not find any places </p>
        )}
      </main>
    </>
  );
};
export default RegionsPage;