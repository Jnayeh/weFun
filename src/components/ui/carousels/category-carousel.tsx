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
  const { data: categories, isLoading} = api.category.getAll.useQuery(undefined, {
    staleTime: 1000 * 60 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
  });
  if (isLoading) return <CategoryCarouselSkeleton />;
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-full max-w-fit"
    >
      <CarouselContent radioGroup="categories">
        {categories && categories.map((cat, index) => (
          <CarouselItem
            key={index}
            className=" w-fit min-w-max flex-initial pl-2 first:pl-4"
          >
            <Card tabIndex={0} className="bg-slate-500 text-white">
              <CardContent className="flex items-center justify-center whitespace-nowrap p-3">
                <span className="text-xs md:text-base font-semibold select-none">{cat.label}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
