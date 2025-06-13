const Carpool = require('../models/carpool.model');

const getAllCarpools = async (req, res) => {
    try {
        const carpools = await Carpool.find();
        return res.status(200).json(carpools);
    } catch (err) {
        return res.status(500).json({ message: 'internal Server Error' });
    }
}

const postcarpool = async(req,res) =>{
    try {
        const user = req.user;

        const {from,to,time,seatsAvailable,pricePerSeat} = req.body;

        if (!from|| !to || !time || !seatsAvailable || !pricePerSeat ){
            return res.status(400).json({message: "all fields are required"})
        }
        const carpool = await Carpool.create({
            from,
            to,
            time,
            seatsAvailable,
            pricePerSeat,
            user: user._id
        });
      


        user.carpools.push(carpool._id);
        await user.save();
        return res.status(201).json(carpool);

    } catch (error) {
        console.error("Post Carpool Error:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const deletecarpool = async (req,res)=>{
    const user = req.user;
    try {
        const{id}= req.params;
        const deleted = await Carpool.findOneAndDelete({ _id: id, user: user._id });

        if(!deleted) {
            return res.status(404).json({message:"No carpool Found "})
        };

          return res.status(200).json({ message: "Carpool deleted successfully" });
    } catch (error) {
        console.error("deleted carpool error:",error.message);
        return res.status(500).json({message: "internal server error"})
    }

}
module.exports = { getAllCarpools,postcarpool,deletecarpool }