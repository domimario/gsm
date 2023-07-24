const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
  brandName: {
    type: String,
    required: [true],
  },
  brandOrigin: {
    type: String,
    required: [true],
  },
  models: [{ type: mongoose.Schema.Types.ObjectId, ref: "Model" }],
});

module.exports = mongoose.model("Brand", BrandSchema);