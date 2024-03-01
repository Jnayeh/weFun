import { api } from "~/trpc/server";
import { cache } from "react";
import { nextCache } from "~/utils/helpers/server";
import SlidingCards from "~/components/SlidingCards";
import { SlidingCardsSkeleton } from "~/components/skeletons/sliding-card";

const getCategories = cache(
  nextCache(
    async () => {
      return api.category.getAll.query();
    },
    ["categories"],
    { tags: ["getCategories"], revalidate: 10 }
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
