import {createMessage, getMessages} from '../services/messageService.js';

export const getMessagesController = (socket) => {
	socket.on("GET_ALL_MESSAGE",async () => {
		const allMessages = await getMessages()
		socket.emit("GET_ALL_MESSAGE", allMessages);
	})
}

export const createMessageController = async (socket) => {
	socket.on("CHAT_MESSAGE", async (message) => {
		const newMessage = await createMessage(message);
		socket.emit("CHAT_UPDATE", {message: newMessage});
	})
}