const mongoose = require('mongoose')
const Projects = require('./project.model')

const userSchema = mongoose.Schema({
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
        type : String ,
        required:true
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