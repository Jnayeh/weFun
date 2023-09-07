import Head from "next/head";
import Image from "next/image";

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
import { NextPageWithLayout } from "../_app";

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
  
  const { data, isLoading, error } = api.activity.getAll.useQuery({
    name: "",
  });

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
          " mx-auto flex min-h-[300px] max-w-[97%] flex-col items-center justify-center gap-2 py-4"
        )}
      >
        <div className="flex w-full justify-center items-center gap-1 px-6 pb-4 max-w-2xl">
          <Input type="search" className="rounded-l-full pl-6 h-[46px]" />
          <Button className="rounded-r-full bg-slate-500 text-3xl text-white h-full hover:bg-slate-600">
            <BiSearchAlt />
            <span className="sr-only">Search</span>
          </Button>
        </div>

        {isLoading ? (
          <p>Is Loading</p>
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
    "https://magazine.bluekarmasecrets.com/wp-content/uploads/2019/10/retreatbox4.jpg",
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
              `flex flex-col justify-between overflow-hidden rounded-3xl bg-slate-50 dark:bg-slate-600 [&:nth-child(1)>div>img]:max-h-48 [&:nth-child(1)]:col-span-2 lg:[&:nth-child(1)]:col-span-1 ${
                data.length > 4 ? "[&:nth-child(2)]:row-span-2" : ""
              } `
            )}
          >
            <CardHeader className="relative flex-shrink flex-grow p-3 pb-0">
              <Image
                src={images[index] ?? ""}
                alt={act.label ?? "activity"}
                className="h-full w-full rounded-2xl object-cover shadow-md"
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
              <CardTitle>{act.label}</CardTitle>
            </CardContent>
            <CardFooter className="flex justify-between px-4 ">
              <h4 className={cn(`whitespace-nowrap pr-1`)}>
                {act.price + " DT"}
              </h4>
              {act.discount ? (
                <h4 className=" font-extrabold text-red-600 dark:text-slate-50">
                  {"-" + act.discount}%
                </h4>
              ) : (
                <h4 className=" text-end font-extrabold text-red-600 dark:text-slate-50">
                  {act.activity_duration} minutes
                </h4>
              )}
            </CardFooter>
            <Button className=" m-2 w-[70%] max-w-[16rem] self-center rounded-xl bg-slate-700 py-1 text-lg font-bold text-white shadow-sm dark:bg-white dark:text-slate-700">
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
