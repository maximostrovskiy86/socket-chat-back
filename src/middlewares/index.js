import { authMiddleware } from "./authMiddleware.js";
import { addUserValidation } from "./validationMiddleware.js";

const middleware = {
  authMiddleware,
  addUserValidation,
};
export default middleware;
