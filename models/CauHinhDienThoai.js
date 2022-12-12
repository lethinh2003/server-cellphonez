const mongoose = require("mongoose");
const slugify = require("slugify");
const CauHinhDienThoaiSchema = new mongoose.Schema(
  {
    sanPham: {
      type: mongoose.Schema.ObjectId,
      ref: "SanPham",
      unique: true,
    },
    // Màn hình
    congNgheManHinh: {
      type: String,
      trim: true,
      default: "Trống",
    },
    kichThuocManHinh: {
      type: String,
      trim: true,
      default: "Trống",
    },
    doPhanGiaiManHinh: {
      type: String,
      trim: true,
      default: "Trống",
    },
    tinhNangManHinh: {
      type: String,
      trim: true,
      default: "Trống",
    },
    tanSoQuet: {
      type: String,
      trim: true,
      default: "Trống",
    },
    // Camera sau
    cameraSau: {
      type: String,
      trim: true,
      default: "Trống",
    },
    quayVideo: {
      type: String,
      trim: true,
      default: "Trống",
    },
    tinhNangCamera: {
      type: String,
      trim: true,
      default: "Trống",
    },
    // Camera trước
    cameraTruoc: {
      type: String,
      trim: true,
      default: "Trống",
    },
    quayVideoTruoc: {
      type: String,
      trim: true,
      default: "Trống",
    },
    // Vi xử lý & đồ họa
    chipSet: {
      type: String,
      trim: true,
      default: "Trống",
    },
    loaiCPU: {
      type: String,
      trim: true,
      default: "Trống",
    },
    loaiGPU: {
      type: String,
      trim: true,
      default: "Trống",
    },

    // RAM & lưu trữ
    dungLuongRam: {
      type: String,
      trim: true,
      default: "Trống",
    },
    boNhoTrong: {
      type: String,
      trim: true,
      default: "Trống",
    },
    kheCamTheNho: {
      type: Boolean,
      default: false,
    },

    //Pin & công nghệ sạc
    pin: {
      type: String,
      trim: true,
      default: "Trống",
    },
    congNgheSac: {
      type: String,
      trim: true,
      default: "Trống",
    },
    congSac: {
      type: String,
      trim: true,
      default: "Trống",
    },
    // Giao tiếp & kết nối
    theSim: {
      type: String,
      trim: true,
      default: "Trống",
    },
    heDieuHanh: {
      type: String,
      trim: true,
      default: "Trống",
    },
    hongNgoai: {
      type: Boolean,
      default: false,
    },
    jackTaiNghe: {
      type: Boolean,
      default: false,
    },
    congNgheNFC: {
      type: Boolean,
      default: false,
    },
    hoTroMang: {
      type: String,
      trim: true,
      default: "Trống",
    },
    wifi: {
      type: String,
      trim: true,
      default: "Trống",
    },
    bluetooth: {
      type: String,
      trim: true,
      default: "Trống",
    },
    gps: {
      type: String,
      trim: true,
      default: "Trống",
    },
    // Thiết kế & Trọng lượng
    kichThuoc: {
      type: String,
      trim: true,
      default: "Trống",
    },
    trongLuong: {
      type: String,
      trim: true,
      default: "Trống",
    },
    chatLieuMatLung: {
      type: String,
      trim: true,
      default: "Trống",
    },
    chatLieuKhungVien: {
      type: String,
      trim: true,
      default: "Trống",
    },
    // Thông số khác
    chiSoKhangNuocBui: {
      type: String,
      trim: true,
      default: "Trống",
    },
    kieuManHinh: {
      type: String,
      trim: true,
      default: "Trống",
    },
    camBien: {
      type: String,
      trim: true,
      default: "Trống",
    },

    // Tiện ích khác
    camBienVanTay: {
      type: Boolean,
      default: false,
    },
    cacLoaiCamBien: {
      type: String,
      trim: true,
      default: "Trống",
    },
    tinhNangDacBiet: {
      type: String,
      trim: true,
      default: "Trống",
    },
  },
  {
    collection: "CauHinhDienThoai",
    timestamps: true,
  }
);

const CauHinhDienThoai = mongoose.models.CauHinhDienThoai || mongoose.model("CauHinhDienThoai", CauHinhDienThoaiSchema);
module.exports = CauHinhDienThoai;
