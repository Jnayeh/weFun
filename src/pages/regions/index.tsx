import { InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import Head from "next/head";

import Layout from "../layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Category } from "~/db/schema";
import { cn } from "@/lib/utils";
import { NextPageWithLayout } from "~/pages/_app";
import Link from "next/link";
import defaultImage from "~/Assets/Images/placeholder.webp";
import ImageWithFallback from "~/components/ImageWithFallback";
import MasonryGrid, { MasonryGridSkeleton } from "~/components/MasonryGrid";
import { api } from "~/utils/api";

const RegionsPage: NextPageWithLayout = () => {
  const { isLoading, data } = api.category.getAll.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 3000,
  });
  return (
    <>
      <Head>
        <title>Categories - Find your new experiences</title>
        <meta
          name="description"
          content="List of Categories from different providers"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={cn(
          " mx-auto flex min-h-[300px] max-w-[97%] flex-col items-center gap-2 py-4"
        )}
      >
        {isLoading ? (
          <>
            <MasonryGridSkeleton />
          </>
        ) : (
          <>
            {data && data.length && data.length > 1 ? (
              <>
                <h2>All regions</h2>
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
RegionsPage.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;
export default RegionsPage;
