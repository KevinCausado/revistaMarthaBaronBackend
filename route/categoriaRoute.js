const { authentication, restrictTo } = require("../controller/authController");
const { createField, getAllField, getFieldById, updateField, deleteField } = require("../controller/categoriaController");

const categoriaRoute = require("express").Router();

categoriaRoute.route("/create").post(authentication, restrictTo("admin"), createField);
categoriaRoute.route("/getAll").get(authentication, restrictTo("admin"), getAllField);
categoriaRoute.route("/getById/:id").get(authentication, restrictTo("admin"), getFieldById);
categoriaRoute.route("/update/:id").patch(authentication, restrictTo("admin"), updateField);
categoriaRoute.route("/delete/:id").delete(authentication, restrictTo("admin"), deleteField);

module.exports = { categoriaRoute };
