import { schema as Student } from "../../models/student.js";
import { schema as Application } from "../../models/application.js";
import { schema as User } from "../../models/users.js";

import bcrypt from "bcrypt";

export const createStudent = async (req, res, next) => {
  const { studentData } = req.body;
  const data = req.body;

  const hashPassword = await bcrypt.hash(studentData.password, 10);

  if (studentData.password) {
    const newUser = new User({
      userName: studentData.name,
      userEmail: studentData.email,
      password: hashPassword,
      userType: "student",
    });

    const verifyUser = await newUser.save();
    if (verifyUser.userName === studentData.name) {
      const newStudent = new Student({
        studentDetails: data.studentData,
        gender: data.gender,
        urls: data.urls,
      });

      if (verify.studentDetails.name === data.studentData.name) {
        return res.status(200).send({
          message: "Student Created!",
        });
      } else {
        return res.status(500).send({
          message: "Student Creation failed",
        });
      }
    }
  }
};

export const getStudent = async (req, res, next) => {
  const studentId = req.header("studnt_id");
  if (!studentId)
    return res.send({
      message: "Student Id not found",
    });
  const student = await Student.findOne({ studentId: studentId });
  if (studentId) {
    res.status(200).send({ studentDetails: student });
  } else {
    res
      .status(404)
      .send({ message: "Student Details not found or Invalid student ID" });
  }
};

export const jobApply = async (req, res, next) => {
  const { studentDetails, jobId, comId, cvUrl, studentId } = req.body;

  const apply = new Application({
    submitedTime: Date.now(),
    studentDetails: studentDetails,
    jobId: jobId,
    companyId: comId,
    studentId: studentId,
    jobStatus: "pending",
    cvUrl: cvUrl,
  });

  const studentUpdate = await Student.findOne({
    "studentDetails.name": studentDetails.name,
  });
  if (studentUpdate) {
    const verifyUpdate = await studentUpdate.updateOne({
      $push: { appliedJobs: jobId },
    });
    if (verifyUpdate.modifiedCount === 1) {
      const verify = await apply.save();
      if (verify.studentDetails.name === studentDetails.name) {
        res.status(200).send({
          message: "application Submited",
        });
      } else {
        res.status(500).send({
          message: "Application submition failed",
        });
      }
    } else
      return res
        .status(522)
        .send({ message: "Application submited without addId" });
  } else
    return res
      .status(500)
      .send({ message: "Student Not Found! Process denied" });
};

export const statusUpdate = async (req, res, next) => {
  const { id, appliStatus } = req.body;

  const studentUpdate = await Application.findOne({ _id: id });
  const verifyUpdate = await studentUpdate.updateOne({
    $set: { jobStatus: appliStatus },
  });

  console.log(id);
};

export const applicationExist = async (req, res, next) => {
  const comId = req.header("jobId");
  console.log(comId);
  const addIdverification = await Student.find({ appliedJobs: comId });
  console.log(addIdverification);
  if (!addIdverification[0]) {
    return res.status(200).send("No Application");
  } else {
    return res.status(200).send({ message: "already applied" });
  }
};

export const getApplications = async (req, res, next) => {
  const companyId = req.header("companyId");
  const applications = await Application.find({ companyId: companyId });
  if (applications) {
    return res.status(200).send(applications);
  } else return res.status(422).send({ message: "Invalid CompanyId" });
};

export const getApplied = async (req, res, next) => {
  const studentId = req.header("studentId");
  const applications = await Application.find({ studentId: studentId });
  console.log(studentId);
  if (applications) {
    return res.status(200).send(applications);
  } else return res.status(422).send({ message: "Invalid student Id" });
};
