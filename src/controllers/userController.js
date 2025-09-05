import {getUsers, updateUser} from "../services/userService.js";

export const getAllUsersController = async (io, usersOnline) => {
	try {
		const users = await getUsers();
		return users.map((user) => ({
			...user.toObject(),
			isOnline: usersOnline.some((u) => u.id === user.id),
		}));
	} catch (e) {
		// res.status(400).json({ message: "Login error" });
		throw e;
	}
}

export const getOnlineUsers = async (io, usersOnline) => {
	io.emit("GET_ONLINE_USERS", usersOnline);
}

export const changeUserById = async (id, data) => {
	try {
		const user = await updateUser({ _id: id }, { ...data });
		// console.log("USER_UPADE", user, "")
		return user;
	} catch (e) {
		console.log("changeUserById:", e.message);
	}
};

