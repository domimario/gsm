const { default: mongoose } = require("mongoose");

const Mobile = require("../models/mobileModel");

module.exports.createMobile = async (req, res) => {
  try {
    const mobile = await Mobile.create(req.body);
    res.status(200).json(mobile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllMobiles = async (req, res) => {
  try {
    const mobile = await Mobile.find({});
    res.status(200).json(mobile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getMobileById = async (req, res) => {
  try {
    const { id } = req.params;
    const mobile = await Mobile.findById(id);
    res.status(200).json(mobile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateMobile = async (req, res) => {
  try {
    const { id } = req.params;
    const mobile = await Mobile.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(mobile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteMobile = async (req, res) => {
  try {
    const { id } = req.params;
    const mobile = await Mobile.findByIdAndDelete(id);
    res.status(200).json(mobile);
  } catch (error) {
    res.status(error.message).json({ message: error.message });
  }
};
