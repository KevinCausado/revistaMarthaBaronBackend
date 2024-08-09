const { signup, login } = require("../controller/authController");

const authRouter = require("express").Router();

authRouter.route("/signup").post(signup);
authRouter.route("/login").post(login);

module.exports = { authRouter };
