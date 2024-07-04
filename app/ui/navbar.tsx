// @flow strict
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useScrollPosition } from "@/app/lib/hooks/useScrollPosition";
import clsx from "clsx";
import { FaTimes, FaBars } from "react-icons/fa";
import { personalData } from "@/app/lib/data/personal";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const scrollPosition = useScrollPosition();

  const links = [
    { id: 1, link: "/#about", text: "ABOUT" },
    { id: 2, link: "/#experience", text: "EXPERIENCE" },
    { id: 3, link: "/#skills", text: "SKILLS" },
    { id: 4, link: "/#education", text: "EDUCATION" },
    { id: 5, link: "/blog", text: "BLOGS" },
    { id: 6, link: "/#projects", text: "PROJECTS" },
  ];

  // Function to hide nav on resize
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      // Assuming 768px is your md breakpoint
      setIsDrawerOpen(false);
    }
  };

  // Set up event listener for window resize
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      className={clsx(
        "sticky top-0 z-[100]",
        scrollPosition === 0 ? "bg-transparent" : "bg-[#0d1224]"
      )}
    >
      <div className="flex items-center justify-between py-5">
        <div className="flex flex-shrink-0 items-center">
          <Link href="/" className="text-[#16f2b3] text-3xl font-bold">
            {personalData.nickName}
          </Link>
        </div>

        <ul className="hidden md:flex mt-4 flex h-screen max-h-0 w-full flex-col items-start text-sm opacity-0 md:mt-0 md:h-auto md:max-h-screen md:w-auto md:flex-row md:space-x-1 md:border-0 md:opacity-100">
          {links.map(({ id, link, text }) => (
            <li key={`link_${id}`}>
              <Link
                className="block px-4 py-2 no-underline outline-none hover:no-underline"
                href={link}
              >
                <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                  {text}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="cursor-pointer pr-1 z-10 text-[#16f2b3] md:hidden"
        >
          {isDrawerOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>
        {isDrawerOpen && (
          <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-[#0d1224]">
            {links.map(({ id, link, text }) => (
              <li
                key={`mobile_link_${id}`}
                className="px-4 cursor-pointer capitalize py-6 text-4xl"
              >
                <Link
                  className="block no-underline outline-none hover:no-underline"
                  href={link}
                  onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                >
                  <div className="text-4xl text-white transition-colors duration-300 hover:text-pink-600">
                    {text}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div
        className={clsx(
          "flex justify-center z-[100]",
          scrollPosition === 0 || isDrawerOpen ? "hidden" : ""
        )}
      >
        <div className="absolute top-75 h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent"></div>
      </div>
    </nav>
  );
}
