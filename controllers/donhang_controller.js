const DonHang = require("../models/DonHang");
const AppError = require("../utils/app_error");
const catchAsync = require("../utils/catch_async");

exports.getAllDonHang = catchAsync(async (req, res, next) => {
  const findItems = await DonHang.find({}).sort("_id").select("-__v").populate({
    path: "danhSachSanPham.sanPham",
  });
  return res.status(200).json({
    status: "success",
    results: findItems.length,
    data: findItems,
  });
});
exports.checkDonHang = catchAsync(async (req, res, next) => {
  const { soDienThoai, maDonHang } = req.query;

  const findItems = await DonHang.findOne({
    _id: maDonHang,
    soDienThoai,
  })
    .sort("_id")
    .select("-__v");
  return res.status(200).json({
    status: "success",
    data: findItems,
  });
});

exports.createNewDonHang = catchAsync(async (req, res, next) => {
  const { hoTen, soDienThoai, email, diaChiNhanHang, danhSachSanPham, giaTien } = req.body;
  const newDonHang = await DonHang.create({
    hoTen,
    soDienThoai,
    email,
    diaChiNhanHang,
    danhSachSanPham,
    giaTien,
  });

  return res.status(200).json({
    status: "success",
    data: newDonHang,
    message: "Tạo đơn hàng thành công",
  });
});
