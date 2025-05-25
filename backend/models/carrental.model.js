const mongoose = require('mongoose');

const carRentalschema = new mongoose.Schema({
    VechicleModel:{
        type: String,
        required: true
        
    },
    RentalAmount:{
        type:String,
        required:true
    },
    RentalPeriod:{
        type:String,
        required
    },
    VechileMileage:{
        type:String,
        required:true
    },
    VechicleDescription:{
        type:String,
        required:true
    },
    Available:{
        type:Boolean,
        default:true
    },
    ChooseFile:{
        type:String,
        required: true
    }
},
{
    timestamps : true
});

const CarRental = mongoose.model('carpool',carRentalschema);
module.exports = CarRental;

