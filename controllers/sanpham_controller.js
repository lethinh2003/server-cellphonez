const SanPham = require("../models/SanPham");
const DanhMuc = require("../models/DanhMuc");
const AppError = require("../utils/app_error");
const catchAsync = require("../utils/catch_async");
exports.getAllSanPham = catchAsync(async (req, res, next) => {
  const findSanPham = await SanPham.find({}).sort("_id").select("-__v").populate({
    path: "danhMuc",
  });
  return res.status(200).json({
    status: "success",
    results: findSanPham.length,
    data: findSanPham,
  });
});
exports.getSearchSanPham = catchAsync(async (req, res, next) => {
  const query = req.query.query;

  const loaiDanhMuc = req.query.loaiDanhMuc || "all";
  const page = req.query.page * 1 || 1;
  const results = req.query.results * 1 || 10;
  const sorts = req.query.sorts || "_id";
  const skip = (page - 1) * results;
  let findSanPham = [];
  if (loaiDanhMuc === "all") {
    findSanPham = await SanPham.find({
      tenSanPham: new RegExp(query, "i"),
    })
      .skip(skip)
      .limit(results)
      .sort(sorts)
      .select("-__v")
      .populate({
        path: "danhMuc",
      });
  } else {
    findSanPham = await SanPham.find({
      tenSanPham: new RegExp(query, "i"),
      danhMuc: loaiDanhMuc,
    })
      .skip(skip)
      .limit(results)
      .sort(sorts)
      .select("-__v")
      .populate({
        path: "danhMuc",
      });
  }
  return res.status(200).json({
    status: "success",
    results: findSanPham.length,
    data: findSanPham,
    meta: {
      page: page,
      results: results,
      sorts,
      query,
      loaiDanhMuc,
    },
  });
});

exports.getLienQuanSanPhamByDanhMuc = catchAsync(async (req, res, next) => {
  const { danhMucID } = req.params;
  console.log(req.query);
  const limitRandomRecord = req.query.results * 1 || 3;
  SanPham.countDocuments({
    danhMuc: danhMucID,
  }).exec(function (err, count) {
    // Get a random entry
    console.log(count);
    var random = Math.floor(Math.random() * count);

    // Again query all users but only fetch one offset by our random #
    SanPham.find({
      danhMuc: danhMucID,
    })
      .skip(random)
      .limit(limitRandomRecord)
      .populate({
        path: "danhMuc",
      })
      .exec(function (err, result) {
        const newResult = result.filter((item, i) => item._id.toString() !== req.query.sanpham);
        res.status(200).json({
          status: "success",
          results: newResult.length,
          data: newResult,
        });
      });
  });
});

exports.getAllSanPhamByType = catchAsync(async (req, res, next) => {
  const { danhMucID } = req.params;
  const page = req.query.page * 1 || 1;
  const results = req.query.results * 1 || 10;
  const sorts = req.query.sorts || "_id";
  const skip = (page - 1) * results;
  let findSanPham = [];
  const findDanhMuc = await DanhMuc.findOne({
    _id: danhMucID,
  });

  findSanPham = await SanPham.find({
    danhMuc: danhMucID,
  })
    .skip(skip)
    .limit(results)
    .sort(sorts)
    .select("-__v")
    .populate({
      path: "danhMuc",
    });

  return res.status(200).json({
    status: "success",
    results: findSanPham.length,
    data: findSanPham,
    danhMuc: findDanhMuc,
    meta: {
      page: page,
      results: results,
      sorts,
    },
  });
});

exports.getAllSanPhamSale = catchAsync(async (req, res, next) => {
  const { loaiSale } = req.params;
  let findSanPham;
  if (loaiSale === "thietbi") {
    findSanPham = await SanPham.find({
      isSale: true,
      $or: [
        {
          danhMuc: "6391954bba537b41c47f8cf0",
        },
        {
          danhMuc: "6391958ab61d7a353cc3e4e3",
        },
        {
          danhMuc: "639196a3b61d7a353cc3e4f1",
        },
      ],
    })
      .sort("_id")
      .select("-__v")
      .populate({
        path: "danhMuc",
      });
  } else if (loaiSale === "phukien") {
    findSanPham = await SanPham.find({
      isSale: true,
      $or: [
        {
          danhMuc: "639195ceb61d7a353cc3e4e7",
        },
        {
          danhMuc: "639195e8b61d7a353cc3e4e9",
        },
        {
          danhMuc: "63919659b61d7a353cc3e4ed",
        },
      ],
    })
      .sort("_id")
      .select("-__v")
      .populate({
        path: "danhMuc",
      });
  }

  return res.status(200).json({
    status: "success",
    results: findSanPham.length,
    data: findSanPham,
  });
});
exports.getSanPham = catchAsync(async (req, res, next) => {
  const { sanPhamID } = req.params;
  const findSanPham = await SanPham.find({ _id: sanPhamID }).sort("_id").select("-__v").populate({
    path: "danhMuc",
  });
  return res.status(200).json({
    status: "success",
    results: findSanPham.length,
    data: findSanPham,
  });
});
exports.getSanPhamBySlug = catchAsync(async (req, res, next) => {
  const { sanPhamSlug } = req.params;
  const findSanPham = await SanPham.findOne({ slug: sanPhamSlug }).select("-__v").populate({
    path: "danhMuc",
  });

  console.log(findSanPham);
  if (!findSanPham) {
    return next(new AppError("Không tồn tại sản phẩm", 404));
  }
  return res.status(200).json({
    status: "success",
    data: findSanPham,
  });
});

exports.createNewSanPham = catchAsync(async (req, res, next) => {
  const { tenSanPham, danhMuc, giaTien, linkAnh, giamGia, dacDiemNoiBat, gioiThieu } = req.body;
  const newSanPham = await SanPham.create({
    tenSanPham,
    danhMuc,
    linkAnh,
    giaTien,
    giamGia,
    dacDiemNoiBat,
    gioiThieu,
  });

  return res.status(200).json({
    status: "success",
    data: newSanPham,
    message: "Tạo sản phẩm thành công",
  });
});
