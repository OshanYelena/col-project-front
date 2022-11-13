import React, { useState } from "react";
import Link from "next/link";


import Auth from "layouts/Auth.js";


const Student = () => {

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="text-center text-lg rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-lg text-sm font-bold">
                    Wait for the Confirmation
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                 {/* logo and icon */}
                </div>
                <div>Your registration will be completed soon after the verification of the details. Thank you for joining us!</div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <Link href={'/'}>
                  <button type="submit">
                    Back to DashBoard
                  </button>
                </Link>
              </div>
          
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Student;

Student.layout = Auth;
