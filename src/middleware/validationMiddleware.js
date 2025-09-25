import Joi from "joi";
import createHttpError from 'http-errors';

export const addUserValidation = () => async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().required(),
  });

  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });

    next();
  } catch (err) {
    const error = createHttpError(400, "Bad Request", {
      errors: err.details,
    });
    next(error);
  }
};
