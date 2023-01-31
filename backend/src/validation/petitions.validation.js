const Joi = require("joi");

const titleRole = {
  title: Joi.string().min(2).max(255).trim().required(),
};
const descriptionRole = {
  description: Joi.string().trim().min(1).max(16000).required(),
};
const imageRole = {
  image: Joi.any()
};

const goalRole = {
  goal: Joi.number().min(1),
};

const newPetitionSchema = Joi.object({
  ...titleRole,
  ...descriptionRole,
  ...imageRole,
  ...goalRole,
});

const validateNewPetitionSchema = (data) => {
  return newPetitionSchema.validateAsync(data, { abortEarly: false });
};

module.exports = {
  validateNewPetitionSchema,
};
