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

export const Reports = ({ deleteAdd }) => {
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
              {report.length !== 0 &&
                report.map((data) => {
                  return (
                    <div key={data._id} class="feature feature-one">
                      <Link href={"/ads/" + data.jobId}>
                        view Job Vacancy add
                      </Link>
                      <h2 class="feature__title">Job FeedBack</h2>
                      <p class="feature__desc">{data.report}</p>
                    </div>
                  );
                })}
              {report.length === 0 && (
                <div className="w-full  px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                    <div className="rounded-t mb-0 px-6 py-6">
                      <div className="text-center mb-3">
                        <h6 className="text-blueGray-500 text-lg font-bold">
                          This company has not yet Posted any feedbacks
                        </h6>
                      </div>
                      <div className="btn-wrapper text-center"></div>
                      <div className="text-center">Submit your vacancies</div>
                      <hr className="mt-6 border-b-1 border-blueGray-300" />
                      <Link href={"/company/dashboard"}>
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
