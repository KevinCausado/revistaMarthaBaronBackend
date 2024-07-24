const { signup, login } = require("../controller/authController");

const authRouter = require("express").Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
// authRouter.route("/signup").post();

module.exports = { authRouter };
