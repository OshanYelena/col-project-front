import { useState } from "react";
import { useRouter } from "next/router";
import api from "../../../../../../api/contact";

import Link from "next/link";

import Page from "layouts/Pages.js";

const ReportSubmit = () => {
  const [submit, setSubmit] = useState(true);
  const [message, setMessage] = useState("");
  const { query } = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const comId = query.comId.toString();
    const applicationId = query.id.toString();
    const studentId = query.studentId.toString();
    const jobId = query.jobId.toString();

    let data = await api
      .post("/company/report/student", {
        comId,
        applicationId,
        studentId,
        jobId,
        message,
      })
      .then(({ data }) => data);
    if (data.message === "report Submitted") {
      setSubmit(false);
    }
  };

  const onChange = async (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              {submit ? (
                <>
                  <div className="text-center text-lg rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-blueGray-500 text-lg text-sm font-bold">
                        Report This Student
                      </h6>
                    </div>
                    <div className="btn-wrapper text-center">
                      {/* logo and icon */}
                    </div>
                    <textarea
                      onChange={onChange}
                      className="bg-white"
                      placeholder="Type Here"
                    ></textarea>
                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                    {message && (
                      <>
                        <Link href={"/"}>
                          <button
                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="submit"
                            onClick={onSubmit}
                          >
                            Submit your Report
                          </button>
                        </Link>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center text-lg rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-blueGray-500 text-lg text-sm font-bold">
                        Thanks For Your FeedBack
                      </h6>
                    </div>
                    <div className="btn-wrapper text-center">
                      {/* logo and icon */}
                    </div>

                    <hr className="mt-6 border-b-1 border-blueGray-300" />

                    <Link href={"/company/dashboard"}>
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Back To Your Dashboard
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportSubmit;

ReportSubmit.layout = Page;
