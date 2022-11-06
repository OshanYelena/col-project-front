import express from 'express';
const app = express();

import bodyParser from 'body-parser';
import cors from 'cors';
import Mongoose from 'mongoose';


app.use(cors());


import { Mongo_Url } from "./config/keys.js"





app.use(bodyParser.json());


import { router as company }  from "./api/router/company.js";
import { router as student } from "./api/router/student.js"
import { router as user } from "./api/router/user.js"

app.use('/api/v1/',student);
app.use('/api/v1/',company)
app.use('/api/v1/auth', user)









Mongoose.connect(
    Mongo_Url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (error) => {
      if (!error) {
        console.log("Success");
      } else {
        console.log(error);
      }
    }
  );



export default app;