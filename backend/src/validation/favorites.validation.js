const Joi = require("joi");

const valueRole = {
  value: Joi.bool(),
}
const shouldIncreaseRole = {
  shouldIncrease: Joi.bool(),
};
const petitionIdRole = {
  petitionId: Joi.string().hex().length(24).trim().required(),
};

const favoriteSchema = Joi.object({
  ...valueRole,
  ...shouldIncreaseRole,
  ...petitionIdRole,
});

const validateFavoriteSchema = (data) => {
  return favoriteSchema.validateAsync(data, { abortEarly: false });
};

module.exports = {
  validateFavoriteSchema,
};
