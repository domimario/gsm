const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
  brandName: {
    type: String,
    required: [true],
    enum: ["Samsung", "Apple", "Google", "Huawei", "Xiaomi"],
  },
  brandOrigin: {
    type: String,
    required: [true],
  },
  models: [{ type: mongoose.Schema.Types.ObjectId, ref: "Model" }],
});

module.exports = mongoose.model("Brand", BrandSchema);
