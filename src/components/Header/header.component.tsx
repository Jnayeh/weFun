import Image from "next/image";
import { Link } from "~/navigation";
import HeaderArrow from "../SvgStore/header-arrow";
import { cn } from "~/utils/helpers/server";
import { dynamicBlurDataUrl } from "~/server/actions";
import { Suspense } from "react";

const Header = () => {
  return (
    <header
      className={cn(
        " relative mx-auto flex h-[calc(100dvh-72px)] max-h-[1080px] min-h-[600px] flex-col items-center justify-center overflow-hidden pb-20 md:h-dvh md:h-screen md:px-12 md:pb-4 md:pt-4"
      )}
    >
      <Image
        priority
        src="/new_hero.webp"
        alt="spider web"
        aria-hidden
        className=" absolute h-[120vh] w-screen bg-gradient-to-b from-[#e8614e] via-[#dd867c] to-[#e8614e] brightness-90 contrast-150"
        height={2000}
        width={3000}
        fetchPriority="high"
      />
      <Suspense>
        <FloatingCards />
      </Suspense>
      <div className="z-0 flex w-full flex-col items-center justify-center text-white shadow-black drop-shadow ">
        <h1 className=" flex flex-col justify-center text-center text-4xl font-extrabold transition-all duration-500 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="flex justify-center">
            <span className="block h-fit w-fit bg-black px-1 pb-3">Barmej</span>{" "}
            Kharja
          </span>
          <span className="leading-snug ">m3a Shella</span>
        </h1>
        <p className="py-4 text-center font-marhey text-base font-semibold capitalize transition-all duration-500 dark:text-white xs:text-xl md:text-2xl xl:text-3xl">
          <span>و أصنع جوك مع صحابك Plani</span> <br />
          new connections ولا
        </p>
        <div className="flex w-[90%] max-w-sm justify-center transition-all duration-300 ">
          <HeaderArrow className="-scale-x-100" />
          <Link
            href="explore"
            className="mt-5 flex h-fit items-center justify-center rounded-full bg-slate-50
            px-5 py-2 font-bold text-black transition-all hover:bg-red-700 
            hover:text-white 2xs:text-2xl sm:top-[290px] md:text-3xl xl:top-[400px]"
          >
            Barmejha
          </Link>
          <HeaderArrow />
        </div>
      </div>
    </header>
  );
};

const FloatingCards = async () => {
  const activities = [
    {
      src: "/images/dodge.webp",
      placing:
        "left-[33%] top-[8%] h-32 w-24 md:brightness-90 brightness-[60%]",
    },
    {
      src: "/images/paraglider.webp",
      placing: "bottom-[6%] left-[12%] h-72 w-52",
    },
    { src: "/images/hiking.webp", placing: "left-[3%] top-[20%] h-56 w-40" },
    {
      src: "/images/billard.webp",
      placing: "right-[8%] sm:right-[10%] top-20 h-60 w-44",
    },
    {
      src: "/images/basketball.webp",
      placing: "bottom-[14%] right-[12%] sm:right-[16%] h-64 w-48",
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
          <Image
            key={index}
            aria-hidden
            src={activity.src ?? ""}
            alt="activity"
            placeholder="blur"
            blurDataURL={blurData[index] ?? ""}
            priority
            width={300}
            height={300}
            className={cn(
              " absolute rounded-lg bg-slate-300 object-cover shadow-2xl brightness-50 md:brightness-75",
              activity.placing
            )}
          />
        );
      })}
    </>
  );
};
export default Header;
