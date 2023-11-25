import Head from "next/head";
import { cn } from "@/lib/utils";
import { NextPageWithLayout } from "~/pages/_app";

const RegionPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Categories - Find your new experiences</title>
        <meta
          name="description"
          content="Details about the category"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={cn(
          " mx-auto flex min-h-screen max-w-[97%] flex-col items-center gap-2 py-4"
        )}
      >
        heyy region
      </main>
    </>
  );
};
RegionPage.getLayout = (page: React.ReactNode) => <>{page}</>;
export default RegionPage;
