import Joi from "joi-browser";

const LogInSchema = {
  email: Joi.string().min(6).max(64).email().required(),
  password: Joi.string().min(6).max(1024).required(),
};

export default LogInSchema;
