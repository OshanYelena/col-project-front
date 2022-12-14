import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router.js";
import { useForm } from "react-hook-form";

import api from "../../api/contact";
import { Authaccount } from "api/authRequire";

// layout for page

import Auth from "layouts/Auth.js";
import LoadingPage from "components/PageChange/LoadingPage";

export default function Login() {
  const router = useRouter();

  const [blacklist, setErrorMessage] = useState({
    errorType: "",
    errorStatus: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [addData, setAddData] = useState(addFormData);
  const [userError, setUserError] = useState(false);
  const [load, setLoad] = useState(false);

  const onSubmit = async (e) => {
    setLoad(true);
    let data = await api
      .post("/auth/user/login", addData)
      .then(({ data }) => data);
    console.log("data", data.message);
    if (data.message === "Your Account Has been Blacklisted") {
      setErrorMessage({
        errorType: "blackList",
        errorStatus: true,
      });
      setLoad(false);
    } else if (data.message === "User Not Found!") {
      setErrorMessage({
        errorType: "Invalid",
        errorStatus: true,
      });
      setLoad(false);
    } else if (data.message === "Invalid Email or Password") {
      setErrorMessage({
        errorType: "Invalid",
        errorStatus: true,
      });
      setLoad(false);
    } else {
      localStorage.setItem("auth-token", data.data);
      localStorage.setItem("type", data.type);
      const token = localStorage.getItem("auth-token");
      if (token) {
        setLoad(false);
        router.push("/");
      }
    }
  };

  const onChange = async (e) => {
    e.preventDefault();
    setAddData({
      ...addData,
      [e.target.id]: e.target.value,
    });
    console.log(addData);
  };
  useEffect(() => {
    const data = Authaccount();
    if (data !== false) {
      router.push(`/${data}/dashboard`);
    }
  }, []);

  return (
    <>
      {load === false ? (
        <>
          {" "}
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-orange-500 text-xl font-bold">
                        Welcome to parttimer.lk
                      </h6>
                    </div>
                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-black text-center mb-3 font-bold">
                      <img src="/img/Asset 2@300x-8.png" alt="" />
                      {/* <small>sign in with credentials</small> */}
                    </div>
                    {blacklist.errorType === "blackList" ? (
                      <>
                        <div className="relative w-full mb-3">
                          <h2 className="error">
                            Your Account Has been Blacklisted! Please Contact
                            our admin via email
                          </h2>
                        </div>{" "}
                      </>
                    ) : (
                      <>
                        {" "}
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                              placeholder="Email"
                              type={"email"}
                              {...register("email", {
                                required: true,
                                onChange: onChange,
                              })}
                            />
                            {errors.email && (
                              <p className="error">This field is required</p>
                            )}
                          </div>

                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Password
                            </label>
                            <input
                              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                              id="password"
                              placeholder="Password"
                              type={"password"}
                              {...register("password", {
                                required: true,
                                onChange: onChange,
                              })}
                            />
                            {errors.password && (
                              <p className="error">This field is required</p>
                            )}
                          </div>
                          <div>
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                id="customCheckLogin"
                                type="checkbox"
                                className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                              />
                              <span className="ml-2 text-sm font-semibold text-blueGray-600">
                                Remember me
                              </span>
                            </label>
                          </div>

                          <div className="text-center mt-6">
                            <button
                              className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                              type="submit"
                              disabled={userError}
                            >
                              
                              Sign In
                            </button>
                          </div>
                          {blacklist.errorType === 'Invalid' && (
                            <p className="error text-lg">Incorrect Email or Password</p>
                          )}
                        </form>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap mt-6 relative">
                  <div className="w-1/2">
                    <a
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      className="text-blueGray-200"
                    >
                      {/* <small>Forgot password?</small> */}
                    </a>
                  </div>
                  <div className="w-1/2 text-right">
                    <Link href="/auth/register">
                      <a className="text-blueGray-200">
                        <small>Create new account</small>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
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
}

Login.layout = Auth;
