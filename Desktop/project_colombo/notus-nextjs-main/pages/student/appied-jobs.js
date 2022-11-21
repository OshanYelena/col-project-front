import React, { useState, useEffect } from "react";

import Student from "layouts/Student.js";
import Link from "next/link";
// import ads from "pages/ads";
// import CardAdd from "components/Cards/CardAdd.js";
import CardTable from "components/Cards/CardTable.js";

import PropTypes from "prop-types";

import api from "../../api/contact";
import { getData } from "api/companydata";

// components

import TableDropdown from "components/Dropdowns/TableDropdown.js";

const ApplicationsStudent = (color = "dark") => {
  const [application, setApplication] = useState([]);

  const applications = async (id) => {
    let data = await api
      .get("/student/submitted/applications", {
        headers: {
          "studentId": id,
        },
      })
      .then(({ data }) => data);
    setApplication(data);
    console.log(data);
  };

  useEffect(async () => {
    const data = await getData();
    console.log(data)

    applications(data._id);
    // setComapnyId(data._id);
  }, []);

  return (
    <>
      {application &&
        application.map((data) => {
          return (
            <div className="w-full mb-12 px-4">
              <>
                <div
                  className={
                    "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                    (color === "dark"
                      ? "bg-white"
                      : "bg-blueGray-700 text-white")
                  }
                >
                  <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                      <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                        <h3
                          className={
                            "font-semibold text-lg " +
                            (color === "light"
                              ? "text-blueGray-700"
                              : "text-white")
                          }
                        >
                        Applications
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                      <thead>
                        <tr>
                          <th
                            className={
                              "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                              (color === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                            }
                          >
                            Student Name
                          </th>
                          <th
                            className={
                              "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                              (color === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                            }
                          >
                            University
                          </th>
                          <th
                            className={
                              "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                              (color === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                            }
                          >
                            Faculty
                          </th>
                          <th
                            className={
                              "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                              (color === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                            }
                          >
                            Applied Job Vacancy
                          </th>
                          <th
                            className={
                              "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                              (color === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                            }
                          >
                            Status
                          </th>
                          <th
                            className={
                              "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                              (color === "light"
                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                            }
                          >
                            CV{" "}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                            <img
                              src="/img/bootstrap.jpg"
                              className="h-12 w-12 bg-white rounded-full border"
                              alt="..."
                            ></img>{" "}
                            <span
                              className={
                                "ml-3 font-bold " +
                                +(color === "light"
                                  ? "text-blueGray-600"
                                  : "text-white")
                              }
                            >
                              {data.studentDetails.name}
                            </span>
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {data.studentDetails.university}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {/* <i className="fas fa-circle text-orange-500 mr-2"></i>{" "} */}
                            {data.studentDetails.faculty}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <a className="job-tag" target={"_blank"} href={"/ads/" + data.jobId}>
                              View Job Post
                            </a>
                          </td>

                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div className="flex items-center">
                              <span className="mr-2">60%</span>
                              <div className="relative w-full">
                                <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                                  <div
                                    style={{ width: "60%" }}
                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                            <a href={data.cvUrl} target="_blank">
                              <button className="cv-button">View CV</button>{" "}
                            </a>
                            {/* <TableDropdown /> */}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            </div>
          );
        })}
    </>
  );
};

export default ApplicationsStudent;

ApplicationsStudent.layout = Student;
