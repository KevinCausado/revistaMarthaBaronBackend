const { authentication, restrictTo } = require("../controller/authController");
const { createRecord, getAllRecord, getRecordById, updateRecord, deleteRecord } = require("../controller/proveedorController");

const proveedorRoute = require("express").Router();

proveedorRoute.route("/").post(authentication, restrictTo("admin"), createRecord);
proveedorRoute.route("/").get(authentication, restrictTo("admin"), getAllRecord);
proveedorRoute.route("/:id").get(authentication, restrictTo("admin"), getRecordById);
proveedorRoute.route("/:id").patch(authentication, restrictTo("admin"), updateRecord);
proveedorRoute.route("/:id").delete(authentication, restrictTo("admin"), deleteRecord);

module.exports = { proveedorRoute };
