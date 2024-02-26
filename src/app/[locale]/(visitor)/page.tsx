import { useTranslations } from "next-intl";

import { Suspense } from "react";

import Header from "~/components/Header/header.component";

import Reviews from "~/components/reviews";
import Image from "next/image";
import { SlidingCardsSkeleton } from "~/components/skeletons/sliding-card";
import { Link } from "~/navigation";
import PlanningSteps from "~/components/planning-steps";

const Home = () => {
  const t = useTranslations("Home");
  /*   const SpinningText = [0, 1, 2, 3].map((index) => {
    return (
      <div className="flex items-center " key={index}>
        <b className=" inline-block whitespace-nowrap px-4">PLAN-BOOK-ENJOY</b>
        <div className="h-4 w-[16.51px] rounded-[50%] bg-linen" />
      </div>
    );
  }); */
  return (
    <>
      <Header />

      <main className=" relative mx-auto flex flex-col items-center justify-center">
        {/* <div className="flex h-[60px] w-full items-center gap-4 overflow-hidden bg-gray-800 font-rubik text-5xl text-beige">
          <div
            className="flex animate-marquee whitespace-nowrap py-2"
            role="marquee"
          >
            <div className="flex items-center ">{SpinningText}</div>
            <div className="flex items-center ">{SpinningText}</div>
          </div>
        </div> */}
        {/* <section className=" mb-2 w-[90%] max-w-screen-xl">
          <h2 className=" p-6 text-center font-montserrat text-3xl font-extrabold uppercase">
            TOP Places
          </h2>

          <Suspense fallback={<SlidingCardsSkeleton />}>
            <TopPlaces />
          </Suspense>

          <div className="flex justify-center p-8">
            <Link
              href="regions"
              className="inline-block rounded-full bg-gray-600 p-2 px-5 text-center font-stretch-pro text-lg leading-[140.5%] text-white  lg:text-2xl"
            >
              show more
            </Link>
          </div>
        </section> */}
        <PlanningSteps />
        <section className="z-0 w-full bg-slate-200 dark:bg-slate-900">
          <div className="mx-auto w-[90%] max-w-7xl">
            <h2 className=" p-6 text-center font-montserrat text-3xl font-extrabold uppercase">
              top activities
            </h2>
            <Suspense fallback="...">
              <SlidingCardsSkeleton />
            </Suspense>

            <div className="flex justify-center p-8">
              <Link
                href="activities"
                className="text-md inline-block rounded-full bg-red-600 p-2 px-5 text-center font-stretch-pro leading-[140.5%] text-white lg:text-2xl"
              >
                show more
              </Link>
            </div>
          </div>
        </section>
        <section
          id="searchAndFindMore"
          className="relative flex w-full justify-center bg-white bg-opacity-30 py-12
          backdrop-blur-sm dark:bg-black"
        >
          <div
            className="relative flex w-[300px] justify-start rounded-full border-2 
          border-black dark:border-slate-600 [&>*]:px-10"
          >
            <button
              className="flex w-full justify-start rounded-full bg-transparent py-[4px]
              leading-[138%] tracking-[0.16em] hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {t("search")}
            </button>
            <Link
              href="explore"
              className=" absolute end-0 flex h-full items-center rounded-full bg-black 
              text-sm font-black leading-[140.5%] text-white dark:bg-slate-600"
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
export default Home;
