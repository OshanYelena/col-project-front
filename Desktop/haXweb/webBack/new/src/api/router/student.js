import express from "express";
const router = express();

import {
  createStudent,
  jobApply,
  applicationExist,
  getApplications,
  getApplied,
  statusUpdate
} from "../controller/studentController.js";

router.post("/student/new", createStudent);
router.post("/student/job-application", jobApply);
router.get("/student/job-application/submition", applicationExist);
router.get("/student/applications", getApplications);
router.get('/student/submitted/applications', getApplied);

router.post('/student/application/status',statusUpdate)
export { router };
