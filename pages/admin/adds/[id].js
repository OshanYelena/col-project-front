import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Page from "layouts/Pages.js";

import api from "../../../api/contact";

import { Authaccount } from "api/authRequire";

import { getData, existApplication } from "api/companydata";

import fb from "config/firebase";

const JobCard = () => {
  if (typeof window !== "undefined") {
    var userType = localStorage.getItem("type");
  }
  const { query } = useRouter();
  const [addData, setAddData] = useState();
  const [application, setApplication] = useState(false);
  const [userData, setUserData] = useState({});
  const [cvUrl, setcvUrl] = useState("");
  const [loader, setUrloader] = useState(false);
  const [jobId, setJobId] = useState("");
  const [comId, setcomId] = useState("");
  const [applied, setApplied] = useState(true);
  const [exist, setExist] = useState(true);

  const getAddData = async () => {
    let data = await api
      .get("/company/job/add", {
        headers: {
          jobAddId: query.id.toString(),
        },
      })
      .then(({ data }) => data);
    console.log("asuidyaf", data);
    if (data.company) {
      setJobId(data.company._id);
      setcomId(data.company.companyId);
      setAddData(data.company);
      setApplied(await existApplication(data.company._id));
    } else setExist(false);
  };

  const getUserData = (data) => {
    setUserData(data);
  };

  const handleFile = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    const ref = fb.storage().ref(`/application/cv/${image.name}`);
    const uploadTask = ref.put(image);
    uploadTask.on("state_changed", console.log, console.error, () => {
      ref.getDownloadURL().then((url) => {
        setcvUrl(url);
      });

      setUrloader(true);
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const studentDetails = userData.studentDetails;
    const studentId = userData._id;
    let data = await api
      .post("/student/job-application", {
        studentDetails,
        jobId,
        cvUrl,
        comId,
        studentId,
      })
      .then(({ data }) => data);
    if (data.message === "application Submited") {
    }
  };

  const apply = async (e) => {
    e.preventDefault();
    setApplication(true);
  };

  useEffect(async () => {
    const data = Authaccount();
    if (data !== "admin") {
      router.push(`/${data}/dashboard`);
    }
    getAddData();
    const userData = await getData();
    getUserData(userData);
  }, []);

  return (
    <>
      <body>
        <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg shadow">
          <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"></div>
            <div id="example-navbar-warning">
              <ul className="flex flex-col lg:flex-row list-none mr-auto">
                <li className="flex items-center">
                  <a className="hover:text-white text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold">
                    <i className="text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2" />{" "}
                  </a>
                </li>
              </ul>
              <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li className="flex items-center"></li>
                <li className="flex items-center">
                  <a
                    className="hover:text-white text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    href={`/admin/dashboard/`}
                  >
                    <i className="text-white far fa-file-alt text-lg leading-lg mr-2" />{" "}
                    Back to DashBoard
                    <span className="lg:hidden inline-block ml-2">Share</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {addData && exist ? (
          <div className="container mx-auto px-7 h-full">
            <img
              className="img-banner"
              src="/img/hiring-concept-with-empty-chair.jpg"
              height={100}
              alt=""
            />
            <div id="resultsCol">
              <div className="row-left ">
                <div className="mt-10 main-job">
                  <h2 className="jobtitle text-orange-500">
                    <b>{addData.data.jobTitle}</b>
                  </h2>
                  <div>
                    <span className="company">{addData.companyName}</span>
                  </div>

                  <span className="text-lg ">{addData.data.address}</span>
                  <div className="location text-lightBlue-500">
                    Pay Rate - {addData.data.payRate}
                  </div>
                </div>

                <table
                  className="mt-10"
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                >
                  <tbody>
                    <tr>
                      <td className="snip">
                        <div className="paddedSummaryExperience">
                          <div className="job-details-main">
                            <div className="job-details">Job Details</div>
                            {/*                         
                        <span className="summary">
                          Bachelor’s Degree in <b>Graphic</b> <b>Design</b>,
                          Visual Communications, Computer <b>Graphics</b>,
                          Multimedia, or Illustration from accredited university
                          or institute....
                        </span> */}

                            <div className="details">
                              <div className="detail-item">
                                <span className="experienceListItem">
                                  Salary
                                </span>
                                <p className="item ">{addData.data.payRate}</p>
                              </div>

                              <div className="detail-item">
                                <span className="experienceListItem">
                                  Job Type
                                </span>
                                <p className="item">{addData.data.jobType}</p>
                              </div>
                            </div>
                          </div>
                          <div className="full-job-decription">
                            {" "}
                            Full Job Description
                          </div>

                          <div
                            id="blockquote"
                            dangerouslySetInnerHTML={{
                              __html: addData.jobDescription,
                            }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* right side box */}
              {userType === "student" && (
                <div className="row-right justify-content-center ">
                  <div className="relative mt-10 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                    <div className="">
                      <div className="relative mt-10 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                        <article class="flex-auto px-4 lg:px-10 py-10 pt-0">
                          <div class="job-title-adds">Software Engineer</div>
                          {console.log(applied)}
                          {applied ? (
                            <button onClick={apply} className="apply-button">
                              Apply Now
                            </button>
                          ) : (
                            <>
                              {" "}
                              <button className="apply-button">
                                You Have Applied For this Vacancy
                              </button>
                            </>
                          )}
                        </article>
                      </div>
                      {application && (
                        <>
                          <div className="container px-4 h-full">
                            <div className="flex content-center items-center justify-center">
                              <div className="">
                                <div className="relative mt-10 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                    <div className="text-blueGray-400 text-center mt-10 mb-3 font-bold">
                                      <small>Apply to this job</small>
                                    </div>
                                    <form onSubmit={onSubmit}>
                                      <div className="relative w-full mb-3">
                                        <label
                                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                          htmlFor="grid-password"
                                        >
                                          Email
                                        </label>
                                        <input
                                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                          id="email"
                                          type="email"
                                          value={userData.studentDetails.email}
                                        />
                                      </div>
                                      <div className="relative w-full mb-3">
                                        <label
                                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                          htmlFor="grid-password"
                                        >
                                          Student Name
                                        </label>
                                        <input
                                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                          id="name"
                                          type="text"
                                          value={userData.studentDetails.name}
                                        />
                                      </div>

                                      <div className="relative w-full mb-3">
                                        <label
                                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                          htmlFor="grid-password"
                                        >
                                          Submit Your CV
                                        </label>
                                        <input
                                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                          id="cv"
                                          onChange={handleFile}
                                          type="file"
                                        />
                                      </div>

                                      <div className="text-center mt-6">
                                        {loader && (
                                          <button
                                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                            type="submit"
                                            onClick={onSubmit}
                                            // disabled={userError}
                                          >
                                            Apply
                                          </button>
                                        )}
                                      </div>
                                      {/* {userError && (
                    <p className="error">Incorrect Email or Password</p>
                  )} */}
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            {" "}
            <div className="container mx-auto px-4 h-full">
              <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                    <div className="rounded-t mb-0 px-6 py-6">
                      <div className="text-center mb-3">
                        <h6 className="text-blueGray-500 text-lg font-bold">
                          Job Post Not Found
                        </h6>
                      </div>
                      <div className="btn-wrapper text-center">
                        ` ` {/* logo and icon */}
                      </div>
                      <div>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Error id quis ex dicta ut, consequuntur, quasi
                        mollitia repellendus deserunt ea tempora explicabo qui
                        necessitatibus nihil numquam nulla distinctio enim
                        temporibus.
                      </div>
                      <hr className="mt-6 border-b-1 border-blueGray-300" />
                      <Link href={"/"}>
                        <button
                          style={{ backgroundColor: "orange" }}
                          type="submit"
                        >
                          Back to DashBoard
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </body>
    </>
  );
};

export default JobCard;

