import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router.js";

import api from "../../api/contact";

import IndexDropdown from "components/Dropdowns/IndexDropdown.js";
import { black } from "tailwindcss/colors";

export default function Admin() {
  const router = useRouter();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      const item = localStorage.getItem("auth-token");
      setToken(item);
    }
  }, []);

  const logOut = async (e) => {
    e.preventDefault();
    let data = await api
      .get("/auth/user/log-out", {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then(({ data }) => data);
    console.log(data);
    if (data.message === "logOut") {
      localStorage.clear();
      router.push("/auth/login");
    }
  };

  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg shadow">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href={"/"}>
            <a
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
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
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center"></li>
              <li className="flex items-center">
                <Link href={"/admin/dashboard/"}>
                  <a className="hover:text-white text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold">
                    <i className="text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2" />{" "}
                    DashBoard
                  </a>
                </Link>
              </li>
              {token ? (
                <li className="flex items-center">
                  <button
                    className="bg-blueGray-700 text-white active:bg-blueGray-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                    onClick={logOut}
                    type="button"
                  >
                    <i className="fas fa-arrow-alt-circle-down"></i> LogOut
                  </button>
                </li>
              ) : (
                <li className="flex items-center">
                  <Link href={"/auth/login"}>
                    <button
                      className="bg-blueGray-700 text-white active:bg-blueGray-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                      type="button"
                    >
                      <i className="fas fa-arrow-alt-circle-down"></i> LogIn
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
