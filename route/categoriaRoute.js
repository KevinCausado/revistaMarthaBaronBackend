const { authentication, restrictTo } = require("../controller/authController");
const { createRecord, getAllRecord, getRecordById, updateRecord, deleteRecord } = require("../controller/categoriaController");

const categoriaRoute = require("express").Router();

categoriaRoute.route("/").post(authentication, restrictTo("admin"), createRecord);
categoriaRoute.route("/").get(authentication, restrictTo("admin"), getAllRecord);
categoriaRoute.route("/:id").get(authentication, restrictTo("admin"), getRecordById);
categoriaRoute.route("/:id").patch(authentication, restrictTo("admin"), updateRecord);
categoriaRoute.route("/:id").delete(authentication, restrictTo("admin"), deleteRecord);

module.exports = { categoriaRoute };
