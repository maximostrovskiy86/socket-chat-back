import dotenv from 'dotenv';
import http from "http";
import { Server } from 'socket.io';
import app from "../app.js";

import { createServer } from 'node:http';
import {connectMongo} from "../db/connection.js";

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
		
		io.on('connection', async (socket) => {
			console.log('a user connected');
			// console.log('socket', socket);
			// console.log('socket.id', socket.id);
			
			socket.on("CHAT_MESSAGE", async (message) => {
				console.log("Message", message)
				// io.emit("CHAT_MESSAGE", message);
			})
		});
	} catch (err) {
		console.error(`Failed to launch application with error: ${err.message}`);
	}
};

start();
