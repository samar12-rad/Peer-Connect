const express = require("express");
const userRouter = require("./userRoute");
const messageRouter = require("./messageRoute");

const router = express.Router();

router.use("/user", userRouter);
router.use("/message", messageRouter);

module.exports = router;
