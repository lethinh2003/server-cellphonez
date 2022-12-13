const express = require("express");
const adminController = require("../controllers/admin_controller");

const router = express.Router();
router.route("/sanpham").post(adminController.updateSanPham);
router.route("/overview").get(adminController.getOverview);
router.route("/sanpham/create").post(adminController.createSanPham);

module.exports = router;
