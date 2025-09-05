import {createMessage, getMessages} from '../services/messageService.js';

export const getMessagesController = async (socket) => {
	const allMessages = await getMessages()
	socket.emit("GET_ALL_MESSAGE", allMessages);
}

export const createMessageController = async (socket) => {
	socket.on("CHAT_MESSAGE", async (message) => {
		
		const newMessage = await createMessage(message);
		
		socket.emit("CHAT_UPDATE", {message: newMessage});
	})
}

