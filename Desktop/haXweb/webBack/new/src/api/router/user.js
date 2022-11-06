import express from "express";

const router = express();

import { userLogin, getUserDetails, userLogout } from "../controller/userController.js";

router.post("/user/login", userLogin);
router.get("/user/log-out", userLogout);
router.get('/user/loged', getUserDetails);

export { router };
