const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema({
  
  brandName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },

  modelName: {
    type: String,
    required: [true],
  },

  ram: [
    {
      type: Number,
      required: [true],
      enum: [3, 4, 5, 6, 8, 12, 16],
    },
  ],

  memory: [
    {
      type: Number,
      required: [true],
      enum: [32, 64, 128, 256, 512],
    },
  ],

  modelColor: [
    {
      type: [String],
      required: [true],
    },
  ],
});

module.exports = mongoose.model("Model", ModelSchema);
