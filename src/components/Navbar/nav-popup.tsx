import { cn } from "~/utils/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSideBarStore } from "~/store/sidebar";

export default function NavPopup() {
  const toggleMenu = useSideBarStore((st) => st.toggleMenutBar);
  const isOpen = useSideBarStore((st) => st.menuBarOpen);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: Event) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      toggleMenu();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("ontouchstart", handleClickOutside);
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("ontouchstart", handleClickOutside);
    };
  }, [isOpen]);
  var menuItems = [
    { href: "/", label: "Home" },
    { href: "/activities", label: "Activities" },
    { href: "/explore", label: "Explore" },
    { href: "/regions", label: "Places" },
  ];
  return (
    <div className="text-right md:hidden" ref={menuRef}>
      <motion.button
        className={cn(`
        right-2 flex h-9 w-9 scale-90 items-center justify-center rounded-full 
        border-[3px] border-black bg-white bg-opacity-20 p-[4px] transition-colors 
        dark:border-transparent dark:bg-opacity-50 ${
          isOpen
            ? "border-transparent dark:bg-gray-200"
            : "dark:border-white dark:bg-gray-700"
        }`)}
        aria-label="navigation menu button"
        aria-haspopup="listbox"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMenu}
      >
        <div id="nav-icon" className={isOpen ? " nav-open" : ""}>
          <span className="bg-black dark:bg-white"></span>
          <span className="bg-black dark:bg-white"></span>
          <span className="bg-black dark:bg-white"></span>
        </div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1, transition: { type: "tween" } }}
            exit={{ opacity: 0, scale: 0.75 }}
            className="absolute right-2 top-16 z-50 flex w-[calc(100vw-16px)] 
            origin-top-right flex-col gap-1 overflow-hidden rounded-xl
            bg-gray-100 text-lg font-bold shadow-xl
            dark:bg-gray-800 "
          >
            {menuItems.map((el, index) => {
              return (
                <Link
                  key={index}
                  href={el.href}
                  passHref
                  onClick={toggleMenu}
                  className={cn(`
                  block w-full bg-transparent px-6 py-3 text-right text-xl text-gray-900 
                  hover:bg-slate-400 hover:bg-opacity-40 dark:text-slate-100
                `)}
                >
                  {el.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
