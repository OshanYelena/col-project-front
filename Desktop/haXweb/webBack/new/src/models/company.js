import mongoose from "mongoose";

const comapnySchema = new mongoose.Schema({
  company: {
    name: {
      type: String,
    },
    userType: {
      type: String,
    },
    companyId: {
      type: String,
    },

    phoneNo: String,
    email: String,
    website: String,
    address: String,
  },
  created: {
    type: Date,
  },
  updated: {
    type: Date,
  },
  urls: {
    type: String,
    // flyer: String,
    // logo: String,
  },
});

const schema = mongoose.model("company", comapnySchema);

export { schema };
