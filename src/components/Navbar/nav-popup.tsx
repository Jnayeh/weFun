import { Menu, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Fragment } from "react";

export default function NavPopup() {
  const { data: session } = useSession();
  return (
    <div className="md:hidden z-50 text-right scale-90">
      <Menu as="div" className="text-left">
        {({ open }) => (
          <>
            <Menu.Button
              className={` border-4 border-black dark:border-transparent p-[6px] h-10 w-10 transition-colors right-2 rounded-full  ${open
                ? "bg-white dark:bg-gray-200 border-white"
                : "bg-white  dark:bg-gray-700"}`
              }
              aria-label="navigation menu button"
              aria-haspopup="listbox"
            >
              <div id="nav-icon" className={open ? " nav-open" : ""}>
                <span className="bg-black dark:bg-white"></span>
                <span className="bg-black dark:bg-white"></span>
                <span className="bg-black dark:bg-white"></span>
              </div>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className=" z-50 absolute right-1 top-14 w-[90vw] origin-top-right flex flex-col gap-1 divide-y divide-gray-100 rounded-md bg-white p-1 text-lg font-bold shadow-lg ring-1  ring-black ring-opacity-5 focus:outline-none">
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
                      className={`${
                        active ? "bg-gray-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 `}
                      href="/categories"
                    >
                      Categories
                    </Link>
                  )}
                </Menu.Item>
                {session ? (
                  <Menu.Item>
                    <button className="rounded-md bg-slate-500 px-4 py-1 w-full text-slate-100" onClick={() => void signOut()}>
                      Sign out
                    </button>
                  </Menu.Item>
                ) : (
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={`${
                          active ? "bg-gray-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 `}
                        href="/auth/signin"
                      >
                        Log in
                      </Link>
                    )}
                  </Menu.Item>
                )}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
}
