import {
  createMessage,
  getMessages,
  getMessage,
} from "../services/messageService.js";
import UserModel from "../model/userModel.js";

export const getMessagesController = async (socket) => {
  const allMessages = await getMessages();
  socket.emit("GET_ALL_MESSAGES", allMessages);
};

export const getLastMessage = async (username) => {
  return await getMessage(username);
};

export const createMessageController = async (io, socket) => {
  socket.on("CHAT_MESSAGE", async (message) => {
    const { isMuted } = await UserModel.findById(socket.user.id);
    
    // const last = await getLastMessage(message.username);
    // const dateNow = new Date().getTime();
    // const timeLastMessage = last
    //   ? last.createdAt.getTime()
    //   : new Date("1970-01-11").getTime();
    // const isSuccessMessage = dateNow - timeLastMessage;

    if (isMuted || message.message.trim().length > 200) {
      return false;
    }

    const newMessage = await createMessage(message);

    io.emit("CHAT_UPDATE", { message: newMessage });
  });
};
