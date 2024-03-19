import Image from "next/image";
import HeaderArrow from "../../../../components/SvgStore/header-arrow";
import { cn, useTranslatedElements } from "~/utils/helpers/server";
import { dynamicBlurDataUrl } from "~/server/actions";
import React, { Suspense } from "react";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import HeaderSpider from "~/components/SvgStore/header-spider";
import { useTranslations } from "next-intl";

const Header = () => {
  const t = useTranslations("Home.header");
  const defaultFont = useTranslations("fonts");
  const headerTitle = useTranslations("Home.header.title");
  const key = [1, 2];

  return (
    <header
      className={cn(
        `relative mx-auto flex h-[calc(110svh-72px)] max-h-[80rem] min-h-fit flex-col items-center overflow-hidden pb-2 
        ${defaultFont("title")} 
        md:h-[120vh] md:px-12 md:pb-20`
      )}
    >
      <div className="absolute h-[120vh] w-screen bg-gradient-to-b from-[#e8614e] via-[#dd867c] to-[#e8614e] brightness-90 contrast-150">
        <HeaderSpider className="absolute h-full w-full text-current" />
      </div>
      <div className=" relative flex h-screen w-full flex-col justify-center">
        <Suspense>
          <FloatingCards />
        </Suspense>
        <div className="z-10 flex w-full flex-col items-center justify-center pt-32 text-white shadow-black drop-shadow ">
          <h1 className=" flex flex-col justify-center text-center text-2xl font-extrabold transition-all duration-500 dark:text-white xs:text-4xl sm:text-5xl md:text-7xl drop-shadow-sm">
            {useTranslatedElements(key, headerTitle)}
          </h1>
          <p className=" py-4 text-center text-base font-semibold capitalize transition-all duration-500 dark:text-white xs:text-xl md:text-2xl ">
            <span className="font-marhey ">و أصنع جوك مع صحابك </span> Plani
            <br />
            new connections <span className="font-marhey">ولا</span>
          </p>
          <div className="flex w-[70%] max-w-sm justify-center transition-all duration-300 2xs:w-[90%] ">
            <HeaderArrow id="arrow-left" className="-scale-x-100" />
            <Button
              className="mt-4 flex h-fit items-center justify-center rounded-full bg-slate-50 
              px-5 py-2 font-bold text-black transition-all hover:bg-red-700 
              hover:text-white 2xs:text-2xl "
            >
              {t("button")}
            </Button>
            <HeaderArrow id="arrow-right" />
          </div>
        </div>
      </div>
      <div className="flex h-[20%] items-start justify-center gap-1 pt-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </header>
  );
};

const FloatingCards = async () => {
  const activities = [
    {
      src: "/images/paraglider.webp",
      priority: false,
      placing: "bottom-[4%] left-[22%] h-64 w-44 brightness-75",
    },
    {
      src: "/images/hiking.webp",
      priority: true,
      placing: " left-[10%] md:left-[3%] top-[20%] h-80 w-60",
    },
    {
      src: "/images/dodge.webp",
      priority: false,
      placing: "left-[26%] top-[10%] h-40 w-32 ",
    },
    {
      src: "/images/billard.webp",
      priority: false,
      placing: "right-[8%] sm:right-[10%] top-20 h-72 w-52",
    },
    {
      src: "/images/basketball.webp",
      priority: false,
      placing: "bottom-0 right-[12%] sm:right-[16%] h-72 w-56",
    },
  ];
  const blurData: string[] = [];
  for (let i = 0; i < activities.length; i++) {
    blurData.push(await dynamicBlurDataUrl(activities[i]?.src ?? ""));
  }

  return (
    <>
      {activities.map((activity, index) => {
        return (
          <div
            key={index}
            className={cn(
              "absolute animate-floating-card overflow-hidden rounded-3xl bg-slate-300 shadow-xl brightness-90",
              activity.placing,
              index % 3 == 0 ? "delay-400" : index % 3 == 2 ? "" : " delay-1000"
            )}
          >
            <Image
              aria-hidden
              src={activity.src ?? ""}
              alt="activity"
              placeholder="blur"
              blurDataURL={blurData[index] ?? ""}
              priority={activity.priority}
              fill
              className="object-cover"
            />
          </div>
        );
      })}
    </>
  );
};
export default Header;
