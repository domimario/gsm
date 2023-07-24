const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema({
    modelName: {
        type: String,
        required: [true],
      },
      ram: {
        type: Number,
        required: [true],
      },
      memory: {
        type: Number,
        required: [true],
      },
});

module.exports = mongoose.model("Model", ModelSchema);