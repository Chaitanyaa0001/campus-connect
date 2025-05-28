const LostnFound = require('../models/lostnfound.model');

const getalllostnfound = async (req, res) => {
  try {
    const lostnfound = await LostnFound.find();
    return res.status(200).json({ lostnfound });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const postlostnfound = async (req, res) => {
  try {
    const { itemName, itemDescription, itemStatus } = req.body;
    const choosefile = req.file?.path;

    if (!itemName || !itemDescription || !itemStatus || !choosefile) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const lostnfound = await LostnFound.create({
      itemName,
      itemDescription,
      itemStatus,
      choosefile
    });

    return res.status(201).json({ message: "Lost & Found card created", lostnfound });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const DeleteLostnfound = async (req, res) => {
  try {
    const { id } = req.params;
    const deletelostnfound = await LostnFound.findByIdAndDelete(id);

    if (!deletelostnfound) {
      return res.status(404).json({ message: "No Lost & Found card found" });
    }

    return res.status(200).json({ message: "Lost & Found card deleted" });
  } catch (error) {
    console.error("Delete lost & found error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getalllostnfound,
  postlostnfound,
  DeleteLostnfound
};
