import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const decodeJwt = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    console.log("TOKEN WRONG", e.message);
    return false;
  }
};
