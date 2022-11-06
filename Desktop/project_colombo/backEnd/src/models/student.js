import mongoose from "mongoose";

const studentScheam = new mongoose.Schema({
  studentDetails: {
    name: {
      type: String,
    },
    email: String,
    phoneNo: {
      type: String,
    },
    address: {
      type: String,
    },
    nic: String,
    studentID: String,
    degree: String,
    university: String,
    faculty: String,

    tokens: {
      hashPassword: String,
      type: String,
    },
  },
  urls: {
    type: String,
  },
  // urls: {
  //   photo: String,
  //   cv: String,
  // },
  gender: {
    type: String,
  },
  appliedJobs: [
  ],
  acceptedJobs: {
    jobAddId: String,
    companyId: String,
    jobName: String,
  },
  rejecredJobs: [
    {
      jobAddId: String,
    },
  ],
  created: Date,
  Updated: Date,
});

const schema = mongoose.model("student", studentScheam);

export { schema };
