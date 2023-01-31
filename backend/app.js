const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const rateLimit = require('express-rate-limit');

const apiRouter = require("./src/routes/api");

const app = express();

app.use(cors());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}))
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// http://localhost:3001/api
app.use("/api", apiRouter);

app.get('/image/:file', (req, res) => {
    res.sendFile(`${__dirname}/uploads/${req.params.file}`);
});

module.exports = app;
