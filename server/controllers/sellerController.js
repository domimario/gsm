const { default: mongoose } = require("mongoose");

const Seller = require("../models/sellerModel");

//Controller for creating a new Seller

module.exports.createSeller = async (req, res) => {
  try {
    const { sellerName, sellerNipt } = req.body;

    const existingSeller = await Seller.findOne({ sellerName }, { sellerNipt });
    const existingSellerName = await Seller.findOne({ sellerName });
    const existingSellerNipt = await Seller.findOne({ sellerNipt });

    const regex = /^[A-Za-z0-9\s]+$/;
    const regexNipt = /^[A-Z]\d{8}[A-Z]$/;

    if (!regex.test(sellerName)) {
      return res.status(400).json({ message: "Invalid seller name format" });
    }

    if (!regexNipt.test(sellerNipt)) {
      return res.status(400).json({
        message:
          "Nipt format not supported , nipt should start with a Letter and finished with a Letter",
      });
    }

    if (existingSellerName) {
      return res
        .status(404)
        .json({ message: "Seller with the provided name already exists" });
    }

    if (existingSellerNipt) {
      return res
        .status(404)
        .json({ message: "Seller with the provided NIPT already exists" });
    }

    if (existingSeller) {
      return res.status(404).json({
        message: "Seller with the provided name and NIPT already exists",
      });
    }

    const seller = await Seller.create(req.body);
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getSellers = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const seller = await Seller.find().skip(skip).limit(limit);
    if (seller.length == 0) {
      return res
        .status(404)
        .json({ message: "No sellers have been added to the datbase" });
    }
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for getting all the Sellers

module.exports.getAllSellers = async (req, res) => {
  try {
    const seller = await Seller.find({}).populate("models").select("-__v");
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Controller for getting only one Seller from ID

module.exports.getSellerById = async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await Seller.findById(id).populate("models").select("-__v");
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Controller for updating a existing Seller object

module.exports.updateSeller = async (req, res) => {
  try {
    const { sellerName, sellerNipt } = req.body;
    const { id } = req.params;
    const regex = /^[A-Za-z0-9\s]+$/;
    const regexNipt = /^[A-Z]\d{8}[A-Z]$/;

    if (!regex.test(sellerName)) {
      return res.status(500).json({ message: "Invalid seller name format" });
    }

    if (!regexNipt.test(sellerNipt)) {
      return res.status(500).json({ message: "Nipt format not supported" });
    }

    const selectedSeller = await Seller.findById(id);
    if (!selectedSeller) {
      return res
        .status(404)
        .json({ message: "There is no match with that id." });
    }

    const existingSellerByName = await Seller.findOne({
      _id: { $ne: id },
      sellerName,
    });

    if (existingSellerByName) {
      return res.status(500).json({ message: "Seller name already exists" });
    }

    const existingSellerByNipt = await Seller.findOne({
      _id: { $ne: id },
      sellerNipt,
    });

    if (existingSellerByNipt) {
      return res.status(500).json({ message: "Someone already has this nipt" });
    }

    const seller = await Seller.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Controller for deleting a Seller from ID

module.exports.deleteSeller = async (req, res) => {
  try {
    const { id } = req.params;
    const seller = await Seller.findByIdAndDelete(id);
    res.status(200).json(seller);
  } catch (error) {
    res.status(error.message).json({ message: error.message });
  }
};
