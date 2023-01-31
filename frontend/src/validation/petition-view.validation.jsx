import Joi from "joi-browser";

const PetitionViewSchema = {

    firstName: Joi.string().min(2).max(15).required(),
    lastName: Joi.string().min(2).max(15).required(),
    email: Joi.string().min(6).max(64).email().required(),

};

export default PetitionViewSchema;
