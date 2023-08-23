

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
    <header className="header ">
      <div className="header_text_container">
        <h1 className="heading_primary  dark:text-white">
          Make your daily experiences <span className="text-primary "> memorable </span>
        </h1>
        <p className="heading_paragraph  dark:text-white">
          On a mission to build a network of entertainment where you can share and practice your hobbies with people who
          have the same interests as you.
        </p>
        <div className="header_link_container ">
          <Link href="#" className="header_link dark:text-white">
            Choose <span className="text-primary "> the plan </span> that
            <p className="flex items-center gap-1">
              suits you <BsChevronDown size={32} className="inline-block" strokeWidth={0.4} />
            </p>
          </Link>
        </div>
      </div>
      <div className="header_image_container">
        <Image src={SaturnImage} alt="sun_image" className="header_image-saturn" />
        <Image src={LeafImage} alt="leaf_image" className="header_image-leaf" />
        <Image src={SunImage} alt="sun_image" className="header_image-sun" />
        <Image src={LocationImage} alt="location_image" className="header_image-location" />
        <Image src={JumpingMan} alt="jumping_man" className="header_image" loading='eager' fetchPriority="high" />
        <Image src={WoofBall} alt="woof-ball" className="header_image-ball" />
        <button className="header_button text-white font-light bg-primary py-3 px-9 rounded-full">Find out more</button>
      </div>
    </header>
  );
};

export default Header;
