import dotenv from 'dotenv';
import http from "http";
import { Server } from 'socket.io';
import app from "../app.js";
import {connectMongo} from "../db/connection.js";
import { getMessagesController, createMessageController } from "../controllers/messageController.js";
import { getAllUsersController} from "../controllers/userController.js";

const server = http.createServer(app);
export const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

dotenv.config();
const PORT = process.env.PORT || 10000;


const start = async () => {
	try {
		await connectMongo();
		
		server.listen(PORT, (err) => {
			if (err) console.error('Error at server.js launch:', err);
			console.log(`Server works at port !!!!!!!!!!!${PORT}!`);
		});
		
		
		
		io.on('connection',  (socket) => {
			console.log('a user connected');
			// console.log('socket', socket);
			createMessageController(socket)
			getMessagesController(socket);
			getAllUsersController(io, socket);
		});
	} catch (err) {
		console.error(`Failed to launch application with error: ${err.message}`);
	}
};

start();
