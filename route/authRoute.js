const { signup } = require("../controller/authController");


const authRouter = require("express").Router();


authRouter.post('/inicio',signup)
// authRouter.route("/signup").post();

module.exports = { authRouter };
