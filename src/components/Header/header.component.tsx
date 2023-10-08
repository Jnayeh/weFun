
import Image from "next/image";

const Header = () => {
  return (
    <header className="mx-auto  flex max-w-[1500px] flex-col-reverse items-center justify-center pb-4 lg:flex-row lg:px-6 lg:pt-4 ">
      <div className="w-4/5 sm:pl-10 sm:pt-0 lg:w-1/2 lg:pl-20">
        <h1 className=" flex flex-col justify-start text-center md:text-start text-2xl font-extrabold leading-none dark:text-white lg:text-[3.5rem] xl:text-7xl">
          Make your daily experiences{" "}
          <span className="text-primary "> memorable </span>
        </h1>
        <p className="text-center md:text-start max-w-md py-4 text-base dark:text-white font-semibold">
          Practice your hobbies with people who have the same interests as you.
        </p>
        <button className=" justify-self-center w-full max-w-sm rounded-full bg-primary px-9 py-3 text-lg font-light text-white hover:bg-red-700 2xs:text-2xl sm:top-[290px] sm:ml-[50px] sm:scale-100 md:ml-[150px] lg:ml-[75px] lg:text-base xl:top-[400px] xl:ml-[50px] xl:text-2xl">
          Find out more
        </button>
      </div>
      <div className="relative flex h-[370px] w-full md:w-4/5 md:h-[600px] sm:pr-32 lg:mt-0 lg:w-1/2 lg:max-w-[600px] xl:h-[800px]">
        <Image
          src="/Frame_hero_pic.svg"
          alt="jumping_man"
          className="absolute end-1 z-0 h-[370px] w-auto md:h-[600px]  lg:end-2 xl:h-[800px]"
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
