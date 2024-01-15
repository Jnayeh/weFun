import React, { useRef, useEffect, HTMLProps } from "react";
import { motion, AnimatePresence, AnimationProps } from "framer-motion";
import { cn } from "~/utils/helpers";
import Link from "next/link";
import { useSideBarStore } from "~/store/sidebar";
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import { useAuth, useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/nextjs/dist/types/server";
import BrandSvg from "./SvgStore/BrandSvg";

type SidebarContentProps = HTMLProps<HTMLDivElement> & {
  isOpen: boolean;
  onClose: () => void;
  side: "left" | "right";
};
type SidebarProps = AnimationProps & SidebarContentProps;

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  children,
  className,
  transition,
  initial,
  animate,
  exit,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: Event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("ontouchstart", handleClickOutside);
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("ontouchstart", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={sidebarRef}
          initial={initial}
          animate={animate}
          exit={exit}
          transition={transition}
          className={cn(`fixed z-50 box-border w-[80%] max-w-xs ${className}`)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const LoginSideBar: React.FC<
  HTMLProps<HTMLDivElement> & {
    side: "left" | "right";
  }
> = ({ side, className, ...rest }) => {
  const { toggleLeftBar, leftBarOpen } = useSideBarStore();
  const { toggleRightBar, rightBarOpen } = useSideBarStore();
  const { isLoaded: signInLoaded, signIn, setActive } = useSignIn();
  const { isLoaded, signOut, isSignedIn } = useAuth();
  const signInWith = (strategy: OAuthStrategy) => {
    if (!signInLoaded) {
      console.error("sigin is not loaded yet");
      return;
    }
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "/auth/signin",
      redirectUrlComplete: "/",
    });
  };
  let variants = {
    left: {
      isOpen: leftBarOpen,
      onClose: toggleLeftBar,
      transition: { duration: 0.4 },
      initial: { x: "-100%" },
      animate: { x: 0 },
      exit: { x: "-100%" },
      position: "left-0 top-0 ",
    },
    right: {
      isOpen: rightBarOpen,
      onClose: toggleRightBar,
      transition: { duration: 0.4 },
      initial: { x: "100%" },
      animate: { x: 0 },
      exit: { x: "100%" },
      position: "right-0 top-0",
    },
  };
  return (
    <Sidebar
      {...rest}
      isOpen={variants[side].isOpen}
      side={side}
      transition={{ duration: 0.4 }}
      initial={variants[side].initial}
      animate={variants[side].animate}
      exit={variants[side].exit}
      onClose={variants[side].onClose}
      className={cn(`h-screen bg-slate-100 bg-opacity-20 shadow-2xl shadow-gray-500 backdrop-blur-[20px] 
        dark:bg-gray-800 dark:bg-opacity-20 dark:shadow-gray-800 md:bg-opacity-50 md:backdrop-blur-2xl ${variants[side].position} ${className}`)}
    >
      <div
        className={`flex justify-between p-6 ${
          side == "left" ? "" : "flex-row-reverse"
        } `}
      >
        <button onClick={variants[side].onClose}>
          <svg
            className="scale-[140%] stroke-black stroke-[1.6] transition-colors 
              duration-200 hover:stroke-tomato-300 dark:stroke-white"
            width="21"
            height="21"
            viewBox="-1 -1 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10.5" cy="10.5" r="10" />
            <path d="M14 7L7 14M7 7L14 14" strokeLinecap="round" />
          </svg>
        </button>
        {isSignedIn ? (
          <button
            className="rounded-full border-2 border-[#E95B47] px-2 py-1 
          text-center font-montserrat text-xs uppercase tracking-[1px] text-tomato-300 shadow-[#e95b47] transition-all duration-200 
          text-shadow-sm hover:bg-tomato-300 hover:text-white hover:shadow-white"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        ) : (
          <Link
            href="/auth/signup"
            className="rounded-full border-2 border-[#E95B47] px-2 py-1 
          text-center font-montserrat text-xs uppercase tracking-[1px] text-tomato-300 shadow-[#e95b47] transition-all duration-200 
          text-shadow-sm hover:bg-tomato-300 hover:text-white hover:shadow-white"
          >
            Sign up ?
          </Link>
        )}
      </div>
      <div className="flex h-[calc(100%-76px)] flex-col items-center gap-4 p-6 pt-0">
        <h2 className=" py-12 text-xl font-bold uppercase md:text-2xl">
          Login to <BrandSvg className=" w-32 rounded-md fill-black dark:fill-slate-100 inline"/>
        </h2>
        <button
          onClick={() => signInWith("oauth_google")}
          className=" flex w-full items-center justify-evenly rounded-full bg-black  px-2 py-2 text-xs uppercase text-white dark:bg-white dark:text-black md:text-base"
        >
          <FcGoogle className=" flex h-[30px] w-[30px] items-center justify-center rounded-full " />
          Continue with google
        </button>
        <button
          onClick={() => signInWith("oauth_facebook")}
          className=" dark:bg-whitetext-white flex w-full items-center justify-evenly rounded-full bg-black px-2 py-2 text-xs uppercase text-white dark:bg-white dark:text-black md:text-base"
        >
          <FaFacebook className=" h-[30px] w-[30px] rounded-full bg-white text-blue-600 " />
          Continue with google
        </button>
      </div>
    </Sidebar>
  );
};
export default Sidebar;
