import React, { Suspense, useEffect, useState, useRef } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import NavPopup from "./nav-popup";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { SvgUser } from "../SvgStore";

export default function Navbar() {
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);

  const location = useRouter().pathname;

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
  }, [location]);

  const { isLoaded, isSignedIn, signOut } = useAuth();
  return (
    <div
      className={cn(`navigation sticky top-0 z-30 min-w-full justify-center bg-beige bg-opacity-70 shadow-lg backdrop-blur transition-all 
        dark:bg-gray-800 dark:bg-opacity-20 dark:backdrop-blur-md md:bg-opacity-90 dark:md:bg-opacity-90`)}
    >
      <nav className="mx-auto flex h-[60px] w-full max-w-[1500px] items-center justify-between p-2">
        <SvgUser side="left" className="md:hidden ml-2" />
        <div className="brand-name flex flex-shrink-0 items-center">
          {/* <Image
            src="/brand-name.png"
            alt="brand logo"
            height={60}
            width={60}
            className=" w-12 rounded-md"
          /> */}
          <span> LOGO</span>
        </div>
        <Suspense>
          <div className="z-40 flex items-center justify-end">
            <ToggleButton className="z-10 scale-[60%] md:hidden" />
            <NavPopup />
          </div>
        </Suspense>

        <div className=" m-auto hidden h-11 w-full items-center justify-end pr-2 md:flex">
          <ToggleButton className="scale-75 " />
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
          <SvgUser side="right" className="hidden md:block" />
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
          </li> */}
        </div>
      </nav>
    </div>
  );
}

/**
 * Dark theme toggle
 * React Element
 */

export function ToggleButton({
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    /* 
    const rootElement = document.documentElement;
    rootElement.classList.remove('dark');
    rootElement.classList.add('light'); 
    */
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  useEffect(() => {
    let clientTheme = localStorage.getItem("theme") ?? "system";
    setTheme(clientTheme);
  }, []);
  return (
    <button {...props} onClick={toggleTheme} aria-label=" dark mode toggle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="53"
        height="56"
        viewBox="0 0 53 56"
      >
        <g id="Group_19" data-name="Group 19" transform="translate(-384 -20)">
          <g
            id="Component_12_6"
            data-name="Component 12_6"
            transform="translate(384 20)"
          >
            <g
              id="Rectangle_9"
              data-name="Rectangle 9"
              transform="translate(3)"
              fill={theme == "light" ? "#1e293b" : "#5a97d5"}
              strokeWidth="1"
            >
              <rect width="47" height="56" rx="22" stroke="none" />
              <rect
                x="0.5"
                y="0.5"
                width="46"
                height="55"
                rx="21.5"
                fill="none"
              />
            </g>

            {/* Moon icon */}
            <path
              id="Center"
              d="M21.933,17.326a.8.8,0,0,0-.881-.249,8.282,8.282,0,0,1-2.836.479,8.791,8.791,0,0,1-4.9-16.039.8.8,0,0,0,.327-.838.807.807,0,0,0-.658-.614A9.182,9.182,0,0,0,11.88,0a11.974,11.974,0,0,0,0,23.947A11.781,11.781,0,0,0,22,18.249.81.81,0,0,0,21.933,17.326Z"
              transform="translate(15.74 14.8)"
              fill="#b8bbe9"
              stroke="#707070"
              strokeWidth="1"
              opacity={theme == "light" ? "100" : "0"}
            />
            {/* Sun icon */}
            <g
              id="Group_18"
              data-name="Group 18"
              transform="translate(1422 -11767.014)"
              opacity={theme == "light" ? "0" : "100"}
            >
              <path
                id="Center-2"
                data-name="Center"
                d="M18.706,14.155a9.223,9.223,0,0,0,.771-2.166,9.52,9.52,0,0,0,.237-2.819,8.9,8.9,0,0,0-1.747-4.987A9.715,9.715,0,0,0,12.876.442c-.226-.061-.4-.124-.836-.22A11.538,11.538,0,0,0,10.729.031,8.187,8.187,0,0,0,9.781,0a9.781,9.781,0,1,0,0,19.563,9.754,9.754,0,0,0,8.394-4.482C18.318,14.844,18.621,14.3,18.706,14.155Z"
                transform="translate(-1399.023 11807.453) rotate(-120)"
                fill="#e9d135"
              />
              <g
                id="Sunbeams"
                transform="translate(-1369 11786.913) rotate(120)"
              >
                <path
                  id="_8"
                  data-name="8"
                  d="M5.386,5.386a1.876,1.876,0,0,0,0-2.679L3.242.563a1.876,1.876,0,0,0-2.679,0,1.876,1.876,0,0,0,0,2.679L2.706,5.386a1.876,1.876,0,0,0,2.679,0Zm0,0"
                  transform="translate(5.118 5.118)"
                  fill="#e9d135"
                />
                <path
                  id="_7"
                  data-name="7"
                  d="M6.859,1.929A1.921,1.921,0,0,0,4.93,0h-3a1.929,1.929,0,1,0,0,3.858h3A2.072,2.072,0,0,0,6.859,1.929Zm0,0"
                  transform="translate(0 17.47)"
                  fill="#e9d135"
                />
                <path
                  id="_6"
                  data-name="6"
                  d="M5.386.563a1.876,1.876,0,0,0-2.679,0L.563,2.706a1.876,1.876,0,0,0,0,2.679,1.876,1.876,0,0,0,2.679,0L5.386,3.242a1.875,1.875,0,0,0,0-2.679Zm0,0"
                  transform="translate(5.118 27.625)"
                  fill="#e9d135"
                />
                <path
                  id="_5"
                  data-name="5"
                  d="M1.929,0A1.921,1.921,0,0,0,0,1.929v3a1.929,1.929,0,1,0,3.858,0v-3A2.072,2.072,0,0,0,1.929,0Zm0,0"
                  transform="translate(17.47 31.939)"
                  fill="#e9d135"
                />
                <path
                  id="_4"
                  data-name="4"
                  d="M.482.563a1.876,1.876,0,0,1,2.679,0L5.305,2.706A1.895,1.895,0,0,1,2.626,5.386L.482,3.242a2.1,2.1,0,0,1,0-2.679Zm0,0"
                  transform="translate(27.706 27.625)"
                  fill="#e9d135"
                />
                <path
                  id="_3"
                  data-name="3"
                  d="M0,1.929A1.921,1.921,0,0,1,1.929,0h3a1.929,1.929,0,1,1,0,3.858h-3A2.072,2.072,0,0,1,0,1.929Zm0,0"
                  transform="translate(31.939 17.47)"
                  fill="#e9d135"
                />
                <path
                  id="_2"
                  data-name="2"
                  d="M.563,5.386a1.876,1.876,0,0,1,0-2.679L2.706.563a1.876,1.876,0,0,1,2.679,0,1.876,1.876,0,0,1,0,2.679L3.242,5.386a1.876,1.876,0,0,1-2.679,0Zm0,0"
                  transform="translate(27.625 5.118)"
                  fill="#e9d135"
                />
                <path
                  id="_1"
                  data-name="1"
                  d="M1.929,6.859A1.921,1.921,0,0,1,0,4.93v-3a1.929,1.929,0,1,1,3.858,0v3A2.072,2.072,0,0,1,1.929,6.859Zm0,0"
                  transform="translate(17.47 0)"
                  fill="#e9d135"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </button>
  );
}
