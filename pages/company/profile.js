import React, { useEffect, useState } from "react";

// components
import { useRouter } from "next/router";
import { Authaccount } from "api/authRequire";

import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";

import { getData } from "api/companydata.js";

// layout for page

import Company from "layouts/Company.js";
import LoadingPage from "components/PageChange/LoadingPage";

export default function Settings() {
  const router = useRouter();

  const [data, setData] = useState({});
  const [edit, setEdit] = useState(true);
  const [url, setUrl] = useState();

  useEffect(async () => {
    const data = Authaccount();

    if (data !== "company") {
      router.push(`/${data}/dashboard`);
    }
    const dataLoad = await getData();
    console.log(dataLoad);
    setUrl(dataLoad.urls);

    setData(dataLoad.company);
  }, []);
  return (
    <>
      {data ? (
        <div className="flex flex-wrap">
          <div className="w-full lg:w-8/12 px-4">
            <>
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form>
                    <h6 className="text-orange-500 text-lg mt-3 mb-6 font-bold uppercase">
                      Company Information
                    </h6>
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Company Name
                          </label>
                          <input
                            type="text"
                            disabled
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            value={data.name}
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            disabled
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            value={data.email}
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="mt-6 border-b-1 border-blueGray-300" />

                    <h6 className="text-orange-500 text-lg mt-3 mb-6 font-bold uppercase">
                      Contact Information
                    </h6>
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-12/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Address
                          </label>
                          <input
                            type="text"
                            disabled
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={data.address}
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Phone No
                          </label>
                          <input
                            type="email"
                            disabled
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue={data.phoneNo}
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                  </form>
                </div>
              </div>
            </>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <>
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full px-4 flex justify-center">
                      <div className="relative">
                        {console.log(data)}
                        <img
                          alt="..."
                          src={url}
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                        />
                      </div>
                    </div>
                    {/* <div className="w-full px-4 text-center mt-20">
                      <div className="flex justify-center py-4 lg:pt-4 pt-8">
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            22
                          </span>
                          <span className="text-sm text-blueGray-400">
                          Adds
                          </span>
                        </div>
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            10
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Students
                          </span>
                        </div>
                        <div className="lg:mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            89
                          </span>
                          <span className="text-sm text-blueGray-400">
                            Applications
                          </span>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  {/* <div className="text-center mt-12">
                    <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                      {data.name}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                      {data.address}
                    </div>
                    <div className="mb-2 text-blueGray-600 mt-10">
                      <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                      Company - {data.address} {data.university}
                    </div>
                    <div className="mb-2 text-blueGray-600">
                      <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                      website <a href={data.website}></a>
                    </div>
                  </div> */}
                  {/* <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                          An artist of considerable range, Jenna the name taken
                          by Melbourne-raised, Brooklyn-based Nick Murphy
                          writes, performs and records all of his own music,
                          giving it a warm, intimate feel with a solid groove
                          structure. An artist of considerable range.
                        </p>
                        <a
                          href="#pablo"
                          className="font-normal text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Show more
                        </a>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </>
          </div>
        </div>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}

Settings.layout = Company;
