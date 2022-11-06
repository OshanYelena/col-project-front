import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    reqired: true,
    unique: true,
  },
  userEmail: {
    type: String,
    reqired: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String
  },
  userTags: {
    blackList: Boolean,
    review: String,
  },
});

const schema = mongoose.model("user", userSchema);

export { schema };
