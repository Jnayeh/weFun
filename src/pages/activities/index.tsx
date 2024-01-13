import Head from "next/head";

import { api } from "~/utils/api";
import Layout from "../layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Activity } from "~/db/schema";
import { cn } from "~/utils/utils";
import { Input } from "~/components/ui/input";
import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
import { FaLocationArrow } from "@react-icons/all-files/fa/FaLocationArrow";
import { BiHeart } from "@react-icons/all-files/bi/BiHeart";
import { BiSearchAlt } from "@react-icons/all-files/bi/BiSearchAlt";
import { NextPageWithLayout } from "~/pages/_app";
import defaultImage from "~/Assets/Images/placeholder.webp";
import ImageWithFallback from "~/components/ImageWithFallback";
import { Skeleton } from "~/components/ui/skeleton";

/* type ServerSidePageProps = {
  serializedData?: string;
  isLoading?: boolean;
  error?: any;
};
export const getServerSideProps = async () => {
  try {
    const session = await getSession();
    console.log(session);

    const caller = appRouter.createCaller({
      session: session,
      db: db,
    });
    const data = await caller.activity.getAll();
    return {
      props: {
        serializedData: SuperJSON.stringify(data),
      },
    };
  } catch (error) {
    return {
      props: {
        error: error,
      },
    };
  }
}; */
const ActivitiesPage: NextPageWithLayout = () => {
  const { data, isLoading, error } = api.activity.getAll.useQuery(
    {
      name: "",
    },
    { refetchOnMount: false, refetchOnWindowFocus: false, staleTime: 3000 }
  );

  return (
    <>
      <Head>
        <title>Activities - Find your new experiences</title>
        <meta
          name="description"
          content="List of activities from different providers"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={cn(
          " mx-auto flex min-h-[300px] max-w-[97%] flex-col items-center gap-2 pb-4"
        )}
      >
        <div className="flex w-full max-w-2xl items-center justify-center gap-1 px-6 py-4">
          <Input type="search" className="h-[46px] rounded-l-full pl-6" />
          <button
            className="h-full rounded-r-full bg-slate-500 px-4 py-2 text-3xl text-white hover:bg-slate-600"
            aria-label="click to search"
          >
            <BiSearchAlt />
            <span className="sr-only">Search</span>
          </button>
        </div>

        {isLoading ? (
          <>
            <p className=" sr-only">Is Loading</p>
            <ActivitiesSkeleton />
          </>
        ) : data && data.length && data.length > 1 ? (
          <Activities data={data} />
        ) : (
          <p>Can not find any activities </p>
        )}
      </main>
    </>
  );
};
export const Activities = (props: { data: Activity[] }) => {
  const { data } = props;
  return (
    <ul
      className={cn(
        `grid w-full grid-cols-1 gap-3 px-2 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-3 xl:grid-cols-4`
      )}
    >
      {data.map((act, index) => {
        return (
          <Card
            key={act.id}
            className={cn(
              `relative flex flex-col justify-between rounded-3xl bg-slate-50 shadow-xl dark:bg-slate-600 [&>div>img]:aspect-[19/10] lg:[&>div>img]:aspect-video`
            )}
          >
            <CardHeader className="relative flex-shrink flex-grow p-0">
              <ImageWithFallback
                src={act.cover ?? defaultImage.src}
                fallBackSrc={defaultImage}
                blurDataURL={defaultImage.src}
                alt={act.label ?? "activity"}
                className="aspect-video h-full w-full rounded-t-3xl object-cover shadow-md"
                width={800}
                height={800}
              />
              <button className="text-brand-500 absolute right-2 top-2 flex items-center justify-center rounded-full bg-white p-2 hover:cursor-pointer sm:scale-90 md:scale-75">
                <div className="flex h-6 w-6 items-center justify-center rounded-full text-2xl hover:bg-gray-50">
                  {act.id % 2 == 0 ? (
                    <FaHeart fill="red" />
                  ) : (
                    <BiHeart fill="red" />
                  )}
                </div>
              </button>
            </CardHeader>
            <CardContent className="px-5 pb-1 pt-8 [&>*]:line-clamp-1 ">
              <CardTitle title={act.label ?? ""}>{act.label}</CardTitle>
            </CardContent>
            <CardFooter className="flex justify-between px-5 pb-10 pt-1">
              {act.location ? (
                <p className=" flex items-baseline font-medium text-red-600 dark:text-slate-50">
                  <FaLocationArrow className=" scale-75" />
                  {act.location}
                </p>
              ) : (
                ""
              )}

              <div className="flex">
                {act.discount ? (
                  <p className={cn(`whitespace-nowrap pr-1 font-normal`)}>
                    {(act.price * (100 - 8)) / 100 + " DT"}
                  </p>
                ) : (
                  ""
                )}
                <p
                  className={cn(
                    `whitespace-nowrap pr-1 ${
                      act.discount
                        ? "text-xs font-bold line-through"
                        : "font-normal"
                    }`
                  )}
                >
                  {act.price + " DT"}
                </p>
              </div>
            </CardFooter>
            <button className="h-12 w-full self-center rounded-[20px] bg-tomato-300 py-0 text-xl font-semibold uppercase text-white shadow-sm">
              View details
            </button>
          </Card>
        );
      })}
    </ul>
  );
};
export function ActivitiesSkeleton() {
  return (
    <div className="mb-12 grid w-full grid-cols-1 gap-3 px-2 sm:grid-cols-2 sm:gap-x-4 md:grid-cols-3 xl:grid-cols-4">
      {[0, 1, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <div
          key={i}
          /* className=" flex flex-col overflow-hidden rounded-3xl bg-slate-50 p-2 shadow-md dark:bg-slate-600
            [&:nth-child(1)>#img]:h-48 lg:[&:nth-child(1)>#img]:max-h-full [&:nth-child(1)]:col-span-2 
            lg:[&:nth-child(1)]:col-span-1 [&:nth-child(2)]:row-span-2" */
          className="relative flex flex-col justify-between rounded-3xl bg-slate-50 dark:bg-slate-600"
        >
          <Skeleton className="aspect-[19/10] h-full w-full animate-pulse rounded-b-none rounded-t-3xl bg-slate-400 object-cover shadow-md lg:aspect-video" />
          <div className="px-5 pb-1 pt-8">
            <Skeleton className="h-6 w-[90%] animate-pulse rounded-full bg-slate-400" />
          </div>
          <div className=" flex justify-between px-5 pb-10 pt-1">
            <Skeleton className="h-6 w-[40%] animate-pulse rounded-full bg-slate-400" />
            <Skeleton className="h-6 w-[20%] animate-pulse rounded-full bg-slate-400" />
          </div>
          <div className="w-full shrink-0 grow-0 self-center overflow-hidden rounded-[20px] bg-slate-500 ">
            <Skeleton className=" h-full w-full bg-slate-400 " />
          </div>
        </div>
      ))}
    </div>
  );
}
ActivitiesPage.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;
export default ActivitiesPage;
