import Joi from "joi";

export const addUserValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string()
      // .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    // console.log("ERROR", validationResult.error);
    // return res.status(403).json({ status: validationResult.error.details });
    return res.status(403).json({ status: validationResult.error.details });
  }
  next();
};
