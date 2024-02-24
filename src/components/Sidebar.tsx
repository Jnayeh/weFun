"use client";
import { cn } from "~/utils/helpers/server";
import { Link } from "~/navigation";
import { useSideBarStore } from "~/store/sidebar";
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import { useAuth, useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/nextjs/dist/types/server";
import BrandSvg from "./SvgStore/BrandSvg";
import {
  SheetContent,
  SheetContentProps,
  Sheet,
} from "~/components/ui/sheet";

export const LoginSideBar = ({ className, ...props }: SheetContentProps) => {
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
  return (
    <Sheet open={rightBarOpen} onOpenChange={toggleRightBar}>
      <SheetContent
        closeButton={false}
        {...props}
        overlayClassName="bg-transparent" 
        className={cn(
          `border-0 z-50 box-border h-screen w-[80%] max-w-xs bg-slate-100 bg-opacity-20 shadow-2xl shadow-gray-500 backdrop-blur-[20px] 
            dark:bg-gray-800 dark:bg-opacity-20 dark:shadow-gray-800 md:bg-opacity-50 md:backdrop-blur-2xl`,
          className
        )}
      >
        <div
          className={`absolute right-0 top-0 flex w-full justify-between p-4`}
        >
          {isSignedIn ? (
            <button
              className="rounded-full border-2 border-[#E95B47] px-2 py-1 
          text-center font-montserrat text-xs uppercase tracking-[1px] text-red-500 shadow-[#e95b47] transition-all duration-200 
          text-shadow-sm hover:bg-red-500 hover:text-white hover:shadow-white"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          ) : (
            <Link
              onClick={toggleRightBar}
              href="/auth/signup"
              className="rounded-full border-2 border-[#E95B47] px-2 py-1 
          text-center font-montserrat text-xs uppercase tracking-[1px] text-red-500 shadow-[#e95b47] transition-all duration-200 
          text-shadow-sm hover:bg-red-500 hover:text-white hover:shadow-white"
            >
              Sign up ?
            </Link>
          )}
          <button onClick={toggleRightBar}>
            <svg
              className="scale-[140%] stroke-black stroke-[1.6] transition-colors 
              duration-200 hover:stroke-red-500 dark:stroke-white"
              width="21"
              height="21"
              viewBox="-1 -1 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10.5" cy="10.5" r="10" />
              <path d="M14 7L7 14M7 7L14 14" strokeLinecap="round" />
            </svg>
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="flex h-[calc(100%-76px)] flex-col items-center gap-4 p-0">
          <h2 className=" py-12 text-xl font-bold uppercase md:text-2xl">
            Login to{" "}
            <BrandSvg className=" inline w-32 rounded-md fill-black dark:fill-slate-100" aria-label="Barmejha" />
          </h2>
          <button
            onClick={() => signInWith("oauth_google")}
            className=" flex w-[90%] items-center justify-between gap-4 rounded-full bg-black  px-2 py-2 text-xs uppercase text-white dark:bg-white dark:text-black md:text-base"
          >
            <FcGoogle className=" flex h-[30px] w-[30px] items-center justify-center rounded-full " />
            <span className="px-2">Continue with google</span>
          </button>
          <button
            onClick={() => signInWith("oauth_facebook")}
            className=" dark:bg-whitetext-white flex w-[90%] items-center justify-between gap-4 rounded-full bg-black px-2 py-2 text-xs uppercase text-white dark:bg-white dark:text-black md:text-base"
          >
            <FaFacebook className=" h-[30px] w-[30px] rounded-full bg-white text-blue-600 " />
            <span className="px-2">Continue with Facebook</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
