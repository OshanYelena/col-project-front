import axios from "axios";

export default axios.create({
    // baseURL: "https://col-back.herokuapp.com/api/v1",
    baseURL: "http://localhost:3002/api/v1"
  });
  