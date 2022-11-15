import React, { useState } from "react";

import Select from "react-select";
import Policy from "components/popups/policy";
import { useForm } from "react-hook-form";

import Auth from "layouts/Auth.js";
import fb from "../../../config/firebase";

const options = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const Student = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const studentFormData = Object.freeze({
    name: "",
    gender: "",
    phoneNo: "",
    email: "",
    nic: "",
    address: "",
    studentId: "",
    degree: "",
    university: "",
    faculty: "",
    password: "",
  });

  const [studentData, submitStudentData] = useState(studentFormData);
  const [gender, setGender] = useState("");
  const [urls, setUrls] = useState("");
  const [upload, setUpload] = useState(false);
  const [pry, setPry] = useState(false);

  const onChange = async (e) => {
    e.preventDefault();
    submitStudentData({
      ...studentData,
      [e.target.id]: e.target.value,
    });
    console.log(studentData);
  };

  const selectType = (e) => {
    setGender(e.value);
  };

  const handleFile = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    const ref = fb.storage().ref(`/images/${image.name}`);
    const uploadTask = ref.put(image);
    uploadTask.on("state_changed", console.log, console.error, () => {
      ref.getDownloadURL().then((url) => {
        setUpload(true);
        console.log(url);
        setUrls(url);
      });

      // setUrloader(true);
    });
    setUpload(false);
  };

  const onSubmit = () => {
    setPry(true)
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-orange-500 text-lg font-bold">
                    Welcome to Student Registrations
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
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      onChange={onChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Name"
                      {...register("name", {
                        required: true,
                        onChange: onChange,
                      })}
                    />
                    {errors.name && (
                      <p className="error">This field is required</p>
                    )}
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      onChange={onChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
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
                     Phone No
                    </label>
                    <input
                      id="phoneNo"
                      type="text"
                      onChange={onChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="XXX - XXXXXXX"
                      {...register("phoneNo", {
                        required: true,
                        onChange: onChange,
                      })}
                    />
                    {errors.name && (
                      <p className="error">This field is required</p>
                    )}
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                    NIC No
                    </label>
                    <input
                      id="nic"
                      type="text"
                      onChange={onChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="NIC No"
                      {...register("nic", {
                        required: true,
                        onChange: onChange,
                      })}
                    />
                    {errors.nic && (
                      <p className="error">This field is required</p>
                    )}
                  </div>

                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Gender
                    </label>

                    <Select
                      id="gender"
                      className="no-svg border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      options={options}
                      onChange={selectType}
                    />
                    {/* {gender && (
                      <p className="error">This field is required</p>
                    )} */}

                    {/* <input
                      id="gender"
                      type="select"
                      onChange={onChange}
                      placeholder="Name"
                     
                    /> */}

                    {/* selection button */}
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      onChange={onChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Name"
                      {...register("address", {
                        required: true,
                        onChange: onChange,
                      })}
                    />
                    {errors.address && (
                      <p className="error">This field is required</p>
                    )}
                    {/* faculty and uni select dropdowns */}
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                    University Name
                    </label>
                    <input
                      id="university"
                      type="text"
                      onChange={onChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="University"
                      {...register("university", {
                        required: true,
                        onChange: onChange,
                      })}
                    />
                    {errors.university && (
                      <p className="error">This field is required</p>
                    )}
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                    Faculty
                    </label>
                    <input
                      id="faculty"
                      type="text"
                      onChange={onChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Faculty"
                      {...register("faculty", {
                        required: true,
                        onChange: onChange,
                      })}
                    />
                    {errors.faculty && (
                      <p className="error">This field is required</p>
                    )}
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                    Degree
                    </label>
                    <input
                      id="degree"
                      type="text"
                      onChange={onChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Degree "
                      {...register("degree", {
                        required: true,
                        onChange: onChange,
                      })}
                    />
                    {errors.degree && (
                      <p className="error">This field is required</p>
                    )}
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                     Student ID
                    </label>
                    <input
                      id="studentID"
                      type="text"
                      onChange={onChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="ID"
                      {...register("studentID", {
                        required: true,
                        onChange: onChange,
                      })}
                    />
                    {errors.studentID && (
                      <p className="error">This field is required</p>
                    )}
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Student Id
                    </label>
                    <div> Upload Your Student ID</div>
                    <input
                      id="idPhoto"
                      onChange={handleFile}
                      type="file"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Name"
                      {...register("idPhoto", {
                        required: true,
                        onChange: handleFile,
                      })}
                    />
                    {errors.idPhoto && (
                      <p className="error">This field is required</p>
                    )}
                  </div>
                  

                  {/* <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      photo
                    </label>
                    <input
                      id="photo"
                      onChange={onChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Name"
                    />
                  </div> */}

                  {/* <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Upload your CV
                    </label>
                    <input
                      id="cv"
                      onChange={onChange}
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Name"
                    />
                  </div> */}

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
                      onChange={onChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      {...register("password", {
                        required: true,
                        onChange: onChange,
                        minLength: 7
               
                      })}
                    />
                    {console.log(errors.password)}
                    {errors.password?.type === 'required' && (
                      <p className="error">This field is required</p>
                    )}
                     {errors.password?.type === 'minLength' && <p className="error">Password Should be more than 7 Characters</p>}

                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Re enter your password
                    </label>
                    <input
                      type="passwordRe"
                      // onChange={onChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      {...register("passwordRe", {
                        required: true,
                        // onChange: handleFile,
                      })}
                    />
                    {errors.passwordRe && (
                      <p className="error">This field is required</p>
                    )}
                  </div>
                  {pry && (
                    <div className="text-center mt-6">
                      <Policy
                        studentData={studentData}
                        gender={gender}
                        urls={urls}
                      />
                    </div>
                  )}

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

export default Student;

Student.layout = Auth;
