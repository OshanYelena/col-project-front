import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { get, useForm } from "react-hook-form";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import parse from "html-react-parser";

import api from "../../api/contact";
import SvgLoaders from "../svg/svgLoaders";

import fb from "../../config/firebase";

import { getData } from "api/companydata";

// components

export default function CardAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   const onChange = data => console.log(data);

  const [editor, setEditors] = useState();
  const [jobDescription, setDes] = useState();
  const [upload, setUpload] = useState(true);
  const [submitted, setSubmitter] = useState(true);
  const [urloader, setUrloader] = useState(false);
  const [companyName, setComName] = useState("");
  const [companyId, setComId] = useState("");

  useEffect(async () => {
    htmlParser();
    const data = await getData();
    setComName(data.company.name);
    setComId(data._id);
  }, []);

  const addFormData = Object.freeze({
    jobType: "",
    jobCategory: "",
    jobTitle: "",
    payRate: "",
    time: "",
    flyerUrl: "",
    date: "",
  });

  const [addData, setAddData] = useState(addFormData);
  const Editor = dynamic(
    () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
    { ssr: false }
  );

  let htmlToDraft = null;
  if (typeof window === "object") {
    htmlToDraft = require("html-to-draftjs").default;
  }

  const htmlParser = () => {
    const html = "<p>Hey this <strong>editor</strong> rocks 😀</p>";
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditors(editorState);
    }
  };

  const onEditorStateChange = (editor) => {
    const htmlData = draftToHtml(convertToRaw(editor.getCurrentContent()));
    setDes(htmlData);
    setEditors(editor);
  };

  const handleFile = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    const ref = fb.storage().ref(`/images/${image.name}`);
    const uploadTask = ref.put(image);
    uploadTask.on("state_changed", console.log, console.error, () => {
      ref.getDownloadURL().then((url) => {
        console.log(url);
        setAddData({ flyerUrl: url });
      });

      setUrloader(true);
    });
  };

  const onSubmit = async (e) => {
    setUpload(false);
    let data = await api
      .post("/company/new/add", {
        addData,
        jobDescription,
        companyId,
        companyName,
      })
      .then(({ data }) => data);
    console.log(data);
    if (data.message === "Job Add Created") {
      console.log(data);
      setTimeout(() => {
        setUpload(false);
      }, 2000);
      setTimeout(() => {
        setSubmitter(false);
      }, 2001);
    } else {
      console.log("error");
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

  const reset = (e) => {
    console.log("asdafsgdvjh");
    e.preventDefault();
    setSubmitter(true);
    setUpload(true);
  };

  return (
    <>
      <div className=" relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        {upload && submitted ? (
          <>
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <button className="button-header bg-orange-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                  <h3 className="title">Job Application Form</h3>
                </button>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Job Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Job Title
                      </label>
                      <input
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        id="jobTitle"
                        placeholder="lucky.jesse"
                        type={"text"}
                        {...register("jobTitle", {
                          required: true,
                          onChange: onChange,
                        })}
                      />
                      {errors.jobTitle && (
                        <p className="error">This field is required</p>
                      )}
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Company Name
                      </label>
                      <input
                        disabled
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={companyName}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Job Category
                      </label>
                      <input
                        id="jobCategory"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={onChange}
                        placeholder="jesse@example.com"
                        type="text"
                        {...register("jobCategory", {
                          required: true,
                          onChange: onChange,
                        })}
                      />
                      {errors.jobCategory && (
                        <p className="error">This field is required</p>
                      )}
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Job Type
                      </label>
                      <input
                        id="jobType"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={onChange}
                        placeholder="jobType"
                        type="text"
                        {...register("jobType", {
                          required: true,
                          onChange: onChange,
                        })}
                      />
                      {errors.jobType && (
                        <p className="error">This field is required</p>
                      )}
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Time
                      </label>
                      <input
                        id="time"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={onChange}
                        placeholder="time"
                        type="text"
                        {...register("time", {
                          required: true,
                          onChange: onChange,
                        })}
                      />
                      {errors.time && (
                        <p className="error">This field is required</p>
                      )}
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Pay rate
                      </label>
                      <input
                        id="payRate"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        // onChange={onChange}
                        placeholder="payRate"
                        type="text"
                        {...register("payRate", {
                          required: true,
                          onChange: onChange,
                        })}
                      />
                      {errors.payRate && (
                        <p className="error">This field is required</p>
                      )}
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Flyer Uploader
                      </label>
                      <input
                        id="flyer"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={handleFile}
                        placeholder="flyer"
                        type="file"
                        {...register("flyer", {
                          onChange: handleFile,
                        })}
                      />
                      {errors.flyer && (
                        <p className="error">This field is required</p>
                      )}
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Date
                      </label>
                      <input
                        id="date"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={onChange}
                        placeholder="date"
                        type="text"
                        {...register("date", {
                          required: true,
                          onChange: onChange,
                        })}
                      />
                      {errors.date && (
                        <p className="error">This field is required</p>
                      )}
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Locations
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
                        id="address"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={onChange}
                        placeholder="address"
                        type="text"
                        {...register("address", {
                          required: true,
                          onChange: onChange,
                        })}
                      />
                      {errors.address && (
                        <p className="error">This field is required</p>
                      )}
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        City
                      </label>
                      <input
                        id="city"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={onChange}
                        placeholder="city"
                        type="text"
                        {...register("city", {
                          required: true,
                          onChange: onChange,
                        })}
                      />
                      {errors.city && (
                        <p className="error">This field is required</p>
                      )}
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Job Description
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="exampleTextarea1"
                      >
                        Job description view
                      </label>
                      <div id="dectription">
                        <div id="blockquote" required className="blockquote">
                          {parse(
                            `${
                              jobDescription ||
                              "<p>Hey this <strong>editor</strong> rocks 😀</p>"
                            }`
                          )}
                        </div>
                        <Editor
                          editorState={editor}
                          wrapperClassName="wrapper"
                          editorClassName="editor"
                          toolbarClassName="toolbar"
                          onEditorStateChange={onEditorStateChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <input type="submit" />
                {/* <button onClick={onSubmit} type="button" className="apply">
                  Create Add
                </button> */}
              </form>
            </div>
          </>
        ) : (
          <div className="text-align-center flex-auto px-4 lg:px-10 py-10 pt-0">
            {submitted ? (
              <>
                <h1 className="uploading">UPLOADING ...</h1>
                <SvgLoaders></SvgLoaders>
              </>
            ) : (
              <div className="">
                Job Post Submited
                <button className="apply" onClick={reset} type="button">
                  {" "}
                  Add Another Job Add
                </button>{" "}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
