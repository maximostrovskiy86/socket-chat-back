import MessageModel from "../model/messageModel.js";

export const createMessage = async (message) => {
  try {
    return await MessageModel.create({
      username: message.username,
      message: message.message,
    });
  } catch (e) {
    console.log(e.message);
  }
};

export const getMessages = async () => {
  try {
    return await MessageModel.find().sort({ createdAt: 1 }).limit(200);
  } catch (e) {
    console.log(e.message);
  }
};

export const getMessage = async (username) => {
  try {
    const lastMessage = await MessageModel.findOne({ username }).sort({
      createdAt: -1,
    });

    return lastMessage;
  } catch (e) {
    console.log(e.message);
  }
};
