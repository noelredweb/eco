const Joi = require("joi");

const emailRole = {
  email: Joi.string().email().min(6).max(255).trim().required(),
};
const passwordRole = {
  password: Joi.string()
    .regex(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
      )
    )
    .required(),
};
const nameRole = {
  name: Joi.string().min(2).max(255).alphanum().trim().required(),
};

const signupSchema = Joi.object({
  ...emailRole,
  ...passwordRole,
  ...nameRole,
});
const loginSchema = Joi.object({
  ...emailRole,
  ...passwordRole,
});

const forgotPasswordSchema = Joi.object({
  ...emailRole,
});

const validateSignupSchema = (data) => {
  return signupSchema.validateAsync(data, { abortEarly: false });
};
const validateLoginSchema = (data) => {
  return loginSchema.validateAsync(data, { abortEarly: false });
};

const validateForgotPasswordSchema = (data) => {
  return forgotPasswordSchema.validateAsync(data, { abortEarly: false });
};

module.exports = {
  validateSignupSchema,
  validateLoginSchema,
  validateForgotPasswordSchema,
};
