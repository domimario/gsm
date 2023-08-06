const { default: mongoose } = require("mongoose");

const Model = require("../models/modelModel");

//Controller for creating a new Model

module.exports.createModel = async (req, res) => {
  try {
    const model = await Model.create(req.body);
    res.status(200).json(model);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getModels = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const model = await Model.find().skip(skip).limit(limit);
    if (model.length == 0) {
      return res
        .status(404)
        .json({ message: "No models have been added to the datbase" });
    }
    res.status(200).json(model);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Controller for getting all Models .

module.exports.getAllModels = async (req, res) => {
  try {
    const model = await Model.find({}).select("-__v");
    res.status(200).json(model);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Controller for getting only one Model by ID.

module.exports.getModelById = async (req, res) => {
  try {
    const { id } = req.params;
    const model = await Model.findById(id).select("-__v");
    res.status(200).json(model);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Controller for updating only a Model by ID.

module.exports.updateModel = async (req, res) => {
  try {
    const { id } = req.params;

    const model = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(model);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Controller for deleting only one Model by ID

module.exports.deleteModel = async (req, res) => {
  try {
    const { id } = req.params;
    const model = await Model.findByIdAndDelete(id);
    res.status(200).json(model);
  } catch (error) {
    res.status(error.message).json({ message: error.message });
  }
};
