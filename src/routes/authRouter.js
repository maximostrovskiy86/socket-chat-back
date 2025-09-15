import Router from "express";
import { addUserValidation } from "../middleware/validationMiddleware.js";

import {
  authController,

} from "../controllers/authController.js";

const authRouter = new Router();
authRouter.post("/login", addUserValidation, authController);

export default authRouter;
