const express = require("express");
const cauHinhDienThoaiController = require("../controllers/cauhinhdienthoai_controller");
const router = express.Router();
router.route("/").get(cauHinhDienThoaiController.getAllCauHinh);
router.route("/").post(cauHinhDienThoaiController.createCauHinh);
router.route("/check/:sanPhamID").get(cauHinhDienThoaiController.checkCauHinh);
router.route("/:sanPhamID").get(cauHinhDienThoaiController.getCauHinh);

module.exports = router;
