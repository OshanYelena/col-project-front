import React from "react";

// components

// layout for page

import Student from "layouts/Student.js";
import ads from "pages/adds";

export default function StudentDashboard() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full mb-12 xl:mb-0 px-4">
        <ads />
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
