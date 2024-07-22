const { signup } = require("../controller/authController");

const authRouter = require("express").Router();

authRouter.post("/signup", signup);
// authRouter.route("/signup").post();

module.exports = { authRouter };
