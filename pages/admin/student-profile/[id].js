import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import api from "../../../api/contact";
// components

import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";

import { getStudentDataAdmin } from "api/companydata.js";

// layout for page

import Admin from "layouts/Admin.js";
import LoadingPage from "components/PageChange/LoadingPage";

export default function Settings() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState({});
  const [blackList, setBlackList] = useState(true);
  const [state, setState] = useState();
  const [url, setUrl] = useState();
  const [gender, setGender] = useState();
  const [report, setReport] = useState(0);

  const getReports = async () => {
    let data = await api.get(`/student/job/report/${id}`).then(({ data }) => {
      setReport(data.length);
    });
  };

  useEffect(async () => {
    getReports();
    const dataLoad = await getStudentDataAdmin(id);

    setBlackList(dataLoad.blackList);
    console.log(blackList);
    setUrl(dataLoad.urls);
    setData(dataLoad.studentDetails);
    setState(dataLoad.accepted);
    setGender(dataLoad.gender);
  }, []);

  const onClick = async (e, state) => {
    e.preventDefault();

    if (confirm(`Are you sure to ${state} the Student ?`)) {
      let data = await api
        .post(`/student/profile/${id}`, { state })
        .then(({ data }) => data);
      if (data.message === "modified") {
        router.push("/admin/student-profile");
      }
    } else {
    }
  };

  return (
    <>
      {blackList ? (
        <>
          {" "}
          <div className="flex flex-wrap">
            <div className="w-full lg:w-8/12 px-4">
              <>
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                  <div className="text-center rounded-t bg-white mb-0 px-6 py-6">
                    <div className=" flex justify-between">
                      <h6 className="text-blueGray-700 text-xl font-bold">
                        My account
                      </h6>
                    </div>
                  </div>
                  <div className="text-center text-lg bg-red-500 flex-auto px-4 lg:px-10 py-10 pt-0">
                    This Account Has Been BlackListed
                  </div>
                </div>
              </>
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          {data ? (
            <div className="flex flex-wrap">
              <div className="w-full lg:w-8/12 px-4">
                <>
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                      <div className="text-center flex justify-between">
                        {state === undefined && (
                          <>
                            {" "}
                            <button
                              className="bg-emerald-500 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                              button="button"
                              onClick={(e) => onClick(e, "accept")}
                            >
                              Accept Account
                            </button>
                            <button
                              className="bg-red-500 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                              button="button"
                              onClick={(e) => onClick(e, "reject")}
                            >
                              Reject Account
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                      <form>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                          Student Information
                        </h6>
                        <div className="flex flex-wrap">
                          <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Student Name
                              </label>
                              <input
                                type="text"
                                disabled
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={data.name}
                              />
                            </div>
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Gender
                              </label>
                              <input
                                type="text"
                                disabled
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={gender}
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Email address
                              </label>
                              <input
                                type="email"
                                disabled
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={data.email}
                              />
                            </div>
                          </div>
                        </div>

                        <hr className="mt-6 border-b-1 border-blueGray-300" />

                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                          Contact Information
                        </h6>
                        <div className="flex flex-wrap">
                          <div className="w-full lg:w-12/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Address
                              </label>
                              <input
                                type="text"
                                disabled
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                defaultValue={data.address}
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-4/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Phone No
                              </label>
                              <input
                                type="email"
                                disabled
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                defaultValue={data.phoneNo}
                              />
                            </div>
                          </div>
                        </div>

                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                      </form>
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                      <form>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                          Education Information
                        </h6>
                        <div className="flex flex-wrap">
                          <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                University
                              </label>
                              <input
                                type="text"
                                disabled
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={data.university}
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Faculty
                              </label>
                              <input
                                type="text"
                                disabled
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={data.faculty}
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Degree
                              </label>
                              <input
                                type="text"
                                disabled
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={data.degree}
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Student ID No
                              </label>
                              <input
                                type="email"
                                disabled
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                value={data.studentID}
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                              <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                htmlFor="grid-password"
                              >
                                Student ID Photo
                              </label>
                              <a
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                href={url}
                              >
                                Click Here To View Photo
                              </a>
                            </div>
                          </div>
                        </div>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                      </form>
                    </div>
                  </div>
                </>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <>
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                    <div className="px-6">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full px-4 flex justify-center">
                          <div className="relative">
                            {console.log(data)}
                            <img
                              alt="..."
                              src={url}
                              className="student-photo shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                            />
                          </div>
                        </div>
                        <div className="w-full px-4 text-center mt-20">
                          <div className="flex justify-center py-4 lg:pt-4 pt-8">
                            <div className=" p-3 text-center">
                              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                {report}
                              </span>
                              <span className="text-sm text-blueGray-400">
                                Reports
                              </span>
                            </div>
                            <div className="p-3 text-center">
                              {/* <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                10
                              </span>
                              <span className="text-sm text-blueGray-400">
                                Job Applied
                              </span> */}
                            </div>
                            <div className=" p-3 text-center">
                              {/* <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                89
                              </span>
                              <span className="text-sm text-blueGray-400">
                                Total Jobs
                              </span> */}
                            </div>
                          </div>
                          {report !== 0 && (
                            <button
                              className="bg-red-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                              button="button"
                              onClick={(e) => onClick(e, "blackList")}
                            >
                              Black List this Student
                            </button>
                          )}
                        </div>
                      </div>
                      {/* <div className="text-center mt-12">
                    <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                      {data.name}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                      {data.address}
                    </div>
                    <div className="mb-2 text-blueGray-600 mt-10">
                      <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                      Company - {data.address} {data.university}
                    </div>
                    <div className="mb-2 text-blueGray-600">
                      <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                      website <a href={data.website}></a>
                    </div>
                  </div> */}
                      {/* <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                          An artist of considerable range, Jenna the name taken
                          by Melbourne-raised, Brooklyn-based Nick Murphy
                          writes, performs and records all of his own music,
                          giving it a warm, intimate feel with a solid groove
                          structure. An artist of considerable range.
                        </p>
                        <a
                          href="#pablo"
                          className="font-normal text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Show more
                        </a>
                      </div>
                    </div>
                  </div> */}
                    </div>
                  </div>
                </>
              </div>
            </div>
          ) : (
            <LoadingPage />
          )}
        </>
      )}
    </>
  );
}

Settings.layout = Admin;
