import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Page from "layouts/Pages.js";

import api from "../../api/contact";

import { getData, existApplication } from "api/companydata";
import { Authaccount } from "api/authRequire";

import JobApplyId from "pages/student/job-apply/[com]/[id]";

const JobCard = () => {
  if (typeof window !== "undefined") {
    var userType = localStorage.getItem("type");
  }
  const { query } = useRouter();
  const router = useRouter();
  const [addData, setAddData] = useState();
  const [userData, setUserData] = useState({});
  const [jobId, setJobId] = useState("");
  const [comId, setcomId] = useState("");
  const [applied, setApplied] = useState(true);
  const [exist, setExist] = useState(true);
  const [type, setUserType] = useState('')

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

  useEffect(async () => {
    const data = Authaccount();
    if (data === false) {
      router.push(`/${data}/dashboard`);
    }

    setUserType(Authaccount)
    getAddData();

  }, []);

  return (
    <>
      <body>
        <>
          <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg shadow">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
              <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
              </div>
              <div
                
                id="example-navbar-warning"
              >
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
                      href={`/${type}/dashboard/`}
                    >
                      <i className="text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2" />{" "}
                     Back to DashBoard
                      <span className="lg:hidden inline-block ml-2">Share</span>
                    </a>
                  </li>

                  <li className="flex items-center">
                    <a
                      className="hover:text-white text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                      href={`/${type}/profile/`}
                    >
                      <i className="text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2" />{" "}
                      Profile
                      <span className="lg:hidden inline-block ml-2">Share</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </>
        {addData && exist ? (
          <>
            <div className="container mx-auto px-7 h-full">
              <img
                className="img-banner"
                src="/img/hiring-concept-with-empty-chair.jpg"
                height={100}
                alt=""
              />
              <div id="resultsCol">
                <div className="row-left text-white">
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
                    className="mt-5"
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
                                  <p className="item">{addData.data.payRate}</p>
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
                            {/* <div className="v2Experience">
                          <span className="v2ExperienceList">
                            <span className="experienceListItem">
                              Photo Manipulation
                            </span>
                            <span className="experienceListItem">
                              Microsoft Powerpoint
                            </span>
                            <span className="experienceListItem">
                              Project Management
                            </span>
                            <span className="experienceListItem">
                              Adobe InDesign
                            </span>
                            <span className="experienceListItem">
                              Microsoft Office
                            </span>
                            <span className="moreLabel">and 4 more...</span>
                          </span>
                        </div> */}
                          </div>

                          {/* <div className="result-link-bar-container">
                        <div className="result-link-bar">
                          <span className="date">27 days ago</span>{" "}
                          <span id="tt_set_5" className="tt_set">
                            {" "}
                            -{" "}
                            <a
                              id="sj_fabf9f16e2a49dfe"
                              href="#"
                              className="sl resultLink save-job-link "
                              onclick="changeJobState('fabf9f16e2a49dfe', 'save', 'linkbar', false, ''); return false;"
                              title="Save this job to my.indeed"
                            >
                              save job
                            </a>{" "}
                            -{" "}
                            <a
                              href="#"
                              id="tog_5"
                              className="sl resultLink more-link "
                              onclick="toggleMoreLinks('fabf9f16e2a49dfe'); return false;"
                            >
                              more...
                            </a>
                          </span>
                          <div
                            id="editsaved2_fabf9f16e2a49dfe"
                            className="edit_note_content"
                            style={{ display: "none" }}
                          ></div>
                        </div>
                      </div> */}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* right side box */}
                {userType === "student" && (
                  <div className="row-right ">
                    <div className="relative text-center  mt-10 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-orange-500 border-0">
                      <div className="">
                        <div className="relative mt-10 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg  bg-orange-500 border-0">
                          <article class="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <div class="job-title-adds text-lg text-black">{addData.jobTitle}</div>
                            {applied ? (
                              <Link
                                href={`/student/job-apply/${comId}/${jobId}`}
                              >
                                <button type="submit">Apply Now</button>
                              </Link>
                            ) : (
                              <>
                                {" "}
                                <button className="text-xl text-black">
                                  You Have Applied For this Vacancy
                                </button>
                              </>
                            )}
                          </article>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div>
            {" "}
            <div className="container mx-auto px-4 h-full">
              <div className="flex content-center items-center justify-center h-full">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-orange-500 border-0">
                    <div className="rounded-t mb-0 px-6 py-6">
                      <div className="text-center mb-3">
                        <h6 className="text-black text-lg font-bold">
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

// JobCard.layout = Page;
