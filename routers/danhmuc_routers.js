const express = require("express");
const danhMucController = require("../controllers/danhmuc_controller");
const router = express.Router();
router.route("/").get(danhMucController.getAllDanhMuc);
router.route("/").post(danhMucController.createNewDanhMuc);

module.exports = router;
