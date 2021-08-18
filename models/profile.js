const mongoose = require("mongoose");

const profileShema = new mongoose.Schema({ 
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    description:{
        type:String,
        required:true,
        maxlength:250
    }
    
},{
    timestamps:true
});


module.exports = mongoose.model("Profile",profileShema);
