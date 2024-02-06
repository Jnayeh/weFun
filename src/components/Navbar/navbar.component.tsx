"use client";
import React, { Suspense, useEffect, useRef } from "react";

import "~/styles/navbar.styles.css";

import { Link } from "~/navigation";
import { cn } from "~/utils/helpers/server";
import { useAuth } from "@clerk/nextjs";
import UserSvg from "~/components/SvgStore/UserSvg";
import dynamic from "next/dynamic";
import BrandSvg from "~/components/SvgStore/BrandSvg";
import { usePathname } from "~/navigation";
const ToggleButton = dynamic(() => import("~/components/ui/dark-toggle"), {
  ssr: false,
});

export default function Navbar() {
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);
  const location = usePathname();

  function slideHorizontal(
    el: HTMLElement,
    items: NodeListOf<HTMLElement>,
    indicator: React.RefObject<HTMLSpanElement>
  ) {
    items.forEach((item) => {
      item.classList.remove("is-active");
      item.removeAttribute("style");
    });

    if (indicator.current && el) {
      indicator.current.style.width = `${el.offsetWidth}px`;
      indicator.current.style.left = `${el.offsetLeft}px`;
      indicator.current.style.backgroundColor =
        "rgb(230, 0, 0)"; /* el.getAttribute('active-color'); */

      el.classList.add("is-active");
      el.style.color = "white";
    }
  }
  /**
   * Sliding indicator
   *
   */
  const sliding = (elementRef?: React.RefObject<HTMLElement>) => {
    // change transition timing
    // to only be effective after 100 milliseconds
    // this is to not have a sliding effect when changing between routes
    // in the navbar
    setTimeout(() => {
      if (indicatorRef.current) {
        indicatorRef.current.style.transition = "0.4s";
      }
    }, 0);
    if (elementRef && elementRef.current && navListRef.current) {
      const items =
        navListRef.current.querySelectorAll<HTMLElement>(".nav-item");
      slideHorizontal(elementRef.current, items, indicatorRef);
    } else if (navListRef.current) {
      const items =
        navListRef.current.querySelectorAll<HTMLAnchorElement>(".nav-item");
      items.forEach((item) => {
        if (item && indicatorRef.current) {
          setTimeout(() => {
            item.style.transition = "0.4s";
          }, 100);
          item.addEventListener("click", (e) => {
            slideHorizontal(e.target as HTMLElement, items, indicatorRef);
          });

          item.classList.contains("is-active") &&
            slideHorizontal(item, items, indicatorRef);
        }
      });

      /* 
      const activeLink = navListRef.current.querySelector<HTMLAnchorElement>(".active-link");
      if (activeLink && indicatorRef.current) {
        navListRef.current.addEventListener("mouseleave", () => {
          items.forEach((item) => {
            slideHorizontal(activeLink, items, indicatorRef);
            item.classList.contains("is-active") &&
              slideHorizontal(activeLink, items, indicatorRef);
          });
        });
      } */
    }
  };
  /**
   * Adding event listeners on component mount
   *
   */
  /* 
  useEffect(() => {
    // add event listener for clicks on the document
    document.addEventListener("click", handleClickOutside);
    return () => {
      // remove event listener when component unmounts
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
 */
  /**
   * Sliding on location change
   */
  useEffect(() => {
    sliding();
    console.log(location);
  }, [location]);

  const { isLoaded, isSignedIn, signOut } = useAuth();
  return (
    <div
      className={cn(`navigation sticky top-0 z-30 min-w-full justify-center bg-white bg-opacity-80 shadow-lg backdrop-blur transition-all 
        dark:bg-gray-800 dark:bg-opacity-20 dark:backdrop-blur-md md:bg-opacity-90 dark:md:bg-opacity-90`)}
    >
      <nav className="mx-auto flex h-[60px] w-full max-w-[1500px] items-center justify-between p-2">
        <div className="brand-name flex flex-shrink-0 items-center">
          <BrandSvg className=" w-32 rounded-md fill-black dark:fill-slate-100" />
        </div>
        <ul
            className={cn(
              `relative hidden h-full max-w-full list-none items-center overflow-hidden p-0 px-3 
              text-black dark:text-white md:flex `
            )}
            ref={navListRef}
          >
            <li>
              <Link
                href="/"
                className={
                  location == "/"
                    ? "nav-item is-active active-link"
                    : "nav-item "
                }
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/activities"
                className={
                  location == "/activities"
                    ? "nav-item is-active active-link"
                    : "nav-item "
                }
              >
                Activities
              </Link>
            </li>

            <li>
              <Link
                href="/regions"
                className={
                  location == "/regions"
                    ? "nav-item is-active active-link"
                    : "nav-item "
                }
              >
                Places
              </Link>
            </li>
            <li>
              <Link
                href="/explore"
                className={
                  location == "/explore"
                    ? "nav-item is-active active-link"
                    : "nav-item "
                }
              >
                Explore
              </Link>
            </li>

            <span
              aria-hidden
              className="nav-indicator"
              ref={indicatorRef}
            ></span>
          </ul>
        {/* <div className=" m-auto hidden h-11 w-full items-center justify-end pr-2 md:flex">
          
          {/* <li
            ref={searchRef}
            onFocus={() => {
              inputRef.current?.onfocus;
              setIsSearching(true);
            }}
          >
            <label
              id="search-label"
              defaultValue="search activities by name"
              className={`mx-2 hidden items-center gap-x-2 fill-red-700 px-4 dark:fill-yellow-400 dark:hover:fill-white md:flex`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24.316 24.316"
              >
                <g id="find" transform="translate(0 -3.5)">
                  <path
                    id="Path_1"
                    data-name="Path 1"
                    d="M14.4,3.5A10.9,10.9,0,1,1,6.693,6.693,10.831,10.831,0,0,1,14.4,3.5Zm0,20.09a9.188,9.188,0,1,0-6.5-2.691A9.128,9.128,0,0,0,14.4,23.59Z"
                    transform="translate(-3.5)"
                  />
                  <path
                    id="Path_2"
                    data-name="Path 2"
                    d="M30.294,31.151a.854.854,0,0,1-.606-.251l-5.462-5.462a.857.857,0,0,1,1.212-1.212L30.9,29.688a.857.857,0,0,1-.606,1.463Z"
                    transform="translate(-6.836 -3.336)"
                  />
                </g>
              </svg>

              <input
                aria-labelledby="search-label"
                type="text"
                name="searching"
                ref={inputRef}
                value={searched}
                onChange={(e) => {
                  setSearched(e.currentTarget.value);
                }}
                className={
                  isSearching
                    ? " w-[30rem] rounded-[20px] border-solid p-2 px-4 focus:border-[1px]  focus:border-red-700 focus:outline-none dark:text-white dark:focus:border-white"
                    : "w-0"
                }
              />

              <button
                className={
                  isSearching
                    ? " rounded-full bg-red-600 p-2 text-2xl text-white dark:bg-yellow-500"
                    : " w-0 text-transparent"
                }
                onBlur={() => {
                  setIsSearching(false);
                  navListRef.current?.classList.add("");
                }}
              >
                <BsArrowRight
                  strokeWidth={0.7}
                  className={isSearching ? "" : " hidden"}
                />
              </button>
            </label>
          </li> *}
        </div> */}
        <div className="z-40 flex items-center justify-end p-2 h-full">
          <Suspense>
            <ToggleButton className="z-10 scale-[60%] " />
          </Suspense>
          <UserSvg side="right" className="ml-4 block" />
        </div>
      </nav>
    </div>
  );
}
