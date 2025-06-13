const mongoose = require('mongoose');

const carpoolSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    time:{
        type: Number,
        required: true
    },
    seatsAvailable:{
        type: Number,
        required: true
    },
    pricePerSeat:{
        type: Number,
        required:true
    }
},
{
    timestamps : true
});

const Carpool = mongoose.model('Carpool', carpoolSchema);
module.exports = Carpool;