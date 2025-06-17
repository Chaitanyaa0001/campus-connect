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
            Choosefile,
            user: req.user._id
        });

        user.carrentals.push(carrental._id);
        await user.save();
        return res.status(201).json(carrental);

    } catch (error) {
        console.error("Internal server error:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


const deletecarrental = async (req, res) => {
    try {
            const user = req.user;

        const { id } = req.params;
        const deletedcarrental = await CarRental.findByIdAndDelete({ _id: id,user: user._id});

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
