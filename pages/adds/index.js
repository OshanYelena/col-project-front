import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Select from "react-select";

import { Authaccount } from "api/authRequire";

import Auth from "layouts/Auth.js";
import api from "../../api/contact";
import { getData } from "api/companydata";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import StudentNavbar from "components/Navbars/StudentNavbar";
import CompanyNavbar from "components/Navbars/CompanyNavbar";
import NotificationDropdown from "components/Dropdowns/TableDropdown";
import Footer from "components/Footers/Footer.js";
import LoadingPage from "components/PageChange/LoadingPage";

const Navbar = () => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    const item = localStorage.getItem("type");

    if (item) return item;
  } else {
    return false;
  }
};

const options = [
  { value: "Graphics & Design", label: "Graphics & Design" },
  { value: "Writing & Translation", label: "Writing & Translation" },
  { value: "Music & Audio", label: "Music & Audio" },

  { value: "Business", label: "Business" },

  { value: "Digital Marketing", label: "Digital Marketing" },

  { value: "Video & Animation", label: "Video & Animation" },

  { value: "Programming & Tech", label: "Programming & Tech" },
  { value: "Lifestyle", label: "Lifestyle" },
  { value: "Data", label: "Data" },
];

export const Adds = ({ deleteAdd }) => {
  const [jobData, setJobData] = useState([]);
  const [remove, setRemove] = useState(false);
  const [addId, setAddId] = useState();
  const [rot, cutrou] = useState("");
  const [load, setLoad] = useState(false);
  const [url, setUrl] = useState();
  const [search, setQuery] = useState("");
  const [jobDel, setDelete] = useState(false);
  const [page, setPage] = useState(1);

  const router = useRouter();

  const addDelete = async (_id) => {
    let data = await api.delete(`/company/add/${_id}`).then(({ data }) => data);
    if (data.message === "forum Deleted") {
      setDelete(true);
      alert("job Has removed");
      setDelete(false);
    }
  };

  const getcomAdds = async (comName) => {
    console.log(comName);
    let data = await api.post(`/adds/search?comName=${comName}&page=${page}&search=${search}`).then(({ data }) => data);
    
    setLoad(true);
    setJobData(data.jobs);
  };

  const getAdds = async () => {
    let data = await api.post(`/adds/search?comName=All&page=${page}&search=${search}`).then(({ data }) => data);
    // let data = await api
    //   .get("/company/job/all-adds", {})
    //   .then(({ data }) => data);
    setLoad(true);
    setJobData(data.jobs);
  };

  useEffect(async () => {
    const typeVerify = Authaccount();
    if (typeVerify === false) {
      router.push(`/${typeVerify}/dashboard`);
    }

    cutrou(router.pathname);

    const data = await getData();
    setUrl(data.urls);
    if (data.company) {
      setUrl(data.urls);
      console.log(data.urls);
      getcomAdds(data.company.name);
    } else {
      getAdds();
    }
  }, [jobDel, search]);

  const onChange = async (e) => {
    setQuery(e.value);
  };

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   let data = await api.post(`/adds/search?page=${page}&search=${search}`).then(({ data }) => data);
  //   console.log(data)
  // };

  const navbar = Navbar();

  return (
    <>
      {/* {rot === "/student/dashboard" && navbar === "student" && <StudentNavbar fixed />}

      {rot === "/company/dashboard"  && navbar === "company" && <CompanyNavbar />} */}
      {navbar === "student" && <StudentNavbar fixed />}

      {navbar === "company" && <CompanyNavbar />}
      {navbar === "admin" && <Admin />}
      {!navbar && <IndexNavbar fixed />}

      {load === true ? (
        <>
          <section className="header img-banner relative pt-16 items-center  h-screen max-h-860-px">
            <div className="container mx-auto items-center flex flex-wrap">
              <div className="w-full  px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-orange-500 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-dark text-lg font-bold">
                        Filter Your Jobs
                      </h6>
                    </div>
                    <form >
                      <div className="flex flex-wrap">
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <label className="block uppercase text-white text-xs font-bold mb-2">
                              Job Category
                            </label>
                            <Select
                              id="jobCategory"
                              className="no-svg border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              options={options}
                              onChange={onChange}
                            />
                          </div>
                          <button style={{marginTop: "0px"}} type="submit">Search</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {jobData.length !== 0 &&
                jobData.map(({ data, _id }) => {
                  return (
                    <div key={data._id} class="feature feature-one">
                      {remove && addId === _id && (
                        <div className="text-white alert-tag  px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
                          <span className="text-xl inline-block mr-5 align-middle">
                            <i className="fas fa-bell"></i>
                          </span>
                          <span className="inline-block align-middle mr-8">
                            <b className="capitalize">Warning</b> Are You Sure
                            to Remove this Job Vacancy
                          </span>
                          <button
                            onClick={addDelete}
                            className=" remove-tag  bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                          >
                            <span>Delete</span>
                          </button>
                          <button
                            onClick={() => setRemove(false)}
                            className=" exit-tag  bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                          >
                            <span>Close</span>
                          </button>
                        </div>
                      )}
                      {deleteAdd && (
                        <>
                          <button
                            style={{ width: "20%" }}
                            class="delete-tag  text-red-500 active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded  hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => {
                              setRemove(true), setAddId(_id);
                            }}
                          >
                            <i class="fas fa-solid fa-trash"></i>
                          </button>
                          <button
                            style={{ width: "20%" }}
                            className="edit-tag text-emerald-500 active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded  hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                          >
                            <i class="fas fa-tools"></i>
                          </button>
                        </>
                      )}
                      <Link href={`/adds/${_id}`}>
                        <button
                          style={{ width: "20%" }}
                          className="view-tag bg-emerald-500 text-white active:bg-amber-600 font-bold uppercase text-sm px-6 py-3 rounded  hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          // type="button"
                        >
                          View Job
                          {/* <i class="fas fa-solid fa-eye"> </i> */}
                        </button>
                      </Link>

                      <h2 className="text-orange-500 feature__title">
                        {data.jobTitle}
                      </h2>
                      <p className="feature__desc">{data.jobCategory}</p>
                      <div className="feature__desc skills-container">
                        <div className="skill">Part -Time</div>
                        <div className="skill">
                          Hourly pay rate - {data.payRate}
                        </div>
                        {/* <div className="skill">{data.jobType}</div> */}
                        <div className="special-tag">Be the first to apply</div>
                      </div>

                      <img
                        className="feature__img"
                        width={120}
                        height={120}
                        alt="asda"
                        src={url}
                      />
                    </div>
                  );
                })}
              {jobData.length === 0 && (
                <div className="w-full  px-4">
                  <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-orange-500 border-0">
                    <div className="rounded-t mb-0 px-6 py-6">
                      <div className="text-center mb-3">
                        <h6 className="text-dark text-lg font-bold">
                          This company has not yet published any advertisements
                        </h6>
                      </div>
                      <div className="btn-wrapper text-center">
                        {/* {url} */}
                      </div>
                      <div className="text-center">
                        Advertisement are coming soon ...
                      </div>
                      <hr className="mt-6 border-b-1 border-blueGray-300" />
                      <Link href={`/${navbar}/dashboard`}>
                        <button type="submit">Back to DashBoard</button>
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

export default Adds;

// Adds.layout = Auth;
