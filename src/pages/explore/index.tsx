import Head from "next/head";

import { NextPageWithLayout } from "~/pages/_app";

const CategoriesPage: NextPageWithLayout = () => {
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


CategoriesPage.getLayout = (page: React.ReactNode) => <>{page}</>;
export default CategoriesPage;