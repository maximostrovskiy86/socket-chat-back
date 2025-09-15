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
    const user = await User.findByIdAndUpdate(id, data, {
      new: true,
    });

    return user;
  } catch (e) {
    console.log(e.message);
  }
};
