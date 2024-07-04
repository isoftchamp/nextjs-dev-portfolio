import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { FaStackOverflow, FaFreeCodeCamp } from "react-icons/fa";
import { BiLogoDevTo } from "react-icons/bi";
import { RiContactsFill } from "react-icons/ri";
import { MdDownload } from "react-icons/md";

import { personalData } from "@/app/lib/data/personal";

const accounts = [
  {
    href: personalData.github,
    icon: <BsGithub size={30} />,
  },
  // {
  //   href: personalData.stackOverflow,
  //   icon: <FaStackOverflow size={30} />,
  // },
  {
    href: personalData.devTo,
    icon: <BiLogoDevTo size={30} />,
  },
  {
    href: personalData.freecodecamp,
    icon: <FaFreeCodeCamp size={30} />,
  },
];

const skills = [
  "Typescript",
  "Javascript",
  "React.js",
  "Next.js",
  "Redux",
  "Express.js",
  "Node.js",
  "ASP.NET Core",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Supabase",
  "Docker",
  "AWS",
  "...",
];

const attibutes = [
  {
    key: "hardWorder",
    value: "true",
  },
  {
    key: "quickLearner",
    value: "true",
  },
  {
    key: "problemSolver",
    value: "true",
  },
];

export default async function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-between py-4 lg:py-12">
      <Image
        src="/hero.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10"
      />

      <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-12 gap-y-8">
        <div className="order-1 lg:order-1 flex flex-col items-start justify-center p-2 pb-20 md:pb-10 lg:pt-10">
          <h1 className="text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]">
            Hello, <br />
            This is <span className=" text-pink-500">{personalData.name}</span>
            {`, I'm a `}
            <span className=" text-[#16f2b3]">{personalData.designation}</span>
          </h1>

          <div className="my-12 flex items-center gap-5">
            {accounts.map((account, index) => (
              <Link
                key={index}
                href={account.href}
                target="_blank"
                className="transition-all text-pink-500 hover:scale-125 duration-300"
              >
                {account.icon}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="#contact"
              className="bg-gradient-to-r to-pink-500 from-violet-600 p-[1px] rounded-full transition-all duration-300 hover:from-pink-500 hover:to-violet-600"
            >
              <button className="px-3 text-xs md:px-8 py-3 md:py-4 bg-[#0d1224] rounded-full border-none text-center md:text-sm font-medium uppercase tracking-wider text-[#ffff] no-underline transition-all duration-200 ease-out  md:font-semibold flex items-center gap-1 hover:gap-3">
                <span>Contact me</span>
                <RiContactsFill size={16} />
              </button>
            </Link>

            <Link
              className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
              role="button"
              target="_blank"
              href={personalData.resume}
            >
              <span>Get Resume</span>
              <MdDownload size={16} />
            </Link>
          </div>
        </div>

        <div className="order-2 lg:order-2 from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37]">
          <div className="flex flex-row">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
            <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
          </div>
          <div className="px-4 lg:px-8 py-5">
            <div className="flex flex-row space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-400"></div>
              <div className="h-3 w-3 rounded-full bg-orange-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-200"></div>
            </div>
          </div>
          <div className="overflow-hidden border-t-[2px] border-indigo-900 px-4 lg:px-8 py-4 lg:py-8">
            <code className="font-mono text-xs md:text-sm lg:text-base">
              <div className="blink">
                <span className="mr-2 text-pink-500">const</span>
                <span className="mr-2 text-white">coder</span>
                <span className="mr-2 text-pink-500">=</span>
                <span className="text-gray-400">{"{"}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-white">name:</span>
                <span className="text-gray-400">{`'`}</span>
                <span className="text-amber-300">
                  {personalData.name} ({personalData.nickName})
                </span>
                <span className="text-gray-400">{`',`}</span>
              </div>
              <div className="ml-4 lg:ml-8 mr-2">
                <span className="text-white">skills:</span>
                <span className="text-gray-400">{` [`}</span>
                {skills.map((skill, index) => (
                  <React.Fragment key={index}>
                    <span className="text-gray-400">'</span>
                    <span className="text-amber-300">{skill}</span>
                    <span className="text-gray-400">
                      {index < skills.length - 1 ? "', " : "'"}
                    </span>
                  </React.Fragment>
                ))}
                <span className="text-gray-400">{"],"}</span>
              </div>
              {attibutes.map((attribute, index) => (
                <div key={index}>
                  <span className="ml-4 lg:ml-8 mr-2 text-white">
                    {attribute.key}:
                  </span>
                  <span className="text-orange-400">{attribute.value}</span>
                  <span className="text-gray-400">,</span>
                </div>
              ))}
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-green-400">
                  hireable:
                </span>
                <span className="text-orange-400">function</span>
                <span className="text-gray-400">{"() {"}</span>
              </div>
              <div>
                <span className="ml-8 lg:ml-16 mr-2 text-orange-400">
                  return
                </span>
                <span className="text-gray-400">{`(`}</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2 text-white">hardWorker</span>
                <span className="text-amber-300">&amp;&amp;</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2 text-white">problemSolver</span>
                <span className="text-amber-300">&amp;&amp;</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2 text-white">skills.length</span>
                <span className="mr-2 text-amber-300">&gt;=</span>
                <span className="text-orange-400">10</span>
              </div>
              <div>
                <span className="ml-8 lg:ml-16 mr-2 text-gray-400">{`);`}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 text-gray-400">{`};`}</span>
              </div>
              <div>
                <span className="text-gray-400">{`};`}</span>
              </div>
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}
