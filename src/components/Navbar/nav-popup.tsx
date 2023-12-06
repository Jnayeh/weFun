import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";

export default function NavPopup() {
  return (
    <div className="z-50 scale-90 text-right md:hidden">
      <Menu as="div" className="text-left">
        {({ open }) => (
          <>
            <Menu.Button
              className={cn(` right-2 h-10 w-10 rounded-full border-4 border-black p-[6px] transition-colors dark:border-transparent bg-white bg-opacity-20 dark:bg-opacity-50 ${
                open
                  ? "  dark:bg-gray-200 border-transparent"
                  : " dark:bg-gray-700 dark:border-white"
              }`)}
              aria-label="navigation menu button"
              aria-haspopup="listbox"
            >
              <div id="nav-icon" className={open ? " nav-open" : " [&>*]:hover:bg-red-500"}>
                <span className="bg-black dark:bg-white"></span>
                <span className="bg-black dark:bg-white"></span>
                <span className="bg-black dark:bg-white"></span>
              </div>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-75"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-75"
            >
              <Menu.Items className=" absolute right-1 top-14 z-50 flex w-[90vw] origin-top-right flex-col gap-1 divide-y divide-gray-100 rounded-md bg-white p-1 text-lg font-bold shadow-lg ring-1  ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className={`${
                        active ? "bg-gray-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 `}
                      href="/"
                    >
                      Home
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      prefetch={true}
                      className={`${
                        active ? "bg-gray-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 `}
                      href="/activities"
                    >
                      Activities
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className={`${
                        active ? "bg-gray-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 `}
                      href="/regions"
                    >
                      Regions
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      prefetch
                      className={`${
                        active ? "bg-gray-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 `}
                      href="/categories"
                    >
                      Categories
                    </Link>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
}
