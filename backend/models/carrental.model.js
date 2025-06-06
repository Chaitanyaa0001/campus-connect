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
        required:true
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
    Choosefile:{
        type:String,
        required: true
    }
},
{
    timestamps : true
});

const CarRental = mongoose.model('CarRental',carRentalschema);
module.exports = CarRental;

