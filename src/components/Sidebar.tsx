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
  SheetTrigger,
} from "~/components/ui/sheet";
import MenuIcon from "./SvgStore/menu";

export const LoginSideBar = ({
  className,
  isHome,
  ...props
}: SheetContentProps & { isHome?: boolean }) => {
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
      <SheetTrigger
        className="flex aspect-square h-9 items-center justify-center rounded-full
              bg-white/20 p-2 transition-colors duration-200 hover:bg-gray-200/60
              dark:bg-gray-900/10 dark:hover:bg-gray-900/70"
      >
        <MenuIcon className={cn("block", isHome && "from-white-svg")} />
      </SheetTrigger>
      <SheetContent
        closeButton={false}
        {...props}
        overlayClassName="bg-black/20"
        className={cn(
          `z-50 box-border h-screen w-[80%] max-w-xs border-0
          bg-slate-100/50 shadow-2xl shadow-gray-500 backdrop-blur-2xl
          dark:bg-gray-900/50 dark:shadow-gray-800`,
          className
        )}
      >
        <div
          className={`absolute right-0 top-0 flex w-full justify-between p-4`}
        >
          {isSignedIn ? (
            <button
              className="rounded-full border-2 border-red-600 px-2 py-1 
              text-center text-xs uppercase tracking-[1px] text-red-600 
              shadow-red-600 transition-all duration-200 text-shadow-sm 
              hover:bg-red-600 hover:text-white hover:shadow-white"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          ) : (
            <Link
              onClick={toggleRightBar}
              href="/auth/signup"
              className="rounded-full border-2 border-red-600 px-2 py-1
              text-center text-xs uppercase tracking-[1px] text-red-600
              shadow-red-600 transition-all duration-200 text-shadow-sm
              hover:bg-red-600 hover:text-white hover:shadow-white"
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
            Login to
            <BrandSvg
              className=" inline w-32 rounded-md fill-black dark:fill-slate-100"
              aria-label=" Barmejha"
            />
          </h2>
          <button
            onClick={() => signInWith("oauth_google")}
            className=" flex w-full items-center justify-between gap-4 rounded-full bg-black p-2 text-sm capitalize text-white dark:bg-white dark:text-black md:text-base"
          >
            <FcGoogle className=" flex h-[30px] w-[30px] items-center justify-center rounded-full " />
            <span>Continue with google</span>
          </button>
          <button
            onClick={() => signInWith("oauth_facebook")}
            className="flex w-full items-center justify-between gap-4 rounded-full bg-black p-2 text-sm capitalize text-white dark:bg-white dark:text-black md:text-base"
          >
            <FaFacebook className=" h-[30px] w-[30px] rounded-full text-blue-600 " />
            <span>Continue with Facebook</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
