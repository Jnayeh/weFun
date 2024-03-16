"use client";
import React, { Suspense, useEffect, useRef } from "react";

import "~/styles/navbar.styles.css";

import { Link } from "~/navigation";
import { cn } from "~/utils/helpers/server";
import { useAuth } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import BrandSvg from "~/components/SvgStore/BrandSvg";
import { usePathname } from "~/navigation";
import Arrow from "~/components/SvgStore/arrow";
import { useMediaQuery } from "~/utils/helpers/client";
import { useParams } from "next/navigation";
import { LoginSideBar } from "~/components/Sidebar";
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
        `top-0 z-50 min-w-full max-w-[1600px] items-center justify-center 
      bg-white/70 backdrop-blur-md transition-all duration-200 dark:bg-gray-800/60 `,
        isHome
          ? "from-bg-transparent-scroll fixed"
          : "fixed bg-transparent backdrop-blur-none dark:bg-transparent md:sticky md:bg-white/60 md:backdrop-blur-md md:dark:bg-gray-800/60",
        id && " fixed md:sticky"
      )}
    >
      <nav
        className={cn(
          "mx-auto flex w-full max-w-[1500px] items-center justify-between p-2 lg:px-12"
        )}
      >
        <div className=" flex h-10 items-center">
          <button
            onClick={() => window.history.back()}
            className={cn(
              `"aspect-square dark:hover:bg-gray-900/60" rounded-full bg-white/20 
              p-2 transition-colors duration-200 
              hover:bg-gray-200/60 dark:bg-gray-900/20`,
              isHome ? "hidden" : "md:hidden"
            )}
          >
            <Arrow className={cn("-scale-90 text-black dark:text-white")} />
            <span className="sr-only">Go back</span>
          </button>
          <Link href="/" className={cn(!isHome && "hidden md:block")}>
            <BrandSvg
              className={cn(
                "w-32 rounded-md",
                isHome && "from-white-text"
              )}
            />
          </Link>
        </div>
        <ul
          className={cn(
            `relative hidden h-11  max-w-full list-none items-center overflow-hidden p-0 px-3 text-black transition-transform
              duration-100 dark:text-white ${isHome && "link-scale"} md:flex `
          )}
          ref={navListRef}
        >
          <li aria-hidden="true">
            <Link
              href="/"
              className={`nav-item ${location == "/" && "is-active"} hidden`}
            />
          </li>
          <li>
            <Link
              href="/plans"
              className={
                location == "/plans" ? "nav-item is-active" : "nav-item "
              }
            >
              Plans
            </Link>
          </li>
          <li>
            <Link
              href="/activities"
              className={
                location == "/activities" ? "nav-item is-active" : "nav-item "
              }
            >
              Activities
            </Link>
          </li>

          <li>
            <Link
              href="/regions"
              className={
                location == "/regions" ? "nav-item is-active" : "nav-item "
              }
            >
              Places
            </Link>
          </li>
          <li>
            <Link
              href="/explore"
              className={
                location == "/explore" ? "nav-item is-active" : "nav-item "
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
        <div className="z-40 flex h-full items-center justify-end gap-1 lg:gap-2">
          <Suspense>
            <ToggleButton className={cn("z-10 ")} />
          </Suspense>
          <LoginSideBar />
          <Link
            href="/auth/signup"
            className={cn(
              "group hidden h-10 items-center gap-1 rounded-full border-2 border-black p-2 px-3 text-sm font-semibold uppercase transition-all duration-75 hover:scale-90 hover:border-transparent hover:bg-slate-800 hover:text-white dark:border-white dark:hover:border-transparent md:flex",
              isHome && "from-white-borders"
            )}
          >
            Sign up
            <Arrow
              className={cn(
                "scale-75 text-black group-hover:text-white dark:text-white",
                isHome && "from-white-borders"
              )}
            />
          </Link>
        </div>
      </nav>
    </div>
  );
}
