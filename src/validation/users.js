import Joi from "joi";

export const createUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});