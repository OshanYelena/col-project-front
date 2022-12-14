import React from "react";

// components

import Company from "components/Sidebar/Company.js";
import CompanyAdmin from "components/Navbars/CompanyAdmin.js";
import HeaderStats from "components/Headers/HeaderStats.js";


export default function Admin({ children }) {
  return (
    <>
      <Company />
      <div className="relative md:ml-64 bg-blueGray-100">
        <CompanyAdmin />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
        </div>
      </div>
    </>
  );
}
