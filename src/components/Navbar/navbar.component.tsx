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
      className={cn(`sticky top-0 z-30 min-w-full items-center justify-center bg-white bg-opacity-70 shadow-lg backdrop-blur transition-all 
        dark:bg-gray-800 dark:bg-opacity-60 dark:backdrop-blur-md md:bg-opacity-80 dark:md:bg-opacity-90 max-w-[1600px] md:px-12`)}
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

          <span aria-hidden className="nav-indicator" ref={indicatorRef}></span>
        </ul>
        <div className="z-40 flex h-full items-center justify-end gap-3 p-2">
          <Suspense>
            <ToggleButton className="z-10" />
          </Suspense>
          <UserSvg side="right" className="block" />
        </div>
      </nav>
    </div>
  );
}
