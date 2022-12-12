const mongoose = require("mongoose");
const slugify = require("slugify");
const DonHangSchema = new mongoose.Schema(
  {
    hoTen: {
      type: String,
      trim: true,
      required: [true, "Vui lòng nhập họ tên"],
    },
    soDienThoai: {
      type: String,
      trim: true,
      required: [true, "Vui lòng nhập số điện thoại"],
    },
    email: {
      type: String,
      trim: true,
    },
    diaChiNhanHang: {
      type: String,
      trim: true,
      required: [true, "Vui lòng nhập địa chỉ nhận hàng"],
    },
    danhSachSanPham: [
      {
        sanPham: {
          type: mongoose.Schema.ObjectId,
          ref: "SanPham",
        },
        soLuong: {
          type: Number,
          default: 1,
        },
      },
    ],
    giaTien: {
      type: Number,
      default: 0,
    },
    tinhTrang: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "DonHang",
    timestamps: true,
  }
);

const DonHang = mongoose.models.DonHang || mongoose.model("DonHang", DonHangSchema);
module.exports = DonHang;
