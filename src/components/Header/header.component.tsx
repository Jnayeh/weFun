import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="mx-auto  flex max-w-[1600px] flex-col-reverse items-center justify-center pb-4 md:flex-row md:px-12 md:pt-4 ">
      <div className="flex w-4/5 flex-col  items-center sm:pt-0 md:w-1/2 md:items-start">
        <h1 className=" flex flex-col justify-start text-center text-2xl font-extrabold leading-none dark:text-white md:text-start md:text-[2rem] lg:text-[3.5rem] xl:text-7xl">
          Make your daily experiences{" "}
          <span className="text-primary "> memorable </span>
        </h1>
        <p className="py-4 text-center text-base font-semibold dark:text-white md:text-start lg:text-2xl xl:text-5xl">
          Practice your hobbies with people who have the same interests as you.
        </p>
        <Link
          href="explore"
          className="flex h-[71px] w-[90%]
         max-w-sm items-center justify-center rounded-[32px] bg-primary font-bold text-white hover:bg-red-700 2xs:text-2xl
          sm:top-[290px] sm:scale-100 md:h-12 
          md:w-60 md:text-lg lg:text-lg xl:top-[400px]  xl:text-2xl"
        >
          Find out more
        </Link>
      </div>
      <div className="relative flex w-full items-center justify-center md:mt-0 md:w-1/2 ">
        <Image
          src="/Frame_hero_pic.svg"
          alt="jumping_man"
          className=" z-0 h-[370px] w-auto md:h-auto md:w-full"
          loading="eager"
          fetchPriority="high"
          width={600}
          height={600}
        />
      </div>
    </header>
  );
};

export default Header;
