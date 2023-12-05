import Head from "next/head";
import MasonryGrid, { MasonryGridSkeleton } from "~/components/MasonryGrid";

import { NextPageWithLayout } from "~/pages/_app";
import { api } from "~/utils/api";
import { Activities, ActivitiesSkeleton } from "../activities";
import { Activity } from "~/db/schema";

const ExplorePage: NextPageWithLayout = () => {
  const { data, isLoading, error } = api.category.getAll.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 3000,
  });
  return (
    <>
      <Head>
        <title>FunVendors - Explore our experiences</title>
        <meta
          name="description"
          content="List of Categories from different providers"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto w-[90%] py-4">
        {isLoading || error ? (
          <>
            <ActivitiesSkeleton />
            <MasonryGridSkeleton />
          </>
        ) : (
          <>
            {data && data.length && data.length > 1 ? (
              <>
                <Activities data={data as unknown as Activity[]} />
                <MasonryGrid dataList={data} detailsUrl="regions/" />
              </>
            ) : (
              <p> Can not find any Categories </p>
            )}
          </>
        )}
      </main>
    </>
  );
};

ExplorePage.getLayout = (page: React.ReactNode) => <>{page}</>;
export default ExplorePage;
