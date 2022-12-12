const mongoose = require("mongoose");
const DanhMucSchema = new mongoose.Schema(
  {
    tenDanhMuc: {
      type: String,
      unique: true,
      trim: true,
      minlength: [2, "Tên danh mục phải có độ dài từ 2 kí tự trở lên"],
      required: [true, "Vui lòng nhập tên danh mục"],
    },
    linkAnh: {
      type: String,
      trim: true,
      minlength: [6, "Link ảnh phải có độ dài từ 6 kí tự trở lên"],
      required: [true, "Vui lòng nhập link ảnh"],
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      minlength: [2, "Slug phải có độ dài từ 2 kí tự trở lên"],
      required: [true, "Vui lòng nhập slug"],
    },
  },
  {
    collection: "DanhMuc",
    timestamps: true,
  }
);

const DanhMuc = mongoose.models.DanhMuc || mongoose.model("DanhMuc", DanhMucSchema);
module.exports = DanhMuc;
