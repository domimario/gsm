const { default: mongoose } = require("mongoose");

const Seller = require("../models/sellerModel");

module.exports.createSeller = async (req, res) => {
  try {
    const seller = await Seller.create(req.body);
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getAllSellers = async (req, res) => {
  try {
    const seller = await Seller.find({});
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getSellerById = async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await Seller.findById(id);
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.updateSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await Seller.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await Seller.findByIdAndDelete(id);
    res.status(200).json(seller);
  } catch (error) {
    res.status(error.message).json({ message: error.message });
  }
};
