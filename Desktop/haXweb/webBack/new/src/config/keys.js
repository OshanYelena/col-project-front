import dotenv from "dotenv";

dotenv.config();

const Mongo_Url = process.env.Mongo_Url;
const PORT = process.env.PORT;

export { Mongo_Url, PORT };
