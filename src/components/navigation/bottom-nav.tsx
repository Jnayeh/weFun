"use client";
import { cn } from "~/utils/helpers/server";
import { Link, usePathname } from "~/navigation";
import React, { useEffect, useState } from "react";
import {
  BikeIcon,
  Gamepad2Icon,
  DumbbellIcon,
  Home,
  MapPin,
  Compass,
  CableCarIcon,
  PartyPopperIcon,
  DramaIcon,
  ClapperboardIcon,
  FlameKindlingIcon,
  TentTreeIcon,
} from "lucide-react";
import MenuSheet from "~/components/sheets/menu-sheet";
import { useParams } from "next/navigation";

export default function BottomNav() {
  const icons = [
    <BikeIcon />,
    <Gamepad2Icon />,
    <DumbbellIcon />,
    <TentTreeIcon />,
    <CableCarIcon />,
    <PartyPopperIcon />,
    <DramaIcon />,
    <ClapperboardIcon />,
    <FlameKindlingIcon />,
  ];
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const location = usePathname();
  const id = useParams().id;
  var menuItems = [
    { href: "/", label: "Home", icon: <Home /> },
    {
      href: "/activities",
      label: "Activities",
      icon: icons[currentIconIndex],
    },
    { href: "/regions", label: "Places", icon: <MapPin /> },
    { href: "/explore", label: "Explore", icon: <Compass /> },
  ];
  return (
    <div
      aria-hidden={id ? "true" : "false"}
      className={`fixed bottom-0 left-0 right-0 z-30 flex h-fit w-screen justify-between
      gap-1 bg-white p-1 text-right transition-transform duration-200 dark:bg-slate-900 md:hidden ${
        id ? " translate-y-full" : ""
      }`}
    >
      {/* <MenuSheet side="bottom"/> */}
      {menuItems.map((el, index) => {
        return (
          <div key={index} className="group flex-1">
            <Link
              prefetch
              tabIndex={0}
              href={el.href}
              aria-label={el.label}
              passHref
              className={cn(
                `mx-auto flex w-4/5 items-center justify-center text-center font-semibold text-gray-800 group-hover:text-red-600 ${
                  location == el.href ? "text-red-600" : " dark:text-gray-300"
                }`
              )}
            >
              <span className=" flex flex-col items-center px-3 pb-1 pt-1">
                <i className="mb-1 block text-2xl">{el.icon}</i>
                <span className="block pb-2 text-xs">{el.label}</span>
                <span
                  className={cn(
                    `mx-auto block h-1 w-5 rounded-full group-hover:bg-red-600  ${
                      location == el.href ? "bg-red-600" : ""
                    }`
                  )}
                ></span>
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
