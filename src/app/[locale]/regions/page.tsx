"use client";
import MasonryGrid from "~/components/MasonryGrid";
import Head from "next/head";
import { api } from "~/trpc/react";
import { MasonryGridSkeleton } from "~/components/skeletons/masonry-grid";
import { cn, nextCache, nextNoStore } from "~/utils/helpers/server";
import { Input } from "~/components/ui/input";
import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
import { FaLocationArrow } from "@react-icons/all-files/fa/FaLocationArrow";
import { BiHeart } from "@react-icons/all-files/bi/BiHeart";
import { BiSearchAlt } from "@react-icons/all-files/bi/BiSearchAlt";
import defaultImage from "~/Assets/placeholder.webp";
import ImageWithFallback from "~/components/ImageWithFallback";
import { Metadata } from "next";
import { Suspense, lazy } from "react";



export const metadata: Metadata = {
  title: "places ",
  description: "List of places from different activities",
};

export const cachableGetLocations = nextCache(
  async ({ name }) => {
    return api.location.getAll.query({ name });
  },
  ["locations"],
  { tags: ["getLocations"], revalidate: 60 }
);



const PlacesPage = () => {
  // Use react-query's useQuery hook to fetch locations
  const { data: locationsData, isLoading: isLocationsLoading } = useQuery(
    "locations",
    () => cachableGetLocations({ name }),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );

  return (
    <>
      <Head>
        <title>Places - Find your new experiences</title>
        <meta name="description" content="List of Places for activities" />
      </Head>
      <main
        className={cn(
          "mx-auto flex min-h-[300px] max-w-[97%] flex-col items-center gap-2 py-4"
        )}
      >
        {isLocationsLoading ? (
          <MasonryGridSkeleton />
        ) : locationsData && locationsData.length > 0 ? (
          <>
            <h2>All locations</h2>
            {/* Assuming locationsData is an array of location objects */}
            <MasonryGrid dataList={locationsData} detailsUrl="locations/" />
          </>
        ) : (
          <>
            <p className="text-center text-2xl font-bold text-red-600 dark:text-slate-50">
              Cannot find any places
            </p>
            <LottiePlayer
              src="/animated/not-found.lottie"
              loop
              autoplay
              className="mx-auto w-[90vw] max-w-lg"
            />
          </>
        )}
      </main>
    </>
  );
};

export default PlacesPage;
