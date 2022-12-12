const express = require("express");
const sanPhamController = require("../controllers/sanpham_controller");
const router = express.Router();
router.route("/").get(sanPhamController.getAllSanPham);
router.route("/lienquan/:danhMucID").get(sanPhamController.getLienQuanSanPhamByDanhMuc);
router.route("/type/:danhMucID").get(sanPhamController.getAllSanPhamByType);
router.route("/sale/:loaiSale").get(sanPhamController.getAllSanPhamSale);
router.route("/slug/:sanPhamSlug").get(sanPhamController.getSanPhamBySlug);
router.route("/:sanPhamID").get(sanPhamController.getSanPham);
router.route("/").post(sanPhamController.createNewSanPham);

module.exports = router;
