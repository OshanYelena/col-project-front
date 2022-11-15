import React from "react";
import Link from "next/link";

// layout for page

import Auth from "layouts/Auth.js";

export default function Register() {
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign up
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <Link href={"/auth/register/student"}>
                    <button
                      className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                      type="button"
                    >
                    <i class="fas fa-solid fa-graduation-cap"></i>
                      Student
                    </button>
                  </Link>
                  <Link href={"/auth/register/company"}>
                    <button
                      className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                      type="button"
                    >
<i class="fas fa-thin fa-building"></i>
                      Company
                    </button>
                  </Link>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Register.layout = Auth;
