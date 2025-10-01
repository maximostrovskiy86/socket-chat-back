import Router from "express";
import { validateBody } from "../middlewares/validationMiddleware.js";
import { registerController, loginController } from "../controllers/authController.js";
import validation from "../validation/index.js";
import { createUserSchema } from "../validation/users.js";
import { loginUserSchema} from "../validation/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const authRouter = new Router();
// authRouter.post("/registration", validateBody, ctrlWrapper(authController));
authRouter.post("/registration", validateBody(createUserSchema), registerController);
authRouter.post("/login", validateBody(loginUserSchema), loginController);

export default authRouter;
