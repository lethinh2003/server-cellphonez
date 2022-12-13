const SanPham = require("../models/SanPham");
const DonHang = require("../models/DonHang");

const AppError = require("../utils/app_error");
const sendEmail = require("../utils/email");
const CauHinh = require("../models/CauHinh");

const catchAsync = require("../utils/catch_async");

exports.getSanPham = catchAsync(async (req, res, next) => {
  return res.status(200).json({
    status: "success",

    message: "Cập nhật sản phẩm thành công",
  });
});

exports.updateSanPham = catchAsync(async (req, res, next) => {
  const {
    tenSanPham,
    thongTinSanPham,
    uuDaiThem,
    thongTinKhuyenMai,
    hang,
    danhMuc,
    giaTien,
    linkAnh,
    giamGia,
    dacDiemNoiBat,
    gioiThieu,
    isSale,
    _id,
  } = req.body;
  const newSanPham = await SanPham.findOneAndUpdate(
    { _id: _id },
    {
      danhMuc,
      tenSanPham,
      isSale,
      linkAnh,
      giaTien,
      giamGia,
      dacDiemNoiBat,
      gioiThieu,
      thongTinSanPham,
      uuDaiThem,
      thongTinKhuyenMai,
      hang,
    }
  );

  return res.status(200).json({
    status: "success",

    message: "Cập nhật sản phẩm thành công",
  });
});

exports.createSanPham = catchAsync(async (req, res, next) => {
  const {
    tenSanPham,
    thongTinSanPham,
    uuDaiThem,
    thongTinKhuyenMai,
    hang,
    danhMuc,
    giaTien,
    linkAnh,
    giamGia,
    dacDiemNoiBat,
    gioiThieu,
    isSale,
    cauHinhChiTiet,
  } = req.body;
  const newSanPham = await SanPham.create({
    danhMuc,
    tenSanPham,
    isSale,
    linkAnh,
    giaTien,
    giamGia,
    dacDiemNoiBat,
    gioiThieu,
    thongTinSanPham,
    uuDaiThem,
    thongTinKhuyenMai,
    hang,
  });
  const createCauHinh = await CauHinh.create({
    sanPham: newSanPham._id,
    data: cauHinhChiTiet,
  });
  console.log(createCauHinh);

  return res.status(200).json({
    status: "success",
    data: newSanPham,
    message: "Tạo sản phẩm thành công",
  });
});

exports.getOverview = catchAsync(async (req, res, next) => {
  const getTatCaSanPham = SanPham.find({}).select("-__v");
  const getSanPhamSale = SanPham.find({ isSale: true }).select("-__v");
  const getTatCaDonHang = DonHang.find({}).select("-__v");

  await Promise.all([getTatCaSanPham, getSanPhamSale, getTatCaDonHang]).then((data) => {
    return res.status(200).json({
      status: "success",
      data: [
        { key: "tatCaSanPham", title: "Sản phẩm", value: data[0].length },
        { key: "sanPhamSale", title: "Sản phẩm sale", value: data[1].length },
        { key: "donHang", title: "Đơn hàng", value: data[2].length },
      ],
    });
  });
});
