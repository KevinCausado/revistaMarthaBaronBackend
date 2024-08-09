const { authentication } = require("../controller/authController");
const { createCategoria } = require("../controller/categoriaController");

const categoriaRouter = require("express").Router();

categoriaRouter.route("/categoria/create").post(authentication, createCategoria);

module.exports = { categoriaRouter };
