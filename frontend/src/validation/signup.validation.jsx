import Joi from "joi-browser";

const SignUpSchema = {
  
  email: Joi.string().min(6).max(64).email().required(),
  password: Joi.string().min(6).max(1024).required(),
  name: Joi.string().min(2).max(255).required(),
};

export default SignUpSchema;
