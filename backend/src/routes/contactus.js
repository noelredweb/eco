const express = require("express");
const router = express.Router();
const contactusModel = require("../models/contactus.model");
const contactUsValidation = require("../validation/contactus.validation");
const CustomResponse = require("../classes/CustomResponse");
const sendEmail = require("../config/mailer");

const CONTACT_US_MANAGER_EMAIL = 'moreinis.nataliia@gmail.com';

router.post("/", async (req, res) => {
    try {
        const validatedValue = await contactUsValidation.validateContactUsSchema(
            req.body
        );

        await contactusModel.createContactUs(
            {
                fullName: validatedValue.fullName,
                message: validatedValue.message,
                email: validatedValue.email,
            }
        );

        await sendEmail({
            from: process.env.EMAIL_EMAIL,
            to: CONTACT_US_MANAGER_EMAIL,
            subject: "Contact Us Page",
            html: `
        <h1>FullName: ${validatedValue.fullName}</h1>
        <h1>Email: ${validatedValue.email}</h1>
        <h1>Message: ${validatedValue.message}</h1>
      `,
        }).catch((err) => {
            console.error(`Can't send the email to ${CONTACT_US_MANAGER_EMAIL}`)
        });

        res.json(
            new CustomResponse(CustomResponse.STATUSES.success, "new contactus created")
        );
    } catch (err) {
        console.error("err", err);
        res.status(401).json(err);
    }
});

module.exports = router;
