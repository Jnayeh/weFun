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
        " bg-[#E95B47] relative mx-auto flex h-[calc(100dvh-72px)] md:h-dvh md:h-screen max-h-[1080px] min-h-[600px] flex-col items-center justify-center pb-20 md:px-12 md:pb-4 md:pt-4"
      )}
    >
      <Image
        priority
        src="/new_hero.jpg"
        alt="man doing activity"
        className="absolute "
        loading="eager"
        fill
        fetchPriority="high"
      />
      <Suspense>
        <FloatingCards />
      </Suspense>
      <div className="z-0 flex w-full flex-col items-center justify-center text-white shadow-black drop-shadow">
        <h1 className=" flex flex-col justify-center text-center text-4xl font-extrabold dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="flex justify-center">
            <span className="block h-fit w-fit bg-black px-1 pb-3">Barmej</span>{" "}
            Kharja
          </span>
          <span className="leading-snug ">m3a Shella</span>
        </h1>
        <p className="py-4 text-center font-marhey text-base font-semibold uppercase dark:text-white xs:text-xl md:text-2xl xl:text-3xl">
          <span>و أصنع جوك مع صحابك Plani</span> <br />
          new connections ولا
        </p>
        <div className="flex w-[90%] max-w-sm justify-center ">
          <HeaderArrow className="-scale-x-100" />
          <Link
            href="explore"
            className="mt-5 flex h-fit py-2 px-5 items-center justify-center
            rounded-full bg-slate-50 font-bold text-black transition-all duration-100 hover:bg-red-700 
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
    { src: "/images/bowling.jpg", placing: "left-[3%] top-[20%] h-56 w-40" },
    { src: "/images/dodge.jpg", placing: "left-[33%] top-[8%] h-32 w-24" },
    { src: "/images/billard.jpg", placing: "right-32 top-20 h-60 w-44" },
    {
      src: "/images/paraglider.jpg",
      placing: "bottom-[6%] left-[12%] h-72 w-52",
    },
    {
      src: "/images/basketball.jpg",
      placing: "bottom-[14%] right-[16%] h-64 w-48",
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
            tabIndex={-1}
            src={activity.src ?? ""}
            alt="activity"
            placeholder="blur"
            blurDataURL={blurData[index] ?? ""}
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
