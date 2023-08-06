const { default: mongoose } = require("mongoose");

const Brand = require("../models/brandModel");

//Create a new Brand

module.exports.createBrand = async (req, res) => {
  try {
    const brand = await Brand.create(req.body);
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.getBrands = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const brand = await Brand.find().skip(skip).limit(limit);
    if (brand.length == 0) {
      return res
        .status(404)
        .json({ message: "No brand have been added to the datbase" });
    }
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//Controller for getting all Brand objects.

module.exports.getAllBrands = async (req, res) => {
  try {
    const brand = await Brand.find({}).populate("models").select("-__v");
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Controller for getting a single Brand by ID.

module.exports.getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id).populate("models").select("-__v");
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Controller for updating a single Brand by ID

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

//Controller for deleting a Brand by ID

module.exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findByIdAndDelete(id);
    res.status(200).json(brand);
  } catch (error) {
    res.status(error.message).json({ message: error.message });
  }
};
