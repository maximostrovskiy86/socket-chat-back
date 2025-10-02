import { registerUser, loginUser } from "../services/authService.js";

export const registerController = async (req, res) => {
  const { email, password, username } = req.body;
  const user = await registerUser(email, password, username);
  
  res.status(201).json({
    status: 201,
    message: "Successfully registered a user!",
    ...user,
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await loginUser(email, password);
  
  res.json({
    status: 200,
    message: `Successfully login!`,
    ...user,
  });
};
