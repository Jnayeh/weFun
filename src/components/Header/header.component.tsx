import Image from "next/image";
import HeaderArrow from "../SvgStore/header-arrow";
import { cn } from "~/utils/helpers/server";
import { dynamicBlurDataUrl } from "~/server/actions";
import { Suspense } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const Header = () => {
  return (
    <header
      className={cn(
        "relative mx-auto flex h-[calc(110dvh-72px)] max-h-[1080px] min-h-fit flex-col items-center overflow-hidden pb-2 font-ubuntu md:h-[110dvh] md:h-[110vh] md:px-12 md:pb-20 "
      )}
    >
      <div className="absolute h-[120vh] w-screen">
        <Image
          src="/new_hero.webp"
          alt="spider web"
          aria-hidden
          className="bg-gradient-to-b from-[#e8614e] via-[#dd867c] to-[#e8614e] brightness-90 contrast-150"
          fill
          quality={100}
          fetchPriority="high"
        />
      </div>
      <div className=" relative flex h-[86vh] w-full flex-col justify-center">
        <Suspense>
          <FloatingCards />
        </Suspense>
        <div className="z-10 flex w-full flex-col items-center justify-center pt-32 text-white shadow-black drop-shadow ">
          <h1 className=" flex flex-col justify-center text-center text-2xl font-extrabold transition-all duration-500 dark:text-white xs:text-4xl sm:text-5xl md:text-6xl ">
            <span className="flex justify-center">Barmej Kharja</span>
            <span className="leading-snug ">m3a Shella</span>
          </h1>
          <p className=" py-4 text-center text-base font-semibold capitalize transition-all duration-500 dark:text-white xs:text-xl md:text-2xl ">
            <span className="font-marhey ">و أصنع جوك مع صحابك </span> Plani
            <br />
            new connections <span className="font-marhey">ولا</span>
          </p>
          <div className="flex w-[70%] max-w-sm justify-center transition-all duration-300 2xs:w-[90%] ">
            <HeaderArrow className="-scale-x-100" />
            <Button
              className="mt-5 flex h-fit items-center justify-center rounded-full bg-slate-50
            px-5 py-2 font-bold text-black transition-all hover:bg-red-700 
            hover:text-white 2xs:text-2xl "
            >
              Barmejha
            </Button>
            <HeaderArrow />
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
      placing: "bottom-[10%] left-[22%] h-60 w-40",
    },
    {
      src: "/images/hiking.webp",
      priority: true,
      placing: " left-[10%] md:left-[3%] top-[20%] h-72 w-52",
    },
    {
      src: "/images/dodge.webp",
      priority: false,
      placing: "left-[26%] top-[10%] h-32 w-24 md:brightness-90 brightness-75",
    },
    {
      src: "/images/billard.webp",
      priority: false,
      placing: "right-[8%] sm:right-[10%] top-20 h-60 w-44",
    },
    {
      src: "/images/basketball.webp",
      priority: false,
      placing: "bottom-4 right-[12%] sm:right-[16%] h-64 w-48",
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
            className={cn(
              "animate-floating-card absolute overflow-hidden rounded-2xl bg-slate-300 shadow-2xl shadow-black/60 brightness-50 md:brightness-75",
              activity.placing
            )}
          >
            <Image
              key={index}
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
