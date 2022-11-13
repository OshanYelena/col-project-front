import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Page from "layouts/Pages.js";

import api from "../../../api/contact";

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
    const studentId = userData._id
    let data = await api
      .post("/student/job-application", { studentDetails, jobId, cvUrl, comId, studentId })
      .then(({ data }) => data);
    if (data.message === "application Submited") {
    }
  };

  const apply = async (e) => {
    e.preventDefault();
    setApplication(true);
  };
  
  useEffect(async () => {
    getAddData();
    const userData = await getData();
    getUserData(userData);
  }, []);

  return (
    <>
      {addData && exist ? (
        <div className="container mx-auto px-7 h-full">
          <div id="resultsCol">
            <div className="row-left ">
              <div className="main-job">
                <h2 id="" className="jobtitle">
                  <b>{addData.data.jobTitle}</b>
                </h2>
                <div>
                  <span className="company">{addData.companyName}</span>

                  {/* <span className="ratings">
                    <span className="rating" style={{ width: "44.4px" }}></span>
                  </span>
                  <span className="rating">713 reviews</span> */}
                </div>

                <span className="location">{addData.data.address}</span>
                <div className="location">{addData.data.payRate}</div>
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
                              <span className="experienceListItem">Salary</span>
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
                        <div className="v2Experience">
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
                        </div>
                      </div>

                      <div className="result-link-bar-container">
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
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Error id quis ex dicta ut, consequuntur, quasi mollitia
                      repellendus deserunt ea tempora explicabo qui
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
    </>
  );
};

export default JobCard;

JobCard.layout = Page;
