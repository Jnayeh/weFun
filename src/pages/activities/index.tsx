import Head from "next/head";

import { api } from "~/utils/api";
import Layout from "../layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Activity } from "~/db/schema";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
import { BiHeart } from "@react-icons/all-files/bi/BiHeart";
import { BiSearchAlt } from "@react-icons/all-files/bi/BiSearchAlt";
import { NextPageWithLayout } from "~/pages/_app";
import defaultImage from "~/Assets/Images/placeholder.webp";
import ImageWithFallback from "~/components/ImageWithFallback";
import { Skeleton } from "@/components/ui/skeleton";

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
          <Button
            className="h-full rounded-r-full bg-slate-500 text-3xl text-white hover:bg-slate-600"
            aria-label="click to search"
          >
            <BiSearchAlt />
            <span className="sr-only">Search</span>
          </Button>
        </div>

        {isLoading ? (
          <>
            <p className=" sr-only">Is Loading</p>
            <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 ">
              {[0, 1, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <div
                  key={i}
                  className=" flex flex-col overflow-hidden rounded-3xl bg-slate-50 p-2 shadow-md dark:bg-slate-600
              [&:nth-child(1)>#img]:h-48 lg:[&:nth-child(1)>#img]:max-h-full [&:nth-child(1)]:col-span-2 
              lg:[&:nth-child(1)]:col-span-1 [&:nth-child(2)]:row-span-2"
                >
                  <Skeleton
                    id="img"
                    className="aspect-video h-full w-full animate-pulse rounded-2xl bg-slate-400 object-cover shadow-md"
                  />
                  <div className="space-y-2 p-2">
                    <Skeleton className="h-6 w-[90%] animate-pulse rounded-full bg-slate-400" />
                    <div className=" flex justify-between">
                      <Skeleton className="h-4 w-[20%] animate-pulse rounded-full bg-slate-400" />
                      <Skeleton className="h-4 w-[40%] animate-pulse rounded-full bg-slate-400" />
                    </div>
                  </div>
                  <Skeleton className="h-9 w-[95%] shrink-0 grow-0 animate-pulse self-center rounded-xl bg-slate-400" />
                </div>
              ))}
            </div>
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
const Activities = (props: { data: Activity[] }) => {
  const { data } = props;
  const images = [
    "https://www.yohoadventures.com/wp-content/uploads/2014/10/DSC02773-1-1024x768.jpg",
    "https://blog.efoodhandlers.com/wp-content/uploads/2020/01/AdobeStock_222953589-1024x683.jpeg",
    "https://magazine.bluekarmasecrets.com/wp-content/uploads/2019/10/retreatbox4.png",
    "https://outdoortrip-web.s3.eu-central-1.amazonaws.com/130-barcelona-city-bike-tour/barcelona-city-bike-tour.5b7d66b2e8cf8-full.jpg",
    "https://www.trendz4friend.com/wp-content/uploads/2021/06/artclasses1.jpg",
  ];
  return (
    <ul
      className={cn(
        `grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4`
      )}
    >
      {data.map((act, index) => {
        return (
          <Card
            key={act.id}
            className={cn(
              `flex flex-col justify-between overflow-hidden rounded-3xl bg-slate-50 dark:bg-slate-600 [&:nth-child(1)>div>img]:max-h-48 lg:[&:nth-child(1)>div>img]:max-h-full [&:nth-child(1)]:col-span-2 lg:[&:nth-child(1)]:col-span-1 ${
                data.length > 4 ? "[&:nth-child(2)]:row-span-2" : ""
              } `
            )}
          >
            <CardHeader className="relative flex-shrink flex-grow p-3 pb-0">
              <ImageWithFallback
                src={images[index] ?? defaultImage.src}
                fallBackSrc={defaultImage}
                blurDataURL={defaultImage.src}
                alt={act.label ?? "activity"}
                className="aspect-video h-full w-full rounded-2xl object-cover shadow-md"
                width={800}
                height={800}
              />
              <Button className="text-brand-500 absolute right-5 top-5 flex items-center justify-center rounded-full bg-white p-2 hover:cursor-pointer">
                <div className="flex h-6 w-6 items-center justify-center rounded-full text-2xl hover:bg-gray-50">
                  {act.id % 2 == 0 ? (
                    <FaHeart fill="red" />
                  ) : (
                    <BiHeart fill="red" />
                  )}
                </div>
              </Button>
            </CardHeader>
            <CardContent className="p-3 py-2 [&>*]:line-clamp-1">
              <CardTitle title={act.label ?? ''}>{act.label}</CardTitle>
            </CardContent>
            <CardFooter className="flex justify-between px-4 ">
              <div className="flex">
              {act.discount ?
              <h4 className={cn(`whitespace-nowrap pr-1 font-semibold`)}>
                {(act.price * (100-8)/100) + " DT"}
              </h4>
              : ""}
              <h4 className={cn(`whitespace-nowrap pr-1 ${act.discount ? "line-through text-xs":'font-semibold'}`)}>
                {act.price + " DT"}
              </h4>
              </div>
              {act.discount ? (
                <h4 className=" font-extrabold text-red-600 dark:text-slate-50">
                  {"-" + act.discount}%
                </h4>
              ) : ""}
            </CardFooter>
            <Button className=" m-2 w-[90%] max-w-[16rem] self-center rounded-xl bg-slate-700 py-1 text-lg font-bold text-white shadow-sm dark:bg-white dark:text-slate-700">
              Book now
            </Button>
          </Card>
        );
      })}
    </ul>
  );
};
ActivitiesPage.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;
export default ActivitiesPage;
