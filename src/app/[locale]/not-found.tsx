"use client";
import "~/styles/globals.css";
import dynamic from "next/dynamic";
import { Link, useRouter } from "~/navigation";
import { notFound } from "next/navigation";

const LazyGoBack = dynamic(
  () => import("./not-found").then((mod) => mod.GoBack),
  {
    ssr: false,
  }
);
export default function NotFound({ children }: { children: React.ReactNode }) {
  notFound();
  return (
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
            <LazyGoBack />
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
  );
}

export const GoBack = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex w-1/2 items-center justify-center gap-x-2 rounded-lg border bg-white px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 sm:w-auto"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-5 w-5 rtl:rotate-180"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
        />
      </svg>

      <span>Go back</span>
    </button>
  );
};
