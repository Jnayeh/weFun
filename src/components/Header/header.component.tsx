

// image imports
import JumpingMan from '~/Assets/Images/jumping_man.png';
import WoofBall from '~/Assets/Images/woof-ball.svg';
import SaturnImage from '~/Assets/Images/saturn.svg';
import SunImage from '~/Assets/Images/sun.svg';
import LeafImage from '~/Assets/Images/leaf.svg';
import LocationImage from '~/Assets/Images/location.svg';

// icons imports
import { BsChevronDown } from '@react-icons/all-files/bs/BsChevronDown';
import Link from 'next/link';
import Image from 'next/image';


const Header = () => {
  return (
    <header className="lg:pt-20  flex flex-col-reverse lg:flex-row justify-center items-center py-7 lg:px-6 max-w-[1500px] mx-auto ">
      <div className="w-4/5 pt-8 sm:pt-0 sm:pl-10 lg:pl-20 lg:w-1/2">
        <h1 className="lg:text-[3.5rem] xl:text-7xl text-4xl dark:text-white ">
          Make your daily experiences <span className="text-primary "> memorable </span>
        </h1>
        <p className="py-8 max-w-md dark:text-white">
          On a mission to build a network of entertainment where you can share and practice your hobbies with people who
          have the same interests as you.
        </p>
        <div className="header_link_container ">
          <Link href="#" className="mt-14 uppercase lg:text-3xl text-2xl font-bold dark:text-white">
            Choose <span className="text-primary "> the plan </span> that
            <p className="flex items-center gap-1">
              suits you <BsChevronDown size={32} className="inline-block" strokeWidth={0.4} />
            </p>
          </Link>
        </div>
      </div>
      <div className="h-[450px] xl:h-[600px] w-4/5 lg:w-1/2 relative sm:pr-32 flex my-14 lg:mt-0 lg:max-w-[600px]">
        <Image src={SaturnImage} alt="sun_image" className=" absolute top-28 sm:left-16 z-0 scale-75 xs:scale-100" />
        <Image src={LeafImage} alt="leaf_image" className="absolute top-1 right-1 scale-75 xs:scale-100" />
        <Image src={SunImage} alt="sun_image" className="absolute top-44 -right-0 sm:-right-6 scale-75 xs:scale-100" />
        <Image src={LocationImage} alt="location_image" className="absolute bottom-5  left-32 scale-75 xs:scale-100" />
        <Image src={JumpingMan} alt="jumping_man" className="h-[370px] w-auto xs:h-[450px] xl:h-[600px] absolute right-1  lg:right-2 z-0" loading='eager' fetchPriority="high" />
        <Image src={WoofBall} alt="woof-ball" className="h-[70px] xs:h-[85px] xl:h-[120px] w-auto absolute -top-10 ml-10 sm:right-[295px] md:-top-10 lg:right-96 z-0" />
        <button className="absolute top-[460px] sm:top-[290px] xl:top-[400px] hover:bg-red-700 sm:scale-100 ml-[20px] sm:ml-[50px] md:ml-[150px] xl:ml-[50px] lg:ml-[75px] z-0 text-lg 2xs:text-2xl lg:text-base xl:text-2xl text-white font-light bg-primary py-3 px-9 rounded-full">Find out more</button>
      </div>
    </header>
  );
};

export default Header;
