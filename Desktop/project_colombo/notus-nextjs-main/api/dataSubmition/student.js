import React, { useState, useEffect } from "react";
import { useRouter } from "next/router.js";

import api from "../contact.js";



export const onSubmit = async (e) => {
    const router = useRouter();

  console.log(studentData);
  let data = await api
    .post("/student/new", studentData.studentData)
    .then(({ data }) => data);
  console.log(data);
  if (data.message === "Student Created!") {
    router.push("/student/confirm/0293087426234242");
  } else {
    console.log("error");
  }
};
