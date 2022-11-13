import React, {useEffect} from "react";

// components

// layout for page

import Student from "layouts/Student.js";
import Adds from "pages/adds";

import { Authaccount } from "api/authRequire";


export default function StudentDashboard() {

  useEffect(() => {
    const data = Authaccount();

    if (data !== "company") {
      router.push(`/${data}/dashboard`);
    }
  },[]);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full mb-12 xl:mb-0 px-4">
        <Adds />
        </div>
        <div className="w-full xl:w-4/12 px-4"></div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4"></div>
        <div className="w-full xl:w-4/12 px-4"></div>
      </div>
    </>
  );
}

StudentDashboard.layout = Student;
