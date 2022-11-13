import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "../../../../api/contact";
import fb from "config/firebase";

import Link from "next/link";

import Page from "layouts/Pages.js";
import { getData, existApplication } from "api/companydata";

const JobApplyId = () => {
  const [application, setApplication] = useState(false);
  const [userData, setUserData] = useState({});
  const [loader, setUrloader] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [cvUrl, setcvUrl] = useState("");
  const { query } = useRouter();


  const onSubmit = async (e) => {
    e.preventDefault();
    const studentDetails = userData.studentDetails;
    const studentId = userData._id;
    const jobId = query.id.toString();
    const comId = query.com.toString();
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
      setSubmit(true);
    }
  };

  const getUserData = (data) => {
    setUserData(data);
  };

  useEffect(async () => {
    const userData = await getData();
    console.log(userData);
    getUserData(userData);
    setApplication(true);
  }, []);

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
  return (
    <>
      {!submit ? (
        <>
          {application ? (
            <>
              <div className="container px-4 h-full">
                <div className="flex items-center justify-center">
                  <div className="">
                    <div className="relative mt-10 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <div className="text-blueGray-400 text-center mt-10 mb-3 font-bold">
                          <p className="text-lg">Apply to this job</p>
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
                              >
                                Apply
                              </button>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <div className="container px-4 h-full">
            <div className="flex items-center justify-center">
              <div className="">
                <div className="relative mt-10 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-blueGray-400 text-center mt-10 mb-3 font-bold">
                      <p className="text-lg">
                        You Have Applied to this Job Vacancy
                      </p>

                      <p>
                        <Link href={"/student/appied-jobs"}>
                          Check Your Application status
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default JobApplyId;

JobApplyId.layout = Page;
