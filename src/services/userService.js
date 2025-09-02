import User from "../model/userModel.js";

export const getUsers = async () => {
	try {
		return await User.find();
		
	} catch (e) {
		console.log(e.message);
	}
};