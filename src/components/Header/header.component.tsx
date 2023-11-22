
import Image from "next/image";

const Header = () => {
  return (
    <header className="mx-auto  flex max-w-[1600px] flex-col-reverse items-center justify-center pb-4 md:flex-row md:px-12 md:pt-4 ">
      <div className="w-4/5 sm:pt-0 md:w-1/2  flex flex-col items-center md:items-start">
        <h1 className=" flex flex-col justify-start text-center md:text-start text-2xl font-extrabold leading-none dark:text-white md:text-[2rem] lg:text-[3.5rem] xl:text-7xl">
          Make your daily experiences{" "}
          <span className="text-primary "> memorable </span>
        </h1>
        <p className="text-center md:text-start py-4 text-base dark:text-white font-semibold">
          Practice your hobbies with people who have the same interests as you.
        </p>
        <button className="w-[90%] rounded-full max-w-sm
         bg-primary py-2 font-bold text-white
          hover:bg-red-700 sm:top-[290px] sm:scale-100 
          xl:top-[400px] 2xs:text-2xl lg:text-lg md:text-lg  xl:text-2xl">
          Find out more
        </button>
      </div>
      <div className="relative flex items-center justify-center w-full md:mt-0 md:w-1/2 ">
        <Image
          src="/Frame_hero_pic.svg"
          alt="jumping_man"
          className=" z-0 h-[370px] w-auto md:w-full md:h-auto"
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
