import Joi from "joi-browser";

const StartPetitionSchema = {

    title: Joi.string().min(3).max(64).required(),
    description: Joi.string().min(6).max(1024).required(),
    goal: Joi.number().min(1).max(100000).required(),
};

export default StartPetitionSchema;
