import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    isOnline: {
      type: Boolean,
    },
    isBanned: {
      type: Boolean,
    },
    isMuted: {
      type: Boolean,
    },
    isAdmin: {
      type: Boolean,
    },
  },
  { versionKey: false, timestamps: true },
);

const UserModel = mongoose.model("Users", userSchema);

export default UserModel;
