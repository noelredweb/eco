import Joi from "joi-browser";

const ForgotPasswordSchema = {
  email: Joi.string().min(6).max(64).email().required(),
};

export default ForgotPasswordSchema;
