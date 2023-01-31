const express = require("express");
const router = express.Router();
const signaturesModel = require("../models/signatures.model");
const petitionsModel = require("../models/petitions.model");
const signaturesValidation = require("../validation/signatures.validation");
const CustomResponse = require("../classes/CustomResponse");
const loggedinMiddleware = require("../middleware/loggedin.middleware");
const sendEmail = require("../config/mailer");

router.post("/create", loggedinMiddleware, async (req, res) => {
    try {
        const validatedValue = await signaturesValidation.validateNewSignatureSchema(
            req.body
        );

        await signaturesModel.createSignature(
            {
                firstName: validatedValue.firstName,
                lastName: validatedValue.lastName,
                email: validatedValue.email,
                petitionId: validatedValue.petitionId,
                userId: req.userData?._id,
            }
        );

        await petitionsModel.increasePerformance(validatedValue.petitionId)

        const link = `http://localhost:3000/petitions/${validatedValue.petitionId}`

        await sendEmail({
            from: process.env.EMAIL_EMAIL,
            to: validatedValue.email,
            subject: "Thanks for your support",
            html: `
        <h1>Dear: ${validatedValue.firstName} ${validatedValue.lastName}</h1>
        <h1>Thanks you've signed the petition <a href="${link}">Link</a></h1>
        <p> Best Regards </p>
        <p> Eco </p>
      `,
        }).catch((err) => {
            console.error(`Can't send the email to ${validatedValue.email}`)
        });

        res.json(
            new CustomResponse(CustomResponse.STATUSES.success, "new signature created")
        );
    } catch (err) {
        console.error("err", err);
        res.status(401).json(err);
    }
});

module.exports = router;
