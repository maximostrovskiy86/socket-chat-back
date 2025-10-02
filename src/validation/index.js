import { loginUserSchema } from "./auth.js";
import { createUserSchema } from "./users.js";

const validation= { loginUserSchema, createUserSchema };

export default validation;