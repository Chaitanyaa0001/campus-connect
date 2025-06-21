const CarRental = require("../models/carrental.model");
const User = require("../models/user.model"); // ✅ Declare ONCE ONLY

// ✅ Get all car rentals
const getallcars = async (req, res) => {
  try {
    const carrentals = await CarRental.find();
    return res.status(200).json(carrentals);
  } catch (error) {
    console.error("Internal server error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Post a new car rental
const postcarrental = async (req, res) => {
  try {
    const user = req.user;

    const {
      VechicleModel,
      RentalAmount,
      RentalPeriod,
      VechileMileage,
      VechicleDescription,
      Available,
    } = req.body;

    const Choosefile = req.file?.path;

    if (
      !VechicleModel ||
      !RentalAmount ||
      !RentalPeriod ||
      !VechileMileage ||
      !VechicleDescription ||
      Available === undefined ||
      !Choosefile
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const carrental = await CarRental.create({
      VechicleModel,
      RentalAmount,
      RentalPeriod,
      VechileMileage,
      VechicleDescription,
      Available,
      Choosefile,
      user: user._id
    });

    user.carrentals.push(carrental._id);
    await user.save();

    return res.status(201).json(carrental);
  } catch (error) {
    console.error("Post Carrental Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Delete car rental
const deletecarrental = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;

    const deletedRental = await CarRental.findOneAndDelete({
      _id: id,
      user: user._id,
    });

    if (!deletedRental) {
      return res.status(404).json({ message: "No carrental found or not authorized" });
    }

    await User.findByIdAndUpdate(user._id, {
      $pull: { carrentals: id },
    });

    return res.status(200).json({ message: "Carrental deleted successfully" });
  } catch (error) {
    console.error("Delete Carrental Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Export all handlers
module.exports = {
  getallcars,
  postcarrental,
  deletecarrental,
};
