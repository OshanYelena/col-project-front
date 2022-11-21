import React from "react";
import Link from "next/link";
// components

import IndexDropdown from "components/Dropdowns/IndexDropdown.js";
import { black } from "tailwindcss/colors";

export default function Navbar(props = "black")  {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a
                className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                href="#pablo"
              >
               Parttimer
              </a>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            {/* <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <a
                  className="hover:text-blueGray-500 text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus?ref=nnjs-index-navbar"
                >
                  <i className="text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2" />{" "}
                  Docs
                </a>
              </li>
            </ul> */}
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                {/* <IndexDropdown /> */}
              </li>
              {/* <li className="flex items-center">
                <a
                  className="hover:text-blueGray-500 text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/ads"
                  target="_blank"
                >
                  <i className="text-blueGray-400 fab fa-twitter text-lg leading-lg " />
                    Job Vacancies
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className="hover:text-blueGray-500 text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="/"
                  target="_blank"
                >
                  <i className="text-blueGray-400 fab fa-github text-lg leading-lg " />
                  Employers
                </a>
              </li> */}
              <li className="flex items-center">
                <Link href={'/auth/register'}>
                <button
                  className="bg-orange-500 text-white active:bg-blueGray-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                >
                  <i className="fas fa-arrow-alt-circle-down"></i> Sign In
                </button>
                </Link>
              </li>

              <li className="flex items-center">
                <Link href={'/auth/login'}>
                <button
                  className="bg-orange-500 text-white active:bg-blueGray-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                >
                  <i className="fas fa-arrow-alt-circle-down"></i> Log In
                </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
