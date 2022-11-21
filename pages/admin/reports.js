import React, { useState, useEffect } from "react";
// import { Link } from "next/router";
import api from "../../api/contact";
import Link from "next/link";

import {useRouter} from "next/router";
import { Authaccount } from "api/authRequire";

import Admin from "layouts/Admin.js";
import LoadingPage from "components/PageChange/LoadingPage";
// components

export default function Report() {
  const router = useRouter();

  const [reports, setReports] = useState([]);

  const getCompanies = async () => {
    let data = await api.get("/companies").then(({ data }) => {});
  };

  const getReports = async () => {
    let data = await api.get("/company/report/student").then(({ data }) => {
      setReports(data);
    });

    console.log(reports);
  };

  useEffect(async () => {
    const data = Authaccount();

    if (data !== "admin") {
      router.push(`/${data}/dashboard`);
    }
    getCompanies();
    getReports();
    // const data = await getCompanyDataAdmin();
    // console.log(data);
  }, []);

  return (
    <>
      {reports ? (
        <>
          {" "}
          <div className="relative flex flex-col min-w-0 break-words bg-black w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-lg text-orange-500">
                    Student Report Forum
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                    Refresh
                  </button>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 text-center bg-blueGray-700 text-white align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Company
                    </th>
                    <th className="px-6 text-center bg-blueGray-700 text-white align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Student
                    </th>
                    <th className="px-6 text-center bg-blueGray-700 text-white align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Job Add
                    </th>
                    <th className="px-6 text-center bg-blueGray-700 text-white align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Report Message
                    </th>
                  </tr>
                </thead>
                {reports && (
                  <tbody>
                    {reports.map((data) => {
                      return (
                        <>
                          <tr className="" key={data._id}>
                            <th className="border-t-0 px-6  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                              <Link
                                href={
                                  "/admin/company-profile/" + data.companyId
                                }
                              >
                                <button
                                  style={{ width: "100%" }}
                                  className="text-lightBlue-400 text-lg border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                  type="button"
                                >
                                  View Company
                                </button>
                              </Link>
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              <Link
                                href={
                                  "/admin/student-profile/" + data.studentId
                                }
                              >
                                <button
                                  style={{ width: "100%" }}
                                  className="text-blueGray-400  text-lg border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                  type="button"
                                >
                                  View Student Id
                                </button>
                              </Link>
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              <Link href={"/admin/ads/" + data.jobId}>
                                <button
                                  style={{ width: "100%" }}
                                  className="text-blueGray-400 text-lg border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                  type="button"
                                >
                                  View Job Add
                                </button>
                              </Link>
                            </td>
                            <td className="border-t-0 text-red-500 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4">
                              {" "}
                              {data.message}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </>
      ) : (
        <> <LoadingPage/> </>
      )}
    </>
  );
}

Report.layout = Admin;
