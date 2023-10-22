import Head from "next/head";

import { NextPageWithLayout } from "~/pages/_app";

const ExplorePage: NextPageWithLayout = () => {
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
    </>
  );
};


ExplorePage.getLayout = (page: React.ReactNode) => <>{page}</>;
export default ExplorePage;