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
        align: "start",
      }}
      className="w-full max-w-xs md:max-w-xl lg:max-w-4xl"
    >
      <CarouselContent>
        {reviews.map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <Card>
              <div className="flex gap-2 p-2 items-center">
                <Avatar className=" h-12 w-12 ">
                  <AvatarImage src={_.user.image} alt="@shadcn" />
                  <AvatarFallback>{getInitials(_.user.name)}</AvatarFallback>
                </Avatar>
                <span className=" text-gray-600 font-bold drop-shadow-md">{_.user.name}</span>
              </div>
              <CardContent className=" p-3 pt-0 text-start">
                <span className="text-xl font-semibold">{_.description}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
