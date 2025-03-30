const mongoose=require("mongoose");

const ServiceModel=mongoose.Schema({
    CustomerName:{
        type:String,
        required:true
    },
    RegNumber:{
        type:String,
        required:true
    },
    AppointMentDate:{
        type:String,
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

module.exports=mongoose.model("Services",ServiceModel);