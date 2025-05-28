const CarRental = require('../models/carRental.model');


const getallcars = async (req, res) => {
    try {
        const carrentals = await CarRental.find(); // Added await
        return res.status(200).json(carrentals);
    } catch (error) {
        console.error("Internal server error:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


const postcarrental = async (req, res) => {
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);
    try {
        const {
            VechicleModel,
            RentalAmount,
            RentalPeriod,
            VechileMileage,
            VechicleDescription,
            Available,
        } = req.body;


        const Choosefile = req.file?.path 
        

        if (
            !VechicleModel ||
            !RentalAmount ||
            !RentalPeriod ||
            !VechileMileage ||
            !VechicleDescription ||
            Available === undefined || // This allows boolean false to pass
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
            Choosefile
        });

        return res.status(201).json({ message: "Car rental card created", carrental });
    } catch (error) {
        console.error("Internal server error:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


const deletecarrental = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedcarrental = await CarRental.findByIdAndDelete(id);

        if (!deletedcarrental) {
            return res.status(404).json({ message: "No CarRental found" });
        }

        return res.status(200).json({ message: "CarRental deleted successfully" });
    } catch (error) {
        console.error("Delete CarRental error:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    getallcars,
    postcarrental,
    deletecarrental
};
