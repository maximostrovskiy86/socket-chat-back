import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import User from "../db/models/userModel.js";
import { getToken } from "../helpers/getToken.js";

export const registerUser = async (email, password, username) => {
  let candidate = await User.findOne({ email });
  if (candidate) {
    throw createHttpError(409, 'Email in use');
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const isAdmin = (await User.countDocuments()) === 0;

  candidate = await User.create({
    email,
    username,
    password: hashPassword,
    isOnline: true,
    isAdmin: isAdmin,
    isBanned: false,
    isMuted: false,
  });

  return { userData: candidate, token: getToken(candidate) };
};


export const loginUser = async (email, password) => {
  let candidate = await User.findOne({ email }).select("+password");
  if (!candidate) {
    throw createHttpError(404, "Not found user!");
  }
  
  if (candidate.isBanned) {
    throw createHttpError(403, "User is banned!");
  }

  const isEqual = await bcrypt.compare(password, candidate.password);
  if (!isEqual) {
    throw createHttpError(401, "Wrong password!");
  }
  
  const token = getToken(candidate);
  
    if (!candidate.isOnline) {
      candidate = await User.findByIdAndUpdate(
        candidate._id,
        { isOnline: true },
        {
          new: true,
        },
      );
    }
  return { userData: candidate, token };
};