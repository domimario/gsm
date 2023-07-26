const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema({
  sellerName: {
    type: String,
    required: [true],
  },
  sellerNipt: {
    type: String,
    required: [true],
  },
  location: {
    type: String,
    required: [true],
  },
  mobiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mobile" }],
});

module.exports = mongoose.model("Seller", SellerSchema);
