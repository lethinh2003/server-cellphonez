const SanPham = require("../models/SanPham");
const CauHinh = require("../models/CauHinh");
const AppError = require("../utils/app_error");
const catchAsync = require("../utils/catch_async");

exports.getAllCauHinh = catchAsync(async (req, res, next) => {
  const items = await CauHinh.find({}).sort("_id").select("-__v");
  return res.status(200).json({
    status: "success",
    results: items.length,
    data: items,
  });
});
exports.getCauHinh = catchAsync(async (req, res, next) => {
  const { sanPhamID } = req.params;
  const item = await CauHinh.findOne({ sanPham: sanPhamID }).select("-__v");
  return res.status(200).json({
    status: "success",
    data: item,
  });
});
exports.checkCauHinh = catchAsync(async (req, res, next) => {
  const { sanPhamID } = req.params;
  const item = await CauHinh.findOne({ sanPham: sanPhamID }).sort("_id").select("-__v");
  if (!item) {
    return next(new AppError("Chưa tồn tại cấu hình", 404));
  }
  return res.status(200).json({
    status: "success",
    data: item,
  });
});

exports.createCauHinh = catchAsync(async (req, res, next) => {
  console.log(req.body);
  if (!req.body) {
    return next(new AppError("Vui lòng nhập đầy đủ thông tin", 400));
  }
  if (!req.body.sanPham) {
    return next(new AppError("Vui lòng nhập ID sản phẩm", 400));
  }
  const checkTonTai = await CauHinh.findOne({ sanPham: req.body.sanPham });
  console.log(checkTonTai);
  if (checkTonTai) {
    return next(new AppError("Cấu hình đã được tạo cho sản phẩm này", 400));
  }

  const item = await CauHinh.create(req.body);

  return res.status(200).json({
    status: "success",
    data: item,
    message: "Tạo thành công",
  });
});

exports.editCauHinh = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { data, sanPham } = req.body;
  if (!sanPham) {
    return next(new AppError("Vui lòng nhập ID sản phẩm", 400));
  }
  const item = await CauHinh.findOneAndUpdate(
    { sanPham: sanPham },
    {
      data,
    }
  );

  return res.status(200).json({
    status: "success",
    data: item,
    message: "Update thành công",
  });
});
