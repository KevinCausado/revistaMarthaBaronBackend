const { signup, login } = require("../controller/authController");

const authRoute = require("express").Router();

authRoute.route("/signup").post(signup);
authRoute.route("/login").post(login);

module.exports = { authRoute };
