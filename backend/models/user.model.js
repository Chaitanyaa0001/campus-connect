const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    profilephoto:{
        type : String,
        required:true,
        default: '/user.jpg'
    },
    carpools:{
        type:[mongoose.Schema.Types.ObjectId],
        ref : 'Carpool',
        default:[]
    },
    carrentals:{
        type:[mongoose.Schema.Types.ObjectId],
        ref : 'CarRental',
        default:[]
    },
    lostnfound:{
        type:[mongoose.Schema.Types.ObjectId],
        ref : 'LostnFound',
        default:[]
    },
    projects:{
        type:[mongoose.Schema.Types.ObjectId],
        ref : 'Project',
        default:[]
    }
},
{
    timestamps : true
});


const User = mongoose.model('User',userSchema);
module.exports= User;