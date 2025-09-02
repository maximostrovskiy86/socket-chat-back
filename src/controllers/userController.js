import {getUsers} from "../services/userService.js";


export const getAllUsersController = async (io, socket) => {
	// console.log('socket', socket)
	const sockets = await io.fetchSockets();
	console.log("SSSockets", sockets.length)
	
	const usersOnline = sockets.map((elem) => {
		// console.log("elem.user", elem.user);
		
	})
	
	// console.log("sockets", sockets)
	socket.on("GET_ALL_USERS", async () => {
		const allUsers = await getUsers()
		// console.log("ALL_USERS", allUsers)
		socket.emit("GET_ALL_USERS", allUsers);
	})
}

