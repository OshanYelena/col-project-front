import React, { useState, useEffect } from "react";
import { useRouter } from "next/router.js";
import { Redirect } from "next";

import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

import api from "../../api/contact.js";

export default function Policy({ companyData, urls }) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [create, setCreate] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const router = useRouter();

  const onSubmit = async (e) => {
    const dataBody = {
      companyData: companyData,
      urls: urls,
    };

    let data = await api
      .post("/company/create/new", dataBody)
      .then(({ data }) => data);
    console.log(data);
    if (data.message === "Company Created") {
      router.push("/company/confirm/0293087426234242");
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
            <strong>Terms and Conditions</strong>
          </h3>
        </div>
        <ModalBody>
          {" "}
          <ul className="policy-text">
            <li>
              <i className="fas fa-solid fa-star text-red-500"></i>
              Your account will be accepted within 48hrs after a screening
              process by the admin panel.
            </li>
            <li>
              <i className="fas fa-solid fa-star  text-red-500"></i> You will be
              offered a one-month free trial and for the further continuation of
              the account, you will be charged a monthly subscription of 500
              LKR.
            </li>

            <li>
              {" "}
              <i className="fas fa-solid fa-star  text-red-500"></i> All the
              advertisements should be for ethically permissible job
              opportunities.
            </li>
            <li>
              <i className="fas fa-solid fa-star  text-red-500"></i> Your
              advertisements are only allowed to post after the admin panel
              approves.
            </li>
            <li>
              <i className="fas fa-solid fa-star  text-red-500"></i> Any job
              opportunity should not incorporate time shifts after 8 PM due to
              security concerns.
            </li>

            <li>
              <i className="fas fa-solid fa-star  text-red-500"></i> Admin panel
              has the authority to restrict your account after a considerable
              number of negative feedbacks.
            </li>
            <li>
              <i className="fas fa-solid fa-star  text-red-500"></i> You are
              solely responsible for the Privacy and security of your account,
              including passwords or sensitive information attached to that
              account.
            </li>
            <li>
              <i className="fas fa-solid fa-star  text-red-500"></i>
              All the information you provide to us through your account should
              be up-to-date, accurate and truthful. Further, you should update
              your information if it changes.
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
          {!create && (
            <button
              onClick={onSubmit}
              disabled={create}
              className="bg-orange-500 text-black active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
            >
              Create Account
            </button>
          )}
        </ModalFooter>
      </Modal>
    </>
  );
}
