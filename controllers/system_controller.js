const System = require("../models/System");
const AppError = require("../utils/app_error");
const catchAsync = require("../utils/catch_async");

exports.getSystem = catchAsync(async (req, res, next) => {
  const system = await System.findOne({});

  return res.status(200).json({
    status: "success",
    data: system,
  });
});
