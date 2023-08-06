const { default: mongoose } = require("mongoose");

const Mobile = require("../models/mobileModel");

//Controller for creating a new Mobile .

module.exports.createMobile = async (req, res) => {
  try {
    const mobile = await Mobile.create(req.body);
    res.status(200).json(mobile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.getMobiles = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const mobile = await Mobile.find().skip(skip).limit(limit);
    if (mobile.length == 0) {
      return res
        .status(404)
        .json({ message: "No mobiles have been added to the datbase" });
    }
    res.status(200).json(mobile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//Controller for getting all Mobile devices.

module.exports.getAllMobiles = async (req, res) => {
  try {
    const mobile = await Mobile.find({})
      .populate("brandName")
      .populate("modelName")
      .populate("sellers")
      .select("-__v");
    res.status(200).json(mobile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Controller for getting only one Mobile by ID

module.exports.getMobileById = async (req, res) => {
  try {
    const { id } = req.params;
    const mobile = await Mobile.findById(id)
      .populate("brandName")
      .populate("modelName")
      .populate("sellers")
      .select("-__v");
    res.status(200).json(mobile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Controller for updating only one Mobile by ID

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

//Controller for deleting only one Mobile by ID

module.exports.deleteMobile = async (req, res) => {
  try {
    const { id } = req.params;
    const mobile = await Mobile.findByIdAndDelete(id);
    res.status(200).json(mobile);
  } catch (error) {
    res.status(error.message).json({ message: error.message });
  }
};
