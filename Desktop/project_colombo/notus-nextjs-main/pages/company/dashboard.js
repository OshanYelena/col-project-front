import React, {useState} from "react";

// components

// layout for page

import ads from "pages/adds";

import Company from "layouts/Company.js";

export default function CompanyDashboard() {




  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full mb-12 xl:mb-0 px-4">
    <ads deleteAdd={true} />
        </div>

      </div>
    </>
  );
}

CompanyDashboard.layout = Company;
