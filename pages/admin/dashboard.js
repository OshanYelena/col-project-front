import React, { useState } from "react";
import { useRouter } from "next/router";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

// layout for page

import Admin from "layouts/Admin.js";


import { Authaccount } from "api/authRequire";

export default function Dashboard() {
  const router = useRouter();

  React.useEffect(() => {
    // checks if the user is authenticated
    const data = Authaccount();
    if (data !== "admin") {
      router.push(`/${data}/dashboard`);
    }
  }, []);
  return (
    <>
      <>
        {" "}
        <div className="flex flex-wrap">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            {/* <CardLineChart /> */}
          </div>
          <div className="w-full xl:w-4/12 px-4">{/* <CardBarChart /> */}</div>
        </div>
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 xl:mb-0 px-4">
            <CardPageVisits />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            {/* <CardSocialTraffic /> */}
          </div>
        </div>
      </>
    </>
  );
}

Dashboard.layout = Admin;
