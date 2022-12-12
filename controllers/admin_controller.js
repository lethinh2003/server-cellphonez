const SanPham = require("../models/SanPham");

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

// exports.getOverview = catchAsync(async (req, res, next) => {
//   const getOrders = HistoryCode.find({}).select("-__v");
//   const getOrdersSuccess = HistoryCode.find({ status: "success" }).select("-__v");
//   const getOrdersPending = HistoryCode.find({ status: "pending" }).select("-__v");
//   const getSourcesCode = Code.find({ status: true }).select("-__v -link");
//   const getUsers = User.find({ status: true }).select("-__v -password");

//   await Promise.all([getOrders, getOrdersSuccess, getSourcesCode, getUsers]).then((data) => {
//     return res.status(200).json({
//       status: "success",
//       data: [
//         { key: "orders", title: "Đơn Hàng", value: data[0].length },
//         { key: "ordersSuccess", title: "Thành Công", value: data[1].length },
//         { key: "sourcesCode", title: "Source Code", value: data[2].length },
//         { key: "users", title: "Người Dùng HĐ", value: data[3].length },
//       ],
//     });
//   });
// });
