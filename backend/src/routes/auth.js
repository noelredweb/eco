const express = require("express");
const router = express.Router();
const usersModule = require("../models/users.model");
const usersValidation = require("../validation/users.validation");
const bcrypt = require("../config/bcrypt");
const CustomResponse = require("../classes/CustomResponse");
const jwt = require("../config/jwt");
const sendEmail = require("../config/mailer")
const { generateNewPassword } = require("../util/auth");

router.post("/signup", async (req, res) => {
  try {
    const validatedValue = await usersValidation.validateSignupSchema(req.body);
    const usersData = await usersModule.selectUserByEmail(validatedValue.email);
    if (usersData?.length > 0) {
      throw new CustomResponse(
        CustomResponse.STATUSES.fail,
        "email already exist"
      );
    }
    const hashedPassword = await bcrypt.createHash(validatedValue.password);
    await usersModule.insertUser(
      validatedValue.name,
      validatedValue.email,
      hashedPassword,
    );
    const token = await jwt.generateToken({
      email: validatedValue.email,
    });
    res.json(new CustomResponse(CustomResponse.STATUSES.success, token));
  } catch (err) {
    console.error("err", err);
    res.json(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const validatedValue = await usersValidation.validateLoginSchema(req.body);
    const usersData = await usersModule.selectUserByEmail(validatedValue.email);
    if (usersData?.length <= 0) {
      throw new CustomResponse(
        CustomResponse.STATUSES.fail,
        "invalid email and/or password"
      );
    }
    const hashRes = await bcrypt.cmpHash(
      validatedValue.password,
      usersData[0].password
    );
    if (!hashRes) {
      throw new CustomResponse(
        CustomResponse.STATUSES.fail,
        "invalid email and/or password"
      );
    }
    const token = await jwt.generateToken({
      email: usersData[0].email,
    });
    res.json(new CustomResponse(CustomResponse.STATUSES.success, token));
  } catch (err) {
    console.error("err", err);
    res.json(err);
  }
});

router.post("/forgot-password", async (req, res) => {

  try {
    const validatedValue = await usersValidation.validateForgotPasswordSchema(req.body);

    res.json(new CustomResponse(CustomResponse.STATUSES.success));

    const usersData = await usersModule.selectUserByEmail(validatedValue.email);
    if (usersData?.length <= 0) {
      console.error("the user doesn't exist", validatedValue.email);
    }
    
    const newPassword = generateNewPassword()
    const hashedPassword = await bcrypt.createHash(newPassword);

    await usersModule.updatePassword(usersData[0].id, hashedPassword);

    await sendEmail({
      from: process.env.EMAIL_EMAIL,
      to: validatedValue.email,
      subject: "Your new password",
      html: `
        <h1>Your new password</h1>
        <h1>${newPassword}</h1>
      `,
    }).catch((err) => {
      console.error(`Can't send the email to ${validatedValue.email}`)
    });

  } catch (err) {
    console.error("err", err);
    res.json(err);
  }
});


module.exports = router;
