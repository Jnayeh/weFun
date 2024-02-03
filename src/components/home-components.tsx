import { api } from "~/trpc/server";
import SlidingCards from "./SlidingCards";
import { SlidingCardsSkeleton } from "./skeletons/sliding-card";
import { cache } from "react";

const getCategories = cache(async () => {
  return api.category.getAll.query();
});
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
