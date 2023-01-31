import Joi from "joi-browser";

const ContactSchema = {

    fullName: Joi.string().min(2).max(15).required(),
    email: Joi.string().min(6).max(64).email().required(),
    message: Joi.string().min(10).max(15).required(),

};

export default ContactSchema;