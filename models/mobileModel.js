const mongoose = require("mongoose");

const MobileSchema = new mongoose.Schema({
  brandName: [{ type: mongoose.Schema.Types.ObjectId, ref: "Brand" }],

  modelName: [{ type: mongoose.Schema.Types.ObjectId, ref: "Model" }],

  conditions: {
    type: Number,
    required: [true],
  },
  comment: {
    type: String,
  },

  price: {
    type: Number,
  },

  sellers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seller" }],
});

module.exports = mongoose.model("Mobile", MobileSchema);
