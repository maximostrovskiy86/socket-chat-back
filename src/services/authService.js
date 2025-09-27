import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const getToken = (candidate) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) throw new Error("JWT_SECRET is not defined!");
  
  return jwt.sign(
    {
      username: candidate.username,
      id: candidate.id,
      createdAt: candidate.createdAt,
      isBanned: candidate.isBanned,
      isMuted: candidate.isMuted,
      isAdmin: candidate.isAdmin,
    },
    secret,
  );
};

export const login = async (username, password) => {
  try {
    let candidate = await User.findOne({ username }).select("+password");

    if (!candidate) {
      const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      const isAdmin = (await User.countDocuments()) === 0;
      
      candidate = await User.create({
        username,
        password: hashPassword,
        isOnline: true,
        isAdmin: isAdmin,
        isBanned: false,
        isMuted: false,
      });

      return { userData: candidate, token: getToken(candidate) };
    }

    if (candidate.isBanned) {
      return false;
    }

    if (!(await bcrypt.compare(password, candidate.password))) {
      new Error("Wrong password");
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
  } catch (e) {
    console.log(e.message);
  }
};
