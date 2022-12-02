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
import { useRouter } from "next/router";
import { getCompanyDataAdmin } from "api/companydata";
import { Authaccount } from "api/authRequire";

import LoadingPage from "components/PageChange/LoadingPage";

const ApplicationsStudent = (color = "dark") => {
  const router = useRouter();
  const [application, setApplication] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [remove, setRemove] = useState(false);

  const [accept, setAccept] = useState(false);
  const [addId, setAddId] = useState();
  const [jobId, setJObId] = useState("");

  const [companyData, setCompanyData] = useState();
  const [jobData, setJobData] = useState();
  const [refresh, setRefresh] = useState(true);

  const [load, setLoad] = useState(false);

  const applications = async (id) => {
    let data = await api
      .get("/student/submitted/applications", {
        headers: {
          studentId: id,
        },
      })
      .then(({ data }) => data, setLoad(true));
    console.log(data);
    setApplication(data);
    if (data.length !== 0) {
      setStudentId(data[0].studentId);
      setCompanyId(data[0].companyId);
      setJObId(data[0].jobId);
    } else {
      setApplication();
    }

    // getJob(jobId)
  };
  const removeApplication = async (id) => {
    let data = await api
      .delete("/student/job-application/remove", {
        headers: {
          applicationId: id,
        },
      })
      .then(({ data }) => data);
      console.log(data)
    if (data.message === "Application Deleted") {
      
      setRefresh(false);
    }
  };

  // const getCom = async () => {
  //   console.log("ajshdagsda", companyId);
  //   let data = await api.get(`/company/${companyId}`).then(({ data }) => data);
  //   setCompanyData(data);
  //   console.log(companyData);
  // };

  // const getJob = async (id) => {
  //   console.log("ajshdagsda", id);
  //   let data = await api
  //     .get(`/company/job/add`, {
  //       headers: {
  //         jobAddId: id,
  //       },
  //     })
  //     .then(({ data }) => data);
  //     setJobData(data);
  //   console.log(jobData);
  // };

  useEffect(async () => {
    const daatType = Authaccount();

    if (daatType !== "student") {
      router.push(`/${daatType}/dashboard`);
    }

    const data = await getData();
    console.log(data);
    applications(data._id);
  }, [refresh]);

  return (
    <>
      {load ? (
        <>
          {application &&
            application.map((data) => {
              return (
                <div className="w-full mb-12 px-4">
                  {remove && addId === data._id && (
                    <div className="text-white  alert-tag  px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
                      <span className="text-xl inline-block mr-5 align-middle">
                        <i className="fas fa-bell"></i>
                      </span>
                      <span className="inline-block  align-middle mr-8">
                        <b className="capitalize ">Warning</b> Are You Sure to
                        delete this Application ?
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          removeApplication(data._id),
                            setRemove(false),
                            setRefresh(true);
                        }}
                        className=" remove-tag  bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                      >
                        Delete
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
                  <>
                    {remove === false && (
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
                                {/* <th
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
                              </th> */}
                                <th
                                  className={
                                    "px-6 align-middle  border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                  }
                                >
                                  Applied Job Vacancy
                                </th>
                                <th
                                  className={
                                    "px-6 align-middle  text-center  border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                  }
                                >
                                  Status
                                </th>
                                <th
                                  className={
                                    "px-6 align-middle text-center  border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                  }
                                >
                                  remove
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                {/* <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
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
                              </td> */}
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <a
                                    className="text-lg font-bold text-white"
                                    target={"_blank"}
                                    href={"/adds/" + data.jobId}
                                  >
                                    View Job Post
                                  </a>
                                </td>

                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  <div className="flex items-center">
                                    {console.log("alsjkjgasd", data.jobStatus)}
                                    {!data.jobStatus && (
                                      <>
                                        <span
                                          style={
                                            {
                                              // background: "yellow",
                                              // // color: "black",
                                            }
                                          }
                                          className="text-lg  font-bold uppercase text-red-500 "
                                        >
                                          pending
                                        </span>
                                      </>
                                    )}
                                    {data.jobStatus === "accept" && (
                                      <>
                                        <span className="text-lg  font-bold uppercase  text-emerald-500 ">
                                          Accepted
                                        </span>
                                      </>
                                    )}
                                    {data.jobStatus === "reject" && (
                                      <>
                                        <span className="text-lg  font-bold uppercase  text-red-500  ">
                                          Rejected
                                        </span>
                                      </>
                                    )}

                                    {data.jobStatus === "complete" && (
                                      <>
                                        <div>
                                          <span className="text-emerald-500  font-bold uppercase text-lg">
                                            Congratulations! You have completed
                                            this job
                                          </span>
                                        </div>
                                        <div>
                                          {console.log(studentId)}
                                          <Link
                                            href={`/student/${studentId}/${companyId}/${data.jobId}/${data._id}/review`}
                                          >
                                            <button
                                              className="text-white-500   font-bold uppercase border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4"
                                              type="button"
                                            >
                                              Review your job now! Click Here!
                                            </button>
                                          </Link>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-right">
                                  <button
                                    type="submit"
                                    onClick={() => {
                                      setRemove(true), setAccept(true);
                                      setAddId(data._id);
                                    }}
                                    className="text-lg text-orange-500"
                                  >
                                    Delete Application
                                  </button>{" "}
                                  {/* <TableDropdown /> */}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </>
                </div>
              );
            })}

          {!application && (
            <>
              <div className="w-full  px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-orange-500 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-dark text-lg font-bold">
                        You Have not yet applied for any advertisements!
                      </h6>
                    </div>
                    <div className="btn-wrapper text-center">{/* {url} */}</div>
                    <div className="text-center">Apply Now !</div>
                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                    <Link href={`/adds`}>
                      <button type="submit">View Job ads</button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <LoadingPage />{" "}
        </>
      )}
    </>
  );
};

export default ApplicationsStudent;

ApplicationsStudent.layout = Student;
