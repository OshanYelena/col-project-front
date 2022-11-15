import React, {useState} from "react";
import { createPopper } from "@popperjs/core";
import { useRouter } from "next/router.js";

import api from '../../api/contact'

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
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
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src="/img/144989837-global-admin-icon-outline-global-admin-vector-icon-for-web-design-isolated-on-white-background.webp"
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
            "text-lg py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
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

export default UserDropdown;
