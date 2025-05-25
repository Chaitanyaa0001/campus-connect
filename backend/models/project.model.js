const mongoose = require('mongoose');

const projectScehema = mongoose.Schema({
    projectTitle:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    personrequired:{
        type:Number,
        required:true
    },
    dueDate:{
        type:Date,
        required:true
    },
    Technologies:{
        type:[String],
        required:true
    }
},
{
    timestamps : true
});

const Projects = mongoose.model('Projects',projectScehema);
module.exports = Projects;
