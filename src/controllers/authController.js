import {registerUser, loginUser } from "../services/authService.js";

export const registerController = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    // console.log("REQBODY", req.body);
    const user = await registerUser(email, password, username);
    // console.log("data", {...user});
    // console.log("data-2", user);
    console.log("user", user);
    // if (!user) {
    //   return res.status(409).json({
    //     status: "error",
    //     code: 409,
    //     message: "Already exist",
    //   });
    // }
    
    res.status(201).json({
      status: 201,
      message: 'Successfully registered a user!',
      ...user,
    });
  } catch (e) {
    console.log(e.message);
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  // console.log("email", email);
  // console.log("password", password);
  
  const user = await loginUser(email, password);
  // console.log("USER", user);
  res.json({
    status: 200,
    message: `Successfully login! }`,
    ...user
  });
  
  

}
