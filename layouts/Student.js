import React from "react";

// components

import CompanyAdmin from "components/Navbars/CompanyAdmin.js";
import Student from "components/Sidebar/Student.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

export default function Admin({ children }) {
  return (
    <>
      <Student />
      <div className="relative md:ml-64 bg-blueGray-100">
        <CompanyAdmin />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          {/* <FooterAdmin /> */}
        </div>
      </div>
    </>
  );
}
