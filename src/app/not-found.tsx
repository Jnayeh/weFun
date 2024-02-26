import "~/styles/globals.css";
import { Suspense, lazy } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import Link from "next/link";
import { ThemeProvider } from "~/utils/theme-provider";

const GoBack = lazy(() => import("~/components/ui/back-button"));
export default function NotFound() {
  return (
    <ThemeProvider enableSystem attribute="class">
      <div className="flex min-h-screen min-w-full items-center">
        <section className="mx-auto px-6 lg:flex lg:items-center lg:gap-12">
          <div className="w-full lg:w-1/2 lg:min-w-[280px]">
            <h1 className=" text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              Page not found
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Sorry, the page you are looking for doesn't exist.Here are some
              helpful links:
            </p>

            <div className="mt-6 flex items-center gap-x-3 text-center">
              <Suspense
                fallback={
                  <Skeleton className="flex h-[36px] w-1/2 items-center justify-center gap-x-2 rounded-lg bg-slate-300 text-sm dark:bg-slate-400 sm:w-28" />
                }
              >
                <GoBack />
              </Suspense>
              <Link
                href="/"
                className="w-1/2 shrink-0 rounded-lg bg-primary px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-red-600 sm:w-auto "
              >
                Take me home
              </Link>
            </div>
          </div>

          <div className="relative mt-12 w-full lg:mt-0 lg:w-1/2">
            <img
              className="w-full max-w-full lg:mx-auto"
              src="https://merakiui.com/images/components/illustration.svg"
              alt=""
            />
          </div>
        </section>
      </div>
    </ThemeProvider>
  );
}
