"use client";
import React, { Suspense, useEffect, useRef } from "react";

import "~/styles/navbar.styles.css";

import { Link } from "~/navigation";
import { cn } from "~/utils/helpers/server";
import { useAuth } from "@clerk/nextjs";
import UserSvg from "~/components/SvgStore/menu";
import dynamic from "next/dynamic";
import BrandSvg from "~/components/SvgStore/BrandSvg";
import { usePathname } from "~/navigation";
import Arrow from "../SvgStore/arrow";
import { useMediaQuery } from "~/utils/helpers/client";
import { useParams } from "next/navigation";
const ToggleButton = dynamic(() => import("~/components/ui/dark-toggle"), {
  ssr: false,
});

export default function Navbar() {
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);
  const location = usePathname();
  const { isLoaded, isSignedIn, signOut } = useAuth();
  const isHome = location === "/";
  const isMobile = useMediaQuery("(max-width: 767px)");
  const id = useParams().id;
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
  }, [location, isMobile]);

  return (
    <div
      className={cn(
        `top-0 z-30 min-w-full max-w-[1600px] items-center justify-center 
      bg-white/70 backdrop-blur transition-all duration-200 dark:bg-gray-800/60 
      dark:backdrop-blur-md md:bg-opacity-80 dark:md:bg-opacity-90`,
        isHome ? "fixed bg-scroll" : "sticky",
        id && " fixed md:sticky",
        id &&
          isMobile &&
          "bg-transparent backdrop-blur-none dark:bg-transparent dark:backdrop-blur-none"
      )}
    >
      <nav
        className={cn(
          "mx-auto flex h-[60px] w-full max-w-[1500px] items-center justify-between p-2 lg:px-12"
        )}
      >
        <div className=" flex items-center">
          {isMobile && !isHome ? (
            <button
              onClick={() => window.history.back()}
              className="aspect-square rounded-full bg-white/40 p-2 
              transition-colors duration-200 hover:bg-gray-100/70 
              dark:bg-gray-900/60 dark:hover:bg-gray-900/70"
            >
              <Arrow className={cn("-scale-90 text-black dark:text-white")} />
              <span className="sr-only">Go back</span>
            </button>
          ) : (
            <BrandSvg
              className={cn(
                "w-32 rounded-md fill-black transition-all dark:fill-slate-100"
              )}
            />
          )}
        </div>
        <ul
          className={cn(
            `relative hidden h-full max-w-full list-none items-center overflow-hidden p-0 px-3 text-black transition-transform
              duration-100 dark:text-white ${isHome && "link-scale"} md:flex `
          )}
          ref={navListRef}
        >
          <li>
            <Link
              href="/"
              className={
                location == "/" ? "nav-item is-active active-link" : "nav-item "
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
            className="nav-indicator absolute bottom-0 left-0 z-0 h-full rounded-2xl"
            ref={indicatorRef}
          ></span>
        </ul>
        <div className="z-40 flex h-full flex-row-reverse items-center justify-end gap-1 p-2 md:flex-row lg:gap-2">
          <div
            className={
              id &&
              `flex aspect-square h-9 items-center justify-center rounded-full 
              bg-white/40 p-2 transition-colors duration-200 hover:bg-gray-100/70 
              dark:bg-gray-900/60 dark:hover:bg-gray-900/70`
            }
          >
            <UserSvg className={cn("block", isHome && "white-menu")} />
          </div>
          <Suspense>
            <ToggleButton className={cn("z-10 ")} />
          </Suspense>
          <Link
            href="/auth/signup"
            className={cn(
              "group hidden h-10 items-center gap-1 rounded-full border-2 border-black p-2 px-3 text-sm font-semibold uppercase transition-all duration-75 hover:scale-90 hover:border-transparent hover:bg-slate-800 hover:text-white dark:border-white dark:hover:border-transparent md:flex",
              isHome && "white-borders"
            )}
          >
            Sign up
            <Arrow
              className={cn(
                "scale-75 text-black group-hover:text-white dark:text-white",
                isHome && "white-borders"
              )}
            />
          </Link>
        </div>
      </nav>
    </div>
  );
}
