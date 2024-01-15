import Head from "next/head";
import Link from "next/link";

import Header from "~/components/Header/header.component";
import Layout from "./layout";

import { NextPageWithLayout } from "./_app";
import Reviews from "~/components/reviews";
import { useTranslations } from "next-intl";
import { api } from "~/utils/api";
import SlidingCards, { SlidingCardsSkeleton } from "~/components/SlidingCards";
import Image from "next/image";
export function getStaticProps(props: { locale: string }) {
  const { locale } = props;
  return {
    props: {
      messages: require(`../locales/${locale}.json`),
    },
  };
}

const Home: NextPageWithLayout = () => {
  const t = useTranslations("Home");
  const { data, isLoading, error } = api.category.getAll.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 3000,
  });
  const SpinningText = [0, 1, 2, 3].map((index) => {
    return (
      <div className="flex items-center " key={index}>
        <b className=" inline-block whitespace-nowrap px-4">PLAN-BOOK-ENJOY</b>
        <div className="h-4 w-[16.51px] rounded-[50%] bg-linen" />
      </div>
    );
  });
  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content="Stop existing & Start living" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className=" relative mx-auto flex flex-col items-center justify-center gap-2 py-4">
        <div className="flex h-[60px] w-full items-center gap-4 overflow-hidden bg-gray-800 font-rubik text-5xl text-beige">
          <div
            className="flex animate-marquee whitespace-nowrap py-2"
            role="marquee"
          >
            <div className="flex items-center ">{SpinningText}</div>
            <div className="flex items-center ">{SpinningText}</div>
          </div>
        </div>
        <section className=" mb-2 w-[90%] max-w-screen-xl">
          <h2 className=" p-6 text-center font-montserrat text-3xl font-extrabold uppercase">
            TOP Places
          </h2>
          {data && data.length && data.length > 1 ? (
            <SlidingCards dataList={data.slice(0, 3)} />
          ) : (
            <SlidingCardsSkeleton />
          )}

          <div className="flex justify-center p-8">
            <Link
              href="regions"
              className="inline-block rounded-full bg-gray-600 p-2 px-5 text-center font-stretch-pro text-lg leading-[140.5%] text-white  lg:text-2xl"
            >
              show more
            </Link>
          </div>
        </section>
        <section className="relative mb-4 h-[1000px] w-full">
          <h2 className="absolute top-12 mx-[10%] flex w-[80%] justify-center text-center font-rubik text-[7vw] font-medium uppercase leading-[138%] tracking-[0.16em] text-black sm:text-[5vw] md:text-[38px]">
            discover <br /> the best activities <br /> with one swipe
          </h2>
          <Image
            className="h-full w-full object-cover"
            alt="friends sitting in front of firecamp"
            width={1000}
            height={1000}
            src="/unsplashuhkoydaijhw2@2x.png"
          />
          <div className="absolute bottom-[-25px] flex w-full justify-center">
            <Link
              href="regions"
              className=" mx-auto line-clamp-1 flex h-[50px] items-center gap-1 rounded-full bg-white bg-opacity-70 p-5 backdrop-blur-sm hover:bg-opacity-100"
            >
              <span className="font-rubik text-sm font-medium leading-[138%] tracking-[0.16em] text-black">
                show top rate places
              </span>
              <Image
                className="h-[20.51px] w-[20.51px] object-cover"
                alt="arrow"
                tabIndex={-1}
                src="/12230001-1@2x.png"
                width={30}
                height={30}
              />
            </Link>
          </div>
        </section>

        <section className="w-[90%] max-w-7xl ">
          <h2 className=" p-6 text-center font-montserrat text-3xl font-extrabold uppercase">
            top activities
          </h2>
          {data && data.length && data.length > 1 ? (
            <SlidingCards dataList={data} />
          ) : (
            <SlidingCardsSkeleton />
          )}

          <div className="flex justify-center p-8">
            <Link
              href="activities"
              className="text-md inline-block rounded-full bg-gray-600 p-2 px-5 text-center font-stretch-pro leading-[140.5%] text-white lg:text-2xl"
            >
              show more
            </Link>
          </div>
        </section>
        <section
          id="searchAndFindMore"
          className="relative mx-auto flex max-w-[90%] justify-center rounded-full py-12"
        >
          <div className="border-darkslategray-300 relative flex w-[300px] justify-start rounded-full border-2 border-black dark:border-slate-600 [&>*]:px-10">
            <button className="flex w-full justify-start rounded-full bg-transparent py-[4px] leading-[138%] tracking-[0.16em] hover:bg-gray-200 dark:hover:bg-gray-800">
              {t("search")}
            </button>
            <Link
              href="explore"
              className=" absolute end-0 flex h-full items-center rounded-full bg-black text-sm font-black leading-[140.5%] text-white dark:bg-slate-600"
            >
              <span className="text-center uppercase">
                {t("find-more")
                  .split("<br/>")
                  .map((it, idx, its) =>
                    idx + 1 != its.length ? (
                      <>
                        {it} <br />
                      </>
                    ) : (
                      it
                    )
                  )}
              </span>
            </Link>
          </div>
        </section>
        <Reviews />
      </main>
    </>
  );
};
Home.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;
export default Home;
