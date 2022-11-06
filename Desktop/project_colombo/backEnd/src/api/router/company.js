import express from "express";
const router = express();

import {
  getCompanies,
  getComapny,
  createCompany,
  updateComapny,
  createJobAdd,
  editAdd,
  deleteAdd,
  getJobPosts,
  getAllJobPosts,
  getJobPost
} from "../controller/companyController.js";

router.get("/companies", getCompanies);
router.get("/company/:id", getComapny);
router.get('/company/job/adds', getJobPosts);
router.get('/company/job/all-adds', getAllJobPosts);
router.get('/company/job/add', getJobPost);

router.post("/company/new", createCompany);


router.put("/company/:id", updateComapny);
router.post("/company/new-add", createJobAdd);
router.put("/company/add/:id", editAdd);
router.delete("/company/add/:id", deleteAdd);

export { router };
