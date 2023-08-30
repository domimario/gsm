// const mongoose = require("mongoose");

// const MobileSchema = new mongoose.Schema({
//   seller: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seller" }],

//   brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },

//   model: { type: String },

//   ram: [
//     {
//       type: Number,
//       required: [true],
//       enum: [3, 4, 5, 6, 8, 12, 16],
//     },
//   ],

//   memory: [
//     {
//       type: Number,
//       required: [true],
//       enum: [32, 64, 128, 256, 512],
//     },
//   ],

//   modelColor: [
//     {
//       type: [String],
//       required: [true],
//     },
//   ],
// });

// module.exports = mongoose.model("Mobile", MobileSchema);
