const Joi = require("joi");

const firstNameRole = {
  firstName: Joi.string().min(2).max(50).trim().required(),
};
const lastNameRole = {
  lastName: Joi.string().min(2).max(50).trim().required(),
}
const emailRole = {
  email: Joi.string().email().min(6).max(255).trim().required(),
};
const petitionIdRole = {
  petitionId: Joi.string().hex().length(24).trim().required(),
};

const newSignatureSchema = Joi.object({
  ...firstNameRole,
  ...lastNameRole,
  ...emailRole,
  ...petitionIdRole,
});

const validateNewSignatureSchema = (data) => {
  return newSignatureSchema.validateAsync(data, { abortEarly: false });
};

module.exports = {
  validateNewSignatureSchema,
};
