"use client";
import "~/styles/globals.css";
import {
  BarChart3,
  BikeIcon,
  CalendarRangeIcon,
  Handshake,
  Settings2,
  User2Icon,
} from "lucide-react";
import { Link, usePathname } from "~/navigation";
import "./style.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = usePathname();
  return (
      <main>
        <nav className="main-menu">
          <h1>Fitness App</h1>
          <img
            className="logo"
            src="https://github.com/ecemgo/mini-samples-great-tricks/Linkssets/13468728/4cfdcb5a-0137-4457-8be1-6e7bd1f29ebb"
            alt=""
          />
          <ul className=" grid grid-flow-row grid-cols-1 h-max">
            <li className={`nav-it ${location == "/dashboard" && "active"}`}>
              <b></b>
              <b></b>
              <Link href="/dashboard">
                <BarChart3 className="nav-icon" />
                <span className="nav-text">Overview</span>
              </Link>
            </li>

            <li
              className={`nav-it ${
                location == "/dashboard/profile" && "active"
              }`}
            >
              <b></b>
              <b></b>
              <Link href="/dashboard/profile">
                <User2Icon className="nav-icon" />
                <span className="nav-text">Profile</span>
              </Link>
            </li>

            <li
              className={`nav-it ${
                location == "/dashboard/calendar" && "active"
              }`}
            >
              <b></b>
              <b></b>
              <Link href="/dashboard/calendar">
                <CalendarRangeIcon className="nav-icon" />
                <span className="nav-text">Schedule</span>
              </Link>
            </li>

            <li
              className={`nav-it ${
                location == "/dashboard/activities" && "active"
              }`}
            >
              <b></b>
              <b></b>
              <Link href="/dashboard/activities">
                <BikeIcon className="nav-icon" />
                <span className="nav-text">Activities</span>
              </Link>
            </li>

            <li
              className={`nav-it ${location == "/dashboard/ads" && "active"} pointer-events-none`}
            >
              <b></b>
              <b></b>
              <Link
                href="/dashboard/ads"
                aria-hidden
                tabIndex={-1}
              >
                <Handshake className="nav-icon text-gray-400" />
                <span className="nav-text text-gray-400 ">Ads</span>
              </Link>
            </li>
            <li
              className={`nav-it  ${
                location == "/dashboard/settings" && "active"
              }`}
            >
              <b></b>
              <b></b>
              <Link href="/dashboard/settings">
                <Settings2 className="nav-icon" />
                <span className="nav-text">Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
        {children}
      </main>
  );
}
