const mongoose=require("mongoose");

const OTPModel=mongoose.Schema({
    EmailId:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    exptime:{
        type:Date,
        required:true
    },  
    CreatedAt:{
        type:Date,
        default:Date.now
    },
    UpdatedAt:{
        type:Date,
        default:Date.now
    }    
});

module.exports=mongoose.model("otp",OTPModel);