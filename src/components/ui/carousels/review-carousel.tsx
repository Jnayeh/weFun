"use client";
import * as React from "react";

import { Card, CardContent } from "~/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
export function ReviewCarousel(
  {
    reviews,
  }: {
    reviews: {
      description: string;
      user: {
        name: string;
        image: string;
      };
    }[];
  } = { reviews: [] }
) {
  function getInitials(name: string) {
    return name
      .split(" ")
      .map((_) => _[0])
      .join("");
  }
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-11/12"
    >
      <CarouselContent className="pt-7">
        {reviews.map((_, index) => (
          <CarouselItem key={index} className="basis-1/2 md:basis-1/3 xl:basis-1/5">
            <Card className="relative flex aspect-square flex-col items-start justify-between gap-2 ">
              <Avatar className=" absolute -top-6 left-4 h-12 w-12 ">
                <AvatarImage src={_.user.image} alt="@shadcn" />
                <AvatarFallback>{getInitials(_.user.name)}</AvatarFallback>
              </Avatar>
              <CardContent className=" p-4 pt-10 text-start">
                <span className=" text-base font-semibold">
                  {_.description}
                </span>
              </CardContent>

              <span className=" line-clamp-1 px-4 py-2 text-blue-700 drop-shadow-md dark:text-slate-400">
                {_.user.name}
              </span>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className=" flex items-center justify-center gap-5 pt-10">
        <CarouselPrevious variant="default" className=" static bg-orange-350" />
        <CarouselNext variant="default" className=" static bg-orange-350" />
      </div>
    </Carousel>
  );
}
