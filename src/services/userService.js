import User from "../model/userModel.js";

export const getUsers = async () => {
	try {
		return await User.find();
		
	} catch (e) {
		console.log(e.message);
	}
};

export const updateUser = async ({ _id: id }, data) => {
	try {
		// const data = {isBanned: ! isBanned}
		// console.log("DATA", data);
		// const user = await User.findOneAndUpdate({ _id: id }, { $set: data });
		
		const user = await User.findByIdAndUpdate(id, data, {
			new: true,
		});
		
		// console.log("USER_UPADE", user);
		return user;
	} catch (e) {
		res.status(400).json({ message: "Error user update" });
	}
};