import React, { useState, useEffect } from "react";

import Company from "layouts/Company.js";
import Link from "next/link";
// import Adds from "pages/adds";
// import CardAdd from "components/Cards/CardAdd.js";
import CardTable from "components/Cards/CardTable.js";

import PropTypes from "prop-types";

import api from "../../../api/contact";
import { getData } from "api/companydata";

// components

import TableDropdown from "components/Dropdowns/TableDropdown.js";

const Applications = (color = "dark") => {
  const [application, setApplication] = useState([]);
  const [remove, setRemove] = useState(false);
  const [addId, setAddId] = useState();
  const [accept, setAccept] = useState(false);
  const [btnColor, setColor] = useState("");
  const [refresh, setRefresh] = useState(false)

  const applications = async (comId) => {
    let data = await api
      .get("/student/applications", {
        headers: {
          companyId: comId,
        },
      })
      .then(({ data }) => data);
    setApplication(data);
    console.log(data);
  };

  const statusManager = async (id, appliStatus) => {
    // if (appliStatus === "accept") {
    //   setColor("green");
    // } else {
    //   setColor("red");
    // }
    let data = await api
      .post("/student/application/status", { id, appliStatus })
      .then(({ data }) => data);
  
     console.log(data);
  };

  useEffect(async () => {
    const data = await getData();
    // console.log(data._id)
    applications(data._id);
    // setComapnyId(data._id);
  }, [application]);

  return (
    <>
      {application &&
        application.map((data) => {
          return (
            <div key={data._id} className="w-full mb-12 px-4">
              {remove && addId === data._id && accept === false && (
                <div className="text-white  alert-tag  px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
                  <span className="text-xl inline-block mr-5 align-middle">
                    <i className="fas fa-bell"></i>
                  </span>
                  <span className="inline-block  align-middle mr-8">
                    <b className="capitalize ">Warning</b> Are You Sure to
                    Reject this Application ?
                  </span>
                  <button
                  type="button"
                    onClick={statusManager(data._id, "reject")}
                    className=" remove-tag  bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                  >
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => {
                      setAccept(false), setRemove(false);
                    }}
                    className=" exit-tag  bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                  >
                    <span>Close</span>
                  </button>
                </div>
              )}
              {remove && addId === data._id && accept && (
                <div
                  style={{ fontSize: "18px" }}
                  className="text-white alert-tag  px-6 py-4 border-0 rounded relative mb-4 bg-emerald-500"
                >
                  <span className=" inline-block mr-5 align-middle">
                    <i className="fas fa-bell"></i>
                  </span>
                  <span className="inline-block align-middle mr-8">
                    <b className="capitalize">Warning</b> Are You Sure to Accept
                    this Application ?
                  </span>
                  <button
                    onClick={statusManager(data._id, "accept")}
                    className=" remove-tag  bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                  >
                    <span>Accept</span>
                  </button>
                  <button
                    onClick={() => {
                      setAccept(false), setRemove(false);
                    }}
                    className=" exit-tag  bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                  >
                    <span>Close</span>
                  </button>
                </div>
              )}
              {remove === false && (
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
                                "px-6 align-middle text-center border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
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
                              <a
                                className="job-tag"
                                target={"_blank"}
                                href={"/adds/" + data.jobId}
                              >
                                View Job Post
                              </a>
                            </td>

                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              <div className="flex items-center">
                                {!data.jobStatus ? (
                                  <>
                                    <button
                                      style={{ width: "50%" }}
                                      className="bg-red-500 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                      type="button"
                                      onClick={() => {
                                        setRemove(true), setAddId(data._id);
                                      }}
                                    >
                                      Reject Application
                                    </button>

                                    <button
                                      style={{ width: "50%" }}
                                      className="bg-emerald-500 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                      type="button"
                                      onClick={() => {
                                        setRemove(true),
                                          setAddId(data._id),
                                          setAccept(true);
                                      }}
                                    >
                                      Accept Application
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    style={{ width: "100%", backgroundColor: btnColor }}
                                    className="bg-red-500 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                    type="button"
                                    disabled
                                  >
                                    {data.jobStatus}
                                  </button>
                                )}

                                <div className="relative w-full"></div>
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
              )}
            </div>
          );
        })}
    </>
  );
};

export default Applications;

Applications.layout = Company;
