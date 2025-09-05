import {getUsers} from "../services/userService.js";

export const getAllUsersController = async (io, socket, usersOnline) => {
	const users = await getUsers();
	
	const sockets = await io.fetchSockets();
	
	const allExistsUsers = users.map((user) => ({
		...user.toObject(),
		isOnline: usersOnline.some((u) => u.id === user.id),
	}));
	
	
	sockets.map((socket) => {
		if (socket.user.isAdmin) {
			socket.emit("GET_ALL_USERS", allExistsUsers);
		}
	});
	
	// socket.on("GET_ALL_USERS", async () => {
	// 	// console.log("ALL_USERS", allUsers)
	// 	socket.emit("GET_ALL_USERS", allUsers);
	// })
}

export const getOnlineUsers = async (io, socket, usersOnline) => {
	io.emit("GET_ONLINE_USERS", usersOnline);
}

