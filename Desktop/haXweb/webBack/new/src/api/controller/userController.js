import { schema as Users } from "../../models/users.js";
import { schema as Student } from "../../models/student.js";
import { schema as Company } from "../../models/company.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  "asdfr25re672eoyt2geowyftwfiwvsio;di;sulygfcsbo0wue8776we6r5evwb0wiu7r6dcfvdgbh";

export const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ userEmail: email }).lean();

  if (!user)
    return res.send({
      message: "User Not Found!",
    });

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { id: user._id, username: user.userName, type: user.userType },
      JWT_SECRET
    );

    return res.status(200).send({ data: token, type: user.userType });
  } else {
    return res.send({
      message: "Invalid Email or Password",
    });
  }
};

export const getUserDetails = async (req, res, next) => {
  const authorization = req.header("auth-token");
  const auth = jwt.verify(authorization, JWT_SECRET);


  if (auth.type === "student") {
    const user = await Student.findOne({
      "studentDetails.name": auth.username,
    });

    if (user) return res.status(200).send(user);
  } else {
    const user = await Company.findOne({ "company.name": auth.username });
    if (user) return res.status(200).send(user);
  }

  // res.status(200).send({ userId: auth.id, userName: auth.username });
};

export const userLogout = async (req, res, next) => {
  const authorization = req.header("auth-token");
  const auth = jwt.verify(authorization, JWT_SECRET);

  if (auth) res.status(200).send({message: "logOut"});
};
