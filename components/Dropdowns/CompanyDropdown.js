import React, { useState, useEffect } from "react";
import { createPopper } from "@popperjs/core";
import { useRouter } from "next/router.js";

import api from "../../api/contact";

import { getData } from "api/companydata";

const CompanyDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const [url, setUrl] = useState();
  const router = useRouter();
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  useEffect(async () => {
    const data = await getData();
    setUrl(data.urls);
    console.log(data.urls)
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
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              src={`${url}`}
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="/admin/dashboard"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Dashboard
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={logOut}
        >
          Logout
        </a>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
      </div>
    </>
  );
};

export default CompanyDropdown;
