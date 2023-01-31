const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const authRouter = require("./auth");
const signaturesRouter = require("./signatures");
const petitionsRouter = require('./petitions')
const contactusRouter = require('./contactus')
const favoritesRouter = require('./favorites')

//http://localhost:3001/api/
router.get("/", authMiddleware, (req, res) => {
  res.json({ msg: "ok" });
});

//http://localhost:3001/api/auth
router.use("/auth", authRouter);

//http://localhost:3001/api/signatures
router.use('/signatures', signaturesRouter)

//http://localhost:3001/api/favorites
router.use('/favorites', favoritesRouter)

//http://localhost:3001/api/petitions
router.use('/petitions', petitionsRouter)

//http://localhost:3001/api/contactus
router.use('/contactus', contactusRouter)

module.exports = router;
