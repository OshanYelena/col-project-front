import { schema as Company } from "../../models/company.js";
import { schema as JobAdd } from "../../models/add.js";
import { schema as User } from "../../models/users.js";

import bcrypt from "bcrypt";

export const getCompanies = async (req, res, next) => {
  try {
    const comapnies = await Company.find();
    res.status(200).send({
      comapnies: comapnies,
    });
  } catch (err) {
    if (err) {
      next(err);
    }
  }
};

export const getComapny = async (req, res, next) => {
  const id = req.header("companyId");
  if (!id) {
    return res.status(422).send({
      errorMessage: "Company id is not found",
    });
  }
  const company = await Company.find({ companyId: id });
  if (!company) {
    return res.status(404).send({
      message: "Invalid comapny id",
    });
  }
  return res.status(200).send({
    company: company,
  });
};

export const getJobPosts = async (req, res, next) => {
  try {
    const companyId = req.header("companyName");
    console.log(companyId);
    if (companyId) {
      const jobPosts = await JobAdd.find({
        "data.CompanyName": "abstrgo_1A",
      }).sort({ create: -1 });
      console.log(jobPosts);
      if (jobPosts) {
        return res.status(200).send({
          jobPosts: jobPosts,
        });
      } else {
        return res.status(500).send({ message: "Company Name not Found" });
      }
    }
  } catch (err) {
    if (err) {
      console.log(err);
      next(err);
    }
  }
};

export const getAllJobPosts = async (req, res, next) => {
  try {
    const jobPosts = await JobAdd.find();
    if (jobPosts) return res.status(200).send({ jobPosts: jobPosts });
  } catch (err) {
    if (err) {
      console.log(err);
      next(err);
    }
  }
};

export const getJobPost = async (req, res, next) => {
  const id = req.header("jobAddId");

  if (!id) {
    return res.status(422).send({
      errorMessage: "Job id is not found",
    });
  }
  const company = await JobAdd.find({ _id: id });
  if (!company) {
    return res.status(404).send({
      message: "Invalid Add  Id",
    });
  }
  return res.status(200).send({
    company: company[0],
  });
};

export const createCompany = async (req, res, next) => {
  const { companyData, urls } = req.body;

  const hashPassword = await bcrypt.hash(companyData.password, 10);

  const user = new User({
    userName: companyData.name,
    userEmail: companyData.email,
    password: hashPassword,
    userType: "company",
  });

  const verifyUser = await user.save();
  if (verifyUser.userName === companyData.name) {
    const newComapny = new Company({
      company: companyData,
      urls: urls,
      updated: Date.now(),
    });
    const confirm = await newComapny.save();

    if (confirm.company.name === companyData.name) {
      return res.status(200).send({
        message: "Company Created",
      });
    } else {
      return res.status(422).send({
        message: "Company Creation failed",
      });
    }
  } else {
    return res.status(500).send({
      message: "error Occur",
    });
  }
};

export const updateComapny = async (req, res, next) => {
  const companyId = req.body.companyId;
  const comapny = await Company.findOne({ companyId: companyId });
  if (!comapny) return res.status(422).send({ message: "Invalid Comapny Id" });

  const update = comapny.update({});
};

export const createJobAdd = async (req, res, next) => {
  const { addData, jobDescription, companyName, companyId } = req.body;

  const jobPost = new JobAdd({
    data: addData,
    companyId: companyId,
    companyName: companyName,
    jobDescription: jobDescription,
    create: Date.now(),
  });
  const verify = await jobPost.save();

  if (verify.data.jobTitle === addData.jobTitle) {
    return res.status(200).send({
      message: "Job Add Created",
    });
  } else {
    return res.status(500).send({
      message: "Job add creation failed",
    });
  }
};

export const editAdd = async (req, res, next) => {
  const addId = req.header("add_id");
  if (!addId) return res.status(422).send("Job Add ID required");
  const editAdd = await JobAdd.findOne({ jobAddId: addId });

  if (editAdd) {
    const update = await editAdd.update({});
  }
};

export const deleteAdd = async (req, res, next) => {
  const addId = req.header("add_id");

  const removeAdd = await JobAdd.deleteOne({ jobAddId: addId });
  if (removeAdd.deletedCount !== 0) {
    return res.status(200).send({
      message: "forum Deleted",
    });
  } else {
    return res.status(500).send({
      message: "forum not deleted! Plz try again later",
    });
  }
};
