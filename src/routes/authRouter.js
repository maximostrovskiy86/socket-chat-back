import Router from "express";
import { addUserValidation } from "../middlewares/validationMiddleware.js";
import { authController } from "../controllers/authController.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const authRouter = new Router();
authRouter.post("/login", addUserValidation, ctrlWrapper(authController));
// authRouter.post("/login", ctrlWrapper(authController));

export default authRouter;
