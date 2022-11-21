import React, { useState, useEffect } from "react";

// components

import CardStats from "components/Cards/CardStats.js";

import { Authaccount } from "api/authRequire";

export default function HeaderStats() {
  const [type, setType] = useState("");

  useEffect(() => {
    setType(Authaccount);
  });

  return (
    <>
      {/* Header */}
      <div className="relative bg-orange-500 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            <div className="flex flex-wrap">
              <div className="w-full  px-4">
                {type === "company" && (
                  <CardStats
                    statSubtitle="Company Dashboard"
                    statTitle="Manage your ads and Applications"
                  />
                )}
                {type === "student" && (
                  <CardStats
                    statSubtitle="Student Dashboard"
                    statTitle="Grab Your Job Opportunutie"
                  />
                )}
                {type === "Admin" && (
                  <CardStats
                    statSubtitle="Admin Dashboard"
                    statTitle="Controll the system"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
