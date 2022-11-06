import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  studentDetails: {
    name: String,
    email: String,
    degree: String,
    university: String,
    address: String,
    studentId: String,
    nic: String,
    phoneNo: String,
  },
  jobStatus: String,
  studentId: String,
  companyId: String,
  cvUrl: String,
  jobId: String,
  submitedTime: Date,
});

const schema = mongoose.model("application", applicationSchema);

export { schema };
