const { signup } = require("../controller/authController");

const authRouter = require("express").Router();

authRouter.route("/signup").post(signup);

module.exports = { authRouter };
