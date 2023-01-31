const Joi = require("joi");

const fullNameRole = {
  fullName: Joi.string().min(2).max(50).trim().required(),
};
const emailRole = {
  email: Joi.string().email().min(6).max(255).trim().required(),
};
const messageRole = {
  message: Joi.string().min(6).max(1000).trim().required(),
};

const contactUsSchema = Joi.object({
  ...fullNameRole,
  ...emailRole,
  ...messageRole,
});

const validateContactUsSchema = (data) => {
  return contactUsSchema.validateAsync(data, { abortEarly: false });
};

module.exports = {
  validateContactUsSchema,
};
