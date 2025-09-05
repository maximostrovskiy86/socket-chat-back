import dotenv from 'dotenv';
import http from "http";
import {Server} from 'socket.io';
import app from "../app.js";
import {connectMongo} from "../db/connection.js";
import {getMessagesController, createMessageController} from "../controllers/messageController.js";
import {getAllUsersController, getOnlineUsers} from "../controllers/userController.js";
import {decodeJwt} from "../helpers/decodeJwt.js";

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
		
		io.use(async (socket, next) => {
			const verifyToken = socket.handshake.auth.token;
			
			if (!verifyToken) {
				socket.disconnect();
			}
			
			const user = decodeJwt(verifyToken);
			
			// console.log("user", user)
			
			if (!user || user.isBanned) {
				socket.disconnect(true);
				return;
			}
			
			// get user from db by id and test for ban status
			const sockets = await io.fetchSockets();
			const exists = sockets.find((s) => s.user.id === user.id);
			
			if (exists) {
				exists.disconnect();
			}
			
			// await changeUserById(user.id, { isOnline: true });
			socket.user = user;
			next();
		});
		
		
		io.on('connection', async (socket) => {
			console.log('a user connected');
			createMessageController(socket);
			getMessagesController(socket);
			
			const sockets = await io.fetchSockets();
			
			const usersOnline = sockets.map((elem) => {
				// console.log("elem.user", elem);
				return elem.user;
			})
			// console.log("USERS ONLINE", usersOnline)
			
			getAllUsersController(io, socket, usersOnline);
			getOnlineUsers(io, socket, usersOnline)
			
		});
	} catch (err) {
		console.error(`Failed to launch application with error: ${err.message}`);
	}
};

start();
