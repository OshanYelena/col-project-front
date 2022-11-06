import React, { useState, useEffect } from "react";
import { useRouter } from "next/router.js";
import { Redirect } from "next";

import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

import api from "../../api/contact.js";

export default function Policy({studentData, gender, urls}) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [create, setCreate] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const router = useRouter();

  const onSubmit = async (e) => {
    const dataBody = {
      studentData: studentData,
      gender: gender,
      urls: urls,
      password: studentData.password
    };
    let data = await api
      .post("/student/new", dataBody)
      .then(({ data }) => data);
    console.log(data);
    if (data.message === "Student Created!") {
      router.push("/student/confirm/0293087426234242");
    } else {
      console.log("error");
    }
  };

  const onChange = (e) => {
    if (e.target.checked === true) {
      setCreate(false);
    } else {
      setCreate(true);
    }
  };

  return (
    <>
      <button
        className="bg-orange-500 text-black active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setModalOpen(!modalOpen)}
      >
        Create Account
      </button>
      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className=" modal-header ">
          <h3 className="" id="">
            <strong>Privacy and Policy</strong>
          </h3>
        </div>
        <ModalBody>
          {" "}
          <ul className="policy-text">
            <li>
              <i className="fas fa-circle">
                You must be an undergraduate at a state university in Sri Lanka,
                and you must verify it by uploading a photo of your university
                identity card.
              </i>
            </li>
            <li>
              <i className="fas fa-circle">
                Your account will be accepted within 48 hours after a screening
                process by the admin panel.{" "}
              </i>
            </li>

            <li>
              {" "}
              <i className="icon fas fa-circle">
                {" "}
                You will receive an email once the account is accepted.{" "}
              </i>
            </li>
            <li>
              <i className="fas fa-circle">
                It is your responsibility to provide genuine and accurate
                information.{" "}
              </i>
            </li>
            <li>
              <i className="fas fa-circle">
                If the admin panel finds that your information is not true, your
                account will be restricted.{" "}
              </i>
            </li>

            <li>
              <i className="fas fa-circle">
                You won’t be charged any amount for using our services.{" "}
              </i>
            </li>
            <li>
              <i className="fas fa-circle">
                Once you accept the part-time job, you have to do that work. You
                cannot skip it. Otherwise, the admin panel will be restricted
                your account.{" "}
              </i>
            </li>
          </ul>
          <div className="mt-10">
            <label className="inline-flex items-center  cursor-pointer">
              <input
                id="customCheckLogin"
                type="checkbox"
                style={{ backgroundColor: "orange" }}
                onChange={onChange}
                className="form-checkbox border-0 rounded  text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
              />
              <span className="ml-2 text-sm font-semibold text-blueGray-600">
                I agree with the{" "}
                <a
                  href="#pablo"
                  className="text-lightBlue-500"
                  onClick={(e) => e.preventDefault()}
                >
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="bg-red-500 text-black active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            Close
          </button>
          <button
            onClick={onSubmit}
            disabled={create}
            className="bg-orange-500 text-black active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="submit"
          >
            Create Account
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}
