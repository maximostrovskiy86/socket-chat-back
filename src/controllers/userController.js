import { getUsers, updateUser } from "../services/userService.js";

export const getAllUsersController = async (io, usersOnline) => {
  try {
    const users = await getUsers();
    return users.map((user) => ({
      ...user.toObject(),
      isOnline: usersOnline.some((u) => u.id === user.id),
    }));
  } catch (e) {
    console.log("changeUserById:", e.message);
  }
};

export const getOnlineUsers = async (io, usersOnline) => {
  io.emit("GET_ONLINE_USERS", usersOnline);
};

export const  getUserByIdAndUpdate = async (id, data) => {
  try {
    return await updateUser({ _id: id }, { ...data });

  } catch (e) {
    console.log("changeUserById:", e.message);
  }
};
