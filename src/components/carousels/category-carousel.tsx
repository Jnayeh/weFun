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

export function CategoryCarousel() {
  const { data: categories, isLoading } = api.category.getAll.useQuery(
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
      className="w-full max-w-fit"
    >
      <CarouselContent radioGroup="categories">
        <CarouselItem className=" w-fit min-w-max flex-initial pl-4">
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
              className=" w-fit min-w-max flex-initial pl-2"
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
