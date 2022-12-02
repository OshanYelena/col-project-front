import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Company from "layouts/Company.js";
import Select from "react-select";

import { Authaccount } from "api/authRequire";

import Auth from "layouts/Auth.js";
import api from "../../../api/contact";
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

const Ads = (color = "dark") => {
  const [jobData, setJobData] = useState([]);
  const [comName, setComName] = useState([]);

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

  const getcomAds = async (comName) => {
    console.log(comName);
    let data = await api
      .post(`/adds/search?comName=${comName}&page=${page}&search=${search}`)
      .then(({ data }) => data);

    setLoad(true);
    setJobData(data.jobs);
    console.log("hello", data.jobs);

    // setComName(data)
  };

  const getAdds = async () => {
    let data = await api
      .post(`/adds/search?comName=All&page=${page}&search=${search}`)
      .then(({ data }) => data);

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

      getcomAds(data.company.name);
    } else {
      getAdds();
    }
  }, [jobDel, search]);

  const onChange = async (e) => {
    setQuery(e.value);
  };

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   let data = await api.post(`/ads/search?page=${page}&search=${search}`).then(({ data }) => data);
  //   console.log(data)
  // };

  const navbar = Navbar();

  return (
    <>
      {/* {rot === "/student/dashboard" && navbar === "student" && <StudentNavbar fixed />}

      {rot === "/company/dashboard"  && navbar === "company" && <CompanyNavbar />} */}
      {/* {navbar === "student" && <StudentNavbar fixed />}

      {navbar === "company" && <CompanyNavbar />}
      {navbar === "admin" && <Admin />}
      {!navbar && <IndexNavbar fixed />} */}

      {load === true ? (
        <>
          <div
            className={
              "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
              (color === "dark" ? "bg-white" : "bg-blueGray-700 text-white")
            }
          >
            <div className="container mx-auto items-center flex flex-wrap">
              <div className="w-full  px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-orange-500 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-dark text-lg font-bold">
                        Filter Your Jobs
                      </h6>
                    </div>
                    <form>
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
                          <button style={{ marginTop: "0px" }} type="submit">
                            Search
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3
                    className={
                      "font-semibold text-lg " +
                      (color === "light" ? "text-blueGray-700" : "text-white")
                    }
                  >
                    My Ads
                  </h3>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              {/* Projects table */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    {/* <th
                      className={
                        "px-6 align-middle  border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                      }
                    >
                      Index
                    </th> */}
                    <th
                      className={
                        "px-6 align-middle  border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                      }
                    >
                      Job Caregory
                    </th>
                    <th
                      className={
                        "px-6 align-middle  border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                      }
                    >
                      Job Title
                    </th>
                    <th
                      className={
                        "px-6 align-middle text-center  border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                      }
                    >
                      View Job
                    </th>
                  </tr>
                </thead>
                {jobData.length !== 0 ? (
                  jobData.map(({ data, _id }) => {
                    return (
                      <tbody key={data._id}>
                        <tr>
                          <td className="border-t-0  px-6 font-semibold align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4">
                            {data.jobCategory}
                          </td>

                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg whitespace-nowrap p-4">
                            <div className="flex items-center">
                              {data.jobTitle}
                            </div>
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 text-center">
                            <a
                              style={{ color: "black" }}
                              className=" text-blueGray-500"
                              target={"_blank"}
                              href={"/adds/" + _id}
                            >
                              <button
                                style={{ width: "50%" }}
                                className="bg-orange-500 border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4"
                                type="button"
                              >
                                {" "}
                                View Job Ad
                              </button>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })
                ) : (
                  <>
                    <div className="w-full  px-4">
                      <div className="relative align-item-center text-center flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-orange-500 border-0">
                        <div className="rounded-t mb-0 px-6 py-6">
                          <div className="text-center mb-3">
                            <h6 className="text-dark text-lg font-bold">
                              This company has not yet published any
                              advertisements on this job category
                            </h6>
                          </div>
                          <div className="btn-wrapper text-center">
                            {/* {url} */}
                          </div>
                          <div className="text-center text-md">
                            Advertisement are coming soon ...
                          </div>
                          <hr className="mt-6 border-b-1 border-blueGray-300" />
                          {/* <Link href={`/${navbar}/dashboard`}>
                            <button type="submit">Back to DashBoard</button>
                          </Link> */}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </table>
            </div>
          </div>
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

export default Ads;

Ads.layout = Company;
