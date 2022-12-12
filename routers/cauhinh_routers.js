const express = require("express");
const cauHinhController = require("../controllers/cauhinh_controller");
const router = express.Router();
router.route("/").get(cauHinhController.getAllCauHinh);
router.route("/").post(cauHinhController.createCauHinh);
router.route("/edit").post(cauHinhController.editCauHinh);
router.route("/check/:sanPhamID").get(cauHinhController.checkCauHinh);
router.route("/:sanPhamID").get(cauHinhController.getCauHinh);

module.exports = router;
