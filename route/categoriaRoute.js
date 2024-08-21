const { authentication, restrictTo } = require("../controller/authController");
const { createCategoria } = require("../controller/categoriaController");

const categoriaRouter = require("express").Router();

categoriaRouter.route("/categoria/create").post(authentication, restrictTo("admin"), createCategoria);

module.exports = { categoriaRouter };
