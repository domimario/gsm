const mongoose = require("mongoose");

const MobileSchema = new mongoose.Schema({

  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
  
  model: { type: mongoose.Schema.Types.ObjectId, ref: "Model", required: true },

  conditions: {
    type: Number,
    required: true,
    min: [5, "Condition must be between 5 and 10"],
    max: [10, "Condition must be between 5 and 10"],
  },

  comment: {
    type: String,
  },

  price: {
    type: Number,
    required: true,
    min: [10],
    max: [2000],
  },

  sellers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seller" }],
});

module.exports = mongoose.model("Mobile", MobileSchema);
