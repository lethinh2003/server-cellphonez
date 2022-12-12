const DanhMuc = require("../models/DanhMuc");
const AppError = require("../utils/app_error");
const catchAsync = require("../utils/catch_async");

exports.getAllDanhMuc = catchAsync(async (req, res, next) => {
  const findDanhMuc = await DanhMuc.find({}).sort("_id").select("-__v");
  return res.status(200).json({
    status: "success",
    results: findDanhMuc.length,
    data: findDanhMuc,
  });
});

exports.createNewDanhMuc = catchAsync(async (req, res, next) => {
  const { tenDanhMuc, slug, linkAnh } = req.body;
  const newDanhMuc = await DanhMuc.create({
    tenDanhMuc,
    slug,
    linkAnh,
  });

  return res.status(200).json({
    status: "success",
    data: newDanhMuc,
    message: "Tạo danh mục thành công",
  });
});
