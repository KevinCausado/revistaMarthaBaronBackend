const { authentication, restrictTo } = require("../controller/authController");
const { create, getAll } = require("../controller/categoriaController");

const categoriaRouter = require("express").Router();

categoriaRouter.route("/create").post(authentication, restrictTo("admin"), create);
categoriaRouter.route("/getAll").get(authentication, restrictTo("admin"), getAll);




module.exports = { categoriaRouter };
