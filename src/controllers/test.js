import bcrypt from "bcrypt";
import User from "../model/userModel.js";
import Role from "../model/roleModel.js";
import { login } from "../services/authService.js";

export const authController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const candidate = await User.findOne({ username });

    if (candidate) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Already exist",
      });
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const userRole = await Role.findOne({ value: "USER" });

    const user = await User.create({
      username,
      password: hashPassword,
      roles: [userRole.value],
    });

    res.json({
      status: "201 Created",
      message: "Success registration",
      "Content-Type": "application/json",
      user,
    });
  } catch (e) {
    // console.log(e);
    res.status(400).json({ message: "Login error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    // console.log(users);
    res.json({
      status: "success",
      code: 200,
      users,
    });
  } catch (e) {
    res.status(400).json({ message: "Login error" });
  }
};

//   async getUsers(req, res) {
//     try {
//       // const userRole = new Role();
//       // const adminRole = new Role({ value: "ADMIN" });
//       // await userRole.save();
//       // await adminRole.save();
//
//       res.json("SERVER WORK");
//     } catch (e) {
//       console.log(e);
//     }
//   }
// }
