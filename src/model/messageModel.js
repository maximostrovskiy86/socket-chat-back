import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    message: {
      type: String,
      required: [true, "Topic is required"],
    },
  },
  { versionKey: false, timestamps: true },
);

const MessageModel = mongoose.model("Messages", messageSchema);

export default MessageModel;
