import Head from "next/head";
import MasonryGrid, { MasonryGridSkeleton } from "~/components/MasonryGrid";

import { NextPageWithLayout } from "~/pages/_app";
import { api } from "~/utils/api";

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
      <main className="w-[90%] mx-auto py-4">
        {isLoading || error ? (
          <>
            <MasonryGridSkeleton/>
          </>
        ) : (
          <>
            {data && data.length && data.length > 1 ? (
              <>
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
