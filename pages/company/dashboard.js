import React, { useEffect } from "react";

// components

import { useRouter } from "next/router";
import { Authaccount } from "api/authRequire";

// layout for page

import Adds from "pages/adds";

import Company from "layouts/Company.js";

export default function CompanyDashboard() {
  const router = useRouter();

  useEffect(() => {
    const data = Authaccount();

    if (data !== "company") {
      router.push(`/${data}/dashboard`);
    }
  }, []);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full mb-12 xl:mb-0 px-4">
          <Adds deleteAdd={true} />
        </div>
      </div>
    </>
  );
}

CompanyDashboard.layout = Company;
