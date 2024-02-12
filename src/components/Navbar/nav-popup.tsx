"use client";
import { cn } from "~/utils/helpers/server";
import { Link } from "~/navigation";
import { Fragment } from "react";

export default function NavPopup() {
  var menuItems = [
    { href: "/", label: "Home" },
    { href: "/activities", label: "Activities" },
    { href: "/regions", label: "Places" },
    { href: "/explore", label: "Explore" },
  ];
  return (
    <div
      className=" sticky -bottom-1 left-0 right-0 z-50 flex h-fit w-full justify-between
     gap-1 bg-stone-300 p-2 text-right dark:bg-stone-700 md:hidden"
    >
      {menuItems.map((el, index) => {
        return (
          <Fragment key={index}>
            {index === Math.floor(menuItems.length / 2) && (
              <div className="relative min-w-10 justify-self-center">
                <button
                  aria-label="Menu button"
                  className={cn(
                    `absolute -top-4 right-1/2 flex h-12 w-12 translate-x-1/2 items-center justify-center rounded-full bg-red-600 p-2 text-2xl text-white hover:bg-red-900`
                  )}
                >
                  +
                </button>
              </div>
            )}
            <Link
              prefetch
              href={el.href}
              aria-label={el.label}
              passHref
              className={cn(` block rounded-full px-4 py-2 text-center text-base 
              text-gray-900 transition-all duration-100 hover:bg-red-500 
              hover:text-white dark:bg-opacity-50 dark:text-white`)}
            >
              {el.label}
            </Link>
          </Fragment>
        );
      })}
    </div>
  );
}
