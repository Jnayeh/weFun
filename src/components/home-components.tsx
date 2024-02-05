import { api } from "~/trpc/server";
import SlidingCards from "./SlidingCards";
import { SlidingCardsSkeleton } from "./skeletons/sliding-card";
import { cache } from "react";
import { nextCache } from "~/utils/helpers/server";

const getCategories = cache(
  nextCache(
    async () => {
      return api.category.getAll.query();
    },
    ["categories"],
    { tags: ["getCategories"], revalidate: 0.1 }
  )
);
export const TopPlaces = async () => {
  const data = await getCategories();
  return (
    <>
      {data && data.length && data.length > 1 ? (
        <SlidingCards dataList={data.slice(0, 3)} />
      ) : (
        <SlidingCardsSkeleton />
      )}
    </>
  );
};
export const TopActivities = async () => {
  const data = await getCategories();
  return (
    <>
      {data && data.length && data.length > 1 ? (
        <SlidingCards dataList={data} />
      ) : (
        <SlidingCardsSkeleton />
      )}
    </>
  );
};
