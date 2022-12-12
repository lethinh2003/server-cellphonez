const express = require("express");
const donHangController = require("../controllers/donhang_controller");
const router = express.Router();
router.route("/").get(donHangController.getAllDonHang);
router.route("/check").get(donHangController.checkDonHang);
router.route("/").post(donHangController.createNewDonHang);

module.exports = router;
