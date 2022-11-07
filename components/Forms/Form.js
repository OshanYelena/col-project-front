import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import api from "../../api/contact";

// layout for page

export default function Application() {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();


    
  return (
    <>
      <div className="container px-4 h-full">
        <div className="flex content-center items-center justify-center">
          <div className="">
            <div className="relative mt-10 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">

              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mt-10 mb-3 font-bold">
                  <small>Apply to this job</small>
                </div>
                <form>
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
                      Submit Your CV
                    </label>
                    <input
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      id="password"
                      placeholder="Password"
                      type={"password"}
                      {...register("password", {
                        required: true,
                      })}
                    />
                    {errors.password && (
                      <p className="error">This field is required</p>
                    )}
                  </div>


                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    //   disabled={userError}
                    >
                  Apply
                    </button>
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
  );
}

