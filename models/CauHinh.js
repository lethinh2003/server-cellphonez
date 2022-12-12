const mongoose = require("mongoose");
const slugify = require("slugify");
const CauHinhSchema = new mongoose.Schema(
  {
    sanPham: {
      type: mongoose.Schema.ObjectId,
      ref: "SanPham",
      unique: true,
    },
    data: {
      type: Array,
    },
  },
  {
    collection: "CauHinh",
    timestamps: true,
  }
);

const CauHinh = mongoose.models.CauHinh || mongoose.model("CauHinh", CauHinhSchema);
module.exports = CauHinh;
