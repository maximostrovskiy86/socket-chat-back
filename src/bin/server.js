import dotenv from 'dotenv';
import http from "http";
import {Server} from 'socket.io';
import app from "../app.js";
import {connectMongo} from "../db/connection.js";
import {getMessagesController, createMessageController} from "../controllers/messageController.js";
import {getAllUsersController, getOnlineUsers, changeUserById} from "../controllers/userController.js";
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
				console.log("DISCONNECT-1")
				socket.disconnect();
			}
			
			const user = await decodeJwt(verifyToken);
			
			// console.log("user", user)
			// get user from db by id and test for ban status
			if (!user || user.isBanned) {
				console.log("DISCONNECT-2")
				
				socket.disconnect(true);
				return;
			}
			
			const sockets = await io.fetchSockets();
			const exists = sockets.find((s) => s.user.id === user.id);
			
			if (exists) {
				console.log("DISCONNECT-3")
				exists.disconnect();
			}
			
			// await changeUserById(user.id, { isOnline: true });
			socket.user = user;
			next();
		});
		
		
		io.on('connection', async (socket) => {
			console.log('a user connected');
			await createMessageController(io, socket);
			await getMessagesController(socket);
			
			const sockets = await io.fetchSockets();
			const usersOnline = sockets.map(elem => elem?.user);
			
			const allUsers = await getAllUsersController(io, usersOnline);
			sockets.map((socket) => {
				if (socket.user.isAdmin) {
					socket.emit("GET_ALL_USERS", allUsers);
				}
			});
			await getOnlineUsers(io, usersOnline)
			
			socket.on("ON_MUTE", async ({ id, isMuted }) => {
				console.log("ID", id, "isMuted", isMuted)
				
				const user = await changeUserById(id, { isMuted: !isMuted });
				const s = await io.fetchSockets();
				const uOn = s.map(
					(elem) =>
						// console.log("elem.user", elem.user);
						elem.user
				);
				
				socket.emit("GET_ALL_USERS", await getAllUsersController(io, uOn));
				
				const sock = await io.fetchSockets();
				const exists = sock.find((s) => s.user.id === id);
				
				if (exists) {
					console.log("USER_UPDATE", user);
					exists.emit("USER_UPDATE", user);
				}
			});
			
			socket.on("BAN_USER", async ({ id, isBanned }) => {
				const sock = await io.fetchSockets();
				const exists = sock.find((s) => s.user.id === id);
				
				if (exists) {
					exists.disconnect();
				}
				
				// const s = await io.fetchSockets();
				// const uOn = s.map(
				//   (elem) =>
				//     // console.log("elem.user", elem.user);
				//     elem.user
				// );
				
				await changeUserById(id, { isBanned: !isBanned });
				try {
					const users = await getAllUsersController(io, usersOnline);
					socket.emit("GET_ALL_USERS", users);
				} catch (e) {
					socket.emit("GET_ALL_USERS_ERROR", e.message);
				}
				// socket.emit("GET_ALL_USERS", await getAllUsersController(usersOnline));
			});
			
			socket.on("disconnect", async () => {
				const socks = await io.fetchSockets();
				const uOnline = socks.map(
					(elem) =>
						// console.log("elem.user", elem.user);
						elem.user
				);
				console.log("DISCONECT-4")
				// send all list for admins
				io.emit("GET_ALL_USERS", await getAllUsersController(io, uOnline));
				// update users online after disconnect
				io.emit("GET_ONLINE_USERS", socks.map((s) => s.user));
			});
		});
	} catch (err) {
		console.error(`Failed to launch application with error: ${err.message}`);
	}
};

start();
