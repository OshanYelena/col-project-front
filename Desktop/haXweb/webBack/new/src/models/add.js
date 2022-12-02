import mongoose from "mongoose";

const addschema = new mongoose.Schema({
  jobId: {
    type: String,
  },
  companyId: String,
  companyName: String,
  data: {
    address: String,
    jobType: { type: String },
    time: String,
    date: String,
    jobCategory: { type: String },
    jobTitle: {
      type: String,
    },

    jobSpecification: String,
    payRate: String,
    urls: {
      flyer: String,
    },
  },
  jobDescription: String,
  update: {
    type: Date,
  },
  create: {
    type: Date,
  },
});

const schema = mongoose.model("add", addschema);

export { schema };
