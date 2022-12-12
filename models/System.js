const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const SystemSchema = new mongoose.Schema({
  linkAnhBannerChinh: {
    type: Array,
  },
  linkAnhBannerPhu: {
    type: Array,
  },
});

const System = mongoose.models.System || mongoose.model("System", SystemSchema);
module.exports = System;
