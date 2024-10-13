"use client";
import * as React from "react";
import CategoryCarouselSkeleton from "~/components/skeletons/category-carousel";

import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { api } from "~/trpc/react";
import { cn } from "~/utils/helpers/client";

export function CategoryCarousel({
  className,
  addGradient = false,
}: React.HTMLProps<HTMLDivElement> & { addGradient?: boolean }) {
  const { data: categories, isLoading } = api.category.getAllv1.useQuery(
    undefined,
    {
      staleTime: 1000 * 60 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );
  if (isLoading) return <CategoryCarouselSkeleton />;
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className={cn("w-full max-w-fit py-2", className)}
    >
      {addGradient && (
        <>
          <CarouselGradientComponent side="left" />
          <CarouselGradientComponent side="right" />
        </>
      )}
      <CarouselContent radioGroup="categories">
        <CarouselItem className=" w-fit min-w-max flex-initial pl-8">
          <Card key="all" tabIndex={0} className="bg-slate-500 text-white">
            <CardContent className="flex items-center justify-center whitespace-nowrap px-3 py-2">
              <span className="select-none text-sm font-semibold md:text-base">
                All
              </span>
            </CardContent>
          </Card>
        </CarouselItem>
        {categories &&
          categories.map((cat, index) => (
            <CarouselItem
              key={cat.id}
              className=" w-fit min-w-max flex-initial pl-2 last:pr-4"
            >
              <Card tabIndex={0} className="bg-slate-500 text-white">
                <CardContent className="flex items-center justify-center whitespace-nowrap px-3 py-2">
                  <span className="select-none text-sm font-semibold md:text-base">
                    {cat.label}
                  </span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  );
}
const CarouselGradientComponent = ({
  side = "left",
}: {
  side: "right" | "left";
}) => {
  return side === "right" ? (
    <div className=" absolute right-0 top-0 z-10 h-full w-6 bg-gradient-to-l from-slate-50 to-transparent dark:from-slate-900"></div>
  ) : (
    <div className=" absolute left-0 top-0 z-10 h-full w-6 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-900"></div>
  );
};
