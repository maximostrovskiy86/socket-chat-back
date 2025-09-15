import { login } from "../services/authService.js";

export const authController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const data = await login(username, password);
    if (!data) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Already exist",
      });
    }

    res.json({
      status: "success",
      ...data,
    });
  } catch (e) {
    console.log(e.message);
  }
};
