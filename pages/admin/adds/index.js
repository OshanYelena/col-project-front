import { useEffect, useState } from "react";


import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";
import api from '../../../api/contact'

import Admin from "layouts/Admin.js";
import { getData } from "api/companydata";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import StudentNavbar from "components/Navbars/StudentNavbar";
import CompanyNavbar from "components/Navbars/CompanyNavbar";
import Footer from "components/Footers/Footer.js";

const Navbar = () => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const item = localStorage.getItem("type");
    return item;
  } else {
    return false;
  }
};

export const Adds = ({ deleteAdd }) => {
  const [jobData, setJobData] = useState([]);
  const [remove, setRemove] = useState(false);
  const [addId, setAddId] = useState();
  const [ rot, cutrou] = useState('')

  const router = useRouter()

  const getAdds = async () => {
    let data = await api
      .get("/company/job/all-adds", {})
      .then(({ data }) => data);
    console.log("uasgd", data.jobPosts);
    setJobData(data.jobPosts);
  };

  useEffect(async () => {
    cutrou(router.pathname);
    getAdds();
  }, []);

  const navbar = Navbar();
  console.log(navbar);

  return (
    <>

      {/* {rot === "/student/dashboard" && navbar === "student" && <StudentNavbar fixed />}

      {rot === "/company/dashboard"  && navbar === "company" && <CompanyNavbar />} */}
      {!navbar && <IndexNavbar fixed />}

      <section className="header relative pt-16 items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          {jobData.length !== 0 &&
            jobData.map(({ data, _id }) => {
              return (
                <div key={data._id} class="feature feature-one">
                  <Link href={`/admin/adds/${_id}`}>
                    <button
                      style={{ width: "20%" }}
                      class="view-tag bg-emerald-500 text-white active:bg-amber-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      // type="button"
                    >
                      View Job
                    </button>
                  </Link>
                  <h2 class="feature__title">{data.jobTitle}</h2>
                  <p class="feature__desc">{data.jobCategory}</p>
                  <div class="feature__desc skills-container">
                    <div class="skill">{data.jobType}</div>
                    <div class="skill">Hourly pay rate - {data.payRate}</div>
                    <div class="skill">{data.jobType}</div>
                    <div class="special-tag">Be the first to apply</div>
                  </div>
                  <img
                    className="feature__img"
                    alt="asda"
                    src={
                      "https://kellychi22.github.io/frontend-mentor-solutions/10-four-card-feature-section/images/icon-supervisor.svg"
                    }
                  />
                </div>
              );
            })}
          {jobData.length === 0 && (
            <div className="w-full  px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-blueGray-500 text-lg font-bold">
                   Not yet published any advertisements
                    </h6>
                  </div>
                  <div className="btn-wrapper text-center">
                    ` ` {/* logo and icon */}
                  </div>
                  <div className="text-center">
                  Advertisement are coming soon ... 
                   </div>
                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                  <Link href={"/admin/dashboard"}>
                    <button style={{backgroundColor: "orange"}} type="submit">Back to DashBoard</button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Adds;

Adds.layout = Admin;
