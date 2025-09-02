import MessageModel from "../model/messageModel.js";


export const createMessage = async (message) => {
	console.log("MES", message)
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
		return await MessageModel.find().sort({createdAt: -1,}).limit(20);
	} catch (e) {
		console.log(e.message);
	}
};