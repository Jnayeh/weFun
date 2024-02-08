"use client"
/**
 * Dark theme toggle
 * React Element
 */

import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function ToggleButton({
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  useEffect(() => {
    let clientTheme = localStorage.getItem("theme") ?? "system";
    setTheme(clientTheme);
  }, []);
  return (
    <button {...props} onClick={toggleTheme} aria-label="dark mode toggle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="33"
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
