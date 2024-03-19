import Image from "next/image";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "~/components/ui/carousel";
import { dynamicBlurDataUrl } from "~/server/actions";

export async function ActivityPicturesCarousel() {
  const activities = [
    {
      src: "/images/basketball.webp",
    },
    {
      src: "/images/paraglider.webp",
    },
    {
      src: "/images/hiking.webp",
    },
    {
      src: "/images/dodge.webp",
    },
    {
      src: "/images/billard.webp",
    },
    {
      src: "/images/hiking.webp",
    },
    {
      src: "/images/dodge.webp",
    },
    {
      src: "/images/billard.webp",
    },
    {
      src: "/images/hiking.webp",
    },
    {
      src: "/images/dodge.webp",
    },
    {
      src: "/images/billard.webp",
    },
  ];
  const blurData: string[] = [];
  for (let i = 0; i < activities.length; i++) {
    blurData.push(await dynamicBlurDataUrl(activities[i]?.src ?? ""));
  }
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent className="m-0">
        {activities.map((activity, index) => (
          <CarouselItem key={index} className="h-screen p-0">
            <div className="relative h-full w-screen">
              <Image
                src={activity.src ?? ""}
                alt="activity"
                placeholder={"blur"}
                blurDataURL={blurData[index] ?? ""}
                fill
                className="fixed top-0 object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots />
    </Carousel>
  );
}
