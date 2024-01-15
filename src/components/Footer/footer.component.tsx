import Link from "next/link";

import { FaAppStore } from "@react-icons/all-files/fa/FaAppStore";
import { FaFacebookF } from "@react-icons/all-files/fa/FaFacebookF";
import { FaGooglePlay } from "@react-icons/all-files/fa/FaGooglePlay";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";

export default function Footer() {
  const link_list = [
    {
      title: "Company",
      links: [
        {
          href: "#",
          link: "About",
        },
        {
          href: "#",
          link: "This is a log",
        },
        {
          href: "#",
          link: "This is a log",
        },
      ],
    },
    {
      title: "Company",
      links: [
        {
          href: "#",
          link: "This is a log",
        },
        {
          href: "#",
          link: "About",
        },
        {
          href: "#",
          link: "This is a log",
        },
      ],
    },
    {
      title: "Company",
      links: [
        {
          href: "#",
          link: "This is a log",
        },
        {
          href: "#",
          link: "This is a log",
        },
        {
          href: "#",
          link: "About",
        },
      ],
    },
  ];
  return (
    <footer className=" m-2 rounded-xl dark:bg-gray-900">
      <div className="flex flex-col justify-center sm:items-center xl:flex-row xl:items-start">
        <section className="hidden w-full max-w-[1000px] flex-col items-start justify-between sm:flex-row sm:justify-evenly md:flex lg:mx-auto xl:mx-2">
          {link_list.map((item, index) => {
            return (
              <div key={index} className="p-4 sm:px-2 lg:p-4">
                <h3 className="mb-1 text-2xl font-bold text-red-700">
                  {item.title}
                </h3>
                <ul className="ml-3 mr-2 text-xl font-bold  text-gray-500 dark:text-white lg:ml-5 lg:mr-5">
                  {item.links.map((link_item, link_index) => {
                    return (
                      <li key={link_index}>
                        <Link
                          href={link_item.href}
                          className="dark:hover:text-gray-400"
                        >
                          {link_item.link}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </section>
        <section className="items-items-start flex w-full flex-col-reverse justify-start px-3 pt-4 text-xl sm:flex-row lg:w-fit xl:flex-col ">
          <div className="min-h-100 flex flex-row items-center justify-center gap-2 p-3 sm:flex-col sm:justify-start xl:flex-row">
            <Link
              href="#"
              className="ml-2 rounded-full border-solid p-2 text-center text-black shadow transition-colors duration-100
              hover:cursor-pointer hover:bg-white hover:text-blue-500 hover:shadow-lg focus:bg-black focus:text-white 
              dark:text-white dark:hover:text-blue-500"
              aria-label="Facebook page"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="#"
              className="ml-2 rounded-full border-solid p-2 text-center text-black shadow transition-colors duration-100
              hover:cursor-pointer hover:bg-white hover:text-pink-500 hover:shadow-lg  focus:bg-black focus:text-white 
              dark:text-white dark:hover:text-pink-500"
              aria-label="Instagram page"
            >
              <FaInstagram />
            </Link>

            <Link
              href="#"
              className="ml-2 rounded-full border-solid p-2 text-center text-black shadow transition-colors duration-100
              hover:cursor-pointer hover:bg-white hover:text-blue-400 hover:shadow-lg  focus:bg-black focus:text-white 
              dark:text-white dark:hover:text-blue-400"
              aria-label="Twitter page"
            >
              <FaTwitter />
            </Link>
          </div>

          <div className="w-full sm:w-max">
            <p className=" p-3 text-2xl font-bold text-gray-500 dark:text-white sm:text-3xl">
              Discover our app
            </p>

            <div className="flex flex-col justify-between self-center p-3 font-bold sm:flex-row">
              <Link
                href="#"
                className="hover:duration:0 my-1 flex w-full flex-nowrap items-center justify-center justify-items-center rounded-[5rem]
                bg-black px-4 py-3 text-white transition-colors duration-500 hover:cursor-pointer hover:bg-slate-200 hover:text-black
                focus:cursor-pointer focus:bg-slate-50 focus:text-black dark:bg-gray-600 dark:hover:bg-slate-50 sm:mr-3"
              >
                <FaGooglePlay />
                <span className="ml-1 inline-block whitespace-nowrap text-center text-sm sm:text-[0.77rem]">
                  Download on Play Store
                </span>
              </Link>
              <Link
                href="#"
                className="hover:duration:0 my-1 flex w-full flex-nowrap items-center justify-center justify-items-center rounded-[5rem]
                bg-black px-4 py-3 text-white transition-colors duration-500 hover:cursor-pointer hover:bg-slate-200 hover:text-black
                focus:cursor-pointer focus:bg-slate-50 focus:text-black dark:bg-gray-600 dark:hover:bg-slate-50"
              >
                <FaAppStore />
                <span className="ml-1 inline-block whitespace-nowrap text-center text-sm sm:text-[0.77rem]">
                  Download on App Store
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <p className="mt-2 p-2 text-center font-bold text-gray-600 dark:text-gray-100">
        All rights reseverved &copy; WeFun
      </p>
    </footer>
  );
}
