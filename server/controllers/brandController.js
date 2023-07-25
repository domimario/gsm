const { default: mongoose } = require("mongoose");

const Brand = require("../models/brandModel");

module.exports.createBrand = async (req, res) => {
  try {
    const brand = await Brand.create(req.body);
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllBrands = async (req, res) => {
  try {
    const brand = await Brand.find({});
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findByIdAndDelete(id);
    res.status(200).json(brand);
  } catch (error) {
    res.status(error.message).json({ message: error.message });
  }
};
