const { default: mongoose } = require("mongoose");

const Model = require("../models/modelModel");

module.exports.createMobile = async (req, res) => {
  try {
    const model = await Model.create(req.body);
    res.status(200).json(model);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllMobiles = async (req, res) => {
  try {
    const model = await Model.find({});
    res.status(200).json(model);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getMobileById = async (req, res) => {
  try {
    const { id } = req.params;
    const model = await Model.findById(id);
    res.status(200).json(model);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateMobile = async (req, res) => {
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

module.exports.deleteMobile = async (req, res) => {
  try {
    const { id } = req.params;
    const model = await Model.findByIdAndDelete(id);
    res.status(200).json(model);
  } catch (error) {
    res.status(error.message).json({ message: error.message });
  }
};
