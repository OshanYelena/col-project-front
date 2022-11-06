import React, { useState, useEffect } from "react";

import api from "./contact.js";

export const getData = async (e) => {
  let data = await api
    .get("/auth/user/loged", {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    })
    .then(({ data }) => data);
  console.log("ajsdhafdxsdaqi9s8d7tqrdx", data);
  if (data) return data;
};

export const existApplication = async (comId) => {
    console.log(comId)
  let data = await api
    .get("/student/job-application/submition", {
      headers: {
        "jobId": comId,
      },
    })
    .then(({ data }) => data);
    console.log(data)
  if (data === "No Application") {
    return true;
  } else {
    return false;
  }
};
