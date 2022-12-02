import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";
import { Authaccount } from "api/authRequire";

import Company from "layouts/Company.js";

import api from "../../api/contact";
import { getData } from "api/companydata";
import Footer from "components/Footers/Footer.js";
import LoadingPage from "components/PageChange/LoadingPage";

export const Reports = (color = "dark") => {
  const [report, setReportData] = useState([]);
  const [remove, setRemove] = useState(false);
  const [addId, setAddId] = useState();
  const [rot, cutrou] = useState("");

  const router = useRouter();

  const getReports = async (id) => {
    let data = await api
      .get("/student/job/review", {
        headers: {
          companyId: id,
        },
      })
      .then(({ data }) => data);
    setReportData(data);
    console.log("reports", report);
  };

  useEffect(async () => {
    const dataType = Authaccount();

    if (dataType !== "company") {
      router.push(`/${dataType}/dashboard`);
    }

    cutrou(router.pathname);
    console.log(rot);
    const data = await getData();
    if (data.company) {
      //   getcomads(data._id);
      getReports(data._id);
    } else {
    }
  }, []);

  return (
    <>
      {report ? (
        <>
          {" "}
          <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
            <div className="container mx-auto items-center flex flex-wrap">
              {report.length !== 0 ? (
                report.map((data) => {
                  return (
                    <>
                      <div
                        key={data._id}
                        className={
                          "relative mt-0 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
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
                                Your Company Feedbacks
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
                                  Related Job Post
                                </th>
                                {/* <th
                                  className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                  }
                                >
                                  Job Application
                                </th> */}

                                <th
                                  className={
                                    "px-6 text-center align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                  }
                                >
                                  Report Message
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                  <Link href={`/adds/${data.jobId}`}>
                                    <button
                                      style={{ width: "50%" }}
                                      className="bg-orange-500 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                      type="button"
                                    >
                                      View Job Post
                                    </button>
                                  </Link>
                                </th>

                                {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <Link
                                    href={`/adds/${data.jobId}`}
                                  >
                                    <button
                                      style={{ width: "50%" }}
                                      className="bg-red-500 border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                                      type="button"
                                    >
                                      View Job Post
                                    </button>
                                  </Link>
                                </td> */}

                                <td
                                  // style={{ width: "50%" }}
                                  className=" text-center font-bold  text-lg border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4"
                                >
                                  {data.report}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <>
                  <div className="">
                    <div className="container mx-auto px-4 h-full">
                      <div className="flex mt-10 content-center items-center justify-center h-full">
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-orange-500 border-0">
                            <div className="rounded-t mb-0 px-6 py-6">
                              <div className="text-center mb-3">
                                <h6 className="text-black text-lg font-bold">
                                 Not Found
                                </h6>
                              </div>
                              <div className="btn-wrapper text-lg text-center">
                            

                                No feedback has given to this company yet!
                              </div>
                              <hr className="mt-6 border-b-1  border-blueGray-300" />
                              <div className="text-center">
                                <Link href={'/company/new-job'}>
                                <button
               
                                  type="submit"
                                >
                                  Create New Job Post
                                </button>
                                </Link>
                                <Link href={"/company/dashboard"}>
                                  <button type="submit">
                                    Back to Dashboard
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                </>
              )}
            </div>
          </section>
        </>
      ) : (
        <>
          {" "}
          <LoadingPage />
        </>
      )}
    </>
  );
};

export default Reports;

Reports.layout = Company;
