const { authentication, restrictTo } = require("../controller/authController");
const { createRecord, getAllRecord, getRecordById, updateRecord, deleteRecord } = require("../controller/categoriaController");

const categoriaRoute = require("express").Router();

categoriaRoute.route("/create").post(authentication, restrictTo("admin"), createRecord);
categoriaRoute.route("/getAll").get(authentication, restrictTo("admin"), getAllRecord);
categoriaRoute.route("/getById/:id").get(authentication, restrictTo("admin"), getRecordById);
categoriaRoute.route("/update/:id").patch(authentication, restrictTo("admin"), updateRecord);
categoriaRoute.route("/delete/:id").delete(authentication, restrictTo("admin"), deleteRecord);

module.exports = { categoriaRoute };
