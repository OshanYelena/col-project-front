import React, { useState } from "react";
import { useForm } from "react-hook-form";
import fb from "../../../config/firebase";

import Policy from "components/popups/policy_com";

import Auth from "layouts/Auth.js";

const Company = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const companyFormData = Object.freeze({
    name: "",
    website: "",
    phoneNo: "",
    email: "",
    address: "",
    password: "",
  });

  const [companyData, submitCompanyData] = useState(companyFormData);
  const [urls, setUrls] = useState("");
  const [pry, setPry] = useState(false);
  const [subButton, offButton] = useState();

  const handleFile = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    const ref = fb.storage().ref(`/images/${image.name}`);
    const uploadTask = ref.put(image);
    uploadTask.on("state_changed", console.log, console.error, () => {
      ref.getDownloadURL().then((url) => {
        // setUpload(true);
        console.log(url);
        setUrls(url);
      });

      // setUrloader(true);
    });
    // setUpload(false);
  };

  const onChange = async (e) => {
    e.preventDefault();
    submitCompanyData({
      ...companyData,
      [e.target.id]: e.target.value,
    });
    console.log(companyData);
  };

  const onSubmit = () => {
    setPry(true);
  };

  // const locationsData = Object.freeze({

  // });

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Welcome to Company Registrations
                  </h6>
                </div>

                <div className="btn-wrapper text-center">
                  {/* logo and icon */}
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Company Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      onChange={onChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="ABC Company"
                      {...register("name", {
                        required: true,
                        onChange: onChange,
                      })}
                    />
                    {errors.name && (
                      <p className="error">This field is required</p>
                    )}
                  </div>

                  <h4 className="mb-4"> Company Contact Details</h4>
                  <div className="p-3">
                    <div className="relative w-full mb-3 ">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        onChange={onChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="example@gmail.com"
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
                        Address (Main Company)
                      </label>
                      <input
                        id="address"
                        type="text"
                        required
                        onChange={onChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="address"
                        {...register("address", {
                          required: true,
                          onChange: onChange,
                        })}
                      />
                      {errors.address && (
                        <p className="error">This field is required</p>
                      )}
                    </div>

                    <div className="relative w-full mb-3 ">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Website Url
                      </label>
                      <input
                        id="website"
                        type="text"
                        required
                        onChange={onChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="www.example.com"
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Phone number
                      </label>
                      <input
                        id="phoneNo"
                        required
                        type="text"
                        onChange={onChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="xxx-xxxxxxxx"
                        {...register("phoneNo", {
                          required: true,
                          onChange: onChange,
                        })}
                      />
                      {errors.phoneNo && (
                        <p className="error">This field is required</p>
                      )}
                    </div>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Company Logo
                    </label>
                    <input
                      id="logo"
                      type="file"
                      required
                      onChange={handleFile}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="logo"
                      {...register("logo", {
                        required: true,
                        onChange: handleFile,
                      })}
                    />
                    {errors.logo && (
                      <p className="error">This field is required</p>
                    )}
                    {/* selection button */}
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      required
                      onChange={onChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      {...register("password", {
                        required: true,
                        minLength: 7,
                        onChange: onChange,
                      })}
                    />
                    {errors.password?.type === "required" && (
                      <p className="error">This field is required</p>
                    )}
                    {errors.password?.type === "minLength" && (
                      <p className="error">
                        Password Should be more than 7 Characters
                      </p>
                    )}
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Re enter your password
                    </label>
                    <input
                      type="text"
                      required
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    />
                  </div>
                  <div className="text-center mt-6">
                    {pry && <Policy companyData={companyData} urls={urls} />}
                  </div>
   
                    <input type="submit" />
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Company;

Company.layout = Auth;
