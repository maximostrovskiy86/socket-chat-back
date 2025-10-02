import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    username: {
      type: String,
      unique: true,
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

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const UserModel = mongoose.model("Users", usersSchema);

export default UserModel;
