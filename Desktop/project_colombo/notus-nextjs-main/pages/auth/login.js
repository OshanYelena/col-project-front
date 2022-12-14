import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router.js";
import { useForm } from "react-hook-form";

import api from "../../api/contact";

// layout for page

import Auth from "layouts/Auth.js";

export default function Login() {
  const router = useRouter();
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

  const onSubmit = async (e) => {
    let data = await api
      .post("/auth/user/login", addData)
      .then(({ data }) => data);
      
    localStorage.setItem("auth-token", data.data);
    localStorage.setItem('type', data.type);
    const token = localStorage.getItem("auth-token");

    if (token) {



    } router.push("/");

    if (data.message === "User Not Found!") {
      setUserError(true);
    }
    if (data.message === "Invalid Email or Password") {
      setUserError(true);
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

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in with
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div>
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
                  {userError && (
                    <p className="error">Incorrect Email or Password</p>
                  )}
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link href="/auth/register">
                  <a href="#pablo" className="text-blueGray-200">
                    <small>Create new account</small>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Login.layout = Auth;
