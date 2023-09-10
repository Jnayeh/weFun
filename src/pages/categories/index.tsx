import { InferGetServerSidePropsType } from "next";
import Head from "next/head";

import Layout from "../layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { appRouter } from "~/server/api/root";
import { Category } from "~/db/schema";
import SuperJSON from "superjson";
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "~/server/auth";
import { IncomingMessage, ServerResponse } from "http";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { NextPageWithLayout } from "~/pages/_app";
import Link from "next/link";
import defaultImage from "~/Assets/Images/placeholder.webp";
import ImageWithFallback from "~/components/ImageWithFallback";

/* 
export const getServerSideProps = async (ctx: { req: IncomingMessage & { cookies: Partial<{ [key: string]: string; }>; }; res: ServerResponse<IncomingMessage>; }) => {

  try {
    const session = await getServerAuthSession(ctx)
    
    const caller = appRouter.createCaller({
      session: session,
      db: db
    })
    const data = await caller.category.getAll();
    return {
      props: {
        serializedData: SuperJSON.stringify(data) ,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error,
      },
    };
  }
  
}
const CategoriesPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>>= ({ serializedData, error }) => {
  const data = serializedData? SuperJSON.parse<Category[]>(serializedData) : [];

*/
export const getServerSideProps = async (ctx: {
  req: IncomingMessage & { cookies: Partial<{ [key: string]: string }> };
  res: ServerResponse<IncomingMessage>;
}) => {
  const session = await getServerAuthSession(ctx);

  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session }),
    transformer: SuperJSON,
  });

  // `prefetch` does not return the result and never throws - if
  // you need that behavior, use `fetch` instead.
  const categories = await ssg.category.getAll.fetch();

  return {
    props: {
      trpcState: SuperJSON.stringify(categories),
    },
  };
};

const CategoriesPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const data = props.trpcState
    ? SuperJSON.parse<Category[]>(props.trpcState)
    : [];

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
        {data && data.length && data.length > 1 ? (
          <>
          <h2>Popular categories</h2>
          <Categories 
          data={data.slice(0,4)}
          ulClass="grid w-full grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5"
          cardClass="relative flex justify-between rounded-2xl bg-slate-50 dark:bg-slate-800"
          cardHeaderClass="flex flex-shrink-0 flex-grow justify-center  p-1"
          cardImageClass="aspect-square w-[50px] rounded-md object-cover"
          cardContentClass="flex flex-col items-end justify-between rounded-r-2xl p-2 transition-all"
          cardTitleClass="md:text-lg line-clamp-1 overflow-hidden text-ellipsis text-end text-base font-bold hover:line-clamp-2"
          cardLinkClass="self-end bg-transparent p-0 px-1 text-sm underline-offset-4 hover:underline focus:underline hover:text-red-600"
          />
          <h2>All categories</h2>
          <Categories data={data} />
          </>
        ) : (
          <p>Can not find any Categories </p>
        )}
      </main>
    </>
  );
};
const Categories = (props: {
  data: Category[];
  ulClass?: string;
  cardClass?: string;
  cardHeaderClass?: string;
  cardImageClass?: string;
  cardContentClass?: string;
  cardTitleClass?: string;
  cardLinkClass?: string;
}) => {
  const {
    data,
    ulClass,
    cardClass,
    cardHeaderClass,
    cardImageClass,
    cardContentClass,
    cardTitleClass,
    cardLinkClass,
  } = props;
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
        ulClass ??
          `grid w-full grid-cols-2 gap-4 gap-y-10 sm:grid-cols-3 sm:gap-6 sm:gap-y-12 md:grid-cols-4 lg:grid-cols-5`
      )}
    >
      {data.map((act, index) => {
        return (
          <Card
            key={act.id}
            className={cn(
              cardClass ??
                `relative flex flex-col justify-between rounded-2xl bg-slate-50 hover:translate-y-1 dark:bg-slate-600 [&:nth-child(1)]:col-span-2`
            )}
          >
            {/*lg:[&:nth-child(1)]:col-span-1 [&:nth-child(3)]:row-span-2 [&:nth-child(3)>div>img]:h-full */}
            <CardHeader className={cn(cardHeaderClass ?? "flex flex-grow p-0")}>
              <ImageWithFallback
                src={images[index] ?? defaultImage.src}
                fallBackSrc={defaultImage}
                placeholder="blur"
                blurDataURL={defaultImage.src}
                alt={act.label ?? "category"}
                className={cn(
                  cardImageClass ??
                    "h-48 w-full rounded-2xl object-cover shadow-md sm:h-40 md:h-60 "
                )}
                width={800}
                height={800}
              />
            </CardHeader>
            <CardContent
              className={cn(
                cardContentClass ??
                  "absolute bottom-[-1.8rem] left-[10%] flex w-[80%] flex-col gap-1 rounded-2xl bg-white p-2 opacity-90 shadow-md transition-all dark:bg-gray-800"
              )}
            >
              <CardTitle
                className={cn(
                  cardTitleClass ??
                    "line-clamp-1 text-lg font-bold hover:line-clamp-2 sm:text-xl"
                )}
              >
                {act.label}
              </CardTitle>

              <Link
                className={cn(
                  cardLinkClass ??
                    `self-end rounded-lg bg-red-500 p-[2px] px-2 text-sm text-white shadow-sm hover:bg-red-700 focus:bg-red-700`
                )}
                href={""}
              >
                <span className="line-clamp-1">View more</span>
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </ul>
  );
};
CategoriesPage.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;
export default CategoriesPage;

/* 
return (
  <ul
    className={cn(
      `grid w-full grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5`
    )}
  >
    {data.map((act, index) => {
      return (
        <Card
          key={act.id}
          className={cn(
            `relative flex justify-between rounded-2xl bg-slate-50 hover:translate-y-1 dark:bg-slate-800 `
          )}
        >
          <CardHeader className="flex flex-shrink-0 flex-grow justify-center  p-1 ">
            <ImageWithFallback
              src={images[index] ?? defaultImage.src}
              fallBackSrc={defaultImage}
              placeholder="blur"
              blurDataURL={defaultImage.src}
              alt={act.label ?? "category"}
              className={cn(
                " aspect-square w-[50px] rounded-md object-cover"
              )}
              width={800}
              height={800}
            />
          </CardHeader>
          <CardContent className="flex flex-col items-end justify-between rounded-r-2xl bg-white p-2 transition-all dark:bg-gray-800">
            <CardTitle
              className={cn(
                "md:text-md line-clamp-1 overflow-hidden text-ellipsis text-end text-base font-bold hover:line-clamp-2"
              )}
            >
              {act.label}
            </CardTitle>

            <Link
              className="self-end rounded-md bg-red-500 bg-opacity-0 p-0 px-1 text-sm shadow-sm hover:bg-opacity-20 focus:bg-opacity-20 "
              href={""}
            >
              <span className="line-clamp-1">View more</span>
            </Link>
          </CardContent>
        </Card>
      );
    })}
  </ul>
);
 */
