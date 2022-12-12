const mongoose = require("mongoose");
const slugify = require("slugify");
const SanPhamSchema = new mongoose.Schema(
  {
    tenSanPham: {
      type: String,
      unique: true,
      trim: true,
      minlength: [2, "Tên sản phẩm phải có độ dài từ 2 kí tự trở lên"],
      required: [true, "Vui lòng nhập tên sản phẩm"],
    },
    danhMuc: {
      type: mongoose.Schema.ObjectId,
      ref: "DanhMuc",
      required: [true, "Vui lòng nhập Danh Mục"],
    },
    hang: {
      type: String,
      required: [true, "Vui lòng nhập hãng"],
    },

    giaTien: {
      type: Number,
      default: 0,
    },
    giamGia: {
      type: Number,
      default: 0,
    },
    giaTienSauGiamGia: {
      type: Number,
      default: 0,
    },
    linkAnh: {
      type: Array,
    },
    thongTinKhuyenMai: {
      type: Array,
    },
    uuDaiThem: {
      type: Array,
    },
    thongTinSanPham: {
      type: Array,
    },
    dacDiemNoiBat: {
      type: String,
      trim: true,
    },
    gioiThieu: {
      type: String,
      trim: true,
    },
    isSale: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
    },
  },
  {
    collection: "SanPham",
    timestamps: true,
  }
);
SanPhamSchema.pre(/^find/, async function (next) {
  this.giaTienSauGiamGia = Math.round(this.giaTien - (this.giaTien * this.giamGia) / 100);
  console.log(this.giaTienSauGiamGia);
  next();
});
SanPhamSchema.pre("save", async function (next) {
  this.slug = slugify(this.tenSanPham, {
    lower: true,
    locale: "vi",
  });
  next();
});

const SanPham = mongoose.models.SanPham || mongoose.model("SanPham", SanPhamSchema);
module.exports = SanPham;
