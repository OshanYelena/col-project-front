import React, { useState, useEffect } from "react";
// import { Link } from "next/router";
import api from "../../../api/contact";

// components

import Admin from "layouts/Admin.js";
import LoadingPage from "components/PageChange/LoadingPage";

export default function studentManager() {
  const [company, setCompany] = useState([]);
  const [accpeted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);

  const getStudents = async () => {
    let data = await api.get("/student/registerd/all").then(({ data }) => {
      setCompany(data.pending);
      setAccepted(data.accepted);
      setRejected(data.rejected);
    });

    console.log(company);
  };

  useEffect(async () => {
    getStudents();
    // const data = await getCompanyDataAdmin();
    // console.log(data);
  }, []);

  return (
    <>
      {company ? (
        <>
          {" "}
          <div className="relative flex flex-col min-w-0 break-words bg-black w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-lg text-base text-lightBlue-500">
                    Stuent Registrations
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    See all
                  </button>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              {/* Projects table */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 px-6 bg-blueGray-700 text-white align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Student Name
                    </th>
                    <th className="px-6 px-6 bg-blueGray-700 text-white align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Email
                    </th>
                    <th className="px-6 px-6 bg-blueGray-700 text-white align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Student Profile
                    </th>
                    <th className="px-6 px-6 bg-blueGray-700 text-white align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Student State
                    </th>
                  </tr>
                </thead>
                {company && (
                  <tbody>
                    {company.map((data) => {
                      {
                        console.log(data);
                      }
                      return (
                        <tr key={data._id} className="text-blueGray-300">
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                            {data.studentDetails.name}
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {data.studentDetails.email}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <a href={"/admin/student-profile/" + data._id}>
                              {" "}
                              <button className="font-semibold ">
                                View Student
                              </button>{" "}
                            </a>
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {/* <i className="fas fa-arrow-up text-emerald-500 mr-4"></i> */}
                            <i className="fas fa-circle-notch animate-spin text-red-500 mx-auto text-lg"></i>
                            <p> pending</p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>
            </div>
          </div>
          <div className="relative flex flex-col min-w-0 break-words bg-black w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-lg text-lightBlue-500">
                    Accepted Student Registrations
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    See all
                  </button>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              {/* Projects table */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-700 text-white align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Student Name
                    </th>
                    <th className="px-6 bg-blueGray-700 text-white align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Email
                    </th>
                    <th className="px-6 bg-blueGray-700 text-white align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Student Profile
                    </th>
                    <th className="px-6 bg-blueGray-700 text-white align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Student State
                    </th>
                  </tr>
                </thead>
                {accpeted && (
                  <tbody>
                    {accpeted.map((data) => {
                      {
                        console.log(data);
                      }
                      return (
                        <tr key={data._id} className="text-blueGray-300">
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                            {data.studentDetails.name}
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {data.studentDetails.email}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <a href={"/admin/company-profile/" + data._id}>
                              {" "}
                              <button className="font-semibold ">
                                View Student
                              </button>{" "}
                            </a>
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {/* <i className="fas fa-arrow-up text-emerald-500 mr-4"></i> */}
                            <i class="fas fa-solid fa-check text-emerald-500  mr-4"></i>{" "}
                            Accepted
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>
            </div>
          </div>
          <div className="relative flex flex-col min-w-0 break-words bg-black w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-lg text-lightBlue-500">
                    Rejected Student Registrations
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    See all
                  </button>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              {/* Projects table */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-700 text-white align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Student Name
                    </th>
                    <th className="px-6 bg-blueGray-700 text-white align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Email
                    </th>
                    <th className="px-6 bg-blueGray-700 text-white align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Student Profile
                    </th>
                    <th className="px-6 bg-blueGray-700 text-white align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Student State
                    </th>
                  </tr>
                </thead>
                {rejected && (
                  <tbody>
                    {rejected.map((data) => {
                      return (
                        <tr key={data._id} className="text-blueGray-300">
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                            {data.studentDetails.name}
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {data.studentDetails.email}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <a href={"/admin/student-profile/" + data._id}>
                              {" "}
                              <button className="font-semibold ">
                                View Student
                              </button>{" "}
                            </a>
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {/* <i className="fas fa-arrow-up text-emerald-500 mr-4"></i> */}
                            <i class="fas fa-duotone fa-spinner text-red-500 ">
                              {" "}
                            </i>
                            Rejected
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          <LoadingPage />{" "}
        </>
      )}
    </>
  );
}

studentManager.layout = Admin;
